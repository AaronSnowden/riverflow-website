<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <!-- Not Found -->
        <div v-else-if="!newsletter" class="text-center py-12">
            <h2 class="text-2xl font-bold text-neutral-900 mb-4">Newsletter Not Found</h2>
            <p class="text-neutral-600 mb-6">The newsletter you're looking for doesn't exist.</p>
            <router-link :to="{ name: 'admin-newsletters' }" class="btn-primary">
                Back to Newsletters
            </router-link>
        </div>

        <!-- Newsletter Details -->
        <div v-else>
            <!-- Header -->
            <div class="mb-8 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <router-link
                        :to="{ name: 'admin-newsletters' }"
                        class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
                    >
                        <ArrowLeft class="w-5 h-5 text-neutral-600" />
                    </router-link>
                    <div>
                        <h1 class="text-3xl font-bold text-neutral-900">Newsletter Details</h1>
                        <p class="text-neutral-600 mt-1">View newsletter information</p>
                    </div>
                </div>
                <div class="flex items-center space-x-3">
                    <router-link
                        :to="{ name: 'admin-newsletters-edit', params: { id: newsletter.id } }"
                        class="btn-secondary"
                    >
                        <Edit class="w-4 h-4 mr-2" />
                        Edit
                    </router-link>
                    <button @click="confirmDelete" class="btn-danger">
                        <Trash2 class="w-4 h-4 mr-2" />
                        Delete
                    </button>
                </div>
            </div>

            <!-- Newsletter Info Card -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
                <div class="flex items-start space-x-6">
                    <!-- Icon -->
                    <div class="flex-shrink-0">
                        <div
                            class="w-24 h-24 rounded-lg flex items-center justify-center"
                            :class="newsletter.type === 'pdf' ? 'bg-red-50' : 'bg-primary-50'"
                        >
                            <FileText
                                v-if="newsletter.type === 'written'"
                                class="w-12 h-12 text-primary"
                            />
                            <FileType v-else class="w-12 h-12 text-red-600" />
                        </div>
                    </div>

                    <!-- Details -->
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <h2 class="text-2xl font-bold text-neutral-900">{{ newsletter.title }}</h2>
                            <span
                                :class="[
                                    'px-3 py-1 text-sm rounded-full font-medium',
                                    newsletter.status === 'published'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-yellow-100 text-yellow-800',
                                ]"
                            >
                                {{ newsletter.status }}
                            </span>
                            <span
                                :class="[
                                    'px-3 py-1 text-sm rounded-full font-medium',
                                    newsletter.type === 'written'
                                        ? 'bg-blue-100 text-blue-800'
                                        : 'bg-red-100 text-red-800',
                                ]"
                            >
                                {{ newsletter.type }}
                            </span>
                        </div>

                        <p v-if="newsletter.description" class="text-neutral-600 mb-4">
                            {{ newsletter.description }}
                        </p>

                        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p class="text-neutral-500 mb-1">Category</p>
                                <p class="font-medium text-neutral-900">
                                    {{ newsletter.category || "N/A" }}
                                </p>
                            </div>
                            <div>
                                <p class="text-neutral-500 mb-1">Published Date</p>
                                <p class="font-medium text-neutral-900">
                                    {{ formatDate(newsletter.published_date) }}
                                </p>
                            </div>
                            <div>
                                <p class="text-neutral-500 mb-1">Views</p>
                                <p class="font-medium text-neutral-900">{{ newsletter.views || 0 }}</p>
                            </div>
                            <div v-if="newsletter.type === 'pdf'">
                                <p class="text-neutral-500 mb-1">Downloads</p>
                                <p class="font-medium text-neutral-900">
                                    {{ newsletter.downloads || 0 }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content (for written newsletters) -->
            <div
                v-if="newsletter.type === 'written' && newsletter.content"
                class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
            >
                <h3 class="text-xl font-semibold text-neutral-900 mb-4">Content</h3>
                <div class="prose max-w-none" v-html="newsletter.content"></div>
            </div>

            <!-- PDF Info (for PDF newsletters) -->
            <div
                v-if="newsletter.type === 'pdf' && newsletter.pdf_file"
                class="bg-white rounded-lg border border-neutral-200 p-6"
            >
                <h3 class="text-xl font-semibold text-neutral-900 mb-4">PDF File</h3>
                <div class="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div class="flex items-center space-x-3">
                        <FileType class="w-8 h-8 text-red-600" />
                        <div>
                            <p class="font-medium text-neutral-900">Newsletter PDF</p>
                            <p class="text-sm text-neutral-500">{{ newsletter.pdf_file }}</p>
                        </div>
                    </div>
                    <button
                        @click="downloadPDF"
                        class="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                        <Download class="w-4 h-4" />
                        <span>Download</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
            <div class="flex items-center justify-center min-h-screen px-4">
                <div
                    class="fixed inset-0 bg-neutral-900 bg-opacity-75"
                    @click="showDeleteModal = false"
                ></div>
                <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
                    <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete Newsletter?</h3>
                    <p class="text-neutral-600 mb-6">
                        Are you sure you want to delete this newsletter? This action cannot be undone.
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
                            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Edit, Trash2, FileText, FileType, Download } from "lucide-vue-next";
import { useNewsletterStore } from "@/stores/newsletters";

const route = useRoute();
const router = useRouter();
const newslettersStore = useNewsletterStore();

const loading = ref(true);
const newsletter = ref(null);
const showDeleteModal = ref(false);

onMounted(async () => {
    const id = route.params.id;

    try {
        await newslettersStore.fetchNewsletterById(id);
        newsletter.value = newslettersStore.currentNewsletter;
    } catch (error) {
        console.error("Failed to fetch newsletter:", error);
    } finally {
        loading.value = false;
    }
});

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const confirmDelete = () => {
    showDeleteModal.value = true;
};

const handleDelete = async () => {
    try {
        await newslettersStore.deleteNewsletter(newsletter.value.id);
        router.push({ name: "admin-newsletters" });
    } catch (error) {
        console.error("Failed to delete newsletter:", error);
        alert("Failed to delete newsletter. Please try again.");
    }
};

const downloadPDF = async () => {
    try {
        await newslettersStore.downloadNewsletter(newsletter.value.id);
    } catch (error) {
        console.error("Failed to download PDF:", error);
        alert("Failed to download PDF. Please try again.");
    }
};
</script>
