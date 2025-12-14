<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!opportunity" class="text-center py-12">
      <h2 class="text-2xl font-bold text-neutral-900 mb-4">Opportunity Not Found</h2>
      <p class="text-neutral-600 mb-6">The opportunity you're looking for doesn't exist.</p>
      <router-link :to="{ name: 'admin-opportunities' }" class="btn-primary">
        Back to Opportunities
      </router-link>
    </div>

    <!-- Edit Form -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-2">
          <router-link
            :to="{ name: 'admin-opportunities' }"
            class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <ArrowLeft class="w-5 h-5 text-neutral-600" />
          </router-link>
          <h1 class="text-3xl font-bold text-neutral-900">Edit Opportunity</h1>
        </div>
        <p class="text-neutral-600 ml-14">Update opportunity information</p>
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
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Requirements & Responsibilities -->
        <div class="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">Details</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Requirements
              </label>
              <textarea
                v-model="form.requirements"
                rows="4"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Responsibilities
              </label>
              <textarea
                v-model="form.responsibilities"
                rows="4"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Job Details -->
        <div class="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">Job Details</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Location</label>
              <input v-model="form.location" type="text" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Employment Type</label>
              <select v-model="form.employment_type" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="">Select type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Experience Level</label>
              <select v-model="form.experience_level" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary">
                <option value="">Select level</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Salary Range</label>
              <input v-model="form.salary_range" type="text" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Positions Available</label>
              <input v-model.number="form.positions_available" type="number" min="1" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Application Deadline</label>
              <input v-model="form.deadline" type="date" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
          </div>
        </div>

        <!-- Contact Information -->
        <div class="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Contact Email</label>
              <input v-model="form.contact_email" type="email" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>

            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">Contact Phone</label>
              <input v-model="form.contact_phone" type="tel" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>

            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-neutral-700 mb-2">Application Link (URL)</label>
              <input v-model="form.application_link" type="url" class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary" />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 pb-8">
          <router-link :to="{ name: 'admin-opportunities' }" class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50">
            Cancel
          </router-link>
          <button type="submit" :disabled="submitting" class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center">
            <Save class="w-4 h-4 mr-2" />
            {{ submitting ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Save } from 'lucide-vue-next'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const opportunity = ref(null)
const submitting = ref(false)

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
  positions_available: 1
})

onMounted(async () => {
  const oppId = parseInt(route.params.id)
  try {
    const response = await axios.get(`/api/admin/opportunities/${oppId}`)
    opportunity.value = response.data
    
    // Populate form
    form.value = {
      title: opportunity.value.title || '',
      type: opportunity.value.type || '',
      description: opportunity.value.description || '',
      requirements: opportunity.value.requirements || '',
      responsibilities: opportunity.value.responsibilities || '',
      location: opportunity.value.location || '',
      employment_type: opportunity.value.employment_type || '',
      experience_level: opportunity.value.experience_level || '',
      salary_range: opportunity.value.salary_range || '',
      deadline: opportunity.value.deadline || '',
      contact_email: opportunity.value.contact_email || '',
      contact_phone: opportunity.value.contact_phone || '',
      application_link: opportunity.value.application_link || '',
      status: opportunity.value.status || 'active',
      positions_available: opportunity.value.positions_available || 1
    }
  } catch (error) {
    console.error('Failed to load opportunity:', error)
    alert('Failed to load opportunity')
  } finally {
    loading.value = false
  }
})

const handleSubmit = async () => {
  if (!opportunity.value) return
  
  submitting.value = true
  try {
    await axios.put(`/api/admin/opportunities/${opportunity.value.id}`, form.value)
    
    alert('Opportunity updated successfully!')
    router.push({ name: 'admin-opportunities' })
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update opportunity'
    const validationErrors = error.response?.data?.errors
    
    if (validationErrors) {
      const errorList = Object.values(validationErrors).flat().join('\n')
      alert(`Validation errors:\n${errorList}`)
    } else {
      alert(errorMessage)
    }
    
    console.error('Update error:', error)
  } finally {
    submitting.value = false
  }
}
</script>
