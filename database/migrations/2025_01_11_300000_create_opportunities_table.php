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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->string('type'); // job, internship, volunteer
            $table->string('location')->nullable();
            $table->string('employment_type')->nullable(); // full-time, part-time, contract, remote
            $table->string('experience_level')->nullable(); // entry, mid, senior
            $table->string('salary_range')->nullable();
            $table->date('deadline')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->string('application_link')->nullable();
            $table->string('status')->default('active'); // active, closed, draft
            $table->integer('positions_available')->default(1);
            $table->json('skills')->nullable();
            $table->json('benefits')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes
            $table->index('slug');
            $table->index('type');
            $table->index('status');
            $table->index('deadline');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('opportunities');
    }
};
