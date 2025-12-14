<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!event" class="text-center py-12">
      <h2 class="text-2xl font-bold text-neutral-900 mb-4">Event Not Found</h2>
      <p class="text-neutral-600 mb-6">The event you're looking for doesn't exist.</p>
      <router-link :to="{ name: 'admin-events' }" class="btn-primary">
        Back to Events
      </router-link>
    </div>

    <!-- Event Details -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <router-link
              :to="{ name: 'admin-events' }"
              class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </router-link>
            <h1 class="text-3xl font-bold text-neutral-900">Event Details</h1>
          </div>
          <p class="text-neutral-600 ml-14">View complete event information</p>
        </div>
        <div class="flex items-center space-x-3">
          <router-link
            :to="{ name: 'admin-events-edit', params: { id: displayEvent.id } }"
            class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark flex items-center"
          >
            <Edit class="w-4 h-4 mr-2" />
            Edit Event
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

      <!-- Event Image -->
      <div v-if="displayEvent.image" class="mb-8 rounded-lg overflow-hidden">
        <img :src="displayEvent.image" :alt="displayEvent.title" class="w-full h-96 object-cover" />
      </div>

      <!-- Basic Info Card -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-3 mb-3">
              <h2 class="text-2xl font-bold text-neutral-900">{{ displayEvent.title }}</h2>
              <span
                :class="['px-3 py-1 text-sm rounded font-medium', getCategoryColor(displayEvent.category)]"
              >
                {{ displayEvent.category }}
              </span>
              <span
                :class="['px-3 py-1 text-sm rounded font-medium', getStatusBadge(displayEvent.date).class]"
              >
                {{ getStatusBadge(displayEvent.date).label }}
              </span>
            </div>
            <p class="text-neutral-600 text-lg">{{ displayEvent.description }}</p>
          </div>
        </div>

        <!-- Meta Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-neutral-200">
          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <Calendar class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Date</p>
              <p class="text-base font-semibold text-neutral-900">
                {{ formatDateRange(displayEvent.date, displayEvent.endDate) }}
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <Clock class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Time</p>
              <p class="text-base font-semibold text-neutral-900">{{ displayEvent.time }}</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <MapPin class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Location</p>
              <p class="text-base font-semibold text-neutral-900">{{ displayEvent.location }}</p>
              <p v-if="displayEvent.venue" class="text-sm text-neutral-600">{{ displayEvent.venue }}</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <Users class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Capacity</p>
              <p class="text-base font-semibold text-neutral-900">{{ displayEvent.capacity }} attendees</p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <CalendarCheck class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Registration Deadline</p>
              <p class="text-base font-semibold text-neutral-900">
                {{ formatDate(displayEvent.registrationDeadline) }}
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-3">
            <div class="p-2 bg-primary-50 rounded-lg">
              <DollarSign class="w-5 h-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-neutral-500">Registration Fee</p>
              <p class="text-base font-semibold text-neutral-900">{{ displayEvent.fee }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Description -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
          <FileText class="w-5 h-5 mr-2 text-primary" />
          Full Description
        </h3>
        <div class="prose max-w-none" v-html="displayEvent.fullDescription"></div>
      </div>

      <!-- Speakers -->
      <div v-if="displayEvent.speakers && displayEvent.speakers.length > 0" class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
          <Mic class="w-5 h-5 mr-2 text-primary" />
          Speakers
        </h3>
        <ul class="space-y-2">
          <li
            v-for="(speaker, index) in displayEvent.speakers"
            :key="index"
            class="flex items-center space-x-2 text-neutral-700"
          >
            <div class="w-2 h-2 bg-primary rounded-full"></div>
            <span>{{ speaker }}</span>
          </li>
        </ul>
      </div>

      <!-- Agenda -->
      <div v-if="displayEvent.agenda && displayEvent.agenda.length > 0" class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
        <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
          <ListChecks class="w-5 h-5 mr-2 text-primary" />
          Agenda
        </h3>
        <ul class="space-y-2">
          <li
            v-for="(item, index) in displayEvent.agenda"
            :key="index"
            class="flex items-start space-x-3 text-neutral-700"
          >
            <span class="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary rounded-full flex items-center justify-center text-sm font-medium">
              {{ index + 1 }}
            </span>
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- Metadata -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h3 class="text-xl font-semibold text-neutral-900 mb-4 flex items-center">
          <Info class="w-5 h-5 mr-2 text-primary" />
          Additional Information
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-neutral-500">Event ID</p>
            <p class="font-mono text-neutral-900">{{ displayEvent.id }}</p>
          </div>
          <div>
            <p class="text-neutral-500">URL Slug</p>
            <p class="font-mono text-neutral-900">{{ displayEvent.slug }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Event?</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete "{{ event?.title }}"? This action cannot be undone.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              @click="confirmDelete"
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
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  Edit,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  CalendarCheck,
  DollarSign,
  FileText,
  Mic,
  ListChecks,
  Info
} from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'

const route = useRoute()
const router = useRouter()
const eventsStore = useEventsStore()

const loading = ref(true)
const event = ref(null)
const showDeleteModal = ref(false)
const deleting = ref(false)

onMounted(async () => {
  const eventId = route.params.id
  
  try {
    // Fetch event from API
    await eventsStore.fetchEventById(eventId)
    event.value = eventsStore.currentEvent
  } catch (error) {
    console.error('Failed to fetch event:', error)
  } finally {
    loading.value = false
  }
})

// Computed properties for displaying data (convert snake_case to camelCase for display)
const displayEvent = computed(() => {
  if (!event.value) return null
  
  return {
    ...event.value,
    endDate: event.value.end_date,
    fullDescription: event.value.full_description,
    registrationDeadline: event.value.registration_deadline,
  }
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
    return { label: 'Past Event', class: 'bg-neutral-100 text-neutral-600' }
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
    month: 'long',
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

const handleDelete = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  deleting.value = true
  try {
    // Call the store action to delete the event
    await eventsStore.deleteEvent(route.params.id)
    
    alert('Event deleted successfully!')
    router.push({ name: 'admin-events' })
  } catch (error) {
    console.error('Failed to delete event:', error)
    alert('Failed to delete event. Please try again.')
    deleting.value = false
    showDeleteModal.value = false
  }
}
</script>
