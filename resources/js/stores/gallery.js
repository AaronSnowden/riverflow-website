import { defineStore } from 'pinia'
import { galleryApi } from '@/api/gallery'

export const useGalleryStore = defineStore('gallery', {
  state: () => ({
    // All gallery items
    allGalleryItems: [],
    
    // Current active gallery item (for detail view)
    currentGalleryItem: null,
    
    // Loading states
    loading: false,
    loadingCurrent: false,
    uploading: false,
    
    // Error states
    error: null,
    currentError: null,
    
    // Filter state
    currentFilter: 'all', // 'all', 'published', 'draft'
    currentCategory: 'all',
    
    // Categories list
    categories: [],
    
    // Upload progress
    uploadProgress: 0,
  }),

  getters: {
    /**
     * Get filtered gallery items based on current filters
     */
    filteredGalleryItems: (state) => {
      let items = state.allGalleryItems

      // Filter by status
      if (state.currentFilter !== 'all') {
        items = items.filter(item => item.status === state.currentFilter)
      }

      // Filter by category
      if (state.currentCategory !== 'all') {
        items = items.filter(item => item.category === state.currentCategory)
      }

      return items
    },

    /**
     * Get published gallery items only
     */
    publishedGalleryItems: (state) => {
      return state.allGalleryItems.filter(item => item.status === 'published')
    },

    /**
     * Get draft gallery items only
     */
    draftGalleryItems: (state) => {
      return state.allGalleryItems.filter(item => item.status === 'draft')
    },

    /**
     * Get gallery item by ID
     */
    getGalleryItemById: (state) => (id) => {
      return state.allGalleryItems.find(item => item.id === id)
    },

    /**
     * Get gallery items by category
     */
    getGalleryItemsByCategory: (state) => (category) => {
      return state.allGalleryItems.filter(item => item.category === category)
    },

    /**
     * Get count by status
     */
    getCountByStatus: (state) => (status) => {
      if (status === 'all') return state.allGalleryItems.length
      return state.allGalleryItems.filter(item => item.status === status).length
    },

    /**
     * Get count by category
     */
    getCountByCategory: (state) => (category) => {
      if (category === 'all') return state.allGalleryItems.length
      return state.allGalleryItems.filter(item => item.category === category).length
    },

    /**
     * Check if there are any gallery items
     */
    hasGalleryItems: (state) => {
      return state.allGalleryItems.length > 0
    },

    /**
     * Get total count
     */
    totalCount: (state) => {
      return state.allGalleryItems.length
    },
  },

  actions: {
    /**
     * Fetch all gallery items with optional filters
     */
    async fetchGalleryItems(params = {}) {
      this.loading = true
      this.error = null

      try {
        const queryParams = { ...params }
        if (!queryParams.status && this.currentFilter !== 'all') {
          queryParams.status = this.currentFilter
        }
        if (!queryParams.category && this.currentCategory !== 'all') {
          queryParams.category = this.currentCategory
        }

        const response = await galleryApi.getAll(queryParams)
        
        console.log('[Gallery Store Admin] Raw API response:', response)
        console.log('[Gallery Store Admin] response.data:', response.data)
        console.log('[Gallery Store Admin] Is response an array?', Array.isArray(response))
        console.log('[Gallery Store Admin] Is response.data an array?', Array.isArray(response.data))
        
        // The API client returns response.data directly, so response itself is the data
        if (Array.isArray(response)) {
          this.allGalleryItems = response
        } else if (response.data && Array.isArray(response.data)) {
          this.allGalleryItems = response.data
        } else if (Array.isArray(response.data)) {
          this.allGalleryItems = response.data
        } else {
          console.warn('[Gallery Store Admin] Unexpected response format:', response)
          this.allGalleryItems = []
        }

        console.log('[Gallery Store Admin] Set allGalleryItems to:', this.allGalleryItems)
        return this.allGalleryItems
      } catch (err) {
        console.error('Failed to fetch gallery items:', err)
        this.error = err.message || 'Failed to load gallery items'
        this.allGalleryItems = []
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch published gallery items (for public pages)
     */
    async fetchPublishedGalleryItems(params = {}) {
      this.loading = true
      this.error = null

      try {
        const response = await galleryApi.getPublished(params)
        
        console.log('[Gallery Store] Raw API response:', response)
        console.log('[Gallery Store] response.data:', response.data)
        console.log('[Gallery Store] Is response an array?', Array.isArray(response))
        console.log('[Gallery Store] Is response.data an array?', Array.isArray(response.data))
        
        // The API client returns response.data directly, so response itself is the data
        if (Array.isArray(response)) {
          this.allGalleryItems = response
        } else if (response.data && Array.isArray(response.data)) {
          this.allGalleryItems = response.data
        } else if (Array.isArray(response.data)) {
          this.allGalleryItems = response.data
        } else {
          console.warn('[Gallery Store] Unexpected response format:', response)
          this.allGalleryItems = []
        }

        console.log('[Gallery Store] Set allGalleryItems to:', this.allGalleryItems)
        return this.allGalleryItems
      } catch (err) {
        console.error('Failed to fetch published gallery items:', err)
        this.error = err.message || 'Failed to load gallery items'
        this.allGalleryItems = []
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch a single gallery item by ID
     */
    async fetchGalleryItemById(id) {
      this.loadingCurrent = true
      this.currentError = null

      try {
        const response = await galleryApi.getById(id)
        this.currentGalleryItem = response.data || response
        return this.currentGalleryItem
      } catch (err) {
        console.error('Failed to fetch gallery item:', err)
        this.currentError = err.message || 'Failed to load gallery item'
        this.currentGalleryItem = null
        throw err
      } finally {
        this.loadingCurrent = false
      }
    },

    /**
     * Create a new gallery item with image upload
     */
    async createGalleryItem(formData) {
      this.uploading = true
      
      try {
        const response = await galleryApi.create(formData)
        const newItem = response.data.data || response.data || response
        
        // Add to local state
        this.allGalleryItems.unshift(newItem)
        
        return newItem
      } catch (err) {
        console.error('Failed to create gallery item:', err)
        throw err
      } finally {
        this.uploading = false
      }
    },

    /**
     * Update an existing gallery item
     */
    async updateGalleryItem(id, data) {
      try {
        const response = await galleryApi.update(id, data)
        const updatedItem = response.data.data || response.data || response
        
        // Update in local state
        const index = this.allGalleryItems.findIndex(item => item.id === id)
        if (index !== -1) {
          this.allGalleryItems[index] = updatedItem
        }
        
        // Update current item if it's the same item
        if (this.currentGalleryItem?.id === id) {
          this.currentGalleryItem = updatedItem
        }
        
        return updatedItem
      } catch (err) {
        console.error('Failed to update gallery item:', err)
        throw err
      }
    },

    /**
     * Delete a gallery item
     */
    async deleteGalleryItem(id) {
      try {
        await galleryApi.delete(id)
        
        // Remove from local state
        this.allGalleryItems = this.allGalleryItems.filter(item => item.id !== id)
        
        // Clear current item if it's the deleted item
        if (this.currentGalleryItem?.id === id) {
          this.currentGalleryItem = null
        }
        
        return true
      } catch (err) {
        console.error('Failed to delete gallery item:', err)
        throw err
      }
    },

    /**
     * Fetch all unique categories
     */
    async fetchCategories() {
      try {
        const response = await galleryApi.getCategories()
        
        if (Array.isArray(response.data)) {
          this.categories = response.data
        } else {
          this.categories = []
        }
        
        return this.categories
      } catch (err) {
        console.error('Failed to fetch categories:', err)
        this.categories = []
        throw err
      }
    },

    /**
     * Fetch gallery items by category
     */
    async fetchGalleryItemsByCategory(category) {
      this.loading = true
      this.error = null

      try {
        const response = await galleryApi.getByCategory(category)
        
        if (response.data && Array.isArray(response.data.data)) {
          this.allGalleryItems = response.data.data
        } else if (Array.isArray(response.data)) {
          this.allGalleryItems = response.data
        } else {
          this.allGalleryItems = []
        }

        return this.allGalleryItems
      } catch (err) {
        console.error('Failed to fetch gallery items by category:', err)
        this.error = err.message || 'Failed to load gallery items'
        this.allGalleryItems = []
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Bulk upload multiple images
     */
    async bulkUploadGalleryImages(formData) {
      this.uploading = true
      this.uploadProgress = 0
      
      try {
        const response = await galleryApi.bulkUpload(formData)
        const result = response.data || response
        
        // Add uploaded items to local state
        if (result.uploaded && Array.isArray(result.uploaded)) {
          result.uploaded.forEach(item => {
            this.allGalleryItems.unshift(item)
          })
        }
        
        return result
      } catch (err) {
        console.error('Failed to bulk upload gallery images:', err)
        throw err
      } finally {
        this.uploading = false
        this.uploadProgress = 0
      }
    },

    /**
     * Set the current status filter
     */
    setFilter(filter) {
      this.currentFilter = filter
    },

    /**
     * Set the current category filter
     */
    setCategory(category) {
      this.currentCategory = category
    },

    /**
     * Clear current gallery item
     */
    clearCurrentGalleryItem() {
      this.currentGalleryItem = null
      this.currentError = null
    },

    /**
     * Clear all errors
     */
    clearErrors() {
      this.error = null
      this.currentError = null
    },

    /**
     * Reset all filters
     */
    resetFilters() {
      this.currentFilter = 'all'
      this.currentCategory = 'all'
    },

    /**
     * Set upload progress
     */
    setUploadProgress(progress) {
      this.uploadProgress = progress
    },
  },
})
