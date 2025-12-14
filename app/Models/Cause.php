<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Cause extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'full_description',
        'image',
        'goal_amount',
        'raised_amount',
        'currency',
        'category',
        'urgency',
        'beneficiaries',
        'status',
        'impact',
        'donation_tiers',
    ];

    protected $casts = [
        'goal_amount' => 'decimal:2',
        'raised_amount' => 'decimal:2',
        'impact' => 'array',
        'donation_tiers' => 'array',
    ];

    protected $appends = [
        'progress_percentage',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Auto-generate slug from title when creating
        static::creating(function ($cause) {
            if (empty($cause->slug)) {
                $cause->slug = Str::slug($cause->title);
                
                // Ensure unique slug
                $count = 1;
                $originalSlug = $cause->slug;
                while (static::where('slug', $cause->slug)->exists()) {
                    $cause->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });

        // Update slug when title changes
        static::updating(function ($cause) {
            if ($cause->isDirty('title') && empty($cause->slug)) {
                $cause->slug = Str::slug($cause->title);
                
                // Ensure unique slug (excluding current record)
                $count = 1;
                $originalSlug = $cause->slug;
                while (static::where('slug', $cause->slug)->where('id', '!=', $cause->id)->exists()) {
                    $cause->slug = $originalSlug . '-' . $count;
                    $count++;
                }
            }
        });
    }

    /**
     * Get the progress percentage.
     */
    public function getProgressPercentageAttribute()
    {
        if ($this->goal_amount <= 0) {
            return 0;
        }

        $percentage = ($this->raised_amount / $this->goal_amount) * 100;
        return min(round($percentage, 2), 100);
    }

    /**
     * Scope a query to only include active causes.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive causes.
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Scope a query to only include completed causes.
     */
    public function scopeCompleted($query)
    {
        return $query->where('status', 'completed');
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to filter by urgency.
     */
    public function scopeUrgency($query, $urgency)
    {
        return $query->where('urgency', $urgency);
    }

    /**
     * Scope a query to search by title or description.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('full_description', 'like', "%{$search}%");
        });
    }

    /**
     * Get the route key for the model.
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Check if the cause has reached its goal.
     */
    public function hasReachedGoal()
    {
        return $this->raised_amount >= $this->goal_amount;
    }

    /**
     * Get the remaining amount to reach goal.
     */
    public function getRemainingAmountAttribute()
    {
        $remaining = $this->goal_amount - $this->raised_amount;
        return max($remaining, 0);
    }
}
