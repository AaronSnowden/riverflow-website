<template>
    <div>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Manage Projects</h1>
                <p class="text-neutral-600 mt-2">
                    Create, edit, and manage your projects
                </p>
            </div>
            <router-link
                :to="{ name: 'admin-projects-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Add New Project
            </router-link>
        </div>

        <!-- Filter Tabs -->
        <div class="mb-6 flex items-center space-x-4">
            <button
                v-for="tab in tabs"
                :key="tab.value"
                @click="activeTab = tab.value"
                :class="[
                    'px-4 py-2 rounded-md font-medium transition-colors',
                    activeTab === tab.value
                        ? 'bg-primary text-white'
                        : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200',
                ]"
            >
                {{ tab.label }}
            </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
        </div>

        <!-- Projects List -->
        <div
            v-else-if="projectsList.length > 0"
            class="bg-white rounded-lg border border-neutral-200"
        >
            <div class="divide-y divide-neutral-200">
                <div
                    v-for="project in projectsList"
                    :key="project.id"
                    class="p-6 hover:bg-neutral-50 transition-colors"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1 flex space-x-4">
                            <!-- Image Thumbnail -->
                            <div class="flex-shrink-0">
                                <div
                                    v-if="project.image"
                                    class="w-24 h-24 rounded-lg overflow-hidden bg-neutral-200"
                                >
                                    <img
                                        :src="project.image"
                                        :alt="project.name"
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="w-24 h-24 rounded-lg bg-neutral-200 flex items-center justify-center"
                                >
                                    <Briefcase
                                        class="w-8 h-8 text-neutral-400"
                                    />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <h3
                                        class="text-lg font-semibold text-neutral-900"
                                    >
                                        {{ project.name }}
                                    </h3>
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs rounded font-medium',
                                            getStatusClass(project.status),
                                        ]"
                                    >
                                        {{ project.status }}
                                    </span>
                                </div>

                                <p
                                    v-if="project.description"
                                    class="text-sm text-neutral-600 mb-3 line-clamp-2"
                                >
                                    {{ project.description }}
                                </p>

                                <div
                                    class="flex items-center space-x-4 text-xs text-neutral-500"
                                >
                                    <span v-if="project.location">
                                        <MapPin class="w-3 h-3 inline mr-1" />
                                        {{ project.location }}
                                    </span>
                                    <span v-if="project.beneficiaries">
                                        <Users class="w-3 h-3 inline mr-1" />
                                        {{ project.beneficiaries }} beneficiaries
                                    </span>
                                    <span v-if="project.startDate">
                                        <Calendar class="w-3 h-3 inline mr-1" />
                                        {{ formatDate(project.startDate) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center space-x-2 ml-4">
                            <router-link
                                :to="{
                                    name: 'admin-projects-view',
                                    params: { id: project.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="View Details"
                            >
                                <Eye class="w-5 h-5" />
                            </router-link>
                            <router-link
                                :to="{
                                    name: 'admin-projects-edit',
                                    params: { id: project.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="Edit"
                            >
                                <Edit class="w-5 h-5" />
                            </router-link>
                            <button
                                @click="confirmDelete(project)"
                                class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                title="Delete"
                            >
                                <Trash2 class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div
            v-else
            class="bg-white rounded-lg border border-neutral-200 p-12 text-center"
        >
            <Briefcase class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">
                No projects found
            </h3>
            <p class="text-neutral-600 mb-6">
                Get started by creating your first project
            </p>
            <router-link
                :to="{ name: 'admin-projects-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Create Project
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4">
                <div
                    class="fixed inset-0 bg-neutral-900 bg-opacity-75"
                    @click="showDeleteModal = false"
                ></div>
                <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 class="text-lg font-bold text-neutral-900 mb-2">
                        Delete Project?
                    </h3>
                    <p class="text-neutral-600 mb-6">
                        Are you sure you want to delete "{{
                            projectToDelete?.name
                        }}"? This action cannot be undone.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button
                            @click="showDeleteModal = false"
                            class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
                        >
                            Cancel
                        </button>
                        <button
                            @click="handleDelete"
                            :disabled="deleting"
                            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                        >
                            {{ deleting ? "Deleting..." : "Delete" }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import {
    Plus,
    Briefcase,
    Eye,
    Edit,
    Trash2,
    MapPin,
    Users,
    Calendar,
} from "lucide-vue-next";
import { useProjectsStore } from "@/stores/projects";
import { storeToRefs } from "pinia";

const projectsStore = useProjectsStore();
const { allProjects, loading, error } = storeToRefs(projectsStore);

const tabs = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Paused", value: "paused" },
];

const activeTab = ref("all");
const showDeleteModal = ref(false);
const projectToDelete = ref(null);
const deleting = ref(false);

// Fetch projects from store
const fetchProjects = async () => {
    const params = {};

    // Add filter based on active tab
    if (activeTab.value !== "all") {
        params.status = activeTab.value;
    }

    try {
        await projectsStore.fetchProjects(params);
    } catch (err) {
        // Error is already handled in the store
    }
};

// Get filtered projects list from store
const projectsList = computed(() => {
    if (activeTab.value === "all") {
        return allProjects.value;
    }
    return allProjects.value.filter((p) => p.status === activeTab.value);
});

const confirmDelete = (project) => {
    projectToDelete.value = project;
    showDeleteModal.value = true;
};

const handleDelete = async () => {
    if (!projectToDelete.value) return;

    deleting.value = true;
    try {
        await projectsStore.deleteProject(projectToDelete.value.id);

        showDeleteModal.value = false;
        projectToDelete.value = null;
    } catch (error) {
        console.error("Failed to delete project:", error);
        alert("Failed to delete project. Please try again.");
    } finally {
        deleting.value = false;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

const getStatusClass = (status) => {
    const classes = {
        active: "bg-blue-100 text-blue-800",
        completed: "bg-green-100 text-green-800",
        paused: "bg-yellow-100 text-yellow-800",
        cancelled: "bg-red-100 text-red-800",
    };
    return classes[status] || "bg-gray-100 text-gray-800";
};

// Watch for tab changes and refetch
watch(activeTab, () => {
    fetchProjects();
});

// Fetch on mount
onMounted(() => {
    fetchProjects();
});
</script>
