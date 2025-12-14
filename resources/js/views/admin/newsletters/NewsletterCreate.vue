<template>
    <div>
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
                    <h1 class="text-3xl font-bold text-neutral-900">
                        Create Newsletter
                    </h1>
                </div>
                <p class="text-neutral-600 ml-14">
                    Create a new newsletter by writing content or uploading a PDF
                </p>
            </div>
        </div>

        <form @submit.prevent="handleSubmit">
            <!-- Newsletter Type Selection -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Newsletter Type
                </h2>
                <div class="flex space-x-4">
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            v-model="form.type"
                            value="written"
                            class="w-4 h-4 text-primary"
                        />
                        <FileText class="w-5 h-5 text-neutral-600" />
                        <span class="text-neutral-700">Write Newsletter</span>
                    </label>
                    <label class="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="radio"
                            v-model="form.type"
                            value="pdf"
                            class="w-4 h-4 text-primary"
                        />
                        <FileUp class="w-5 h-5 text-neutral-600" />
                        <span class="text-neutral-700">Upload PDF</span>
                    </label>
                </div>
            </div>

            <!-- Basic Information -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Basic Information
                </h2>

                <div class="space-y-4">
                    <!-- Title -->
                    <div>
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
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
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
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
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
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
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
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
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
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
                        <label
                            class="block text-sm font-medium text-neutral-700 mb-2"
                        >
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

            <!-- Written Content (if type is 'written') -->
            <div
                v-if="form.type === 'written'"
                class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
            >
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Newsletter Content
                </h2>
                <RichTextEditor v-model="form.content" />
            </div>

            <!-- PDF Upload (if type is 'pdf') -->
            <div
                v-if="form.type === 'pdf'"
                class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
            >
                <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                    Upload PDF File
                </h2>
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
                                Click to upload
                            </button>
                            <span class="text-neutral-600"> or drag and drop</span>
                        </div>
                        <p class="text-sm text-neutral-500">
                            PDF file up to 10MB
                        </p>
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
                    {{ submitting ? "Creating..." : "Create Newsletter" }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, Save, FileText, FileUp, Upload, FileCheck } from "lucide-vue-next";
import { useNewsletterStore } from "@/stores/newsletters";
import RichTextEditor from "@/components/RichTextEditor.vue";

const router = useRouter();
const newslettersStore = useNewsletterStore();

const submitting = ref(false);
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
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
};

const handleSubmit = async () => {
    // Validation
    if (form.value.type === "pdf" && !form.value.pdfFile) {
        alert("Please upload a PDF file");
        return;
    }

    if (form.value.type === "written" && !form.value.content) {
        alert("Please write newsletter content");
        return;
    }

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
        } else {
            data.pdfFile = form.value.pdfFile;
        }

        await newslettersStore.createNewsletter(data);

        alert("Newsletter created successfully!");
        router.push({ name: "admin-newsletters" });
    } catch (error) {
        console.error("Failed to create newsletter:", error);

        let errorMessage = "Failed to create newsletter. Please try again.";
        if (
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            const errors = error.response.data.errors;
            errorMessage = Object.values(errors).flat().join("\n");
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
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
