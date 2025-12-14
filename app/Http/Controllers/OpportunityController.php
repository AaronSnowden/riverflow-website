<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OpportunityController extends Controller
{
    /**
     * Display a listing of all opportunities (admin).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $query = Opportunity::query();

        // Filter by type
        if ($request->has('type') && $request->type !== 'all') {
            $query->ofType($request->type);
        }

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%");
            });
        }

        $opportunities = $query->orderBy('created_at', 'desc')->get();

        return response()->json($opportunities);
    }

    /**
     * Display a listing of active opportunities (public).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function active()
    {
        $opportunities = Opportunity::active()
            ->upcoming()
            ->orderBy('deadline', 'asc')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($opportunities);
    }

    /**
     * Store a newly created opportunity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'type' => 'required|in:job,internship,volunteer',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:255',
            'experience_level' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'application_link' => 'nullable|url|max:255',
            'status' => 'nullable|in:active,closed,draft',
            'positions_available' => 'nullable|integer|min:1',
            'skills' => 'nullable|array',
            'benefits' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $opportunity = Opportunity::create([
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'description' => $request->description,
                'requirements' => $request->requirements,
                'responsibilities' => $request->responsibilities,
                'type' => $request->type,
                'location' => $request->location,
                'employment_type' => $request->employment_type,
                'experience_level' => $request->experience_level,
                'salary_range' => $request->salary_range,
                'deadline' => $request->deadline,
                'contact_email' => $request->contact_email,
                'contact_phone' => $request->contact_phone,
                'application_link' => $request->application_link,
                'status' => $request->status ?? 'active',
                'positions_available' => $request->positions_available ?? 1,
                'skills' => $request->skills,
                'benefits' => $request->benefits,
            ]);

            return response()->json([
                'message' => 'Opportunity created successfully',
                'data' => $opportunity
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Opportunity creation failed', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
            ]);
            
            return response()->json([
                'message' => 'Failed to create opportunity',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified opportunity.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $opportunity = Opportunity::find($id);

        if (!$opportunity) {
            return response()->json([
                'message' => 'Opportunity not found'
            ], 404);
        }

        return response()->json($opportunity);
    }

    /**
     * Update the specified opportunity.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $opportunity = Opportunity::find($id);

        if (!$opportunity) {
            return response()->json([
                'message' => 'Opportunity not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'requirements' => 'nullable|string',
            'responsibilities' => 'nullable|string',
            'type' => 'sometimes|required|in:job,internship,volunteer',
            'location' => 'nullable|string|max:255',
            'employment_type' => 'nullable|string|max:255',
            'experience_level' => 'nullable|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'deadline' => 'nullable|date',
            'contact_email' => 'nullable|email|max:255',
            'contact_phone' => 'nullable|string|max:255',
            'application_link' => 'nullable|url|max:255',
            'status' => 'nullable|in:active,closed,draft',
            'positions_available' => 'nullable|integer|min:1',
            'skills' => 'nullable|array',
            'benefits' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $opportunity->update($request->all());

            return response()->json([
                'message' => 'Opportunity updated successfully',
                'data' => $opportunity
            ]);

        } catch (\Exception $e) {
            \Log::error('Opportunity update failed', [
                'error' => $e->getMessage(),
                'id' => $id,
            ]);
            
            return response()->json([
                'message' => 'Failed to update opportunity',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified opportunity.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $opportunity = Opportunity::find($id);

        if (!$opportunity) {
            return response()->json([
                'message' => 'Opportunity not found'
            ], 404);
        }

        try {
            $opportunity->delete();

            return response()->json([
                'message' => 'Opportunity deleted successfully'
            ]);

        } catch (\Exception $e) {
            \Log::error('Opportunity deletion failed', [
                'error' => $e->getMessage(),
                'id' => $id,
            ]);
            
            return response()->json([
                'message' => 'Failed to delete opportunity',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
