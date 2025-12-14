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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('full_description')->nullable();
            $table->string('image')->nullable();
            
            // Date and Time fields
            $table->date('date');
            $table->date('end_date')->nullable();
            $table->string('time')->nullable();
            
            // Location fields
            $table->string('location')->nullable();
            $table->string('venue')->nullable();
            
            // Event details
            $table->string('category')->nullable(); // Workshop, Conference, Symposium, Forum, Launch Event
            $table->integer('capacity')->nullable();
            $table->date('registration_deadline')->nullable();
            $table->string('fee')->nullable();
            
            // JSON fields for arrays
            $table->json('speakers')->nullable();
            $table->json('agenda')->nullable();
            
            // Status and state
            $table->string('status')->default('draft'); // draft, published
            $table->string('state')->default('active'); // active, inactive, archived, cancelled
            
            // Metadata
            $table->string('organizer')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('registration_link')->nullable();
            
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better query performance
            $table->index('slug');
            $table->index('date');
            $table->index('category');
            $table->index('status');
            $table->index('state');
            $table->index('registration_deadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
