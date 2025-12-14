import { defineStore } from "pinia";
import axios from "axios";

export const useProjectsStore = defineStore("projects", {
    state: () => ({
        projects: [],
        currentProject: null,
        statistics: {
            total: 0,
            active: 0,
            completed: 0,
            paused: 0,
            cancelled: 0,
        },
        filters: {
            search: "",
            status: "",
        },
        loading: false,
        error: null,
    }),

    getters: {
        // Get all projects
        allProjects: (state) => state.projects,

        // Filter projects by status
        projectsByStatus: (state) => (status) => {
            return state.projects.filter((project) => project.status === status);
        },

        // Get filtered projects based on current filters
        filteredProjects: (state) => {
            let filtered = state.projects;

            if (state.filters.search) {
                const search = state.filters.search.toLowerCase();
                filtered = filtered.filter(
                    (project) =>
                        project.name.toLowerCase().includes(search) ||
                        project.description.toLowerCase().includes(search)
                );
            }

            if (state.filters.status) {
                filtered = filtered.filter(
                    (project) => project.status === state.filters.status
                );
            }

            return filtered;
        },

        // Get project by ID
        getProjectById: (state) => (id) => {
            return state.projects.find((project) => project.id === id);
        },

        // Check if projects exist
        hasProjects: (state) => state.projects.length > 0,
    },

    actions: {
        // Fetch all projects
        async fetchProjects() {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get("/api/admin/projects");
                this.projects = response.data.data || response.data;

                // Update statistics
                this.updateStatistics();

                return response.data;
            } catch (error) {
                this.error =
                    error.response?.data?.message ||
                    "Failed to fetch projects";
                console.error("Error fetching projects:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Fetch statistics
        async fetchStatistics() {
            try {
                const response = await axios.get("/api/admin/projects/statistics");
                this.statistics = response.data.data;
                return response.data;
            } catch (error) {
                console.error("Error fetching statistics:", error);
                // Calculate from existing data if API fails
                this.updateStatistics();
            }
        },

        // Fetch single project
        async fetchProject(id) {
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(`/api/admin/projects/${id}`);
                this.currentProject = response.data.data || response.data;
                return this.currentProject;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to fetch project";
                console.error("Error fetching project:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Create new project
        async createProject(projectData) {
            this.loading = true;
            this.error = null;

            try {
                const formData = new FormData();

                // Append all project fields
                Object.keys(projectData).forEach((key) => {
                    if (key === "image" && projectData[key] instanceof File) {
                        formData.append("image", projectData[key]);
                    } else if (key === "objectives" || key === "impact") {
                        // Convert arrays to JSON strings for Laravel validation
                        formData.append(key, JSON.stringify(projectData[key]));
                    } else if (projectData[key] !== null && projectData[key] !== undefined) {
                        formData.append(key, projectData[key]);
                    }
                });

                const response = await axios.post(
                    "/api/admin/projects",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const newProject = response.data.data || response.data;
                this.projects.unshift(newProject);
                this.updateStatistics();

                return newProject;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to create project";

                // Handle validation errors
                if (error.response?.data?.errors) {
                    throw {
                        message: this.error,
                        errors: error.response.data.errors,
                    };
                }

                console.error("Error creating project:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Update existing project
        async updateProject(id, projectData) {
            this.loading = true;
            this.error = null;

            try {
                const formData = new FormData();
                formData.append("_method", "PUT");

                // Append all project fields
                Object.keys(projectData).forEach((key) => {
                    if (key === "image" && projectData[key] instanceof File) {
                        formData.append("image", projectData[key]);
                    } else if (key === "objectives" || key === "impact") {
                        // Convert arrays to JSON strings for Laravel validation
                        formData.append(key, JSON.stringify(projectData[key]));
                    } else if (projectData[key] !== null && projectData[key] !== undefined) {
                        formData.append(key, projectData[key]);
                    }
                });

                const response = await axios.post(
                    `/api/admin/projects/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                const updatedProject = response.data.data || response.data;

                // Update in projects array
                const index = this.projects.findIndex((p) => p.id === id);
                if (index !== -1) {
                    this.projects[index] = updatedProject;
                }

                this.currentProject = updatedProject;
                this.updateStatistics();

                return updatedProject;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to update project";

                // Handle validation errors
                if (error.response?.data?.errors) {
                    throw {
                        message: this.error,
                        errors: error.response.data.errors,
                    };
                }

                console.error("Error updating project:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Delete project
        async deleteProject(id) {
            this.loading = true;
            this.error = null;

            try {
                await axios.delete(`/api/admin/projects/${id}`);

                // Remove from projects array
                this.projects = this.projects.filter((p) => p.id !== id);

                if (this.currentProject?.id === id) {
                    this.currentProject = null;
                }

                this.updateStatistics();

                return true;
            } catch (error) {
                this.error =
                    error.response?.data?.message || "Failed to delete project";
                console.error("Error deleting project:", error);
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // Update project status (quick action)
        async updateProjectStatus(id, status) {
            try {
                const response = await axios.patch(
                    `/api/admin/projects/${id}/status`,
                    { status }
                );

                const updatedProject = response.data.data || response.data;

                // Update in projects array
                const index = this.projects.findIndex((p) => p.id === id);
                if (index !== -1) {
                    this.projects[index] = updatedProject;
                }

                this.updateStatistics();

                return updatedProject;
            } catch (error) {
                console.error("Error updating project status:", error);
                throw error;
            }
        },

        // Update statistics from current projects data
        updateStatistics() {
            this.statistics.total = this.projects.length;
            this.statistics.active = this.projects.filter(
                (p) => p.status === "active"
            ).length;
            this.statistics.completed = this.projects.filter(
                (p) => p.status === "completed"
            ).length;
            this.statistics.paused = this.projects.filter(
                (p) => p.status === "paused"
            ).length;
            this.statistics.cancelled = this.projects.filter(
                (p) => p.status === "cancelled"
            ).length;
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
                status: "",
            };
        },

        // Clear current project
        clearCurrentProject() {
            this.currentProject = null;
        },

        // Clear error
        clearError() {
            this.error = null;
        },
    },
});
