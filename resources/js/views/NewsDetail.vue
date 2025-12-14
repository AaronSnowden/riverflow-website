<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-neutral-600">Loading article...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="!article && !loading" class="min-h-screen flex items-center justify-center bg-neutral-50">
      <div class="text-center max-w-md mx-auto p-8">
        <div class="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle class="w-10 h-10 text-neutral-500" />
        </div>
        <h2 class="text-3xl font-bold text-neutral-900 mb-4">Article Not Found</h2>
        <p class="text-neutral-600 mb-8">{{ error || "The article you're looking for doesn't exist or has been removed." }}</p>
        <router-link :to="{ name: 'news' }" class="btn-primary">
          <ArrowLeft class="w-4 h-4 inline mr-2" />
          Back to News
        </router-link>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else>
      <!-- Hero Image Section -->
      <section class="relative h-[60vh] min-h-[400px] overflow-hidden bg-neutral-900">
        <img
          v-if="article.image"
          :src="article.image"
          :alt="article.title"
          class="w-full h-full object-cover opacity-60"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div class="absolute inset-0 flex items-end">
          <div class="container-custom pb-12">
            <div class="max-w-4xl">
              <!-- Breadcrumb -->
              <nav class="flex items-center space-x-2 text-sm text-white/80 mb-6">
                <router-link :to="{ name: 'home' }" class="hover:text-white transition-colors">
                  Home
                </router-link>
                <ChevronRight class="w-4 h-4" />
                <router-link :to="{ name: 'news' }" class="hover:text-white transition-colors">
                  News
                </router-link>
                <ChevronRight class="w-4 h-4" />
                <span class="text-white">{{ article.title }}</span>
              </nav>

              <!-- Category Badge -->
              <div class="mb-4">
                <span
                  v-if="article.category === 'external'"
                  class="inline-flex items-center px-4 py-2 bg-accent text-white rounded-full text-sm font-medium"
                >
                  <ExternalLink class="w-4 h-4 mr-2" />
                  External Media
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-medium"
                >
                  <Newspaper class="w-4 h-4 mr-2" />
                  STIA News
                </span>
              </div>

              <!-- Title -->
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {{ article.title }}
              </h1>

              <!-- Meta Information -->
              <div class="flex flex-wrap items-center gap-6 text-white/90">
                <div class="flex items-center">
                  <Calendar class="w-5 h-5 mr-2" />
                  <span>{{ formatDate(article.published_date) }}</span>
                </div>
                <div class="flex items-center">
                  <User class="w-5 h-5 mr-2" />
                  <span>{{ article.author }}</span>
                </div>
                <div v-if="article.external_source" class="flex items-center">
                  <Building class="w-5 h-5 mr-2" />
                  <span>{{ article.external_source }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Article Body -->
      <section class="py-16 bg-white">
        <div class="container-custom">
          <div class="max-w-4xl mx-auto">
            <!-- Excerpt -->
            <div class="bg-neutral-50 border-l-4 border-primary p-6 rounded-r-lg mb-12">
              <p class="text-xl text-neutral-700 leading-relaxed font-medium">
                {{ article.excerpt }}
              </p>
            </div>

            <!-- Main Content -->
            <div class="prose prose-lg max-w-none">
              <div v-html="article.content" class="article-content"></div>
            </div>

            <!-- Share Section -->
            <div class="mt-16 pt-8 border-t border-neutral-200">
              <h3 class="text-lg font-semibold text-neutral-900 mb-4">Share this article</h3>
              <div class="flex gap-3">
                <button
                  @click="shareOnTwitter"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter class="w-5 h-5" />
                </button>
                <button
                  @click="shareOnFacebook"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-[#4267B2] text-white hover:bg-[#385898] transition-colors"
                  aria-label="Share on Facebook"
                >
                  <Facebook class="w-5 h-5" />
                </button>
                <button
                  @click="shareOnLinkedIn"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-[#0077B5] text-white hover:bg-[#006399] transition-colors"
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin class="w-5 h-5" />
                </button>
                <button
                  @click="copyLink"
                  class="flex items-center justify-center w-12 h-12 rounded-full bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                  aria-label="Copy link"
                >
                  <Link2 v-if="!copied" class="w-5 h-5" />
                  <Check v-else class="w-5 h-5 text-primary" />
                </button>
              </div>
              <p v-if="copied" class="text-sm text-primary mt-2">Link copied to clipboard!</p>
            </div>

            <!-- Back to News -->
            <div class="mt-12">
              <router-link
                :to="{ name: 'news' }"
                class="inline-flex items-center text-primary hover:text-primary-700 font-semibold transition-colors"
              >
                <ArrowLeft class="w-5 h-5 mr-2" />
                Back to All News
              </router-link>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Articles -->
      <section v-if="relatedArticles && relatedArticles.length > 0" class="py-20 bg-neutral-50">
        <div class="container-custom">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 mb-12 text-center">
              Related Articles
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <NewsCard
                v-for="relatedArticle in relatedArticles"
                :key="relatedArticle.id"
                :article="relatedArticle"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewsCard from '@/components/NewsCard.vue';
import axios from 'axios';
import {
  Calendar,
  User,
  Building,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Newspaper,
  AlertCircle,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  Check,
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const loading = ref(true);
const copied = ref(false);
const article = ref(null);
const relatedArticles = ref([]);
const error = ref(null);

// Fetch article by slug or ID
const fetchArticle = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const identifier = route.params.slug;
    const response = await axios.get(`/api/news/${identifier}`);
    
    if (response.data.success) {
      article.value = response.data.data;
      
      // Fetch related articles
      await fetchRelatedArticles();
    } else {
      article.value = null;
    }
  } catch (err) {
    console.error('Error fetching article:', err);
    article.value = null;
    error.value = err.response?.data?.message || 'Article not found';
  } finally {
    loading.value = false;
  }
};

// Fetch related articles (same category)
const fetchRelatedArticles = async () => {
  if (!article.value) return;
  
  try {
    const response = await axios.get('/api/news/published', {
      params: {
        category: article.value.category,
        per_page: 4
      }
    });
    
    const articles = response.data.data || response.data;
    // Filter out current article and limit to 3
    relatedArticles.value = articles
      .filter(item => item.id !== article.value.id)
      .slice(0, 3);
  } catch (err) {
    console.error('Error fetching related articles:', err);
    relatedArticles.value = [];
  }
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Share functions
const shareOnTwitter = () => {
  if (!article.value) return;
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(article.value.title);
  window.open(
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
    '_blank'
  );
};

const shareOnFacebook = () => {
  if (!article.value) return;
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    '_blank'
  );
};

const shareOnLinkedIn = () => {
  if (!article.value) return;
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    '_blank'
  );
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

// Mount hook
onMounted(() => {
  fetchArticle();
});
</script>

<style scoped>
@reference '../../../resources/css/app.css';

/* Article content styling */
:deep(.article-content) {
  @apply text-neutral-700 leading-relaxed;
}

:deep(.article-content p) {
  @apply mb-6 text-lg leading-relaxed;
}

:deep(.article-content h2) {
  @apply text-2xl font-bold text-neutral-900 mt-12 mb-6;
}

:deep(.article-content h3) {
  @apply text-xl font-bold text-neutral-900 mt-10 mb-4;
}

:deep(.article-content ul),
:deep(.article-content ol) {
  @apply mb-6 ml-6;
}

:deep(.article-content li) {
  @apply mb-2;
}

:deep(.article-content a) {
  @apply text-primary hover:text-primary-700 underline;
}

:deep(.article-content img) {
  @apply rounded-lg shadow-lg my-8 w-full;
}

:deep(.article-content blockquote) {
  @apply border-l-4 border-primary pl-6 py-4 my-8 italic text-neutral-600 bg-neutral-50 rounded-r;
}
</style>
