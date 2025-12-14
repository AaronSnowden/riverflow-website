<template>
  <router-link
    :to="{ name: 'event-detail', params: { slug: event.slug } }"
    class="block group bg-white rounded-xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 border border-neutral-200"
  >
    <!-- Event Image -->
    <div class="relative h-48 overflow-hidden bg-neutral-200">
      <img
        v-if="event.image"
        :src="event.image"
        :alt="event.title"
        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <Calendar class="w-16 h-16 text-primary/40" />
      </div>
      
      <!-- Date Badge -->
      <div class="absolute top-4 left-4 bg-white rounded-lg shadow-lg px-3 py-2 text-center">
        <div class="text-2xl font-bold text-primary">{{ getDay(event.date) }}</div>
        <div class="text-xs text-neutral-600 uppercase font-medium">{{ getMonth(event.date) }}</div>
      </div>
    </div>
    
    <!-- Event Content -->
    <div class="p-6">
      <div class="flex items-center text-xs text-neutral-500 mb-3">
        <MapPin class="w-3.5 h-3.5 mr-1.5" />
        <span>{{ event.location.split(',')[0] }}</span>
      </div>
      <h3 class="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {{ event.title }}
      </h3>
      <p class="text-neutral-600 text-sm line-clamp-2 mb-4">{{ event.description }}</p>
      
      <!-- Learn More Button -->
      <div class="text-sm font-semibold text-primary group-hover:text-primary-700 inline-flex items-center">
        Learn More
        <svg class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { Calendar, MapPin } from 'lucide-vue-next'

defineProps({
  event: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getDay = (dateString) => {
  return new Date(dateString).getDate()
}

const getMonth = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short'
  })
}
</script>

