<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Gallery</h1>
        <p class="text-neutral-600 mt-2">Add, edit, or delete gallery images</p>
      </div>
      <button class="btn-primary">
        <Plus class="w-5 h-5 mr-2" />
        Upload Image
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="image in siteStore.gallery" :key="image.id" class="bg-white rounded-lg border border-neutral-200 overflow-hidden">
        <div class="aspect-square bg-neutral-200 flex items-center justify-center">
          <ImageIcon class="w-12 h-12 text-neutral-400" />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-sm">{{ image.title }}</h3>
          <p class="text-xs text-neutral-500 mt-1">{{ image.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Plus, Image as ImageIcon } from 'lucide-vue-next'
import { useSiteStore } from '@/stores/site'

const siteStore = useSiteStore()
</script>

