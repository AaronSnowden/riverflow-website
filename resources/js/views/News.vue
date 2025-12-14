<template>
  <div>
    <!-- Hero with Background Image -->
    <section class="relative py-32 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=600&fit=crop"
          alt="News & Articles"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/75 to-black/60"
        ></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            News & Articles
          </h1>
          <p class="text-xl md:text-2xl text-white/90 font-thin">
            Stay updated with our latest stories, achievements, and media
            coverage
          </p>
        </div>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="py-8 bg-white border-b border-neutral-200">
      <div class="container-custom">
        <div class="flex gap-4 justify-center">
          <button
            @click="activeFilter = 'all'"
            :class="[
              'px-6 py-2 rounded-md font-medium transition-colors',
              activeFilter === 'all'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            ]"
          >
            All News
          </button>
          <button
            @click="activeFilter = 'internal'"
            :class="[
              'px-6 py-2 rounded-md font-medium transition-colors',
              activeFilter === 'internal'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            ]"
          >
            Our Stories
          </button>
          <button
            @click="activeFilter = 'external'"
            :class="[
              'px-6 py-2 rounded-md font-medium transition-colors',
              activeFilter === 'external'
                ? 'bg-primary text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
            ]"
          >
            External Media
          </button>
        </div>
      </div>
    </section>

    <!-- News Grid -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <div class="text-center">
            <Loader2 class="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p class="text-neutral-600 text-lg">Loading news articles...</p>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <AlertCircle class="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Unable to Load News</h3>
            <p class="text-neutral-600 mb-4">{{ error }}</p>
            <button
              @click="fetchPublicNews"
              class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center mx-auto"
            >
              <RefreshCcw class="w-4 h-4 mr-2" />
              Try Again
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredNews.length === 0 && publicNews.length > 0" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <FileText class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-neutral-900 mb-2">No Articles Found</h3>
            <p class="text-neutral-600">No articles match the selected filter.</p>
            <button
              @click="activeFilter = 'all'"
              class="mt-4 px-6 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium"
            >
              Show All Articles
            </button>
          </div>
        </div>

        <!-- No News State -->
        <div v-else-if="publicNews.length === 0 && !loading" class="text-center py-12">
          <div class="max-w-md mx-auto">
            <FileText class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-xl font-bold text-neutral-900 mb-2">No News Available</h3>
            <p class="text-neutral-600">There are currently no published news articles.</p>
          </div>
        </div>

        <!-- News Grid -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NewsCard
            v-for="article in filteredNews"
            :key="article.id"
            :article="article"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useNewsStore } from "@/stores/news";
import { Loader2, AlertCircle, RefreshCcw, FileText } from "lucide-vue-next";
import NewsCard from "@/components/NewsCard.vue";
import axios from "axios";

const newsStore = useNewsStore();
const activeFilter = ref("all");

// Loading and error states
const loading = ref(false);
const error = ref(null);
const publicNews = ref([]);

// Fetch public news from API
const fetchPublicNews = async () => {
  loading.value = true;
  error.value = null;

  try {
    const response = await axios.get('/api/news/published');
    publicNews.value = response.data.data || response.data;
    
    // Also update the news store for backward compatibility
    newsStore.allNews = publicNews.value;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to load news articles. Please try again.';
    console.error('Error fetching public news:', err);
  } finally {
    loading.value = false;
  }
};

const filteredNews = computed(() => {
  if (activeFilter.value === "all") return publicNews.value;
  return publicNews.value.filter(
    (article) => article.category === activeFilter.value
  );
});

// Mount hook to fetch data
onMounted(() => {
  fetchPublicNews();
});
</script>
