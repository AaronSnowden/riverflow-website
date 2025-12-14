<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center">
          <router-link
            :to="{ name: 'admin-news' }"
            class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors mr-2"
          >
            <ArrowLeft class="w-5 h-5" />
          </router-link>
          <h1 class="text-3xl font-bold text-neutral-900">View News Article</h1>
        </div>
        <router-link
          v-if="!loading && article"
          :to="{ name: 'admin-news-edit', params: { id: route.params.id } }"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 transition-colors"
        >
          <Edit class="w-4 h-4 mr-2" />
          Edit Article
        </router-link>
      </div>
      <p class="text-neutral-600">Review the complete article details</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg border border-neutral-200 p-12">
      <div class="text-center">
        <Loader class="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p class="text-neutral-500">Loading article...</p>
      </div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="bg-white rounded-lg border border-neutral-200 p-12">
      <div class="text-center">
        <div class="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle class="w-8 h-8 text-red-500" />
        </div>
        <h3 class="text-lg font-semibold text-neutral-900 mb-2">Failed to Load Article</h3>
        <p class="text-neutral-600 mb-4">{{ error }}</p>
        <router-link
          :to="{ name: 'admin-news' }"
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 transition-colors"
        >
          Back to News
        </router-link>
      </div>
    </div>

    <!-- Article Content -->
    <div v-else-if="article" class="space-y-6">
      <!-- Metadata Card -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Article Information</h2>
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">Title</dt>
            <dd class="text-base text-neutral-900">{{ article.title }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">Author</dt>
            <dd class="text-base text-neutral-900">{{ article.author || 'Not specified' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">Category</dt>
            <dd>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                article.category === 'internal' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
              ]">
                {{ article.category ? article.category.charAt(0).toUpperCase() + article.category.slice(1) : 'N/A' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">Status</dt>
            <dd>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              ]">
                {{ article.status ? article.status.charAt(0).toUpperCase() + article.status.slice(1) : 'Draft' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">State</dt>
            <dd>
              <span :class="[
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                article.state === 'active' ? 'bg-green-100 text-green-800' : 
                article.state === 'inactive' ? 'bg-neutral-100 text-neutral-800' :
                'bg-red-100 text-red-800'
              ]">
                {{ article.state ? article.state.charAt(0).toUpperCase() + article.state.slice(1) : 'Active' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-neutral-500 mb-1">Published Date</dt>
            <dd class="text-base text-neutral-900">{{ formatDate(article.published_date) }}</dd>
          </div>
        </dl>
      </div>

      <!-- Excerpt -->
      <div v-if="article.excerpt" class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Excerpt</h2>
        <p class="text-neutral-700 leading-relaxed">{{ article.excerpt }}</p>
      </div>

      <!-- Featured Image -->
      <div v-if="article.image" class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Featured Image</h2>
        <div class="aspect-video rounded-lg overflow-hidden border border-neutral-200">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
            @error="imageError = true"
          />
        </div>
        <p v-if="imageError" class="text-sm text-red-500 mt-2">Failed to load image</p>
        <p v-else class="text-xs text-neutral-500 mt-2">{{ article.image }}</p>
      </div>

      <!-- Content Preview -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <h2 class="text-lg font-semibold text-neutral-900 mb-4">Article Content</h2>
        <div 
          class="prose prose-neutral max-w-none"
          v-html="article.content"
        ></div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-between pt-6 border-t border-neutral-200">
        <router-link
          :to="{ name: 'admin-news' }"
          class="inline-flex items-center px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Back to News
        </router-link>
        <div class="flex items-center space-x-3">
          <router-link
            :to="{ name: 'news-detail', params: { slug: article.slug || route.params.id } }"
            target="_blank"
            class="inline-flex items-center px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
          >
            <Eye class="w-4 h-4 mr-2" />
            Preview on Site
          </router-link>
          <router-link
            :to="{ name: 'admin-news-edit', params: { id: route.params.id } }"
            class="inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 transition-colors"
          >
            <Edit class="w-4 h-4 mr-2" />
            Edit Article
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeft, Edit, Loader, AlertCircle, Eye } from 'lucide-vue-next'
import { newsApi } from '@/api/news'

const route = useRoute()

const loading = ref(true)
const article = ref(null)
const error = ref(null)
const imageError = ref(false)

// Load news article
onMounted(async () => {
  try {
    article.value = await newsApi.getById(route.params.id)
  } catch (err) {
    console.error('Failed to load article:', err)
    error.value = err.message || 'Failed to load article. Please try again.'
  } finally {
    loading.value = false
  }
})

// Format date for display
const formatDate = (dateString) => {
  if (!dateString) return 'Not set'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch (err) {
    return dateString
  }
}
</script>
