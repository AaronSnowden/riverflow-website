<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class NewsletterController extends Controller
{
    /**
     * Display a listing of newsletters.
     */
    public function index(Request $request)
    {
        $query = Newsletter::query();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Search
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Order by published date
        $query->orderBy('published_date', $request->get('order', 'desc'));

        // Pagination
        $perPage = $request->get('per_page', 15);
        $newsletters = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $newsletters,
        ]);
    }

    /**
     * Get published newsletters for public display.
     */
    public function published(Request $request)
    {
        $query = Newsletter::published();

        // Filter by type
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Order by date
        $query->orderBy('published_date', 'desc');

        $perPage = $request->get('per_page', 12);
        $newsletters = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $newsletters,
        ]);
    }

    /**
     * Store a newly created newsletter.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:newsletters,slug',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240', // 10MB max
            'cover_image' => 'nullable|string',
            'published_date' => 'nullable|date',
            'status' => 'nullable|in:draft,published',
            'type' => 'required|in:written,pdf',
            'category' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except(['pdf_file']);

        // Handle PDF upload
        if ($request->hasFile('pdf_file')) {
            $file = $request->file('pdf_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('newsletters', $filename, 'public');
            $data['pdf_file'] = $path;
        }

        $newsletter = Newsletter::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Newsletter created successfully',
            'data' => $newsletter,
        ], 201);
    }

    /**
     * Display the specified newsletter.
     */
    public function show($id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json([
                'success' => false,
                'message' => 'Newsletter not found',
            ], 404);
        }

        // Increment views if published
        if ($newsletter->status === 'published') {
            $newsletter->incrementViews();
        }

        return response()->json([
            'success' => true,
            'data' => $newsletter,
        ]);
    }

    /**
     * Update the specified newsletter.
     */
    public function update(Request $request, $id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json([
                'success' => false,
                'message' => 'Newsletter not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:newsletters,slug,' . $id,
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',
            'cover_image' => 'nullable|string',
            'published_date' => 'nullable|date',
            'status' => 'nullable|in:draft,published',
            'type' => 'sometimes|required|in:written,pdf',
            'category' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $request->except(['pdf_file']);

        // Handle PDF upload
        if ($request->hasFile('pdf_file')) {
            // Delete old PDF if exists
            if ($newsletter->pdf_file && Storage::disk('public')->exists($newsletter->pdf_file)) {
                Storage::disk('public')->delete($newsletter->pdf_file);
            }

            $file = $request->file('pdf_file');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('newsletters', $filename, 'public');
            $data['pdf_file'] = $path;
        }

        $newsletter->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Newsletter updated successfully',
            'data' => $newsletter,
        ]);
    }

    /**
     * Remove the specified newsletter.
     */
    public function destroy($id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json([
                'success' => false,
                'message' => 'Newsletter not found',
            ], 404);
        }

        // Delete associated PDF file
        if ($newsletter->pdf_file && Storage::disk('public')->exists($newsletter->pdf_file)) {
            Storage::disk('public')->delete($newsletter->pdf_file);
        }

        $newsletter->delete();

        return response()->json([
            'success' => true,
            'message' => 'Newsletter deleted successfully',
        ]);
    }

    /**
     * Download newsletter PDF.
     */
    public function download($id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter || !$newsletter->pdf_file) {
            return response()->json([
                'success' => false,
                'message' => 'Newsletter PDF not found',
            ], 404);
        }

        // Increment downloads
        $newsletter->incrementDownloads();

        $filePath = storage_path('app/public/' . $newsletter->pdf_file);
        
        if (!file_exists($filePath)) {
            return response()->json([
                'success' => false,
                'message' => 'File not found',
            ], 404);
        }

        return response()->download($filePath, basename($newsletter->pdf_file));
    }

    /**
     * Get newsletter statistics.
     */
    public function statistics()
    {
        $stats = [
            'total' => Newsletter::count(),
            'published' => Newsletter::published()->count(),
            'draft' => Newsletter::draft()->count(),
            'written' => Newsletter::written()->count(),
            'pdf' => Newsletter::pdf()->count(),
            'total_views' => Newsletter::sum('views'),
            'total_downloads' => Newsletter::sum('downloads'),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Update newsletter status.
     */
    public function updateStatus(Request $request, $id)
    {
        $newsletter = Newsletter::find($id);

        if (!$newsletter) {
            return response()->json([
                'success' => false,
                'message' => 'Newsletter not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $newsletter->update(['status' => $request->status]);

        return response()->json([
            'success' => true,
            'message' => 'Newsletter status updated successfully',
            'data' => $newsletter,
        ]);
    }
}
