import apiClient from './client'

export const authApi = {
  login(credentials) {
    return apiClient.post('/api/auth/login', credentials)
  },
  
  logout() {
    // Just clear local storage, no API call needed
    localStorage.removeItem('auth_user')
    return Promise.resolve()
  },
  
  requestPasswordReset(email) {
    return apiClient.post('/api/auth/forgot-password', { email })
  },
  
  resetPassword(token, password) {
    return apiClient.post('/api/auth/reset-password', { token, password })
  }
}
