<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Events</h1>
        <p class="text-neutral-600 mt-2">Create, edit, and manage upcoming events</p>
      </div>
      <router-link :to="{ name: 'admin-events-create' }" class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add New Event
      </router-link>
    </div>

    <!-- Search and Filter Bar -->
    <div class="mb-6 bg-white rounded-lg border border-neutral-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="md:col-span-2">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search events by title, location, or category..."
              class="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div>
          <select
            v-model="filterCategory"
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">All Categories</option>
            <option value="Workshop">Workshop</option>
            <option value="Conference">Conference</option>
            <option value="Launch Event">Launch Event</option>
            <option value="Symposium">Symposium</option>
            <option value="Seminar">Seminar</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="mb-6 flex items-center space-x-4">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        :class="[
          'px-4 py-2 rounded-md font-medium transition-colors',
          activeTab === tab.value
            ? 'bg-primary text-white'
            : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200'
        ]"
      >
        {{ tab.label }}
        <span
          v-if="tab.count > 0"
          :class="[
            'ml-2 px-2 py-0.5 text-xs rounded-full',
            activeTab === tab.value
              ? 'bg-white text-primary'
              : 'bg-neutral-100 text-neutral-700'
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Events List -->
    <div v-else-if="filteredEvents.length > 0" class="space-y-4">
      <div
        v-for="event in filteredEvents"
        :key="event.id"
        class="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div class="flex flex-col md:flex-row">
          <!-- Event Image -->
          <div class="md:w-64 h-48 md:h-auto flex-shrink-0">
            <div v-if="event.image" class="w-full h-full bg-neutral-200">
              <img :src="event.image" :alt="event.title" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-full h-full bg-neutral-200 flex items-center justify-center">
              <Calendar class="w-12 h-12 text-neutral-400" />
            </div>
          </div>

          <!-- Event Content -->
          <div class="flex-1 p-6">
            <div class="flex items-start justify-between mb-3">
              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-semibold text-neutral-900">{{ event.title }}</h3>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded font-medium',
                      getCategoryColor(event.category)
                    ]"
                  >
                    {{ event.category }}
                  </span>
                  <span
                    :class="[
                      'px-2 py-1 text-xs rounded font-medium',
                      getStatusBadge(event.date).class
                    ]"
                  >
                    {{ getStatusBadge(event.date).label }}
                  </span>
                </div>
                <p class="text-sm text-neutral-600 mb-4 line-clamp-2">
                  {{ event.description }}
                </p>
              </div>
            </div>

            <!-- Event Meta Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-sm">
              <div class="flex items-center text-neutral-600">
                <Calendar class="w-4 h-4 mr-2 text-primary" />
                <span>{{ formatDateRange(event.date, event.endDate) }}</span>
              </div>
              <div class="flex items-center text-neutral-600">
                <Clock class="w-4 h-4 mr-2 text-primary" />
                <span>{{ event.time }}</span>
              </div>
              <div class="flex items-center text-neutral-600">
                <MapPin class="w-4 h-4 mr-2 text-primary" />
                <span class="line-clamp-1">{{ event.location }}</span>
              </div>
              <div class="flex items-center text-neutral-600">
                <Users class="w-4 h-4 mr-2 text-primary" />
                <span>Capacity: {{ event.capacity }} attendees</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center justify-between pt-4 border-t border-neutral-200">
              <div class="text-sm text-neutral-500">
                Registration deadline: {{ formatDate(event.registrationDeadline) }}
              </div>
              <div class="flex items-center space-x-2">
                <router-link
                  :to="{ name: 'admin-events-view', params: { id: event.id } }"
                  class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                  title="View Details"
                >
                  <Eye class="w-5 h-5" />
                </router-link>
                <router-link
                  :to="{ name: 'admin-events-edit', params: { id: event.id } }"
                  class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <Edit class="w-5 h-5" />
                </router-link>
                <button
                  @click="confirmDelete(event)"
                  class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <Trash2 class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
      <Calendar class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-neutral-900 mb-2">No events found</h3>
      <p class="text-neutral-600 mb-6">
        {{ searchQuery || filterCategory !== 'all' ? 'Try adjusting your filters' : 'Get started by creating your first event' }}
      </p>
      <router-link :to="{ name: 'admin-events-create' }" class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Create Event
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Event?</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete "{{ itemToDelete?.title }}"? This action cannot be undone.
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
import { ref, computed, onMounted, watch } from 'vue'
import { Plus, Search, Calendar, Clock, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'

const eventsStore = useEventsStore()
const { allEvents, loading, error } = storeToRefs(eventsStore)

const searchQuery = ref('')
const filterCategory = ref('all')
const activeTab = ref('all')
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const deleting = ref(false)

// Fetch events from API
const fetchEvents = async () => {
  const params = {}
  
  // Add period filter
  if (activeTab.value !== 'all') {
    params.period = activeTab.value
  }
  
  // Add category filter
  if (filterCategory.value !== 'all') {
    params.category = filterCategory.value
  }
  
  // Add search filter
  if (searchQuery.value) {
    params.search = searchQuery.value
  }
  
  try {
    await eventsStore.fetchEvents(params)
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// Compute counts for tabs
const upcomingCount = computed(() => {
  return eventsStore.upcomingEvents.length
})

const pastCount = computed(() => {
  return eventsStore.pastEvents.length
})

const tabs = computed(() => [
  { label: 'All', value: 'all', count: allEvents.value.length },
  { label: 'Upcoming', value: 'upcoming', count: upcomingCount.value },
  { label: 'Past', value: 'past', count: pastCount.value }
])

// Filter events - now handled by store and API
const filteredEvents = computed(() => {
  return allEvents.value
})

const getCategoryColor = (category) => {
  const colors = {
    'Workshop': 'bg-blue-100 text-blue-800',
    'Conference': 'bg-purple-100 text-purple-800',
    'Launch Event': 'bg-green-100 text-green-800',
    'Symposium': 'bg-orange-100 text-orange-800',
    'Seminar': 'bg-pink-100 text-pink-800'
  }
  return colors[category] || 'bg-neutral-100 text-neutral-800'
}

const getStatusBadge = (dateString) => {
  const eventDate = new Date(dateString)
  const now = new Date()
  const diffDays = Math.ceil((eventDate - now) / (1000 * 60 * 60 * 24))

  if (diffDays < 0) {
    return { label: 'Past', class: 'bg-neutral-100 text-neutral-600' }
  } else if (diffDays === 0) {
    return { label: 'Today', class: 'bg-red-100 text-red-800' }
  } else if (diffDays <= 7) {
    return { label: 'This Week', class: 'bg-yellow-100 text-yellow-800' }
  } else if (diffDays <= 30) {
    return { label: 'This Month', class: 'bg-green-100 text-green-800' }
  } else {
    return { label: 'Upcoming', class: 'bg-blue-100 text-blue-800' }
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatDateRange = (startDate, endDate) => {
  const start = formatDate(startDate)
  if (startDate === endDate || !endDate) {
    return start
  }
  return `${start} - ${formatDate(endDate)}`
}

const confirmDelete = (event) => {
  itemToDelete.value = event
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    await eventsStore.deleteEvent(itemToDelete.value.id)
    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (error) {
    console.error('Failed to delete event:', error)
    alert('Failed to delete event. Please try again.')
  } finally {
    deleting.value = false
  }
}

// Watch for filter changes and refetch
watch([activeTab, filterCategory], () => {
  fetchEvents()
})

// Debounced search
let searchTimeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchEvents()
  }, 500)
})

// Fetch events on mount
onMounted(() => {
  fetchEvents()
})
</script>
