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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('excerpt')->nullable();
            $table->text('content');
            $table->string('image')->nullable();
            $table->string('author')->nullable();
            $table->string('category')->default('internal'); // internal or external
            $table->string('status')->default('draft'); // draft or published
            $table->string('state')->default('active'); // active, inactive, or archived
            $table->date('published_date')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better query performance
            $table->index('slug');
            $table->index('category');
            $table->index('status');
            $table->index('state');
            $table->index('published_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
