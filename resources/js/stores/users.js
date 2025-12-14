import { defineStore } from 'pinia'
import axios from 'axios'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    currentUser: null,
    statistics: {
      total: 0,
      active: 0,
      inactive: 0,
      admins: 0,
      users: 0,
      recent: 0
    },
    filters: {
      search: '',
      role: '',
      status: '',
      sortBy: 'created_at',
      sortOrder: 'desc',
      perPage: 15
    },
    pagination: {
      currentPage: 1,
      lastPage: 1,
      total: 0,
      perPage: 15
    },
    loading: false,
    error: null
  }),

  getters: {
    // Get users filtered by role
    adminUsers: (state) => state.users.filter(user => user.role === 'admin'),
    regularUsers: (state) => state.users.filter(user => user.role === 'user'),
    
    // Get users filtered by status
    activeUsers: (state) => state.users.filter(user => user.status === 'active'),
    inactiveUsers: (state) => state.users.filter(user => user.status === 'inactive'),
    
    // Get user by ID
    getUserById: (state) => (id) => {
      return state.users.find(user => user.id === parseInt(id))
    },
    
    // Check if there are users
    hasUsers: (state) => state.users.length > 0,
    
    // Get total users count
    totalUsers: (state) => state.statistics.total
  },

  actions: {
    /**
     * Fetch all users with optional filters
     */
    async fetchUsers(params = {}) {
      this.loading = true
      this.error = null

      try {
        const queryParams = {
          search: params.search || this.filters.search,
          role: params.role || this.filters.role,
          status: params.status || this.filters.status,
          sort_by: params.sortBy || this.filters.sortBy,
          sort_order: params.sortOrder || this.filters.sortOrder,
          per_page: params.perPage || this.filters.perPage,
          page: params.page || this.pagination.currentPage
        }

        // Remove empty parameters
        Object.keys(queryParams).forEach(key => {
          if (!queryParams[key]) delete queryParams[key]
        })

        const response = await axios.get('/api/admin/users', { params: queryParams })
        
        // Handle paginated response
        if (response.data.data) {
          this.users = response.data.data
          this.pagination = {
            currentPage: response.data.current_page,
            lastPage: response.data.last_page,
            total: response.data.total,
            perPage: response.data.per_page
          }
        } else {
          this.users = response.data
        }

        return { success: true, data: this.users }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch users'
        console.error('Fetch users error:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    /**
     * Fetch user statistics
     */
    async fetchStatistics() {
      try {
        const response = await axios.get('/api/admin/users/statistics')
        this.statistics = response.data
        return { success: true, data: this.statistics }
      } catch (error) {
        console.error('Fetch statistics error:', error)
        return { success: false, error: error.response?.data?.message }
      }
    },

    /**
     * Fetch a single user by ID
     */
    async fetchUser(id) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get(`/api/admin/users/${id}`)
        this.currentUser = response.data
        
        // Update user in list if exists
        const index = this.users.findIndex(u => u.id === parseInt(id))
        if (index !== -1) {
          this.users[index] = response.data
        }

        return { success: true, data: this.currentUser }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch user'
        console.error('Fetch user error:', error)
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    /**
     * Create a new user
     */
    async createUser(formData) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/api/admin/users', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const newUser = response.data.data || response.data
        this.users.unshift(newUser)
        
        // Update statistics
        await this.fetchStatistics()

        return { 
          success: true, 
          data: newUser,
          message: 'User created successfully' 
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create user'
        return { 
          success: false, 
          error: this.error,
          errors: error.response?.data?.errors 
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Update an existing user
     */
    async updateUser(id, formData) {
      this.loading = true
      this.error = null

      try {
        const response = await axios.post(`/api/admin/users/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })

        const updatedUser = response.data.data || response.data
        
        // Update user in list
        const index = this.users.findIndex(u => u.id === parseInt(id))
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        
        // Update current user if it's the same
        if (this.currentUser?.id === parseInt(id)) {
          this.currentUser = updatedUser
        }

        return { 
          success: true, 
          data: updatedUser,
          message: 'User updated successfully' 
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update user'
        return { 
          success: false, 
          error: this.error,
          errors: error.response?.data?.errors 
        }
      } finally {
        this.loading = false
      }
    },

    /**
     * Delete a user
     */
    async deleteUser(id) {
      this.loading = true
      this.error = null

      try {
        await axios.delete(`/api/admin/users/${id}`)
        
        // Remove user from list
        this.users = this.users.filter(u => u.id !== parseInt(id))
        
        // Clear current user if it's the deleted one
        if (this.currentUser?.id === parseInt(id)) {
          this.currentUser = null
        }
        
        // Update statistics
        await this.fetchStatistics()

        return { 
          success: true, 
          message: 'User deleted successfully' 
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete user'
        return { success: false, error: this.error }
      } finally {
        this.loading = false
      }
    },

    /**
     * Update user status (active/inactive)
     */
    async updateUserStatus(id, status) {
      try {
        const response = await axios.patch(`/api/admin/users/${id}/status`, { status })
        
        const updatedUser = response.data.data || response.data
        
        // Update user in list
        const index = this.users.findIndex(u => u.id === parseInt(id))
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        
        // Update statistics
        await this.fetchStatistics()

        return { 
          success: true, 
          data: updatedUser,
          message: 'User status updated successfully' 
        }
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to update user status' 
        }
      }
    },

    /**
     * Update user role (admin/user)
     */
    async updateUserRole(id, role) {
      try {
        const response = await axios.patch(`/api/admin/users/${id}/role`, { role })
        
        const updatedUser = response.data.data || response.data
        
        // Update user in list
        const index = this.users.findIndex(u => u.id === parseInt(id))
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        
        // Update statistics
        await this.fetchStatistics()

        return { 
          success: true, 
          data: updatedUser,
          message: 'User role updated successfully' 
        }
      } catch (error) {
        return { 
          success: false, 
          error: error.response?.data?.message || 'Failed to update user role' 
        }
      }
    },

    /**
     * Set filter values
     */
    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    /**
     * Reset filters to default
     */
    resetFilters() {
      this.filters = {
        search: '',
        role: '',
        status: '',
        sortBy: 'created_at',
        sortOrder: 'desc',
        perPage: 15
      }
    },

    /**
     * Clear current user
     */
    clearCurrentUser() {
      this.currentUser = null
    },

    /**
     * Clear all users
     */
    clearUsers() {
      this.users = []
      this.currentUser = null
    },

    /**
     * Clear error
     */
    clearError() {
      this.error = null
    }
  }
})
