<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EventController extends Controller
{
    /**
     * Display a listing of events.
     */
    public function index(Request $request)
    {
        $query = Event::query();

        // Filter by status
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        // Filter by state
        if ($request->has('state')) {
            $query->where('state', $request->state);
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Filter by time period (upcoming/past)
        if ($request->has('period')) {
            if ($request->period === 'upcoming') {
                $query->upcoming();
            } elseif ($request->period === 'past') {
                $query->past();
            }
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

        // Order by date
        $query->orderBy('date', $request->get('order', 'asc'));

        // Pagination
        $perPage = $request->get('per_page', 15);
        $events = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    /**
     * Get published events for public display.
     */
    public function published(Request $request)
    {
        $query = Event::published()->active();

        // Filter by time period if requested
        if ($request->has('period')) {
            if ($request->period === 'upcoming') {
                $query->upcoming();
            } elseif ($request->period === 'past') {
                $query->past();
            }
        }

        // Filter by category
        if ($request->has('category')) {
            $query->where('category', $request->category);
        }

        // Order by date
        $query->orderBy('date', 'asc');

        $perPage = $request->get('per_page', 12);
        $events = $query->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }

    /**
     * Store a newly created event.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|unique:events,slug',
            'description' => 'nullable|string',
            'full_description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:date',
            'time' => 'nullable|string',
            'location' => 'nullable|string',
            'venue' => 'nullable|string',
            'category' => 'nullable|string',
            'capacity' => 'nullable|integer|min:0',
            'registration_deadline' => 'nullable|date',
            'fee' => 'nullable|string',
            'speakers' => 'nullable|array',
            'agenda' => 'nullable|array',
            'status' => 'nullable|in:draft,published',
            'state' => 'nullable|in:active,inactive,archived,cancelled',
            'organizer' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'registration_link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

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

        $event = Event::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Event created successfully',
            'data' => $event,
        ], 201);
    }

    /**
     * Display the specified event.
     */
    public function show($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $event,
        ]);
    }

    /**
     * Update the specified event.
     */
    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|unique:events,slug,' . $id,
            'description' => 'nullable|string',
            'full_description' => 'nullable|string',
            'image' => 'nullable|string',
            'image_file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'date' => 'sometimes|required|date',
            'end_date' => 'nullable|date|after_or_equal:date',
            'time' => 'nullable|string',
            'location' => 'nullable|string',
            'venue' => 'nullable|string',
            'category' => 'nullable|string',
            'capacity' => 'nullable|integer|min:0',
            'registration_deadline' => 'nullable|date',
            'fee' => 'nullable|string',
            'speakers' => 'nullable|array',
            'agenda' => 'nullable|array',
            'status' => 'nullable|in:draft,published',
            'state' => 'nullable|in:active,inactive,archived,cancelled',
            'organizer' => 'nullable|string',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'registration_link' => 'nullable|url',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();
        
        // Handle image file upload if provided
        if ($request->hasFile('image_file')) {
            // Delete old image if exists
            if ($event->image && str_contains($event->image, 'storage/uploads/')) {
                $oldPath = str_replace('/storage/', '', parse_url($event->image, PHP_URL_PATH));
                Storage::disk('public')->delete($oldPath);
            }
            
            $file = $request->file('image_file');
            $extension = $file->getClientOriginalExtension();
            $filename = Str::uuid() . '.' . $extension;
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['image'] = Storage::disk('public')->url($path);
            unset($data['image_file']);
        }

        $event->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Event updated successfully',
            'data' => $event,
        ]);
    }

    /**
     * Remove the specified event.
     */
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
            ], 404);
        }

        $event->delete();

        return response()->json([
            'success' => true,
            'message' => 'Event deleted successfully',
        ]);
    }

    /**
     * Get event statistics.
     */
    public function statistics()
    {
        $stats = [
            'total' => Event::count(),
            'published' => Event::published()->count(),
            'draft' => Event::where('status', 'draft')->count(),
            'upcoming' => Event::upcoming()->published()->count(),
            'past' => Event::past()->published()->count(),
            'active' => Event::active()->count(),
        ];

        return response()->json([
            'success' => true,
            'data' => $stats,
        ]);
    }

    /**
     * Get events by category.
     */
    public function byCategory($category)
    {
        $events = Event::published()
            ->active()
            ->category($category)
            ->upcoming()
            ->orderBy('date', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $events,
        ]);
    }
}
