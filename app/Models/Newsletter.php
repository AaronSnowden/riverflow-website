<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Newsletter extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'pdf_file',
        'cover_image',
        'published_date',
        'status',
        'type',
        'category',
        'views',
        'downloads',
    ];

    protected $casts = [
        'published_date' => 'date',
        'views' => 'integer',
        'downloads' => 'integer',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($newsletter) {
            if (empty($newsletter->slug)) {
                $newsletter->slug = static::generateUniqueSlug($newsletter->title);
            }
        });

        static::updating(function ($newsletter) {
            if ($newsletter->isDirty('title') && empty($newsletter->slug)) {
                $newsletter->slug = static::generateUniqueSlug($newsletter->title);
            }
        });
    }

    /**
     * Generate a unique slug.
     */
    protected static function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $count = static::where('slug', 'like', "{$slug}%")->count();

        return $count ? "{$slug}-{$count}" : $slug;
    }

    /**
     * Scope for published newsletters.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope for draft newsletters.
     */
    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    /**
     * Scope for written newsletters.
     */
    public function scopeWritten($query)
    {
        return $query->where('type', 'written');
    }

    /**
     * Scope for PDF newsletters.
     */
    public function scopePdf($query)
    {
        return $query->where('type', 'pdf');
    }

    /**
     * Scope for filtering by category.
     */
    public function scopeCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope for search.
     */
    public function scopeSearch($query, $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('description', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%");
        });
    }

    /**
     * Get PDF file URL.
     */
    public function getPdfUrlAttribute()
    {
        return $this->pdf_file ? asset('storage/' . $this->pdf_file) : null;
    }

    /**
     * Get cover image URL.
     */
    public function getCoverImageUrlAttribute()
    {
        return $this->cover_image ? asset('storage/' . $this->cover_image) : null;
    }

    /**
     * Increment views count.
     */
    public function incrementViews()
    {
        $this->increment('views');
    }

    /**
     * Increment downloads count.
     */
    public function incrementDownloads()
    {
        $this->increment('downloads');
    }
}
