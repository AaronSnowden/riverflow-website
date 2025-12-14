<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Opportunity extends Model
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
        'requirements',
        'responsibilities',
        'type',
        'location',
        'employment_type',
        'experience_level',
        'salary_range',
        'deadline',
        'contact_email',
        'contact_phone',
        'application_link',
        'status',
        'positions_available',
        'skills',
        'benefits',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'deadline' => 'date',
        'skills' => 'array',
        'benefits' => 'array',
        'positions_available' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'deleted_at',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($opportunity) {
            if (empty($opportunity->slug)) {
                $opportunity->slug = Str::slug($opportunity->title);
            }
        });

        static::updating(function ($opportunity) {
            if ($opportunity->isDirty('title') && empty($opportunity->slug)) {
                $opportunity->slug = Str::slug($opportunity->title);
            }
        });
    }

    /**
     * Scope a query to only include active opportunities.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include opportunities of a specific type.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $type
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOfType($query, $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to only include opportunities with upcoming deadlines.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUpcoming($query)
    {
        return $query->where('deadline', '>=', now())
                    ->orWhereNull('deadline');
    }

    /**
     * Check if the opportunity deadline has passed.
     *
     * @return bool
     */
    public function isExpired()
    {
        if (!$this->deadline) {
            return false;
        }
        
        return $this->deadline->isPast();
    }

    /**
     * Check if the opportunity is currently open for applications.
     *
     * @return bool
     */
    public function isOpen()
    {
        return $this->status === 'active' && !$this->isExpired();
    }
}
