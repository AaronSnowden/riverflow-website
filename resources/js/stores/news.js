import { defineStore } from 'pinia'
import { newsApi } from '@/api/news'

export const useNewsStore = defineStore('news', {
  state: () => ({
    // All news articles
    allNews: [],
    
    // Current active news (for detail view)
    currentNews: null,
    
    // Loading states
    loading: false,
    loadingCurrent: false,
    
    // Error states
    error: null,
    currentError: null,
    
    // Filter state
    currentFilter: 'all', // 'all', 'published', 'draft'
  }),

  getters: {
    /**
     * Get filtered news based on current filter
     */
    filteredNews: (state) => {
      if (state.currentFilter === 'all') {
        return state.allNews
      }
      return state.allNews.filter(news => news.status === state.currentFilter)
    },

    /**
     * Get published news only
     */
    publishedNews: (state) => {
      return state.allNews.filter(news => news.status === 'published')
    },

    /**
     * Get draft news only
     */
    draftNews: (state) => {
      return state.allNews.filter(news => news.status === 'draft')
    },

    /**
     * Get news by ID
     */
    getNewsById: (state) => (id) => {
      return state.allNews.find(news => news.id === id)
    },

    /**
     * Get news by category
     */
    getNewsByCategory: (state) => (category) => {
      return state.allNews.filter(news => news.category === category)
    },
  },

  actions: {
    /**
     * Fetch all news with optional filters
     */
    async fetchNews(params = {}) {
      this.loading = true
      this.error = null

      try {
        // Merge with current filter if no status provided
        const queryParams = { ...params }
        if (!queryParams.status && this.currentFilter !== 'all') {
          queryParams.status = this.currentFilter
        }

        const response = await newsApi.getAll(queryParams)
        
        // Handle different response formats
        if (response.data && Array.isArray(response.data.data)) {
          this.allNews = response.data.data
        } else if (Array.isArray(response.data)) {
          this.allNews = response.data
        } else {
          this.allNews = []
        }

        return this.allNews
      } catch (err) {
        console.error('Failed to fetch news:', err)
        this.error = err.message || 'Failed to load news articles'
        this.allNews = []
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch a single news article by ID
     */
    async fetchNewsById(id) {
      this.loadingCurrent = true
      this.currentError = null

      try {
        const response = await newsApi.getById(id)
        this.currentNews = response.data || response
        return this.currentNews
      } catch (err) {
        console.error('Failed to fetch news:', err)
        this.currentError = err.message || 'Failed to load news article'
        this.currentNews = null
        throw err
      } finally {
        this.loadingCurrent = false
      }
    },

    /**
     * Create a new news article
     */
    async createNews(newsData) {
      try {
        const response = await newsApi.create(newsData)
        const newArticle = response.data || response
        
        // Add to local state
        this.allNews.unshift(newArticle)
        
        return newArticle
      } catch (err) {
        console.error('Failed to create news:', err)
        throw err
      }
    },

    /**
     * Update an existing news article
     */
    async updateNews(id, newsData) {
      try {
        const response = await newsApi.update(id, newsData)
        const updatedArticle = response.data || response
        
        // Update in local state
        const index = this.allNews.findIndex(news => news.id === id)
        if (index !== -1) {
          this.allNews[index] = updatedArticle
        }
        
        // Update current news if it's the same article
        if (this.currentNews?.id === id) {
          this.currentNews = updatedArticle
        }
        
        return updatedArticle
      } catch (err) {
        console.error('Failed to update news:', err)
        throw err
      }
    },

    /**
     * Delete a news article
     */
    async deleteNews(id) {
      try {
        await newsApi.delete(id)
        
        // Remove from local state
        this.allNews = this.allNews.filter(news => news.id !== id)
        
        // Clear current news if it's the deleted article
        if (this.currentNews?.id === id) {
          this.currentNews = null
        }
        
        return true
      } catch (err) {
        console.error('Failed to delete news:', err)
        throw err
      }
    },

    /**
     * Set the current filter
     */
    setFilter(filter) {
      this.currentFilter = filter
    },

    /**
     * Clear current news
     */
    clearCurrentNews() {
      this.currentNews = null
      this.currentError = null
    },

    /**
     * Clear all errors
     */
    clearErrors() {
      this.error = null
      this.currentError = null
    },
  },
})
