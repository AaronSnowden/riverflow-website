<template>
    <div>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">Manage News</h1>
                <p class="text-neutral-600 mt-2">
                    Create, edit, and manage news articles
                </p>
            </div>
            <router-link
                :to="{ name: 'admin-news-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Add News Article
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

        <!-- News List -->
        <div
            v-else-if="newsList.length > 0"
            class="bg-white rounded-lg border border-neutral-200"
        >
            <div class="divide-y divide-neutral-200">
                <div
                    v-for="article in newsList"
                    :key="article.id"
                    class="p-6 hover:bg-neutral-50 transition-colors"
                >
                    <div class="flex items-start justify-between">
                        <div class="flex-1 flex space-x-4">
                            <!-- Image Thumbnail -->
                            <div class="flex-shrink-0">
                                <div
                                    v-if="article.image"
                                    class="w-24 h-24 rounded-lg overflow-hidden bg-neutral-200"
                                >
                                    <img
                                        :src="article.image"
                                        :alt="article.title"
                                        class="w-full h-full object-cover"
                                    />
                                </div>
                                <div
                                    v-else
                                    class="w-24 h-24 rounded-lg bg-neutral-200 flex items-center justify-center"
                                >
                                    <Newspaper
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
                                        {{ article.title }}
                                    </h3>
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs rounded font-medium',
                                            article.category === 'internal'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-accent-100 text-accent-800',
                                        ]"
                                    >
                                        {{ article.category }}
                                    </span>
                                    <span
                                        :class="[
                                            'px-2 py-1 text-xs rounded font-medium',
                                            article.status === 'published'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800',
                                        ]"
                                    >
                                        {{ article.status }}
                                    </span>
                                </div>

                                <p
                                    v-if="article.excerpt"
                                    class="text-sm text-neutral-600 mb-3 line-clamp-2"
                                >
                                    {{ article.excerpt }}
                                </p>

                                <div
                                    class="flex items-center space-x-4 text-xs text-neutral-500"
                                >
                                    <span v-if="article.author"
                                        >By {{ article.author }}</span
                                    >
                                    <span>{{
                                        formatDate(article.published_date)
                                    }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Actions -->
                        <div class="flex items-center space-x-2 ml-4">
                            <router-link
                                :to="{
                                    name: 'admin-news-view',
                                    params: { id: article.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="View Details"
                            >
                                <Eye class="w-5 h-5" />
                            </router-link>
                            <router-link
                                :to="{
                                    name: 'admin-news-edit',
                                    params: { id: article.id },
                                }"
                                class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                                title="Edit"
                            >
                                <Edit class="w-5 h-5" />
                            </router-link>
                            <button
                                @click="confirmDelete(article)"
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
            <Newspaper class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">
                No news articles found
            </h3>
            <p class="text-neutral-600 mb-6">
                Get started by creating your first news article
            </p>
            <router-link
                :to="{ name: 'admin-news-create' }"
                class="btn-primary"
            >
                <Plus class="w-5 h-5 mr-2" />
                Create News Article
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
                        Delete News Article?
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
import { Plus, Newspaper, Eye, Edit, Trash2 } from "lucide-vue-next";
import { useNewsStore } from "@/stores/news";
import { storeToRefs } from "pinia";

const newsStore = useNewsStore();
const { allNews, loading, error } = storeToRefs(newsStore);

const tabs = [
    { label: "All", value: "all" },
    { label: "Published", value: "published" },
    { label: "Draft", value: "draft" },
];

const activeTab = ref("all");
const showDeleteModal = ref(false);
const itemToDelete = ref(null);
const deleting = ref(false);

// Fetch news from store
const fetchNews = async () => {
    const params = {};

    // Add filter based on active tab
    if (activeTab.value !== "all") {
        params.status = activeTab.value;
    }

    try {
        await newsStore.fetchNews(params);
    } catch (err) {
        // Error is already handled in the store
    }
};

// Get filtered news list from store
const newsList = computed(() => {
    return allNews.value;
});

const confirmDelete = (article) => {
    itemToDelete.value = article;
    showDeleteModal.value = true;
};

const handleDelete = async () => {
    if (!itemToDelete.value) return;

    deleting.value = true;
    try {
        await newsStore.deleteNews(itemToDelete.value.id);

        showDeleteModal.value = false;
        itemToDelete.value = null;
    } catch (error) {
        console.error("Failed to delete news:", error);
        alert("Failed to delete news article. Please try again.");
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

// Watch for tab changes and refetch
watch(activeTab, () => {
    fetchNews();
});

// Fetch on mount
onMounted(() => {
    fetchNews();
});
</script>
