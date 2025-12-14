<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Opportunities</h1>
        <p class="text-neutral-600 mt-2">Add, edit, or delete job postings and opportunities</p>
      </div>
      <router-link :to="{ name: 'admin-opportunities-create' }" class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add Opportunity
      </router-link>
    </div>

    <!-- Search and Filter -->
    <div class="mb-6 bg-white rounded-lg border border-neutral-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by title, description, or location..."
              class="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div class="flex space-x-2">
          <select
            v-model="filterType"
            class="flex-1 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="job">Job</option>
            <option value="internship">Internship</option>
            <option value="volunteer">Volunteer</option>
          </select>
          <select
            v-model="filterStatus"
            class="flex-1 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="closed">Closed</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Opportunities List -->
    <div v-else-if="filteredOpportunities.length > 0" class="space-y-4">
      <div
        v-for="opp in filteredOpportunities"
        :key="opp.id"
        class="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-2">
              <h3 class="text-xl font-bold text-neutral-900">{{ opp.title }}</h3>
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  getTypeColor(opp.type)
                ]"
              >
                {{ formatType(opp.type) }}
              </span>
              <span
                :class="[
                  'px-2 py-1 rounded text-xs font-medium',
                  getStatusColor(opp.status)
                ]"
              >
                {{ formatStatus(opp.status) }}
              </span>
            </div>
            <p class="text-neutral-600 mb-3 line-clamp-2">{{ opp.description }}</p>
            <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-500">
              <span v-if="opp.location" class="flex items-center">
                <MapPin class="w-4 h-4 mr-1" />
                {{ opp.location }}
              </span>
              <span v-if="opp.employment_type" class="flex items-center">
                <Briefcase class="w-4 h-4 mr-1" />
                {{ opp.employment_type }}
              </span>
              <span v-if="opp.deadline" class="flex items-center">
                <Calendar class="w-4 h-4 mr-1" />
                Deadline: {{ formatDate(opp.deadline) }}
              </span>
              <span class="flex items-center">
                <Users class="w-4 h-4 mr-1" />
                {{ opp.positions_available }} position(s)
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-2 ml-4">
            <router-link
              :to="{ name: 'admin-opportunities-view', params: { id: opp.id } }"
              class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
              title="View"
            >
              <Eye class="w-5 h-5" />
            </router-link>
            <router-link
              :to="{ name: 'admin-opportunities-edit', params: { id: opp.id } }"
              class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
              title="Edit"
            >
              <Edit class="w-5 h-5" />
            </router-link>
            <button
              @click="confirmDelete(opp)"
              class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
      <Briefcase class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-neutral-900 mb-2">No opportunities found</h3>
      <p class="text-neutral-600 mb-6">
        {{ searchQuery || filterType !== 'all' || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Get started by adding your first opportunity' }}
      </p>
      <router-link :to="{ name: 'admin-opportunities-create' }" class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add Opportunity
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Opportunity?</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete "{{ oppToDelete?.title }}"? This action cannot be undone.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              :disabled="deleting"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { Plus, Search, Eye, Edit, Trash2, Calendar, MapPin, Briefcase, Users } from 'lucide-vue-next'
import axios from 'axios'

const opportunities = ref([])
const loading = ref(true)
const searchQuery = ref('')
const filterType = ref('all')
const filterStatus = ref('all')
const showDeleteModal = ref(false)
const oppToDelete = ref(null)
const deleting = ref(false)

onMounted(async () => {
  await fetchOpportunities()
})

const fetchOpportunities = async () => {
  loading.value = true
  try {
    const response = await axios.get('/api/admin/opportunities')
    opportunities.value = response.data
  } catch (error) {
    console.error('Failed to fetch opportunities:', error)
    alert('Failed to load opportunities')
  } finally {
    loading.value = false
  }
}

const filteredOpportunities = computed(() => {
  let filtered = opportunities.value

  // Filter by type
  if (filterType.value !== 'all') {
    filtered = filtered.filter(opp => opp.type === filterType.value)
  }

  // Filter by status
  if (filterStatus.value !== 'all') {
    filtered = filtered.filter(opp => opp.status === filterStatus.value)
  }

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(opp =>
      opp.title.toLowerCase().includes(query) ||
      opp.description.toLowerCase().includes(query) ||
      (opp.location && opp.location.toLowerCase().includes(query))
    )
  }

  return filtered
})

const getTypeColor = (type) => {
  const colors = {
    job: 'bg-blue-100 text-blue-800',
    internship: 'bg-purple-100 text-purple-800',
    volunteer: 'bg-green-100 text-green-800'
  }
  return colors[type] || 'bg-neutral-100 text-neutral-800'
}

const getStatusColor = (status) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    closed: 'bg-red-100 text-red-800',
    draft: 'bg-yellow-100 text-yellow-800'
  }
  return colors[status] || 'bg-neutral-100 text-neutral-800'
}

const formatType = (type) => {
  return type.charAt(0).toUpperCase() + type.slice(1)
}

const formatStatus = (status) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const confirmDelete = (opp) => {
  oppToDelete.value = opp
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!oppToDelete.value) return

  deleting.value = true
  try {
    await axios.delete(`/api/admin/opportunities/${oppToDelete.value.id}`)
    
    // Remove from local array
    opportunities.value = opportunities.value.filter(o => o.id !== oppToDelete.value.id)
    
    alert('Opportunity deleted successfully!')
    showDeleteModal.value = false
    oppToDelete.value = null
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete opportunity'
    alert(errorMessage)
    console.error('Delete error:', error)
  } finally {
    deleting.value = false
  }
}
</script>
