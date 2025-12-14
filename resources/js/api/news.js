import apiClient from "./client";

export const newsApi = {
    // Get all news (admin) with optional filters
    getAll(params = {}) {
        return apiClient.get("/api/admin/news", { params });
    },

    // Get published news (public)
    getPublished(params = {}) {
        return apiClient.get("/api/news/published", { params });
    },

    // Get single news by ID or slug
    getById(id) {
        return apiClient
            .get(`/api/news/${id}`)
            .then((response) => response.data.data || response.data);
    },

    // Create news
    async create(newsData) {
        return apiClient
            .post("/api/admin/news", newsData)
            .then((response) => response.data.data || response.data);
    },

    // Update news
    async update(id, newsData) {
        return apiClient
            .put(`/api/admin/news/${id}`, newsData)
            .then((response) => response.data.data || response.data);
    },

    // Delete news
    async delete(id) {
        return apiClient
            .delete(`/api/admin/news/${id}`)
            .then((response) => response.data);
    },
};
