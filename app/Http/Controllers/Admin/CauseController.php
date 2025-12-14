<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCauseRequest;
use App\Http\Requests\UpdateCauseRequest;
use App\Http\Resources\CauseResource;
use App\Models\Cause;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CauseController extends Controller
{
    /**
     * Display a listing of causes.
     */
    public function index(Request $request)
    {
        $query = Cause::query();

        // Search by title or description
        if ($request->has('search') && $request->search) {
            $query->search($request->search);
        }

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Filter by urgency
        if ($request->has('urgency') && $request->urgency) {
            $query->urgency($request->urgency);
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        // Get all or paginate
        if ($request->get('paginate', true)) {
            $perPage = $request->get('per_page', 15);
            $causes = $query->paginate($perPage);
            return CauseResource::collection($causes);
        }

        $causes = $query->get();
        return CauseResource::collection($causes);
    }

    /**
     * Store a newly created cause.
     */
    public function store(StoreCauseRequest $request)
    {
        try {
            $data = $request->validated();

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $path = $image->store('causes', 'public');
                $data['image'] = $path;
            }

            // Parse JSON fields if they're strings
            if (isset($data['impact']) && is_string($data['impact'])) {
                $data['impact'] = json_decode($data['impact'], true);
            }

            if (isset($data['donation_tiers']) && is_string($data['donation_tiers'])) {
                $data['donation_tiers'] = json_decode($data['donation_tiers'], true);
            }

            $cause = Cause::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Cause created successfully',
                'data' => new CauseResource($cause)
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create cause',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified cause.
     */
    public function show($id)
    {
        try {
            // Try to find by ID first, then by slug
            $cause = is_numeric($id) 
                ? Cause::findOrFail($id) 
                : Cause::where('slug', $id)->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => new CauseResource($cause)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Cause not found'
            ], 404);
        }
    }

    /**
     * Update the specified cause.
     */
    public function update(UpdateCauseRequest $request, $id)
    {
        try {
            $cause = Cause::findOrFail($id);
            $data = $request->validated();

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($cause->image && Storage::disk('public')->exists($cause->image)) {
                    Storage::disk('public')->delete($cause->image);
                }

                $image = $request->file('image');
                $path = $image->store('causes', 'public');
                $data['image'] = $path;
            }

            // Parse JSON fields if they're strings
            if (isset($data['impact']) && is_string($data['impact'])) {
                $data['impact'] = json_decode($data['impact'], true);
            }

            if (isset($data['donation_tiers']) && is_string($data['donation_tiers'])) {
                $data['donation_tiers'] = json_decode($data['donation_tiers'], true);
            }

            $cause->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Cause updated successfully',
                'data' => new CauseResource($cause)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update cause',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified cause.
     */
    public function destroy($id)
    {
        try {
            $cause = Cause::findOrFail($id);

            // Delete associated image
            if ($cause->image && Storage::disk('public')->exists($cause->image)) {
                Storage::disk('public')->delete($cause->image);
            }

            $cause->delete();

            return response()->json([
                'success' => true,
                'message' => 'Cause deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete cause',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get causes statistics.
     */
    public function statistics()
    {
        try {
            $total = Cause::count();
            $active = Cause::active()->count();
            $inactive = Cause::inactive()->count();
            $completed = Cause::completed()->count();
            $totalGoal = Cause::sum('goal_amount');
            $totalRaised = Cause::sum('raised_amount');

            return response()->json([
                'success' => true,
                'data' => [
                    'total' => $total,
                    'active' => $active,
                    'inactive' => $inactive,
                    'completed' => $completed,
                    'totalGoal' => (float) $totalGoal,
                    'totalRaised' => (float) $totalRaised,
                    'progressPercentage' => $totalGoal > 0 ? round(($totalRaised / $totalGoal) * 100, 2) : 0,
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cause status.
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:active,inactive,completed'
        ]);

        try {
            $cause = Cause::findOrFail($id);
            $cause->update(['status' => $request->status]);

            return response()->json([
                'success' => true,
                'message' => 'Status updated successfully',
                'data' => new CauseResource($cause)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update status',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cause amounts (goal and raised).
     */
    public function updateAmounts(Request $request, $id)
    {
        $request->validate([
            'goal_amount' => 'nullable|numeric|min:0',
            'raised_amount' => 'nullable|numeric|min:0'
        ]);

        try {
            $cause = Cause::findOrFail($id);
            
            $data = [];
            if ($request->has('goal_amount')) {
                $data['goal_amount'] = $request->goal_amount;
            }
            if ($request->has('raised_amount')) {
                $data['raised_amount'] = $request->raised_amount;
            }

            $cause->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Amounts updated successfully',
                'data' => new CauseResource($cause)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update amounts',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active causes for public viewing.
     */
    public function publicCauses(Request $request)
    {
        $query = Cause::active();

        // Filter by category
        if ($request->has('category') && $request->category) {
            $query->category($request->category);
        }

        // Filter by urgency
        if ($request->has('urgency') && $request->urgency) {
            $query->urgency($request->urgency);
        }

        // Sort
        $sortBy = $request->get('sort_by', 'created_at');
        $sortOrder = $request->get('sort_order', 'desc');
        $query->orderBy($sortBy, $sortOrder);

        $causes = $query->get();
        return CauseResource::collection($causes);
    }
}
