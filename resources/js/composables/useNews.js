import { newsApi } from '@/api/news'

export const useNews = () => {
  // Fetch all news
  const fetchNews = async (status = 'all') => {
    try {
      const response = await newsApi.getAll()
      return response
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  }

  // Fetch single news item
  const fetchNewsById = async (id) => {
    try {
      const response = await newsApi.getById(id)
      return response
    } catch (error) {
      console.error('Error fetching news:', error)
      throw error
    }
  }

  // Create news
  const createNews = async (formData) => {
    try {
      const response = await newsApi.create(formData)
      return response
    } catch (error) {
      console.error('Error creating news:', error)
      throw error
    }
  }

  // Update news
  const updateNews = async (id, formData) => {
    try {
      const response = await newsApi.update(id, formData)
      return response
    } catch (error) {
      console.error('Error updating news:', error)
      throw error
    }
  }

  // Delete news
  const deleteNews = async (id) => {
    try {
      const response = await newsApi.delete(id)
      return response
    } catch (error) {
      console.error('Error deleting news:', error)
      throw error
    }
  }

  return {
    fetchNews,
    fetchNewsById,
    createNews,
    updateNews,
    deleteNews
  }
}

