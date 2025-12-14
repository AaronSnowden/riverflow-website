import apiClient from './client';
import axios from 'axios';

export default {
    // Get all newsletters (admin)
    getAll(params = {}) {
        return apiClient.get('/api/admin/newsletters', { params });
    },

    // Get published newsletters (public)
    getPublished(params = {}) {
        return apiClient.get('/api/newsletters/published', { params });
    },

    // Get single newsletter
    getById(id) {
        return apiClient.get(`/api/newsletters/${id}`);
    },

    // Create newsletter
    create(data) {
        // If it contains a PDF file, use FormData
        if (data.pdfFile instanceof File) {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    if (key === 'pdfFile') {
                        formData.append('pdf_file', data[key]);
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            });
            return axios.post(`${import.meta.env.VITE_API_URL}/api/admin/newsletters`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }
        
        return apiClient.post('/api/admin/newsletters', data);
    },

    // Update newsletter
    update(id, data) {
        // If it contains a PDF file, use FormData with POST method
        if (data.pdfFile instanceof File) {
            const formData = new FormData();
            formData.append('_method', 'PUT');
            Object.keys(data).forEach(key => {
                if (data[key] !== null && data[key] !== undefined) {
                    if (key === 'pdfFile') {
                        formData.append('pdf_file', data[key]);
                    } else {
                        formData.append(key, data[key]);
                    }
                }
            });
            return axios.post(`${import.meta.env.VITE_API_URL}/api/admin/newsletters/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        return apiClient.put(`/api/admin/newsletters/${id}`, data);
    },

    // Delete newsletter
    delete(id) {
        return apiClient.delete(`/api/admin/newsletters/${id}`);
    },

    // Get statistics
    getStatistics() {
        return apiClient.get('/api/admin/newsletters/statistics');
    },

    // Update status
    updateStatus(id, status) {
        return apiClient.patch(`/api/admin/newsletters/${id}/status`, { status });
    },

    // Download newsletter PDF
    download(id) {
        return fetch(`${import.meta.env.VITE_API_URL}/api/newsletters/${id}/download`)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `newsletter-${id}.pdf`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            });
    },
};
