import apiClient from './client'

export const eventsApi = {
  /**
   * Get all events (admin)
   * @param {Object} params - Query parameters (status, state, category, period, search, per_page, order)
   * @returns {Promise}
   */
  getAll(params = {}) {
    return apiClient.get('/api/admin/events', { params })
  },

  /**
   * Get published events (public)
   * @param {Object} params - Query parameters (category, include_past, per_page)
   * @returns {Promise}
   */
  getPublished(params = {}) {
    return apiClient.get('/api/events/published', { params })
  },

  /**
   * Get single event by ID
   * @param {number|string} id - Event ID
   * @returns {Promise}
   */
  getById(id) {
    return apiClient.get(`/api/admin/events/${id}`)
  },

  /**
   * Create new event
   * @param {Object} eventData - Event data
   * @returns {Promise}
   */
  create(eventData) {
    return apiClient.post('/api/admin/events', eventData)
  },

  /**
   * Update existing event
   * @param {number|string} id - Event ID
   * @param {Object} eventData - Updated event data
   * @returns {Promise}
   */
  update(id, eventData) {
    return apiClient.put(`/api/admin/events/${id}`, eventData)
  },

  /**
   * Delete event
   * @param {number|string} id - Event ID
   * @returns {Promise}
   */
  delete(id) {
    return apiClient.delete(`/api/admin/events/${id}`)
  },

  /**
   * Get event statistics
   * @returns {Promise}
   */
  getStatistics() {
    return apiClient.get('/api/admin/events/statistics')
  },

  /**
   * Get events by category
   * @param {string} category - Event category
   * @returns {Promise}
   */
  getByCategory(category) {
    return apiClient.get(`/api/events/category/${category}`)
  },

  /**
   * Get upcoming events (public)
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getUpcoming(params = {}) {
    return apiClient.get('/api/events/published', { 
      params: { ...params, include_past: false } 
    })
  },

  /**
   * Get past events (public)
   * @param {Object} params - Query parameters
   * @returns {Promise}
   */
  getPast(params = {}) {
    return apiClient.get('/api/events/published', { 
      params: { ...params, include_past: true, period: 'past' } 
    })
  },
}

export default eventsApi
