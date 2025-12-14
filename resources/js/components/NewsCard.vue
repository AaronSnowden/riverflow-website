<template>
  <router-link
    :to="{ name: 'news-detail', params: { slug: article.slug } }"
    class="block bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
  >
    <!-- Image -->
    <div class="relative h-48 overflow-hidden bg-neutral-200">
      <img
        v-if="article.image"
        :src="article.image"
        :alt="article.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div v-else class="w-full h-full flex items-center justify-center">
        <Newspaper class="w-12 h-12 text-neutral-400" />
      </div>
    </div>

    <div class="p-6">
      <div
        class="flex items-center justify-between text-sm text-neutral-600 mb-2"
      >
        <span>{{ formatDate(article.published_date) }}</span>
        <span
          v-if="article.category === 'external'"
          class="px-2 py-1 bg-accent-100 text-accent-700 rounded text-xs font-medium"
        >
          External
        </span>
      </div>
      <h3 class="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
        {{ article.title }}
      </h3>
      <p class="text-neutral-600 text-sm line-clamp-3 mb-3">
        {{ article.excerpt }}
      </p>
      <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-neutral-500">
          <User class="w-4 h-4 mr-1" />
          <span>{{ article.author }}</span>
        </div>
        <!-- Read More Link -->
        <div class="text-sm font-semibold text-primary group-hover:text-primary-700 inline-flex items-center transition-colors">
          Read More
          <ArrowRight class="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { Newspaper, User, ArrowRight } from "lucide-vue-next";

defineProps({
  article: {
    type: Object,
    required: true,
  },
});

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
</script>
