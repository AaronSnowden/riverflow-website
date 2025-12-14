import { defineStore } from "pinia";
import newslettersApi from "@/api/newsletters";

export const useNewsletterStore = defineStore('newsletters', {
    state: () => ({
        newsletters: [],
        currentNewsletter: null,
        loading: false,
        error: null,
        statistics: {
            total: 0,
            published: 0,
            draft: 0,
            written: 0,
            pdf: 0,
            total_views: 0,
            total_downloads: 0,
        },
        filters: {
            status: "all",
            type: "all",
            category: null,
            search: "",
        },
        pagination: {
            currentPage: 1,
            perPage: 15,
            total: 0,
            lastPage: 1,
        },
    }),

    getters: {
        publishedNewsletters: (state) => {
            return state.newsletters.filter((n) => n.status === "published");
        },

        draftNewsletters: (state) => {
            return state.newsletters.filter((n) => n.status === "draft");
        },

        writtenNewsletters: (state) => {
            return state.newsletters.filter((n) => n.type === "written");
        },

        pdfNewsletters: (state) => {
            return state.newsletters.filter((n) => n.type === "pdf");
        },

        getNewsletterById: (state) => (id) => {
            return state.newsletters.find((n) => n.id === id);
        },
    },

    actions: {
        async fetchNewsletters(params = {}) {
            this.loading = true;
            this.error = null;

            try {
                const response = await newslettersApi.getAll(params);

                if (response.data && response.data.data) {
                    this.newsletters = response.data.data;
                    if (response.data.current_page) {
                        this.pagination.currentPage =
                            response.data.current_page;
                        this.pagination.perPage = response.data.per_page;
                        this.pagination.total = response.data.total;
                        this.pagination.lastPage = response.data.last_page;
                    }
                } else {
                    this.newsletters = response.data || [];
                }

                return this.newsletters;
            } catch (err) {
                console.error("Failed to fetch newsletters:", err);
                this.error = err.message || "Failed to load newsletters";
                this.newsletters = [];
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchPublishedNewsletters(params = {}) {
            this.loading = true;
            this.error = null;

            try {
                const response = await newslettersApi.getPublished(params);

                if (response.data && response.data.data) {
                    this.newsletters = response.data.data;
                } else {
                    this.newsletters = response.data || [];
                }

                return this.newsletters;
            } catch (err) {
                console.error("Failed to fetch published newsletters:", err);
                this.error = err.message || "Failed to load newsletters";
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchNewsletterById(id) {
            this.loading = true;
            this.error = null;

            try {
                const response = await newslettersApi.getById(id);
                this.currentNewsletter = response.data || response;
                return this.currentNewsletter;
            } catch (err) {
                console.error("Failed to fetch newsletter:", err);
                this.error = err.message || "Failed to load newsletter";
                this.currentNewsletter = null;
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async createNewsletter(data) {
            try {
                const response = await newslettersApi.create(data);
                const newNewsletter = response.data || response;

                this.newsletters.unshift(newNewsletter);

                return newNewsletter;
            } catch (err) {
                console.error("Failed to create newsletter:", err);
                throw err;
            }
        },

        async updateNewsletter(id, data) {
            try {
                const response = await newslettersApi.update(id, data);
                const updatedNewsletter = response.data || response;

                const index = this.newsletters.findIndex((n) => n.id === id);
                if (index !== -1) {
                    this.newsletters[index] = updatedNewsletter;
                }

                if (this.currentNewsletter?.id === id) {
                    this.currentNewsletter = updatedNewsletter;
                }

                return updatedNewsletter;
            } catch (err) {
                console.error("Failed to update newsletter:", err);
                throw err;
            }
        },

        async deleteNewsletter(id) {
            try {
                await newslettersApi.delete(id);

                this.newsletters = this.newsletters.filter((n) => n.id !== id);

                if (this.currentNewsletter?.id === id) {
                    this.currentNewsletter = null;
                }

                return true;
            } catch (err) {
                console.error("Failed to delete newsletter:", err);
                throw err;
            }
        },

        async fetchStatistics() {
            try {
                const response = await newslettersApi.getStatistics();
                this.statistics = response.data || response;
                return this.statistics;
            } catch (err) {
                console.error("Failed to fetch statistics:", err);
                throw err;
            }
        },

        async updateStatus(id, status) {
            try {
                const response = await newslettersApi.updateStatus(id, status);
                const updatedNewsletter = response.data || response;

                const index = this.newsletters.findIndex((n) => n.id === id);
                if (index !== -1) {
                    this.newsletters[index] = updatedNewsletter;
                }

                return updatedNewsletter;
            } catch (err) {
                console.error("Failed to update status:", err);
                throw err;
            }
        },

        async downloadNewsletter(id) {
            try {
                await newslettersApi.download(id);
            } catch (err) {
                console.error("Failed to download newsletter:", err);
                throw err;
            }
        },

        setFilters(filters) {
            this.filters = { ...this.filters, ...filters };
        },

        resetFilters() {
            this.filters = {
                status: "all",
                type: "all",
                category: null,
                search: "",
            };
        },

        clearNewsletters() {
            this.newsletters = [];
        },

        clearError() {
            this.error = null;
        },
    },
});
