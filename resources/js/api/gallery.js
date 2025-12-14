import apiClient from './client'

export const galleryApi = {
  /**
   * Get all gallery items (admin)
   * @param {Object} params - Query parameters (status, category, order)
   * @returns {Promise}
   */
  getAll(params = {}) {
    return apiClient.get('/api/admin/gallery', { params })
  },

  /**
   * Get published gallery items (public)
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getPublished(params = {}) {
    return apiClient.get('/api/gallery/published', { params })
  },

  /**
   * Get single gallery item by ID
   * @param {number|string} id - Gallery item ID
   * @returns {Promise}
   */
  getById(id) {
    return apiClient.get(`/api/admin/gallery/${id}`)
  },

  /**
   * Create new gallery item with image upload
   * @param {FormData} formData - Form data with image and gallery item data
   * @returns {Promise}
   */
  create(formData) {
    return apiClient.post('/api/admin/gallery', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  /**
   * Update existing gallery item
   * @param {number|string} id - Gallery item ID
   * @param {FormData|Object} data - Updated gallery data (FormData if image included)
   * @returns {Promise}
   */
  update(id, data) {
    // Use POST with FormData for file uploads (Laravel handles _method=PUT)
    if (data instanceof FormData) {
      return apiClient.post(`/api/admin/gallery/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    }
    
    // Use PUT for regular updates without files
    return apiClient.put(`/api/admin/gallery/${id}`, data)
  },

  /**
   * Delete gallery item
   * @param {number|string} id - Gallery item ID
   * @returns {Promise}
   */
  delete(id) {
    return apiClient.delete(`/api/admin/gallery/${id}`)
  },

  /**
   * Get all unique categories
   * @returns {Promise}
   */
  getCategories() {
    return apiClient.get('/api/gallery/categories')
  },

  /**
   * Get gallery items by category
   * @param {string} category - Category name
   * @returns {Promise}
   */
  getByCategory(category) {
    return apiClient.get(`/api/gallery/category/${category}`)
  },

  /**
   * Bulk upload multiple images
   * @param {FormData} formData - Form data with multiple images and metadata
   * @returns {Promise}
   */
  bulkUpload(formData) {
    return apiClient.post('/api/admin/gallery/bulk-upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
}

export default galleryApi
