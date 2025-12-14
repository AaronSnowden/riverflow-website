<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <!-- Edit Form -->
        <div v-else-if="newsletter">
            <!-- Header -->
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <div class="flex items-center space-x-3 mb-2">
                        <router-link
                            :to="{ name: 'admin-newsletters' }"
                            class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
                        >
                            <ArrowLeft class="w-5 h-5 text-neutral-600" />
                        </router-link>
                        <h1 class="text-3xl font-bold text-neutral-900">Edit Newsletter</h1>
                    </div>
                    <p class="text-neutral-600 ml-14">Update newsletter information</p>
                </div>
            </div>

            <form @submit.prevent="handleSubmit">
                <!-- Basic Information -->
                <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Basic Information
                    </h2>

                    <div class="space-y-4">
                        <!-- Title -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">
                                Newsletter Title <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.title"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <!-- Description -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">
                                Short Description
                            </label>
                            <textarea
                                v-model="form.description"
                                rows="3"
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            ></textarea>
                        </div>

                        <!-- Cover Image URL -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">
                                Cover Image URL
                            </label>
                            <input
                                v-model="form.coverImage"
                                type="url"
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Category -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">
                                    Category
                                </label>
                                <select
                                    v-model="form.category"
                                    class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                >
                                    <option value="">Select category</option>
                                    <option value="Monthly">Monthly</option>
                                    <option value="Quarterly">Quarterly</option>
                                    <option value="Annual">Annual</option>
                                    <option value="Special Edition">Special Edition</option>
                                    <option value="Research">Research</option>
                                    <option value="Updates">Updates</option>
                                </select>
                            </div>

                            <!-- Published Date -->
                            <div>
                                <label class="block text-sm font-medium text-neutral-700 mb-2">
                                    Published Date
                                </label>
                                <input
                                    v-model="form.publishedDate"
                                    type="date"
                                    class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                            </div>
                        </div>

                        <!-- Status -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">
                                Status <span class="text-red-500">*</span>
                            </label>
                            <select
                                v-model="form.status"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- Content (for written newsletters) -->
                <div
                    v-if="form.type === 'written'"
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Newsletter Content
                    </h2>
                    <RichTextEditor v-model="form.content" />
                </div>

                <!-- PDF Upload (for PDF newsletters) -->
                <div
                    v-if="form.type === 'pdf'"
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        PDF File
                    </h2>

                    <!-- Current PDF -->
                    <div v-if="newsletter.pdf_file && !form.pdfFile" class="mb-4 p-4 bg-neutral-50 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <FileType class="w-8 h-8 text-red-600" />
                                <div>
                                    <p class="font-medium text-neutral-900">Current PDF</p>
                                    <p class="text-sm text-neutral-500">{{ newsletter.pdf_file }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Upload New PDF -->
                    <div
                        class="border-2 border-dashed border-neutral-300 rounded-lg p-8 text-center"
                        @dragover.prevent
                        @drop.prevent="handleDrop"
                    >
                        <input
                            type="file"
                            ref="fileInput"
                            @change="handleFileChange"
                            accept=".pdf"
                            class="hidden"
                        />

                        <div v-if="!form.pdfFile" class="space-y-4">
                            <Upload class="w-16 h-16 text-neutral-400 mx-auto" />
                            <div>
                                <button
                                    type="button"
                                    @click="$refs.fileInput.click()"
                                    class="text-primary hover:text-primary-600 font-medium"
                                >
                                    Click to upload new PDF
                                </button>
                                <span class="text-neutral-600"> or drag and drop</span>
                            </div>
                            <p class="text-sm text-neutral-500">PDF file up to 10MB</p>
                        </div>

                        <div v-else class="space-y-4">
                            <FileCheck class="w-16 h-16 text-primary mx-auto" />
                            <div class="text-neutral-900 font-medium">
                                {{ form.pdfFile.name }}
                            </div>
                            <div class="text-sm text-neutral-600">
                                {{ formatFileSize(form.pdfFile.size) }}
                            </div>
                            <button
                                type="button"
                                @click="removePdfFile"
                                class="text-red-600 hover:text-red-700 text-sm font-medium"
                            >
                                Remove file
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 pb-8">
                    <router-link
                        :to="{ name: 'admin-newsletters' }"
                        class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
                    >
                        Cancel
                    </router-link>
                    <button
                        type="submit"
                        :disabled="submitting"
                        class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center"
                    >
                        <Save class="w-4 h-4 mr-2" />
                        {{ submitting ? "Saving..." : "Save Changes" }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Save, Upload, FileCheck, FileType } from "lucide-vue-next";
import { useNewsletterStore } from "@/stores/newsletters";
import RichTextEditor from "@/components/RichTextEditor.vue";

const route = useRoute();
const router = useRouter();
const newslettersStore = useNewsletterStore();

const loading = ref(true);
const submitting = ref(false);
const newsletter = ref(null);
const fileInput = ref(null);

const form = ref({
    title: "",
    description: "",
    content: "",
    pdfFile: null,
    coverImage: "",
    publishedDate: "",
    status: "draft",
    type: "written",
    category: "",
});

onMounted(async () => {
    const id = route.params.id;

    try {
        await newslettersStore.fetchNewsletterById(id);
        newsletter.value = newslettersStore.currentNewsletter;

        if (newsletter.value) {
            // Format date for input
            const formatDateForInput = (dateStr) => {
                if (!dateStr) return "";
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
                const date = new Date(dateStr);
                return date.toISOString().split("T")[0];
            };

            form.value = {
                title: newsletter.value.title || "",
                description: newsletter.value.description || "",
                content: newsletter.value.content || "",
                pdfFile: null,
                coverImage: newsletter.value.cover_image || "",
                publishedDate: formatDateForInput(newsletter.value.published_date),
                status: newsletter.value.status || "draft",
                type: newsletter.value.type || "written",
                category: newsletter.value.category || "",
            };
        }
    } catch (error) {
        console.error("Failed to fetch newsletter:", error);
    } finally {
        loading.value = false;
    }
});

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
        if (file.size <= 10 * 1024 * 1024) {
            form.value.pdfFile = file;
        } else {
            alert("File size must be less than 10MB");
        }
    } else {
        alert("Please select a PDF file");
    }
};

const handleDrop = (event) => {
    const file = event.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
        if (file.size <= 10 * 1024 * 1024) {
            form.value.pdfFile = file;
        } else {
            alert("File size must be less than 10MB");
        }
    } else {
        alert("Please drop a PDF file");
    }
};

const removePdfFile = () => {
    form.value.pdfFile = null;
    if (fileInput.value) {
        fileInput.value.value = "";
    }
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const handleSubmit = async () => {
    submitting.value = true;

    try {
        const data = {
            title: form.value.title,
            description: form.value.description,
            cover_image: form.value.coverImage,
            published_date: form.value.publishedDate,
            status: form.value.status,
            type: form.value.type,
            category: form.value.category,
        };

        if (form.value.type === "written") {
            data.content = form.value.content;
        } else if (form.value.pdfFile) {
            data.pdfFile = form.value.pdfFile;
        }

        await newslettersStore.updateNewsletter(route.params.id, data);

        alert("Newsletter updated successfully!");
        router.push({ name: "admin-newsletters" });
    } catch (error) {
        console.error("Failed to update newsletter:", error);

        let errorMessage = "Failed to update newsletter. Please try again.";
        if (error.response && error.response.data && error.response.data.errors) {
            const errors = error.response.data.errors;
            errorMessage = Object.values(errors).flat().join("\n");
        } else if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        alert(errorMessage);
    } finally {
        submitting.value = false;
    }
};
</script>
