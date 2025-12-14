<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class GalleryController extends Controller
{
    /**
     * Display a listing of all gallery items (admin).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $gallery = Gallery::orderBy('order', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($gallery);
    }

    /**
     * Display a listing of published gallery items (public).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function published()
    {
        $gallery = Gallery::published()
            ->ordered()
            ->get();

        return response()->json($gallery);
    }

    /**
     * Get gallery items by category (public).
     *
     * @param  string  $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function byCategory($category)
    {
        $gallery = Gallery::published()
            ->byCategory($category)
            ->ordered()
            ->get();

        return response()->json($gallery);
    }

    /**
     * Store a newly created gallery item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:10240', // 10MB max
            'category' => 'required|string|max:255',
            'date' => 'nullable|date',
            'photographer' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'nullable|in:draft,published',
            'order' => 'nullable|integer',
            'tags' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            // Handle image upload
            $imageData = $this->handleImageUpload($request->file('image'));

            // Create gallery item
            $gallery = Gallery::create([
                'title' => $request->title,
                'description' => $request->description,
                'image' => $imageData['path'],
                'category' => $request->category,
                'date' => $request->date,
                'photographer' => $request->photographer,
                'location' => $request->location,
                'status' => $request->status ?? 'published',
                'order' => $request->order ?? 0,
                'tags' => $request->tags,
                'file_name' => $imageData['file_name'],
                'file_size' => $imageData['file_size'],
                'mime_type' => $imageData['mime_type'],
                'width' => $imageData['width'],
                'height' => $imageData['height'],
            ]);

            return response()->json([
                'message' => 'Gallery item created successfully',
                'data' => $gallery
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Gallery creation failed', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to create gallery item',
                'error' => $e->getMessage(),
                'details' => config('app.debug') ? [
                    'file' => $e->getFile(),
                    'line' => $e->getLine(),
                ] : null
            ], 500);
        }
    }

    /**
     * Display the specified gallery item.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return response()->json([
                'message' => 'Gallery item not found'
            ], 404);
        }

        return response()->json($gallery);
    }

    /**
     * Update the specified gallery item.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return response()->json([
                'message' => 'Gallery item not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,gif,webp|max:10240',
            'category' => 'sometimes|required|string|max:255',
            'date' => 'nullable|date',
            'photographer' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'nullable|in:draft,published',
            'order' => 'nullable|integer',
            'tags' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $updateData = $request->only([
                'title',
                'description',
                'category',
                'date',
                'photographer',
                'location',
                'status',
                'order',
                'tags'
            ]);

            // Handle new image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image
                if ($gallery->image) {
                    $this->deleteImage($gallery->image);
                }

                // Upload new image
                $imageData = $this->handleImageUpload($request->file('image'));
                $updateData['image'] = $imageData['path'];
                $updateData['file_name'] = $imageData['file_name'];
                $updateData['file_size'] = $imageData['file_size'];
                $updateData['mime_type'] = $imageData['mime_type'];
                $updateData['width'] = $imageData['width'];
                $updateData['height'] = $imageData['height'];
            }

            $gallery->update($updateData);

            return response()->json([
                'message' => 'Gallery item updated successfully',
                'data' => $gallery
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to update gallery item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified gallery item.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $gallery = Gallery::find($id);

        if (!$gallery) {
            return response()->json([
                'message' => 'Gallery item not found'
            ], 404);
        }

        try {
            // Delete image file
            if ($gallery->image) {
                $this->deleteImage($gallery->image);
            }

            $gallery->delete();

            return response()->json([
                'message' => 'Gallery item deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete gallery item',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all unique categories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function categories()
    {
        $categories = Gallery::published()
            ->distinct()
            ->pluck('category')
            ->filter()
            ->values();

        return response()->json($categories);
    }

    /**
     * Bulk upload multiple images.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function bulkUpload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,jpg,png,gif,webp|max:10240',
            'category' => 'required|string|max:255',
            'date' => 'nullable|date',
            'photographer' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'status' => 'nullable|in:draft,published',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $uploaded = [];
        $failed = [];

        foreach ($request->file('images') as $index => $image) {
            try {
                $imageData = $this->handleImageUpload($image);
                
                $gallery = Gallery::create([
                    'title' => $request->title ?? "Gallery Image " . ($index + 1),
                    'description' => $request->description,
                    'image' => $imageData['path'],
                    'category' => $request->category,
                    'date' => $request->date,
                    'photographer' => $request->photographer,
                    'location' => $request->location,
                    'status' => $request->status ?? 'published',
                    'order' => 0,
                    'file_name' => $imageData['file_name'],
                    'file_size' => $imageData['file_size'],
                    'mime_type' => $imageData['mime_type'],
                    'width' => $imageData['width'],
                    'height' => $imageData['height'],
                ]);

                $uploaded[] = $gallery;

            } catch (\Exception $e) {
                $failed[] = [
                    'file' => $image->getClientOriginalName(),
                    'error' => $e->getMessage()
                ];
            }
        }

        return response()->json([
            'message' => count($uploaded) . ' images uploaded successfully',
            'uploaded' => $uploaded,
            'failed' => $failed
        ], 201);
    }

    /**
     * Handle image upload and return image data.
     *
     * @param  \Illuminate\Http\UploadedFile  $image
     * @return array
     */
    private function handleImageUpload($image)
    {
        // Get file info BEFORE moving (important!)
        $originalName = $image->getClientOriginalName();
        $fileSize = $image->getSize();
        $mimeType = $image->getMimeType();
        
        // Generate unique filename
        $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
        
        // Store in public/uploads directory
        $path = $image->move(public_path('uploads'), $filename);

        // Get image dimensions from the moved file
        $imageSize = getimagesize($path);

        return [
            'path' => 'uploads/' . $filename,
            'file_name' => $originalName,
            'file_size' => $fileSize,
            'mime_type' => $mimeType,
            'width' => $imageSize[0] ?? null,
            'height' => $imageSize[1] ?? null,
        ];
    }

    /**
     * Delete image file from storage.
     *
     * @param  string  $imagePath
     * @return void
     */
    private function deleteImage($imagePath)
    {
        $fullPath = public_path($imagePath);
        
        if (file_exists($fullPath)) {
            unlink($fullPath);
        }
    }
}
