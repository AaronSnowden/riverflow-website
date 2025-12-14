<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CauseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'fullDescription' => $this->full_description,
            'image' => $this->image ? asset('storage/' . $this->image) : null,
            'goalAmount' => (float) $this->goal_amount,
            'raisedAmount' => (float) $this->raised_amount,
            'remainingAmount' => $this->remaining_amount,
            'currency' => $this->currency,
            'category' => $this->category,
            'urgency' => $this->urgency,
            'beneficiaries' => $this->beneficiaries,
            'status' => $this->status,
            'impact' => $this->impact ?? [],
            'donationTiers' => $this->donation_tiers ?? [],
            'progressPercentage' => $this->progress_percentage,
            'hasReachedGoal' => $this->hasReachedGoal(),
            'createdAt' => $this->created_at?->toISOString(),
            'updatedAt' => $this->updated_at?->toISOString(),
        ];
    }
}
