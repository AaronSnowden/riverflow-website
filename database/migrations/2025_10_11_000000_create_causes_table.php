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
        Schema::create('causes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('full_description')->nullable();
            $table->string('image')->nullable();
            $table->decimal('goal_amount', 15, 2)->default(0);
            $table->decimal('raised_amount', 15, 2)->default(0);
            $table->string('currency', 3)->default('USD');
            $table->string('category')->nullable(); // Education, Resources, Technology, Empowerment, Infrastructure, Emergency
            $table->string('urgency')->default('Medium'); // Critical, High, Medium, Low
            $table->string('beneficiaries')->nullable();
            $table->string('status')->default('active'); // active, inactive, completed
            $table->json('impact')->nullable(); // Array of impact points
            $table->json('donation_tiers')->nullable(); // Array of donation tier objects
            $table->timestamps();
            $table->softDeletes();
            
            // Indexes for better query performance
            $table->index('slug');
            $table->index('category');
            $table->index('urgency');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('causes');
    }
};
