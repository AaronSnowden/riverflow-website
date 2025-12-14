<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Add authorization logic later
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Handle JSON strings from frontend FormData
        if ($this->has('objectives') && is_string($this->objectives)) {
            $this->merge([
                'objectives' => json_decode($this->objectives, true)
            ]);
        }

        if ($this->has('impact') && is_string($this->impact)) {
            $this->merge([
                'impact' => json_decode($this->impact, true)
            ]);
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $projectId = $this->route('id');

        return [
            'name' => 'sometimes|required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:projects,slug,' . $projectId,
            'description' => 'sometimes|required|string|max:500',
            'full_description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'status' => 'sometimes|required|in:active,completed,paused,cancelled',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'location' => 'nullable|string|max:255',
            'beneficiaries' => 'nullable|integer|min:0',
            'objectives' => 'nullable|array',
            'objectives.*' => 'string',
            'impact' => 'nullable|array',
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'name.required' => 'The project name is required.',
            'description.required' => 'A short description is required.',
            'description.max' => 'The description must not exceed 500 characters.',
            'status.required' => 'The project status is required.',
            'status.in' => 'The status must be one of: active, completed, paused, cancelled.',
            'image.image' => 'The file must be an image.',
            'image.mimes' => 'The image must be a file of type: jpeg, png, jpg, gif, webp.',
            'image.max' => 'The image size must not exceed 2MB.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
        ];
    }
}
