<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'slug',
        'description',
        'full_description',
        'image',
        'date',
        'end_date',
        'time',
        'location',
        'venue',
        'category',
        'capacity',
        'registration_deadline',
        'fee',
        'speakers',
        'agenda',
        'status',
        'state',
        'organizer',
        'contact_email',
        'contact_phone',
        'registration_link',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'date',
        'end_date' => 'date',
        'registration_deadline' => 'date',
        'speakers' => 'array',
        'agenda' => 'array',
        'capacity' => 'integer',
        'deleted_at' => 'datetime',
    ];

    /**
     * Boot method to auto-generate slug
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($event) {
            if (empty($event->slug)) {
                $event->slug = Str::slug($event->title);
                
                // Ensure slug is unique
                $originalSlug = $event->slug;
                $count = 1;
                while (static::where('slug', $event->slug)->exists()) {
                    $event->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });

        static::updating(function ($event) {
            if ($event->isDirty('title') && !$event->isDirty('slug')) {
                $event->slug = Str::slug($event->title);
                
                // Ensure slug is unique
                $originalSlug = $event->slug;
                $count = 1;
                while (static::where('slug', $event->slug)->where('id', '!=', $event->id)->exists()) {
                    $event->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });
    }

    /**
     * Scope a query to only include published events.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to only include active events.
     */
    public function scopeActive($query)
    {
        return $query->where('state', 'active');
    }

    /**
     * Scope a query to only include upcoming events.
     */
    public function scopeUpcoming($query)
    {
        return $query->where('date', '>=', now()->toDateString());
    }

    /**
     * Scope a query to only include past events.
     */
    public function scopePast($query)
    {
        return $query->where('date', '<', now()->toDateString());
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Check if the event is upcoming.
     */
    public function isUpcoming(): bool
    {
        return $this->date >= now()->toDateString();
    }

    /**
     * Check if the event is past.
     */
    public function isPast(): bool
    {
        return $this->date < now()->toDateString();
    }

    /**
     * Check if registration is still open.
     */
    public function isRegistrationOpen(): bool
    {
        if (!$this->registration_deadline) {
            return true;
        }
        
        return $this->registration_deadline >= now()->toDateString();
    }

    /**
     * Get the event duration in days.
     */
    public function getDurationInDays(): int
    {
        if (!$this->end_date) {
            return 1;
        }
        
        return $this->date->diffInDays($this->end_date) + 1;
    }
}
