<template>
  <div>
    <!-- Hero with Background Image -->
    <section class="relative py-32 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=600&fit=crop"
          alt="Opportunities"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/95 to-black/80"
        ></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            Opportunities
          </h1>
          <p class="text-xl md:text-2xl text-white/90">
            Join our team or volunteer to make a difference in African education
          </p>
        </div>
      </div>
    </section>

    <!-- Opportunities List -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div
          v-if="store.activeOpportunities.length > 0"
          class="max-w-4xl mx-auto space-y-6"
        >
          <div
            v-for="opportunity in store.activeOpportunities"
            :key="opportunity.id"
            class="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-2xl font-bold text-neutral-900">
                    {{ opportunity.title }}
                  </h3>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-medium',
                      opportunity.type === 'job'
                        ? 'bg-primary-100 text-primary-800'
                        : opportunity.type === 'internship'
                        ? 'bg-secondary-100 text-secondary-800'
                        : 'bg-accent-100 text-accent-800',
                    ]"
                  >
                    {{
                      opportunity.type.charAt(0).toUpperCase() +
                      opportunity.type.slice(1)
                    }}
                  </span>
                </div>
                <div class="flex items-center text-sm text-neutral-600">
                  <Calendar class="w-4 h-4 mr-2" />
                  <span>Deadline: {{ formatDate(opportunity.deadline) }}</span>
                </div>
              </div>
            </div>
            <p class="text-neutral-600 mb-4">{{ opportunity.description }}</p>
            <router-link :to="{ name: 'contact' }" class="btn-primary">
              Apply Now
            </router-link>
          </div>
        </div>
        <div v-else class="text-center py-12">
          <Briefcase class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
          <p class="text-neutral-600">
            No active opportunities at the moment. Check back soon!
          </p>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="py-20 bg-neutral-50">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="section-title">Our Newsletters</h2>
          <p class="section-subtitle">
            Download our quarterly newsletters to stay informed
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div
            v-for="newsletter in store.newsletters"
            :key="newsletter.id"
            class="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div class="h-48 bg-neutral-200 flex items-center justify-center">
              <FileText class="w-12 h-12 text-neutral-400" />
            </div>
            <div class="p-6">
              <h3 class="font-bold text-neutral-900 mb-2">
                {{ newsletter.title }}
              </h3>
              <p class="text-sm text-neutral-600 mb-4">
                {{ formatDate(newsletter.date) }}
              </p>
              <a :href="newsletter.pdfUrl" download class="btn-outline text-sm">
                <Download class="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Briefcase, Calendar, FileText, Download } from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
