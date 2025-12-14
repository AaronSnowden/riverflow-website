import { defineStore } from "pinia";
import axios from "axios";

export const useCausesStore = defineStore("causes", {
    state: () => ({
        causes: [],
        currentCause: null,
        statistics: {
            total: 0,
            active: 0,
            totalGoal: 0,
            totalRaised: 0,
        },
        filters: {
            search: "",
            category: "",
            urgency: "",
            status: "",
        },
        loading: false,
        error: null,
    }),

    getters: {
        // Get all causes
        allCauses: (state) => state.causes,

        // Filter causes by category
        causesByCategory: (state) => (category) => {
            return state.causes.filter((cause) => cause.category === category);
        },

        // Filter causes by urgency
        causesByUrgency: (state) => (urgency) => {
            return state.causes.filter((cause) => cause.urgency === urgency);
        },

        // Get filtered causes based on current filters
        filteredCauses: (state) => {
            let filtered = state.causes;

            if (state.filters.search) {
                const search = state.filters.search.toLowerCase();
                filtered = filtered.filter(
                    (cause) =>
                        cause.title.toLowerCase().includes(search) ||
                        cause.description.toLowerCase().includes(search)
                );
            }

            if (state.filters.category) {
                filtered = filtered.filter(
                    (cause) => cause.category === state.filters.category
                );
            }

            if (state.filters.urgency) {
                filtered = filtered.filter(
                    (cause) => cause.urgency === state.filters.urgency
                );
            }

            return filtered;
        },

        // Get cause by ID
        getCauseById: (state) => (id) => {
            return state.causes.find((cause) => cause.id === id);
        },

        // Check if causes exist
        hasCauses: (state) => state.causes.length > 0,

        // Get funding progress for a cause
        getCauseProgress: () => (cause) => {
            if (!cause.goalAmount || cause.goalAmount === 0) return 0;
            return Math.min(
                Math.round((cause.raisedAmount / cause.goalAmount) * 100),
                100
            );
        },
    },

    actions: {
        // Fetch all causes
        async fetchCauses() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get("/api/admin/causes");
                this.causes = response.data.data || response.data;

                // Update statistics
                this.updateStatistics();

                return response.data;
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    "Failed to fetch causes";
                console.error("Error fetching causes:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Fetch statistics
        async fetchStatistics() {
            try {
                const response = await axios.get("/api/admin/causes/statistics");
                this.statistics = response.data;
                return response.data;
            } catch (error) {
                console.error("Error fetching statistics:", error);
                // Calculate from existing data if API fails
                this.updateStatistics();
            }
        },

        // Fetch single cause
        async fetchCause(id) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`/api/admin/causes/${id}`);
                this.currentCause = response.data.data || response.data;
                return this.currentCause;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to fetch cause";
                console.error("Error fetching cause:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Create new cause
        async createCause(causeData) {
            this.loading = true;
            this.error = null;

            try {
            const formData = new FormData();

            // Append all cause fields
            Object.keys(causeData).forEach((key) => {
                if (key === "image" && causeData[key] instanceof File) {
                    formData.append("image", causeData[key]);
                } else if (key === "impact" || key === "donation_tiers") {
                    // Convert arrays to JSON strings for Laravel validation
                    formData.append(key, JSON.stringify(causeData[key]));
                } else if (causeData[key] !== null && causeData[key] !== undefined) {
                    formData.append(key, causeData[key]);
                }
            });

                const response = await axios.post(
                    "/api/admin/causes",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const newCause = response.data.data || response.data;
                this.causes.unshift(newCause);
                this.updateStatistics();

                return newCause;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to create cause";

                // Handle validation errors
                if (error.response?.data?.errors) {
                    throw {
                        message: this.error,
                        errors: error.response.data.errors,
                    };
                }

                console.error("Error creating cause:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Update existing cause
        async updateCause(id, causeData) {
            this.loading = true;
            this.error = null;

            try {
            const formData = new FormData();
            formData.append("_method", "PUT");

            // Append all cause fields
            Object.keys(causeData).forEach((key) => {
                if (key === "image" && causeData[key] instanceof File) {
                    formData.append("image", causeData[key]);
                } else if (key === "impact" || key === "donation_tiers") {
                    // Convert arrays to JSON strings for Laravel validation
                    formData.append(key, JSON.stringify(causeData[key]));
                } else if (causeData[key] !== null && causeData[key] !== undefined) {
                    formData.append(key, causeData[key]);
                }
            });

                const response = await axios.post(
                    `/api/admin/causes/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const updatedCause = response.data.data || response.data;

                // Update in causes array
                const index = this.causes.findIndex((c) => c.id === id);
                if (index !== -1) {
                    this.causes[index] = updatedCause;
                }

                this.currentCause = updatedCause;
                this.updateStatistics();

                return updatedCause;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to update cause";

                // Handle validation errors
                if (error.response?.data?.errors) {
                    throw {
                        message: this.error,
                        errors: error.response.data.errors,
                    };
                }

                console.error("Error updating cause:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Delete cause
        async deleteCause(id) {
            this.loading = true;
            this.error = null;

            try {
                await axios.delete(`/api/admin/causes/${id}`);

                // Remove from causes array
                this.causes = this.causes.filter((c) => c.id !== id);

                if (this.currentCause?.id === id) {
                    this.currentCause = null;
                }

                this.updateStatistics();

                return true;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to delete cause";
                console.error("Error deleting cause:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Update cause status (quick action)
        async updateCauseStatus(id, status) {
            try {
                const response = await axios.patch(
                    `/api/admin/causes/${id}/status`,
                    { status }
                );

                const updatedCause = response.data.data || response.data;

                // Update in causes array
                const index = this.causes.findIndex((c) => c.id === id);
                if (index !== -1) {
                    this.causes[index] = updatedCause;
                }

                return updatedCause;
            } catch (error) {
                console.error("Error updating cause status:", error);
                throw error;
            }
        },

        // Update cause amounts (quick action)
        async updateCauseAmounts(id, { goalAmount, raisedAmount }) {
            try {
                const response = await axios.patch(
                    `/api/admin/causes/${id}/amounts`,
                    { goalAmount, raisedAmount }
                );

                const updatedCause = response.data.data || response.data;

                // Update in causes array
                const index = this.causes.findIndex((c) => c.id === id);
                if (index !== -1) {
                    this.causes[index] = updatedCause;
                }

                this.updateStatistics();

                return updatedCause;
            } catch (error) {
                console.error("Error updating cause amounts:", error);
                throw error;
            }
        },

        // Update statistics from current causes data
        updateStatistics() {
            this.statistics.total = this.causes.length;
            this.statistics.active = this.causes.filter(
                (c) => c.status === "active" || !c.status
            ).length;
            this.statistics.totalGoal = this.causes.reduce(
                (sum, c) => sum + (parseFloat(c.goalAmount) || 0),
                0
            );
            this.statistics.totalRaised = this.causes.reduce(
                (sum, c) => sum + (parseFloat(c.raisedAmount) || 0),
                0
            );
        },

        // Set filters
        setFilter(key, value) {
            if (key in this.filters) {
                this.filters[key] = value;
            }
        },

        // Clear filters
        clearFilters() {
            this.filters = {
                search: "",
                category: "",
                urgency: "",
                status: "",
            };
        },

        // Clear current cause
        clearCurrentCause() {
            this.currentCause = null;
        },

        // Clear error
        clearError() {
            this.error = null;
        },
    },
});
