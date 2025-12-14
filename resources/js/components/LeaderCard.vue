<template>
  <div class="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow">
    <div class="h-64 bg-neutral-200 flex items-center justify-center">
      <User class="w-20 h-20 text-neutral-400" />
    </div>
    <div class="p-6 text-center">
      <h3 class="text-xl font-bold text-neutral-900 mb-1">{{ leader.name }}</h3>
      <p class="text-primary font-medium text-sm mb-3">{{ leader.role }}</p>
      <p class="text-neutral-600 text-sm">{{ leader.bio }}</p>
    </div>
  </div>
</template>

<script setup>
import { User } from 'lucide-vue-next'

defineProps({
  leader: {
    type: Object,
    required: true
  }
})
</script>

