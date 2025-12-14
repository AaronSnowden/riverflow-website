<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!galleryItem" class="text-center py-12">
      <h2 class="text-2xl font-bold text-neutral-900 mb-4">Gallery Item Not Found</h2>
      <p class="text-neutral-600 mb-6">The gallery item you're looking for doesn't exist.</p>
      <router-link :to="{ name: 'admin-gallery' }" class="btn-primary">
        Back to Gallery
      </router-link>
    </div>

    <!-- Gallery Item Details -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <router-link
              :to="{ name: 'admin-gallery' }"
              class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </router-link>
            <h1 class="text-3xl font-bold text-neutral-900">Gallery Item Details</h1>
          </div>
          <p class="text-neutral-600 ml-14">View complete image information</p>
        </div>
        <div class="flex items-center space-x-3">
          <router-link
            :to="{ name: 'admin-gallery-edit', params: { id: galleryItem.id } }"
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

      <!-- Main Image Display -->
      <div class="bg-white rounded-lg border border-neutral-200 p-8 mb-6">
        <div class="max-w-3xl mx-auto">
          <div class="aspect-square rounded-lg overflow-hidden bg-neutral-100 shadow-lg">
            <img
              :src="getImageUrl(galleryItem)"
              :alt="galleryItem.title"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <!-- Image Information -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Basic Info Card -->
        <div class="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6">
          <div class="flex items-start justify-between mb-6">
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-neutral-900 mb-3">{{ galleryItem.title }}</h2>
              <div class="flex items-center space-x-3">
                <span
                  :class="['px-3 py-1 text-sm rounded font-medium', getCategoryColor(galleryItem.category)]"
                >
                  {{ galleryItem.category }}
                </span>
                <span class="text-sm text-neutral-500 flex items-center">
                  <Calendar class="w-4 h-4 mr-1" />
                  {{ formatDate(galleryItem.date) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description if available -->
          <div v-if="galleryItem.description" class="mb-6 pb-6 border-b border-neutral-200">
            <h3 class="text-sm font-medium text-neutral-500 mb-2">Description</h3>
            <p class="text-neutral-700">{{ galleryItem.description }}</p>
          </div>

          <!-- Alt Text if available -->
          <div v-if="galleryItem.altText" class="mb-6 pb-6 border-b border-neutral-200">
            <h3 class="text-sm font-medium text-neutral-500 mb-2">Alt Text</h3>
            <p class="text-neutral-700">{{ galleryItem.altText }}</p>
          </div>

          <!-- Image Details -->
          <div>
            <h3 class="text-sm font-medium text-neutral-500 mb-3">Image URL</h3>
            <div class="flex items-center space-x-2 bg-neutral-50 rounded-lg p-3">
              <code class="flex-1 text-sm text-neutral-700 break-all">{{ getImageUrl(galleryItem) }}</code>
              <button
                @click="copyImageUrl"
                class="p-2 text-neutral-600 hover:text-primary hover:bg-white rounded-md transition-colors"
                title="Copy URL"
              >
                <Copy class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Metadata Card -->
        <div class="space-y-6">
          <!-- Technical Info -->
          <div class="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
              <Info class="w-5 h-5 mr-2 text-primary" />
              Metadata
            </h3>
            <div class="space-y-3 text-sm">
              <div>
                <p class="text-neutral-500 mb-1">ID</p>
                <p class="font-mono text-neutral-900">{{ galleryItem.id }}</p>
              </div>
              <div class="pt-3 border-t border-neutral-200">
                <p class="text-neutral-500 mb-1">Category</p>
                <p class="text-neutral-900">{{ galleryItem.category }}</p>
              </div>
              <div class="pt-3 border-t border-neutral-200">
                <p class="text-neutral-500 mb-1">Date Added</p>
                <p class="text-neutral-900">{{ formatDate(galleryItem.date) }}</p>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="bg-white rounded-lg border border-neutral-200 p-6">
            <h3 class="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h3>
            <div class="space-y-2">
              <router-link
                :to="{ name: 'admin-gallery-edit', params: { id: galleryItem.id } }"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit Image
              </router-link>
              <button
                @click="copyImageUrl"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-neutral-700 bg-neutral-50 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
              >
                <Copy class="w-4 h-4 mr-2" />
                Copy Image URL
              </button>
              <button
                @click="handleDelete"
                class="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete Image
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Gallery Item?</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete "{{ galleryItem?.title }}"? This action cannot be undone.
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
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Edit, Trash2, Calendar, Copy, Info } from 'lucide-vue-next'
import { useGalleryStore } from '@/stores/gallery'

const route = useRoute()
const router = useRouter()
const galleryStore = useGalleryStore()

const loading = computed(() => galleryStore.loadingCurrent)
const galleryItem = computed(() => galleryStore.currentGalleryItem)
const showDeleteModal = ref(false)
const deleting = ref(false)

// Helper to get full image URL
const getImageUrl = (item) => {
  if (!item || !item.image) return null;
  if (item.image_url) return item.image_url;
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  return `${baseUrl}/${item.image.replace(/^\//, '')}`;
}

onMounted(async () => {
  const itemId = parseInt(route.params.id)
  try {
    await galleryStore.fetchGalleryItemById(itemId)
  } catch (error) {
    console.error('Failed to load gallery item:', error)
  }
})

const getCategoryColor = (category) => {
  const colors = {
    'Training': 'bg-blue-100 text-blue-800',
    'Activities': 'bg-green-100 text-green-800',
    'Events': 'bg-purple-100 text-purple-800'
  }
  return colors[category] || 'bg-neutral-100 text-neutral-800'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const copyImageUrl = async () => {
  try {
    await navigator.clipboard.writeText(getImageUrl(galleryItem.value))
    alert('Image URL copied to clipboard!')
  } catch (error) {
    console.error('Failed to copy:', error)
    alert('Failed to copy URL')
  }
}

const handleDelete = () => {
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!galleryItem.value) return
  
  deleting.value = true
  try {
    await galleryStore.deleteGalleryItem(galleryItem.value.id)
    
    alert('Gallery item deleted successfully!')
    router.push({ name: 'admin-gallery' })
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete gallery item'
    alert(errorMessage)
    console.error('Delete error:', error)
  } finally {
    deleting.value = false
    showDeleteModal.value = false
  }
}
</script>
