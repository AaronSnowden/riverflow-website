<template>
    <div>
        <!-- Header -->
        <div class="mb-8 flex items-center justify-between">
            <div>
                <div class="flex items-center space-x-3 mb-2">
                    <router-link
                        :to="{ name: 'admin-gallery' }"
                        class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5 text-neutral-600" />
                    </router-link>
                    <h1 class="text-3xl font-bold text-neutral-900">
                        Upload Gallery Image
                    </h1>
                </div>
                <p class="text-neutral-600 ml-14">
                    Add a new image to the gallery
                </p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit" class="">
            <!-- Image Upload Section -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Image Upload
                </h2>

                <div class="space-y-4">

                    <!-- File Upload -->
                    <div class="space-y-4">
                        <!-- Drag and Drop Zone -->
                        <div
                            @dragover.prevent="dragOver = true"
                            @dragleave.prevent="dragOver = false"
                            @drop.prevent="handleFileDrop"
                            :class="[
                                'border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer',
                                dragOver
                                    ? 'border-primary bg-primary-50'
                                    : selectedFile
                                    ? 'border-green-300 bg-green-50'
                                    : 'border-neutral-300 hover:border-primary hover:bg-neutral-50',
                            ]"
                            @click="$refs.fileInput.click()"
                        >
                            <input
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                class="hidden"
                                @change="handleFileSelect"
                            />

                            <div v-if="!selectedFile">
                                <UploadCloud
                                    class="w-12 h-12 text-neutral-400 mx-auto mb-4"
                                />
                                <p
                                    class="text-sm font-medium text-neutral-700 mb-1"
                                >
                                    Drop your image here, or click to browse
                                </p>
                                <p class="text-xs text-neutral-500">
                                    Supports: JPG, PNG, GIF, WebP (max 10MB)
                                </p>
                            </div>

                            <div
                                v-else
                                class="flex items-center justify-center space-x-3"
                            >
                                <Check class="w-6 h-6 text-green-600" />
                                <div class="text-left">
                                    <p
                                        class="text-sm font-medium text-neutral-900"
                                    >
                                        {{ selectedFile.name }}
                                    </p>
                                    <p class="text-xs text-neutral-500">
                                        {{ formatFileSize(selectedFile.size) }}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    @click.stop="clearFile"
                                    class="p-1 text-red-600 hover:bg-red-50 rounded"
                                >
                                    <X class="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <!-- File Preview -->
                        <div
                            v-if="filePreview"
                            class="border border-neutral-200 rounded-lg p-4"
                        >
                            <p
                                class="text-sm font-medium text-neutral-700 mb-3"
                            >
                                Preview
                            </p>
                            <div
                                class="aspect-square max-w-sm mx-auto bg-neutral-100 rounded-lg overflow-hidden"
                            >
                                <img
                                    :src="filePreview"
                                    alt="Preview"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Image Details -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Image Details
                </h2>

                <div class="space-y-4">
                    <!-- Title -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Title <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.title"
                            type="text"
                            required
                            placeholder="e.g., Teacher Training Workshop - Kampala"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <p class="text-xs text-neutral-500 mt-1">
                            Give your image a descriptive title
                        </p>
                    </div>

                    <!-- Category -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Category <span class="text-red-500">*</span>
                        </label>
                        <select
                            v-model="form.category"
                            required
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="">Select a category</option>
                            <option value="Training">Training</option>
                            <option value="Activities">Activities</option>
                            <option value="Events">Events</option>
                        </select>
                        <p class="text-xs text-neutral-500 mt-1">
                            Choose the category that best describes this image
                        </p>
                    </div>

                    <!-- Date -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Date <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.date"
                            type="date"
                            required
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <p class="text-xs text-neutral-500 mt-1">
                            When was this photo taken?
                        </p>
                    </div>

                    <!-- Description (Optional) -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            v-model="form.description"
                            rows="3"
                            placeholder="Add any additional details about this image..."
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        ></textarea>
                        <p class="text-xs text-neutral-500 mt-1">
                            Optional description for internal reference
                        </p>
                    </div>

                    <!-- Photographer -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Photographer (Optional)
                        </label>
                        <input
                            v-model="form.photographer"
                            type="text"
                            placeholder="Photographer name"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <!-- Location -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Location (Optional)
                        </label>
                        <input
                            v-model="form.location"
                            type="text"
                            placeholder="Where was this taken?"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <!-- Status -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
                            Status
                        </label>
                        <select
                            v-model="form.status"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end space-x-4 pb-8">
                <router-link
                    :to="{ name: 'admin-gallery' }"
                    class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
                >
                    Cancel
                </router-link>
                <button
                    type="submit"
                    :disabled="submitting || !selectedFile"
                    class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center"
                >
                    <Upload class="w-4 h-4 mr-2" />
                    {{ submitting ? "Uploading..." : "Upload Image" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useGalleryStore } from '@/stores/gallery';
import {
    ArrowLeft,
    Upload,
    Info,
    UploadCloud,
    Link,
    Check,
    X,
} from "lucide-vue-next";

const router = useRouter();
const galleryStore = useGalleryStore();

const uploadMethod = ref("file"); // Only 'file' upload supported now
const selectedFile = ref(null);
const filePreview = ref(null);
const dragOver = ref(false);

const form = ref({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0], // Default to today
    description: "",
    photographer: "",
    location: "",
    status: "published",
});

const submitting = ref(false);
const imageError = ref(false);

const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
        processFile(file);
    }
};

const handleFileDrop = (event) => {
    dragOver.value = false;
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
        processFile(file);
    } else {
        alert("Please drop an image file");
    }
};

const processFile = (file) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
    }

    selectedFile.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
        filePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
};

const clearFile = () => {
    selectedFile.value = null;
    filePreview.value = null;
};

const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const handleSubmit = async () => {
    if (!selectedFile.value) {
        alert("Please select an image file.");
        return;
    }

    if (!form.value.title || !form.value.category || !form.value.date) {
        alert("Please fill in all required fields.");
        return;
    }

    submitting.value = true;
    try {
        // Create FormData for file upload
        const formData = new FormData();
        formData.append('image', selectedFile.value);
        formData.append('title', form.value.title);
        formData.append('category', form.value.category);
        formData.append('date', form.value.date);
        formData.append('status', form.value.status);
        
        if (form.value.description) {
            formData.append('description', form.value.description);
        }
        if (form.value.photographer) {
            formData.append('photographer', form.value.photographer);
        }
        if (form.value.location) {
            formData.append('location', form.value.location);
        }

        // Upload via gallery store
        await galleryStore.createGalleryItem(formData);

        alert("Gallery image uploaded successfully!");
        router.push({ name: "admin-gallery" });
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to upload image';
        const validationErrors = error.response?.data?.errors;
        
        if (validationErrors) {
            const errorList = Object.values(validationErrors).flat().join('\n');
            alert(`Validation errors:\n${errorList}`);
        } else {
            alert(errorMessage);
        }
        
        console.error('Upload error:', error);
    } finally {
        submitting.value = false;
    }
};
</script>
