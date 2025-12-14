<template>
    <div>
        <!-- Header -->
        <div class="mb-8">
            <div class="flex items-center mb-4">
                <router-link
                    :to="{ name: 'admin-projects' }"
                    class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors mr-2"
                >
                    <ArrowLeft class="w-5 h-5" />
                </router-link>
                <h1 class="text-3xl font-bold text-neutral-900">
                    Edit Project
                </h1>
            </div>
            <p class="text-neutral-600">
                Update project details
            </p>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
        </div>

        <!-- Form -->
        <div
            v-else-if="form.name"
            class="bg-white rounded-lg border border-neutral-200 p-6"
        >
            <form @submit.prevent="handleSubmit">
                <!-- Project Name -->
                <div class="mb-6">
                    <label
                        for="name"
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Project Name <span class="text-red-500">*</span>
                    </label>
                    <input
                        id="name"
                        v-model="form.name"
                        type="text"
                        required
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        :class="{ 'border-red-500': errors.name }"
                        placeholder="Enter project name"
                    />
                    <p v-if="errors.name" class="text-xs text-red-500 mt-1">
                        {{ errors.name[0] }}
                    </p>
                </div>

                <!-- Slug -->
                <div class="mb-6">
                    <label
                        for="slug"
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Slug
                    </label>
                    <input
                        id="slug"
                        v-model="form.slug"
                        type="text"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        :class="{ 'border-red-500': errors.slug }"
                        placeholder="auto-generated-from-name"
                    />
                    <p class="text-xs text-neutral-500 mt-1">
                        Leave blank to auto-generate from name
                    </p>
                    <p v-if="errors.slug" class="text-xs text-red-500 mt-1">
                        {{ errors.slug[0] }}
                    </p>
                </div>

                <!-- Description -->
                <div class="mb-6">
                    <label
                        for="description"
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Short Description <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        id="description"
                        v-model="form.description"
                        rows="3"
                        maxlength="500"
                        required
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        :class="{ 'border-red-500': errors.description }"
                        placeholder="Enter a brief description (max 500 characters)"
                    ></textarea>
                    <div class="flex items-center justify-between mt-1">
                        <p
                            v-if="errors.description"
                            class="text-xs text-red-500"
                        >
                            {{ errors.description[0] }}
                        </p>
                        <p class="text-xs text-neutral-500 ml-auto">
                            {{ form.description.length }}/500
                        </p>
                    </div>
                </div>

                <!-- Full Description -->
                <div class="mb-6">
                    <label
                        for="full_description"
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Full Description
                    </label>
                    <textarea
                        id="full_description"
                        v-model="form.full_description"
                        rows="6"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        :class="{ 'border-red-500': errors.full_description }"
                        placeholder="Enter detailed description of the project"
                    ></textarea>
                    <p class="text-xs text-neutral-500 mt-1">
                        Optional detailed description
                    </p>
                </div>

                <!-- Status, Location Row -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- Status -->
                    <div>
                        <label
                            for="status"
                            class="block text-sm font-medium text-neutral-900 mb-2"
                        >
                            Status <span class="text-red-500">*</span>
                        </label>
                        <select
                            id="status"
                            v-model="form.status"
                            required
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        >
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="paused">Paused</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>

                    <!-- Location -->
                    <div>
                        <label
                            for="location"
                            class="block text-sm font-medium text-neutral-900 mb-2"
                        >
                            Location
                        </label>
                        <input
                            id="location"
                            v-model="form.location"
                            type="text"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Project location"
                        />
                    </div>
                </div>

                <!-- Dates Row -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- Start Date -->
                    <div>
                        <label
                            for="start_date"
                            class="block text-sm font-medium text-neutral-900 mb-2"
                        >
                            Start Date
                        </label>
                        <input
                            id="start_date"
                            v-model="form.start_date"
                            type="date"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>

                    <!-- End Date -->
                    <div>
                        <label
                            for="end_date"
                            class="block text-sm font-medium text-neutral-900 mb-2"
                        >
                            End Date
                        </label>
                        <input
                            id="end_date"
                            v-model="form.end_date"
                            type="date"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                    </div>
                </div>

                <!-- Beneficiaries -->
                <div class="mb-6">
                    <label
                        for="beneficiaries"
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Number of Beneficiaries
                    </label>
                    <input
                        id="beneficiaries"
                        v-model.number="form.beneficiaries"
                        type="number"
                        min="0"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Estimated beneficiaries"
                    />
                </div>

                <!-- Image Upload -->
                <div class="mb-6">
                    <label
                        class="block text-sm font-medium text-neutral-900 mb-2"
                    >
                        Project Image
                    </label>

                    <!-- Current Image -->
                    <div
                        v-if="currentImage && !imagePreview"
                        class="mb-3"
                    >
                        <p class="text-xs text-neutral-500 mb-2">
                            Current Image:
                        </p>
                        <img
                            :src="currentImage"
                            alt="Current project image"
                            class="w-48 h-48 object-cover rounded-lg border border-neutral-200"
                        />
                    </div>

                    <!-- New Image Preview -->
                    <div v-if="imagePreview" class="mb-3">
                        <p class="text-xs text-neutral-500 mb-2">
                            New Image Preview:
                        </p>
                        <img
                            :src="imagePreview"
                            alt="New image preview"
                            class="w-48 h-48 object-cover rounded-lg border border-neutral-200"
                        />
                    </div>

                    <div class="flex items-center space-x-3">
                        <label class="flex-1 cursor-pointer">
                            <input
                                type="file"
                                @change="handleImageChange"
                                accept="image/*"
                                class="hidden"
                                ref="fileInput"
                            />
                            <div
                                class="flex items-center justify-center px-4 py-2 border-2 border-dashed border-neutral-300 rounded-md hover:border-primary transition-colors"
                            >
                                <Upload class="w-5 h-5 mr-2 text-neutral-500" />
                                <span class="text-sm text-neutral-700">
                                    {{
                                        form.image
                                            ? form.image.name
                                            : "Click to select a new image"
                                    }}
                                </span>
                            </div>
                        </label>
                        <button
                            v-if="form.image"
                            @click="clearImage"
                            type="button"
                            class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            Clear
                        </button>
                    </div>
                    <p class="text-xs text-neutral-500 mt-1">
                        Upload a new image to replace the current one (JPG, PNG,
                        GIF, max 2MB)
                    </p>
                </div>

                <!-- Objectives Section -->
                <div class="mb-6 p-4 bg-neutral-50 rounded-lg">
                    <label
                        class="block text-sm font-medium text-neutral-900 mb-3"
                    >
                        Project Objectives
                    </label>
                    <p class="text-xs text-neutral-500 mb-3">
                        List the key objectives of this project
                    </p>

                    <div
                        v-for="(objective, index) in form.objectives"
                        :key="index"
                        class="flex items-center space-x-2 mb-2"
                    >
                        <input
                            v-model="form.objectives[index]"
                            type="text"
                            class="flex-1 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter objective"
                        />
                        <button
                            type="button"
                            @click="removeObjective(index)"
                            class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <X class="w-5 h-5" />
                        </button>
                    </div>

                    <button
                        type="button"
                        @click="addObjective"
                        class="mt-2 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary-50 transition-colors"
                    >
                        <Plus class="w-4 h-4 inline mr-1" />
                        Add Objective
                    </button>
                </div>

                <!-- Impact Metrics Section -->
                <div class="mb-6 p-4 bg-neutral-50 rounded-lg">
                    <label
                        class="block text-sm font-medium text-neutral-900 mb-3"
                    >
                        Impact Metrics
                    </label>
                    <p class="text-xs text-neutral-500 mb-3">
                        Define measurable impact metrics for this project
                    </p>

                    <!-- Add New Impact -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input
                            v-model="newImpact.metric"
                            type="text"
                            class="px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Metric name (e.g., Trees Planted)"
                        />
                        <input
                            v-model="newImpact.value"
                            type="text"
                            class="px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Value (e.g., 1000)"
                        />
                        <button
                            type="button"
                            @click="addImpact"
                            :disabled="!newImpact.metric || !newImpact.value"
                            class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Add Impact
                        </button>
                    </div>

                    <!-- Impact List -->
                    <div
                        v-if="Object.keys(form.impact).length > 0"
                        class="space-y-2"
                    >
                        <div
                            v-for="(value, key) in form.impact"
                            :key="key"
                            class="flex items-center justify-between p-3 bg-white rounded-md border border-neutral-200"
                        >
                            <span class="text-sm text-neutral-900">
                                <strong>{{ key }}:</strong> {{ value }}
                            </span>
                            <button
                                type="button"
                                @click="removeImpact(key)"
                                class="p-1 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <X class="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Error Summary -->
                <div
                    v-if="Object.keys(errors).length > 0"
                    class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
                >
                    <h4 class="text-sm font-semibold text-red-800 mb-2">
                        Please fix the following errors:
                    </h4>
                    <ul class="list-disc list-inside text-sm text-red-700">
                        <li v-for="(error, field) in errors" :key="field">
                            {{ error[0] }}
                        </li>
                    </ul>
                </div>

                <!-- Form Actions -->
                <div
                    class="flex items-center justify-end space-x-3 pt-6 border-t border-neutral-200"
                >
                    <router-link
                        :to="{ name: 'admin-projects' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
                    >
                        Cancel
                    </router-link>
                    <button
                        type="submit"
                        :disabled="submitting"
                        class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {{ submitting ? "Updating..." : "Update Project" }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Error State -->
        <div
            v-else
            class="bg-white rounded-lg border border-neutral-200 p-12 text-center"
        >
            <AlertCircle class="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">
                Project not found
            </h3>
            <router-link
                :to="{ name: 'admin-projects' }"
                class="btn-primary mt-4"
            >
                Back to Projects
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Upload, Plus, X, AlertCircle } from "lucide-vue-next";
import { useProjectsStore } from "@/stores/projects";

const route = useRoute();
const router = useRouter();
const projectsStore = useProjectsStore();

const form = ref({
    name: "",
    slug: "",
    description: "",
    full_description: "",
    image: null,
    status: "active",
    start_date: "",
    end_date: "",
    location: "",
    beneficiaries: null,
    objectives: [],
    impact: {},
});

const newImpact = ref({
    metric: "",
    value: "",
});

const currentImage = ref(null);
const imagePreview = ref(null);
const errors = ref({});
const loading = ref(false);
const submitting = ref(false);
const fileInput = ref(null);

const loadProject = async () => {
    loading.value = true;
    try {
        const projectId = route.params.id;
        const project = await projectsStore.fetchProject(projectId);

        // Populate form with project data
        form.value.name = project.name || "";
        form.value.slug = project.slug || "";
        form.value.description = project.description || "";
        form.value.full_description = project.fullDescription || "";
        form.value.status = project.status || "active";
        form.value.location = project.location || "";
        form.value.beneficiaries = project.beneficiaries || null;

        // Handle dates - convert ISO to YYYY-MM-DD format
        if (project.startDate) {
            form.value.start_date = project.startDate.split("T")[0];
        }
        if (project.endDate) {
            form.value.end_date = project.endDate.split("T")[0];
        }

        // Handle arrays and objects
        form.value.objectives = Array.isArray(project.objectives)
            ? [...project.objectives]
            : [];
        form.value.impact = project.impact ? { ...project.impact } : {};

        // Store current image URL
        currentImage.value = project.image;
    } catch (error) {
        console.error("Error loading project:", error);
        alert("Failed to load project");
    } finally {
        loading.value = false;
    }
};

const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        form.value.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const clearImage = () => {
    form.value.image = null;
    imagePreview.value = null;
    if (fileInput.value) {
        fileInput.value.value = "";
    }
};

const addObjective = () => {
    form.value.objectives.push("");
};

const removeObjective = (index) => {
    form.value.objectives.splice(index, 1);
};

const addImpact = () => {
    if (newImpact.value.metric && newImpact.value.value) {
        form.value.impact[newImpact.value.metric] = newImpact.value.value;
        newImpact.value.metric = "";
        newImpact.value.value = "";
    }
};

const removeImpact = (key) => {
    delete form.value.impact[key];
};

const handleSubmit = async () => {
    errors.value = {};
    submitting.value = true;

    try {
        const projectId = route.params.id;
        const formData = { ...form.value };

        // Filter out empty objectives
        formData.objectives = formData.objectives.filter(
            (obj) => obj.trim() !== ""
        );

        await projectsStore.updateProject(projectId, formData);

        // Success - redirect to projects list
        router.push({ name: "admin-projects" });
    } catch (error) {
        console.error("Error updating project:", error);

        if (error.errors) {
            errors.value = error.errors;
        } else {
            alert(error.message || "Failed to update project");
        }
    } finally {
        submitting.value = false;
    }
};

onMounted(() => {
    loadProject();
});
</script>
