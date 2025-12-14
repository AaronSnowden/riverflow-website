<template>
    <div>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Manage Newsletters</h1>
                <p class="text-neutral-600 mt-2">
                    Create, edit, and manage newsletters
                </p>
            </div>
            <router-link
                :to="{ name: 'admin-newsletters-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Create Newsletter
            </router-link>
        </div>

        <!-- Filter Tabs -->
        <div class="mb-6 flex items-center space-x-4 flex-wrap gap-2">
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

        <!-- Newsletters List -->
        <div
            v-else-if="newslettersList.length > 0"
            class="bg-white rounded-lg border border-neutral-200"
        >
            <div class="divide-y divide-neutral-200">
                <div
                    v-for="newsletter in newslettersList"
                    :key="newsletter.id"
                    class="p-6 hover:bg-neutral-50 transition-colors"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1 flex space-x-4">
                            <!-- Icon/Thumbnail -->
                            <div class="flex-shrink-0">
                                <div
                                    class="w-24 h-24 rounded-lg flex items-center justify-center"
                                    :class="newsletter.type === 'pdf' ? 'bg-red-50' : 'bg-primary-50'"
                                >
                                    <FileText
                                        v-if="newsletter.type === 'written'"
                                        class="w-10 h-10 text-primary"
                                    />
                                    <FileType
                                        v-else
                                        class="w-10 h-10 text-red-600"
                                    />
                                </div>
                            </div>

                            <!-- Content -->
                            <div class="flex-1">
                                <div class="flex items-center space-x-3 mb-2">
                                    <h3
                                        class="text-lg font-semibold text-neutral-900"
                                    >
                                        {{ newsletter.title }}
                                    </h3>
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs rounded font-medium',
                                            newsletter.type === 'written'
                                                ? 'bg-blue-100 text-blue-800'
                                                : 'bg-red-100 text-red-800',
                                        ]"
                                    >
                                        {{ newsletter.type }}
                                    </span>
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs rounded font-medium',
                                            newsletter.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800',
                                        ]"
                                    >
                                        {{ newsletter.status }}
                                    </span>
                                    <span
                                        v-if="newsletter.category"
                                        class="px-2 py-1 text-xs rounded font-medium bg-neutral-100 text-neutral-800"
                                    >
                                        {{ newsletter.category }}
                                    </span>
                                </div>

                                <p
                                    v-if="newsletter.description"
                                    class="text-sm text-neutral-600 mb-3 line-clamp-2"
                                >
                                    {{ newsletter.description }}
                                </p>

                                <div
                                    class="flex items-center space-x-4 text-xs text-neutral-500"
                                >
                                    <span class="flex items-center">
                                        <Eye class="w-3 h-3 mr-1" />
                                        {{ newsletter.views || 0 }} views
                                    </span>
                                    <span v-if="newsletter.type === 'pdf'" class="flex items-center">
                                        <Download class="w-3 h-3 mr-1" />
                                        {{ newsletter.downloads || 0 }} downloads
                                    </span>
                                    <span v-if="newsletter.published_date">
                                        {{ formatDate(newsletter.published_date) }}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center space-x-2 ml-4">
                            <router-link
                                :to="{
                                    name: 'admin-newsletters-view',
                                    params: { id: newsletter.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="View Details"
                            >
                                <Eye class="w-5 h-5" />
                            </router-link>
                            <router-link
                                :to="{
                                    name: 'admin-newsletters-edit',
                                    params: { id: newsletter.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="Edit"
                            >
                                <Edit class="w-5 h-5" />
                            </router-link>
                            <button
                                @click="confirmDelete(newsletter)"
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
            <Mail class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">
                No newsletters found
            </h3>
            <p class="text-neutral-600 mb-6">
                Get started by creating your first newsletter
            </p>
            <router-link
                :to="{ name: 'admin-newsletters-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Create Newsletter
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
                        Delete Newsletter?
                    </h3>
                    <p class="text-neutral-600 mb-6">
                        Are you sure you want to delete "{{
                            itemToDelete?.title
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
import { ref, computed, onMounted, watch } from "vue";
import { Plus, Eye, Edit, Trash2, Mail, FileText, FileType, Download } from "lucide-vue-next";
import { useNewsletterStore } from "@/stores/newsletters";

const newslettersStore = useNewsletterStore();

const loading = ref(false);
const activeTab = ref("all");
const showDeleteModal = ref(false);
const itemToDelete = ref(null);

const tabs = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Drafts", value: "draft" },
    { label: "Written", value: "written" },
    { label: "PDF", value: "pdf" },
];

const newslettersList = computed(() => {
    let list = newslettersStore.newsletters;

    if (activeTab.value === "published") {
        return list.filter((n) => n.status === "published");
    } else if (activeTab.value === "draft") {
        return list.filter((n) => n.status === "draft");
    } else if (activeTab.value === "written") {
        return list.filter((n) => n.type === "written");
    } else if (activeTab.value === "pdf") {
        return list.filter((n) => n.type === "pdf");
    }

    return list;
});

const fetchNewsletters = async () => {
    loading.value = true;
    try {
        await newslettersStore.fetchNewsletters();
    } catch (error) {
        console.error("Failed to fetch newsletters:", error);
    } finally {
        loading.value = false;
    }
};

const confirmDelete = (newsletter) => {
    itemToDelete.value = newsletter;
    showDeleteModal.value = true;
};

const handleDelete = async () => {
    if (!itemToDelete.value) return;

    try {
        await newslettersStore.deleteNewsletter(itemToDelete.value.id);
        showDeleteModal.value = false;
        itemToDelete.value = null;
    } catch (error) {
        console.error("Failed to delete newsletter:", error);
        alert("Failed to delete newsletter. Please try again.");
    }
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

onMounted(() => {
    fetchNewsletters();
});

watch(activeTab, () => {
    // Could add server-side filtering here if needed
});
</script>
