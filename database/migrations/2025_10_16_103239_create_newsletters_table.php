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
        Schema::create('newsletters', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->longText('content')->nullable(); // For written newsletter
            $table->string('pdf_file')->nullable(); // For uploaded PDF
            $table->string('cover_image')->nullable();
            $table->date('published_date')->nullable();
            $table->string('status')->default('draft'); // draft, published
            $table->string('type')->default('written'); // written, pdf
            $table->string('category')->nullable();
            $table->integer('views')->default(0);
            $table->integer('downloads')->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('status');
            $table->index('type');
            $table->index('published_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('newsletters');
    }
};
