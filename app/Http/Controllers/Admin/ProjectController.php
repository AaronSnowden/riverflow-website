<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of projects with filtering, search, and pagination.
     */
    public function index(Request $request): JsonResponse
    {
        $query = Project::query();

        // Search by name or description
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Filter by status
        if ($request->has('status')) {
            $query->byStatus($request->status);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 15);
        $projects = $query->paginate($perPage);

        return response()->json([
            'data' => ProjectResource::collection($projects->items()),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
                'last_page' => $projects->lastPage(),
            ]
        ]);
    }

    /**
     * Store a newly created project.
     */
    public function store(StoreProjectRequest $request): JsonResponse
    {
        $data = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project = Project::create($data);

        return response()->json([
            'message' => 'Project created successfully',
            'data' => new ProjectResource($project)
        ], 201);
    }

    /**
     * Display the specified project.
     */
    public function show(string $id): JsonResponse
    {
        $project = Project::where('id', $id)
            ->orWhere('slug', $id)
            ->firstOrFail();

        return response()->json([
            'data' => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified project.
     */
    public function update(UpdateProjectRequest $request, string $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        $data = $request->validated();

        // Handle image upload
        if ($request->hasFile('image')) {
            // Delete old image
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($data);

        return response()->json([
            'message' => 'Project updated successfully',
            'data' => new ProjectResource($project)
        ]);
    }

    /**
     * Remove the specified project (soft delete).
     */
    public function destroy(string $id): JsonResponse
    {
        $project = Project::findOrFail($id);

        // Delete image
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }

        $project->delete();

        return response()->json([
            'message' => 'Project deleted successfully'
        ]);
    }

    /**
     * Get project statistics.
     */
    public function statistics(): JsonResponse
    {
        return response()->json([
            'data' => [
                'total' => Project::count(),
                'active' => Project::byStatus('active')->count(),
                'completed' => Project::byStatus('completed')->count(),
                'paused' => Project::byStatus('paused')->count(),
                'cancelled' => Project::byStatus('cancelled')->count(),
            ]
        ]);
    }

    /**
     * Update project status.
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $request->validate([
            'status' => 'required|in:active,completed,paused,cancelled'
        ]);

        $project = Project::findOrFail($id);
        $project->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Project status updated successfully',
            'data' => new ProjectResource($project)
        ]);
    }

    /**
     * Get active projects for public display.
     */
    public function publicProjects(Request $request): JsonResponse
    {
        $query = Project::byStatus('active');

        // Search
        if ($request->has('search')) {
            $query->search($request->search);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Pagination
        $perPage = $request->get('per_page', 12);
        $projects = $query->paginate($perPage);

        return response()->json([
            'data' => ProjectResource::collection($projects->items()),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'per_page' => $projects->perPage(),
                'total' => $projects->total(),
                'last_page' => $projects->lastPage(),
            ]
        ]);
    }
}
