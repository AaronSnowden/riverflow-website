<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    /**
     * Display a listing of the news.
     */
    public function index(Request $request)
    {
        $query = News::query();

        // Filter by category
        if ($request->has('category')) {
            $query->category($request->category);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by state
        if ($request->has('state')) {
            $query->where('state', $request->state);
        }

        // Search by title or content
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Paginate
        $perPage = $request->get('per_page', 15);
        $news = $query->paginate($perPage);

        return response()->json($news);
    }

    /**
     * Store a newly created news article.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'excerpt' => 'nullable|string',
            'content' => 'required|string',
            'image' => 'nullable|string', // Can be URL or file path
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'author' => 'nullable|string|max:255',
            'category' => 'required|in:internal,external',
            'status' => 'nullable|in:draft,published',
            'state' => 'nullable|in:active,inactive,archived',
            'published_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $data = $validator->validated();
            
            // Handle image file upload if provided
            if ($request->hasFile('image_file')) {
                $file = $request->file('image_file');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;
                $path = $file->storeAs('uploads', $filename, 'public');
                $data['image'] = Storage::disk('public')->url($path);
                unset($data['image_file']);
            }
            
            $news = News::create($data);

            return response()->json([
                'success' => true,
                'message' => 'News article created successfully',
                'data' => $news
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create news article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified news article.
     */
    public function show($id)
    {
        try {
            // Try to find by ID first, then by slug
            $news = is_numeric($id) 
                ? News::findOrFail($id) 
                : News::where('slug', $id)->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $news
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'News article not found'
            ], 404);
        }
    }

    /**
     * Update the specified news article.
     */
    public function update(Request $request, $id)
    {
        try {
            $news = News::findOrFail($id);

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'excerpt' => 'nullable|string',
                'content' => 'sometimes|required|string',
                'image' => 'nullable|string', // Can be URL or file path
                'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'author' => 'nullable|string|max:255',
                'category' => 'sometimes|required|in:internal,external',
                'status' => 'nullable|in:draft,published',
                'state' => 'nullable|in:active,inactive,archived',
                'published_date' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();
            
            // Handle image file upload if provided
            if ($request->hasFile('image_file')) {
                // Delete old image if exists
                if ($news->image && str_contains($news->image, 'storage/uploads/')) {
                    $oldPath = str_replace('/storage/', '', parse_url($news->image, PHP_URL_PATH));
                    Storage::disk('public')->delete($oldPath);
                }
                
                $file = $request->file('image_file');
                $extension = $file->getClientOriginalExtension();
                $filename = Str::uuid() . '.' . $extension;
                $path = $file->storeAs('uploads', $filename, 'public');
                $data['image'] = Storage::disk('public')->url($path);
                unset($data['image_file']);
            }
            
            $news->update($data);

            return response()->json([
                'success' => true,
                'message' => 'News article updated successfully',
                'data' => $news
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update news article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified news article.
     */
    public function destroy($id)
    {
        try {
            $news = News::findOrFail($id);
            $news->delete();

            return response()->json([
                'success' => true,
                'message' => 'News article deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete news article',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get published news for public viewing.
     */
    public function published(Request $request)
    {
        $query = News::published()->active();

        // Filter by category
        if ($request->has('category')) {
            $query->category($request->category);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        // Sort by published date
        $query->orderBy('published_date', 'desc');

        // Paginate
        $perPage = $request->get('per_page', 12);
        $news = $query->paginate($perPage);

        return response()->json($news);
    }
}
