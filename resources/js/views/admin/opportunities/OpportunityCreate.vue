<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-2">
        <router-link
          :to="{ name: 'admin-opportunities' }"
          class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <ArrowLeft class="w-5 h-5 text-neutral-600" />
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">Create New Opportunity</h1>
      </div>
      <p class="text-neutral-600 ml-14">Add a new job, internship, or volunteer opportunity</p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Basic Information</h2>
        
        <div class="space-y-4">
          <!-- Title -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Title <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g., Senior Software Engineer"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Type and Status -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Type <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.type"
                required
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">Select type</option>
                <option value="job">Job</option>
                <option value="internship">Internship</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.description"
              required
              rows="4"
              placeholder="Describe the opportunity..."
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Requirements & Responsibilities -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Details</h2>
        
        <div class="space-y-4">
          <!-- Requirements -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Requirements
            </label>
            <textarea
              v-model="form.requirements"
              rows="4"
              placeholder="List the requirements..."
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>

          <!-- Responsibilities -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Responsibilities
            </label>
            <textarea
              v-model="form.responsibilities"
              rows="4"
              placeholder="List the responsibilities..."
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Job Details -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Job Details</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Location -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Location
            </label>
            <input
              v-model="form.location"
              type="text"
              placeholder="e.g., Nairobi, Kenya"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Employment Type -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Employment Type
            </label>
            <select
              v-model="form.employment_type"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <!-- Experience Level -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Experience Level
            </label>
            <select
              v-model="form.experience_level"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="">Select level</option>
              <option value="entry">Entry Level</option>
              <option value="mid">Mid Level</option>
              <option value="senior">Senior Level</option>
            </select>
          </div>

          <!-- Salary Range -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Salary Range
            </label>
            <input
              v-model="form.salary_range"
              type="text"
              placeholder="e.g., $50,000 - $70,000"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Positions Available -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Positions Available
            </label>
            <input
              v-model.number="form.positions_available"
              type="number"
              min="1"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Deadline -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Application Deadline
            </label>
            <input
              v-model="form.deadline"
              type="date"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Contact Email -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Contact Email
            </label>
            <input
              v-model="form.contact_email"
              type="email"
              placeholder="email@example.com"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Contact Phone -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Contact Phone
            </label>
            <input
              v-model="form.contact_phone"
              type="tel"
              placeholder="+254 XXX XXX XXX"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>

          <!-- Application Link -->
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 mb-2">
              Application Link (URL)
            </label>
            <input
              v-model="form.application_link"
              type="url"
              placeholder="https://example.com/apply"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex items-center justify-end space-x-4 pb-8">
        <router-link
          :to="{ name: 'admin-opportunities' }"
          class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
        >
          Cancel
        </router-link>
        <button
          type="submit"
          :disabled="submitting"
          class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center"
        >
          <Save class="w-4 h-4 mr-2" />
          {{ submitting ? 'Creating...' : 'Create Opportunity' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Save } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()

const form = ref({
  title: '',
  type: '',
  description: '',
  requirements: '',
  responsibilities: '',
  location: '',
  employment_type: '',
  experience_level: '',
  salary_range: '',
  deadline: '',
  contact_email: '',
  contact_phone: '',
  application_link: '',
  status: 'active',
  positions_available: 1,
  skills: [],
  benefits: []
})

const submitting = ref(false)

const handleSubmit = async () => {
  submitting.value = true
  try {
    await axios.post('/api/admin/opportunities', form.value)
    
    alert('Opportunity created successfully!')
    router.push({ name: 'admin-opportunities' })
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to create opportunity'
    const validationErrors = error.response?.data?.errors
    
    if (validationErrors) {
      const errorList = Object.values(validationErrors).flat().join('\n')
      alert(`Validation errors:\n${errorList}`)
    } else {
      alert(errorMessage)
    }
    
    console.error('Create error:', error)
  } finally {
    submitting.value = false
  }
}
</script>
