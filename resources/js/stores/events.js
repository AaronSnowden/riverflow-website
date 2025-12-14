import { defineStore } from "pinia";
import { eventsApi } from "@/api/events";

export const useEventsStore = defineStore("events", {
    state: () => ({
        // All events
        allEvents: [],

        // Current active event (for detail view)
        currentEvent: null,

        // Loading states
        loading: false,
        loadingCurrent: false,

        // Error states
        error: null,
        currentError: null,

        // Filter state
        currentFilter: "all", // 'all', 'published', 'draft'
        currentPeriod: "all", // 'all', 'upcoming', 'past'
        currentCategory: "all",

        // Statistics
        statistics: {
            total: 0,
            published: 0,
            draft: 0,
            upcoming: 0,
            past: 0,
            active: 0,
        },
    }),

    getters: {
        /**
         * Get filtered events based on current filters
         */
        filteredEvents: (state) => {
            let events = state.allEvents;

            // Filter by status
            if (state.currentFilter !== "all") {
                events = events.filter(
                    (event) => event.status === state.currentFilter
                );
            }

            // Filter by category
            if (state.currentCategory !== "all") {
                events = events.filter(
                    (event) => event.category === state.currentCategory
                );
            }

            // Filter by period
            if (state.currentPeriod === "upcoming") {
                const today = new Date().toISOString().split("T")[0];
                events = events.filter((event) => event.date >= today);
            } else if (state.currentPeriod === "past") {
                const today = new Date().toISOString().split("T")[0];
                events = events.filter((event) => event.date < today);
            }

            return events;
        },

        /**
         * Get published events only
         */
        publishedEvents: (state) => {
            return state.allEvents.filter(
                (event) => event.status === "published"
            );
        },

        /**
         * Get draft events only
         */
        draftEvents: (state) => {
            return state.allEvents.filter((event) => event.status === "draft");
        },

        /**
         * Get upcoming events
         */
        upcomingEvents: (state) => {
            const today = new Date().toISOString().split("T")[0];
            return state.allEvents.filter((event) => event.date >= today);
        },

        /**
         * Get past events
         */
        pastEvents: (state) => {
            const today = new Date().toISOString().split("T")[0];
            return state.allEvents.filter((event) => event.date < today);
        },

        /**
         * Get event by ID
         */
        getEventById: (state) => (id) => {
            return state.allEvents.find((event) => event.id === id);
        },

        /**
         * Get events by category
         */
        getEventsByCategory: (state) => (category) => {
            return state.allEvents.filter(
                (event) => event.category === category
            );
        },

        /**
         * Get events count by status
         */
        getCountByStatus: (state) => (status) => {
            if (status === "all") return state.allEvents.length;
            return state.allEvents.filter((event) => event.status === status)
                .length;
        },

        /**
         * Check if registration is open for an event
         */
        isRegistrationOpen: (state) => (event) => {
            if (!event.registration_deadline) return true;
            const today = new Date().toISOString().split("T")[0];
            return event.registration_deadline >= today;
        },
    },

    actions: {
        /**
         * Fetch all events with optional filters
         */
        async fetchEvents(params = {}) {
            this.loading = true;
            this.error = null;

            try {
                // Merge with current filters if no params provided
                const queryParams = { ...params };
                if (!queryParams.status && this.currentFilter !== "all") {
                    queryParams.status = this.currentFilter;
                }
                if (!queryParams.period && this.currentPeriod !== "all") {
                    queryParams.period = this.currentPeriod;
                }
                if (!queryParams.category && this.currentCategory !== "all") {
                    queryParams.category = this.currentCategory;
                }

                const response = await eventsApi.getAll(queryParams);

                // Handle different response formats
                if (response.data && Array.isArray(response.data.data)) {
                    this.allEvents = response.data.data;
                } else if (Array.isArray(response.data)) {
                    this.allEvents = response.data;
                } else {
                    this.allEvents = [];
                }

                return this.allEvents;
            } catch (err) {
                console.error("Failed to fetch events:", err);
                this.error = err.message || "Failed to load events";
                this.allEvents = [];
                throw err;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Fetch a single event by ID
         */
        async fetchEventById(id) {
            this.loadingCurrent = true;
            this.currentError = null;

            try {
                const response = await eventsApi.getById(id);
                this.currentEvent = response.data || response;
                return this.currentEvent;
            } catch (err) {
                console.error("Failed to fetch event:", err);
                this.currentError = err.message || "Failed to load event";
                this.currentEvent = null;
                throw err;
            } finally {
                this.loadingCurrent = false;
            }
        },

        /**
         * Create a new event
         */
        async createEvent(eventData) {
            try {
                const response = await eventsApi.create(eventData);
                const newEvent = response.data || response;

                // Add to local state
                this.allEvents.unshift(newEvent);

                return newEvent;
            } catch (err) {
                console.error("Failed to create event:", err);
                throw err;
            }
        },

        /**
         * Update an existing event
         */
        async updateEvent(id, eventData) {
            try {
                const response = await eventsApi.update(id, eventData);
                const updatedEvent = response.data || response;

                // Update in local state
                const index = this.allEvents.findIndex(
                    (event) => event.id === id
                );
                if (index !== -1) {
                    this.allEvents[index] = updatedEvent;
                }

                // Update current event if it's the same event
                if (this.currentEvent?.id === id) {
                    this.currentEvent = updatedEvent;
                }

                return updatedEvent;
            } catch (err) {
                console.error("Failed to update event:", err);
                throw err;
            }
        },

        /**
         * Delete an event
         */
        async deleteEvent(id) {
            try {
                await eventsApi.delete(id);

                // Remove from local state
                this.allEvents = this.allEvents.filter(
                    (event) => event.id !== id
                );

                // Clear current event if it's the deleted event
                if (this.currentEvent?.id === id) {
                    this.currentEvent = null;
                }

                return true;
            } catch (err) {
                console.error("Failed to delete event:", err);
                throw err;
            }
        },

        /**
         * Fetch event statistics
         */
        async fetchStatistics() {
            try {
                const response = await eventsApi.getStatistics();
                this.statistics = response.data || response;
                return this.statistics;
            } catch (err) {
                console.error("Failed to fetch statistics:", err);
                throw err;
            }
        },

        /**
         * Fetch published events (for public pages)
         */
        async fetchPublishedEvents(params = {}) {
            this.loading = true;
            this.error = null;

            try {
                const response = await eventsApi.getPublished(params);

                if (response.data && Array.isArray(response.data.data)) {
                    this.allEvents = response.data.data;
                } else if (Array.isArray(response.data)) {
                    this.allEvents = response.data;
                } else {
                    this.allEvents = [];
                }

                return this.allEvents;
            } catch (err) {
                console.error("Failed to fetch published events:", err);
                this.error = err.message || "Failed to load events";
                this.allEvents = [];
                throw err;
            } finally {
                this.loading = false;
            }
        },

        /**
         * Set the current status filter
         */
        setFilter(filter) {
            this.currentFilter = filter;
        },

        /**
         * Set the current period filter
         */
        setPeriod(period) {
            this.currentPeriod = period;
        },

        /**
         * Set the current category filter
         */
        setCategory(category) {
            this.currentCategory = category;
        },

        /**
         * Clear current event
         */
        clearCurrentEvent() {
            this.currentEvent = null;
            this.currentError = null;
        },

        /**
         * Clear all errors
         */
        clearErrors() {
            this.error = null;
            this.currentError = null;
        },

        /**
         * Reset all filters
         */
        resetFilters() {
            this.currentFilter = "all";
            this.currentPeriod = "all";
            this.currentCategory = "all";
        },
    },
});
