<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCauseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Add authorization logic if needed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $causeId = $this->route('cause');

        return [
            'title' => 'sometimes|required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('causes', 'slug')->ignore($causeId),
            ],
            'description' => 'sometimes|required|string',
            'full_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'goal_amount' => 'sometimes|required|numeric|min:0',
            'raised_amount' => 'nullable|numeric|min:0',
            'currency' => 'nullable|string|size:3',
            'category' => 'nullable|string|in:Education,Resources,Technology,Empowerment,Infrastructure,Emergency',
            'urgency' => 'nullable|string|in:Critical,High,Medium,Low',
            'beneficiaries' => 'nullable|string|max:255',
            'status' => 'nullable|string|in:active,inactive,completed',
            'impact' => 'nullable',
            'donation_tiers' => 'nullable',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The cause title is required.',
            'description.required' => 'The cause description is required.',
            'goal_amount.required' => 'The goal amount is required.',
            'goal_amount.numeric' => 'The goal amount must be a valid number.',
            'goal_amount.min' => 'The goal amount must be at least 0.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, webp.',
            'image.max' => 'The image must not be larger than 2MB.',
            'category.in' => 'The selected category is invalid.',
            'urgency.in' => 'The selected urgency level is invalid.',
            'status.in' => 'The selected status is invalid.',
            'currency.size' => 'The currency code must be exactly 3 characters.',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Parse JSON strings to arrays if needed
        if ($this->has('impact')) {
            if (is_string($this->impact)) {
                $decoded = json_decode($this->impact, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $this->merge(['impact' => $decoded]);
                }
            }
        }

        if ($this->has('donation_tiers')) {
            if (is_string($this->donation_tiers)) {
                $decoded = json_decode($this->donation_tiers, true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $this->merge(['donation_tiers' => $decoded]);
                }
            }
        }
    }
}
