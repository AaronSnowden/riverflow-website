<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Events</h1>
        <p class="text-neutral-600 mt-2">Add, edit, or delete events</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Add Event
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EventCard v-for="event in siteStore.events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script setup>
import { Plus } from 'lucide-vue-next'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>

