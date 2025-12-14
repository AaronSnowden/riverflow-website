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

    <!-- Opportunity Details -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-3">
            <router-link
              :to="{ name: 'admin-opportunities' }"
              class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </router-link>
            <div>
              <h1 class="text-3xl font-bold text-neutral-900">{{ opportunity.title }}</h1>
              <div class="flex items-center gap-2 mt-2">
                <span
                  class="px-3 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-emerald-100 text-emerald-800': opportunity.status === 'active',
                    'bg-amber-100 text-amber-800': opportunity.status === 'draft',
                    'bg-neutral-100 text-neutral-800': opportunity.status === 'closed'
                  }"
                >
                  {{ opportunity.status }}
                </span>
                <span class="px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                  {{ opportunity.type }}
                </span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <router-link
              :to="{ name: 'admin-opportunities-edit', params: { id: opportunity.id } }"
              class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark flex items-center"
            >
              <Edit class="w-4 h-4 mr-2" />
              Edit
            </router-link>
            <button
              @click="handleDelete"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 flex items-center"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Basic Information -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Description</h2>
        <p class="text-neutral-700 whitespace-pre-line">{{ opportunity.description }}</p>
      </div>

      <!-- Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <!-- Requirements -->
        <div v-if="opportunity.requirements" class="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">Requirements</h2>
          <p class="text-neutral-700 whitespace-pre-line">{{ opportunity.requirements }}</p>
        </div>

        <!-- Responsibilities -->
        <div v-if="opportunity.responsibilities" class="bg-white rounded-lg border border-neutral-200 p-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">Responsibilities</h2>
          <p class="text-neutral-700 whitespace-pre-line">{{ opportunity.responsibilities }}</p>
        </div>
      </div>

      <!-- Job Details -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Job Details</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="opportunity.location" class="flex items-start">
            <MapPin class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Location</p>
              <p class="text-neutral-900">{{ opportunity.location }}</p>
            </div>
          </div>

          <div v-if="opportunity.employment_type" class="flex items-start">
            <Briefcase class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Employment Type</p>
              <p class="text-neutral-900 capitalize">{{ opportunity.employment_type }}</p>
            </div>
          </div>

          <div v-if="opportunity.experience_level" class="flex items-start">
            <Award class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Experience Level</p>
              <p class="text-neutral-900 capitalize">{{ opportunity.experience_level }}</p>
            </div>
          </div>

          <div v-if="opportunity.salary_range" class="flex items-start">
            <DollarSign class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Salary Range</p>
              <p class="text-neutral-900">{{ opportunity.salary_range }}</p>
            </div>
          </div>

          <div v-if="opportunity.positions_available" class="flex items-start">
            <Users class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Positions Available</p>
              <p class="text-neutral-900">{{ opportunity.positions_available }}</p>
            </div>
          </div>

          <div v-if="opportunity.deadline" class="flex items-start">
            <Calendar class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Application Deadline</p>
              <p class="text-neutral-900">{{ formatDate(opportunity.deadline) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Contact Information</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-if="opportunity.contact_email" class="flex items-start">
            <Mail class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Email</p>
              <a :href="`mailto:${opportunity.contact_email}`" class="text-primary hover:underline">
                {{ opportunity.contact_email }}
              </a>
            </div>
          </div>

          <div v-if="opportunity.contact_phone" class="flex items-start">
            <Phone class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Phone</p>
              <a :href="`tel:${opportunity.contact_phone}`" class="text-primary hover:underline">
                {{ opportunity.contact_phone }}
              </a>
            </div>
          </div>

          <div v-if="opportunity.application_link" class="md:col-span-2 flex items-start">
            <ExternalLink class="w-5 h-5 text-neutral-400 mr-3 mt-0.5" />
            <div>
              <p class="text-sm font-medium text-neutral-700">Application Link</p>
              <a :href="opportunity.application_link" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
                {{ opportunity.application_link }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Metadata -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-xl font-semibold text-neutral-900 mb-4">Metadata</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-neutral-600">Created At</p>
            <p class="text-neutral-900 font-medium">{{ formatDate(opportunity.created_at) }}</p>
          </div>
          <div>
            <p class="text-neutral-600">Last Updated</p>
            <p class="text-neutral-900 font-medium">{{ formatDate(opportunity.updated_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Edit,
  Trash2,
  MapPin,
  Briefcase,
  Award,
  DollarSign,
  Users,
  Calendar,
  Mail,
  Phone,
  ExternalLink
} from 'lucide-vue-next'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const opportunity = ref(null)

onMounted(async () => {
  const oppId = parseInt(route.params.id)
  try {
    const response = await axios.get(`/api/admin/opportunities/${oppId}`)
    opportunity.value = response.data
  } catch (error) {
    console.error('Failed to load opportunity:', error)
    alert('Failed to load opportunity')
  } finally {
    loading.value = false
  }
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this opportunity? This action cannot be undone.')) {
    return
  }

  try {
    await axios.delete(`/api/admin/opportunities/${opportunity.value.id}`)
    alert('Opportunity deleted successfully!')
    router.push({ name: 'admin-opportunities' })
  } catch (error) {
    console.error('Failed to delete opportunity:', error)
    alert('Failed to delete opportunity')
  }
}
</script>
