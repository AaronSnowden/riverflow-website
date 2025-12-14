<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gallery', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('image'); // URL/path to the uploaded image
            $table->string('category')->default('General'); // Training, Events, Community, Projects, etc.
            $table->date('date')->nullable(); // Date when photo was taken
            $table->string('photographer')->nullable(); // Name of photographer
            $table->string('location')->nullable(); // Where photo was taken
            $table->string('status')->default('published'); // draft, published
            $table->integer('order')->default(0); // For manual sorting
            $table->json('tags')->nullable(); // Additional tags for search/filter
            
            // Image metadata
            $table->string('file_name')->nullable(); // Original file name
            $table->string('file_size')->nullable(); // File size in bytes
            $table->string('mime_type')->nullable(); // Image MIME type
            $table->integer('width')->nullable(); // Image width in pixels
            $table->integer('height')->nullable(); // Image height in pixels
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better query performance
            $table->index('category');
            $table->index('status');
            $table->index('date');
            $table->index('order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gallery');
    }
};
