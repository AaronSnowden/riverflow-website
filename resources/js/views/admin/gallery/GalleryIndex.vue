<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Manage Gallery</h1>
        <p class="text-neutral-600 mt-2">Upload, organize, and manage gallery images</p>
      </div>
      <router-link :to="{ name: 'admin-gallery-upload' }" class="btn-primary">
        <Upload class="w-5 h-5 mr-2" />
        Upload Image
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
              placeholder="Search gallery by title or category..."
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
            <option value="Training">Training</option>
            <option value="Activities">Activities</option>
            <option value="Events">Events</option>
          </select>
        </div>
      </div>
    </div>

    <!-- View Toggle and Stats -->
    <div class="mb-6 flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 rounded-md font-medium transition-colors text-sm',
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
      
      <div class="flex items-center space-x-2 bg-white border border-neutral-200 rounded-md p-1">
        <button
          @click="viewMode = 'grid'"
          :class="[
            'p-2 rounded transition-colors',
            viewMode === 'grid' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'
          ]"
          title="Grid View"
        >
          <Grid class="w-4 h-4" />
        </button>
        <button
          @click="viewMode = 'list'"
          :class="[
            'p-2 rounded transition-colors',
            viewMode === 'list' ? 'bg-primary text-white' : 'text-neutral-600 hover:bg-neutral-100'
          ]"
          title="List View"
        >
          <List class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Grid View -->
    <div v-else-if="viewMode === 'grid' && filteredGallery.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="item in filteredGallery"
        :key="item.id"
        class="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
      >
        <!-- Image -->
        <div class="relative aspect-square bg-neutral-200 overflow-hidden">
          <img
            v-if="item.image"
            :src="getImageUrl(item)"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="$event.target.style.display='none'"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <ImageIcon class="w-12 h-12 text-neutral-400" />
          </div>
          
          <!-- Overlay on Hover -->
          <div class="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <div class="flex items-center space-x-2 w-full">
              <router-link
                :to="{ name: 'admin-gallery-view', params: { id: item.id } }"
                class="flex-1 px-3 py-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-md hover:bg-white/30 transition-colors text-center"
              >
                <Eye class="w-4 h-4 inline mr-1" />
                View
              </router-link>
              <router-link
                :to="{ name: 'admin-gallery-edit', params: { id: item.id } }"
                class="flex-1 px-3 py-2 text-sm font-medium text-white bg-white/20 backdrop-blur-sm rounded-md hover:bg-white/30 transition-colors text-center"
              >
                <Edit class="w-4 h-4 inline mr-1" />
                Edit
              </router-link>
              <button
                @click="confirmDelete(item)"
                class="px-3 py-2 text-sm font-medium text-white bg-red-600/80 backdrop-blur-sm rounded-md hover:bg-red-700 transition-colors"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="p-4">
          <h3 class="font-semibold text-neutral-900 mb-1 line-clamp-2">{{ item.title }}</h3>
          <div class="flex items-center justify-between text-sm">
            <span
              :class="[
                'px-2 py-1 rounded text-xs font-medium',
                getCategoryColor(item.category)
              ]"
            >
              {{ item.category }}
            </span>
            <span class="text-neutral-500 text-xs">{{ formatDate(item.date) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else-if="viewMode === 'list' && filteredGallery.length > 0" class="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div class="divide-y divide-neutral-200">
        <div
          v-for="item in filteredGallery"
          :key="item.id"
          class="p-4 hover:bg-neutral-50 transition-colors"
        >
          <div class="flex items-center space-x-4">
            <!-- Thumbnail -->
            <div class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-200">
              <img
                v-if="item.image"
                :src="getImageUrl(item)"
                :alt="item.title"
                class="w-full h-full object-cover"
                @error="$event.target.style.display='none'"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <ImageIcon class="w-8 h-8 text-neutral-400" />
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold text-neutral-900 mb-1">{{ item.title }}</h3>
              <div class="flex items-center space-x-4 text-sm text-neutral-600">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-medium',
                    getCategoryColor(item.category)
                  ]"
                >
                  {{ item.category }}
                </span>
                <span class="flex items-center">
                  <Calendar class="w-4 h-4 mr-1" />
                  {{ formatDate(item.date) }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center space-x-2">
              <router-link
                :to="{ name: 'admin-gallery-view', params: { id: item.id } }"
                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                title="View"
              >
                <Eye class="w-5 h-5" />
              </router-link>
              <router-link
                :to="{ name: 'admin-gallery-edit', params: { id: item.id } }"
                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                title="Edit"
              >
                <Edit class="w-5 h-5" />
              </router-link>
              <button
                @click="confirmDelete(item)"
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

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
      <ImageIcon class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-neutral-900 mb-2">No images found</h3>
      <p class="text-neutral-600 mb-6">
        {{ searchQuery || filterCategory !== 'all' ? 'Try adjusting your filters' : 'Get started by uploading your first image' }}
      </p>
      <router-link :to="{ name: 'admin-gallery-upload' }" class="btn-primary">
        <Upload class="w-5 h-5 mr-2" />
        Upload Image
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Gallery Item?</h3>
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
import { ref, computed, onMounted } from 'vue'
import {
  Upload,
  Search,
  Grid,
  List,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Image as ImageIcon
} from 'lucide-vue-next'
import { useGalleryStore } from '@/stores/gallery'
import { useRouter } from 'vue-router'

const galleryStore = useGalleryStore();
const router = useRouter();

const searchQuery = ref('');
const filterCategory = ref('all');
const activeTab = ref('all');
const viewMode = ref('grid');
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const deleting = ref(false);

// Helper to get full image URL
const getImageUrl = (item) => {
  if (!item.image) return null;
  
  let imageUrl;
  // If image_url is provided, use it; otherwise construct from base URL
  if (item.image_url) {
    imageUrl = item.image_url;
  } else {
    // Fallback: construct URL from image path
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    imageUrl = `${baseUrl}/${item.image.replace(/^\//, '')}`;
  }
  
  console.log('Image URL for', item.title, ':', imageUrl);
  console.log('Raw item.image:', item.image);
  console.log('Raw item.image_url:', item.image_url);
  
  return imageUrl;
};

// Get loading state from store
const loading = computed(() => galleryStore.loading)

// Fetch gallery items on mount
onMounted(async () => {
  try {
    await galleryStore.fetchGalleryItems()
    console.log('Loaded gallery items:', galleryStore.allGalleryItems)
  } catch (error) {
    console.error('Failed to load gallery items:', error)
  }
})

// Compute counts for tabs
const tabs = computed(() => {
  const categoryCounts = galleryStore.allGalleryItems.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})

  return [
    { label: 'All', value: 'all', count: galleryStore.allGalleryItems.length },
    { label: 'Training', value: 'Training', count: categoryCounts['Training'] || 0 },
    { label: 'Activities', value: 'Activities', count: categoryCounts['Activities'] || 0 },
    { label: 'Events', value: 'Events', count: categoryCounts['Events'] || 0 }
  ]
})

// Filter gallery based on search, category, and tab
const filteredGallery = computed(() => {
  let items = [...galleryStore.allGalleryItems]

  // Filter by tab
  if (activeTab.value !== 'all') {
    items = items.filter(item => item.category === activeTab.value)
  }

  // Filter by category dropdown
  if (filterCategory.value !== 'all') {
    items = items.filter(item => item.category === filterCategory.value)
  }

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )
  }

  // Sort by date (newest first)
  items.sort((a, b) => {
    const dateA = a.date ? new Date(a.date) : new Date(0)
    const dateB = b.date ? new Date(b.date) : new Date(0)
    return dateB - dateA
  })

  return items
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
    month: 'short',
    day: 'numeric'
  })
}

const confirmDelete = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return
  
  deleting.value = true
  try {
    await galleryStore.deleteGalleryItem(itemToDelete.value.id)
    
    alert('Gallery item deleted successfully!')
    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to delete gallery item'
    alert(errorMessage)
    console.error('Delete error:', error)
  } finally {
    deleting.value = false
  }
}
</script>
