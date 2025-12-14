<?php

namespace App\Http\Controllers;

use App\Models\TeamMember;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TeamController extends Controller
{
    /**
     * Display a listing of all team members (Admin).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = TeamMember::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('position', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortBy = $request->get('sort_by', 'order');
        $sortOrder = $request->get('sort_order', 'asc');
        
        if ($sortBy === 'order') {
            $query->ordered();
        } else {
            $query->orderBy($sortBy, $sortOrder);
        }

        // Pagination
        $perPage = $request->get('per_page', 15);
        $teamMembers = $query->paginate($perPage);

        return response()->json($teamMembers);
    }

    /**
     * Get active team members for public display.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function published()
    {
        $teamMembers = TeamMember::active()
            ->ordered()
            ->get();

        return response()->json($teamMembers);
    }

    /**
     * Store a newly created team member.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'social_links' => 'nullable|json',
            'status' => 'nullable|in:active,inactive',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('team', $imageName, 'public');
            $data['image'] = $imagePath;
        }

        // Parse social_links if it's a JSON string
        if ($request->has('social_links') && is_string($request->social_links)) {
            $data['social_links'] = json_decode($request->social_links, true);
        }

        $teamMember = TeamMember::create($data);

        return response()->json([
            'message' => 'Team member created successfully',
            'data' => $teamMember
        ], 201);
    }

    /**
     * Display the specified team member.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $teamMember = TeamMember::find($id);

        if (!$teamMember) {
            return response()->json([
                'message' => 'Team member not found'
            ], 404);
        }

        return response()->json($teamMember);
    }

    /**
     * Update the specified team member.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $teamMember = TeamMember::find($id);

        if (!$teamMember) {
            return response()->json([
                'message' => 'Team member not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'position' => 'sometimes|required|string|max:255',
            'bio' => 'nullable|string',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'social_links' => 'nullable|json',
            'status' => 'nullable|in:active,inactive',
            'order' => 'nullable|integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');

        // Handle new image upload
        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($teamMember->image && Storage::disk('public')->exists($teamMember->image)) {
                Storage::disk('public')->delete($teamMember->image);
            }

            $image = $request->file('image');
            $imageName = time() . '_' . uniqid() . '.' . $image->getClientOriginalExtension();
            $imagePath = $image->storeAs('team', $imageName, 'public');
            $data['image'] = $imagePath;
        }

        // Parse social_links if it's a JSON string
        if ($request->has('social_links') && is_string($request->social_links)) {
            $data['social_links'] = json_decode($request->social_links, true);
        }

        $teamMember->update($data);

        return response()->json([
            'message' => 'Team member updated successfully',
            'data' => $teamMember
        ]);
    }

    /**
     * Remove the specified team member.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $teamMember = TeamMember::find($id);

        if (!$teamMember) {
            return response()->json([
                'message' => 'Team member not found'
            ], 404);
        }

        // Delete associated image
        if ($teamMember->image && Storage::disk('public')->exists($teamMember->image)) {
            Storage::disk('public')->delete($teamMember->image);
        }

        $teamMember->delete();

        return response()->json([
            'message' => 'Team member deleted successfully'
        ]);
    }

    /**
     * Get team statistics.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function statistics()
    {
        $stats = [
            'total' => TeamMember::count(),
            'active' => TeamMember::where('status', 'active')->count(),
            'inactive' => TeamMember::where('status', 'inactive')->count(),
        ];

        return response()->json($stats);
    }
}
