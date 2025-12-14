import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  
  actions: {
    // Initialize auth from localStorage
    initAuth() {
      const savedUser = localStorage.getItem('auth_user')
      if (savedUser) {
        try {
          this.user = JSON.parse(savedUser)
          this.isAuthenticated = true
        } catch (error) {
          console.error('Failed to parse saved user:', error)
          localStorage.removeItem('auth_user')
        }
      }
    },
    
    // Login
    async login(email, password) {
      try {
        const response = await authApi.login({ email, password })
        
        if (response.success) {
          this.user = response.user
          this.isAuthenticated = true
          
          // Save to localStorage
          localStorage.setItem('auth_user', JSON.stringify(this.user))
        }
        
        return response
      } catch (error) {
        return { 
          success: false, 
          message: error.message || 'Invalid email or password' 
        }
      }
    },
    
    // Logout
    async logout() {
      await authApi.logout()
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_user')
    },
    
    // Request password reset
    async requestPasswordReset(email) {
      try {
        const response = await authApi.requestPasswordReset(email)
        return { 
          success: true, 
          message: 'Password reset instructions have been sent to your email' 
        }
      } catch (error) {
        return { 
          success: false, 
          message: error.message || 'Failed to send password reset email' 
        }
      }
    },
    
    // Reset password
    async resetPassword(token, newPassword) {
      try {
        const response = await authApi.resetPassword(token, newPassword)
        return { success: true, message: 'Password has been reset successfully' }
      } catch (error) {
        return { success: false, message: error.message || 'Failed to reset password' }
      }
    }
  },
  
  getters: {
    isAdmin: (state) => {
      return state.user?.role === 'admin'
    }
  }
})
