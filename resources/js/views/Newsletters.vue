<template>
    <div>
        <!-- Hero Section with Background -->
        <section class="relative py-32 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1504711331083-9c895941bf81?w=1920&h=600&fit=crop"
                    alt="Newsletters"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/85 to-black/70"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-3xl">
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                        Newsletters
                    </h1>
                    <p class="text-xl md:text-2xl text-white/90">
                        Stay updated with our latest newsletters featuring
                        insights, stories, and updates from across Africa.
                    </p>
                </div>
            </div>
        </section>

        <!-- Newsletters Grid -->
        <section class="py-20 bg-neutral-50">
            <div class="container-custom">
                <!-- Loading State -->
                <div
                    v-if="loading"
                    class="flex items-center justify-center py-12"
                >
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
                    ></div>
                </div>

                <!-- Newsletters List -->
                <div
                    v-else-if="newsletters.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <div
                        v-for="newsletter in newsletters"
                        :key="newsletter.id"
                        class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                    >
                        <!-- Thumbnail -->
                        <div class="relative h-64 bg-neutral-200">
                            <img
                                v-if="newsletter.cover_image"
                                :src="newsletter.cover_image"
                                :alt="newsletter.title"
                                class="w-full h-full object-cover"
                            />
                            <div
                                v-else
                                class="w-full h-full flex items-center justify-center"
                                :class="
                                    newsletter.type === 'pdf'
                                        ? 'bg-red-50'
                                        : 'bg-primary-50'
                                "
                            >
                                <FileText
                                    class="w-20 h-20"
                                    :class="
                                        newsletter.type === 'pdf'
                                            ? 'text-red-400'
                                            : 'text-primary-400'
                                    "
                                />
                            </div>

                            <!-- Type Badge -->
                            <div
                                class="absolute top-4 left-4 px-3 py-1 rounded-full shadow-md"
                                :class="
                                    newsletter.type === 'pdf'
                                        ? 'bg-red-600'
                                        : 'bg-blue-600'
                                "
                            >
                                <span
                                    class="text-xs font-semibold text-white uppercase"
                                >
                                    {{ newsletter.type }}
                                </span>
                            </div>

                            <!-- Date Badge -->
                            <div
                                class="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md"
                            >
                                <span
                                    class="text-xs font-semibold text-primary"
                                >
                                    {{ formatDate(newsletter.published_date) }}
                                </span>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                {{ newsletter.title }}
                            </h3>

                            <p
                                v-if="newsletter.description"
                                class="text-neutral-600 text-sm mb-4 line-clamp-2"
                            >
                                {{ newsletter.description }}
                            </p>

                            <!-- Category Badge -->
                            <div v-if="newsletter.category" class="mb-3">
                                <span
                                    class="text-xs font-medium text-neutral-500 uppercase"
                                >
                                    {{ newsletter.category }}
                                </span>
                            </div>

                            <!-- Actions -->
                            <div class="flex items-center space-x-3">
                                <!-- For PDF newsletters -->
                                <template
                                    v-if="
                                        newsletter.type === 'pdf' &&
                                        newsletter.pdf_file
                                    "
                                >
                                    <a
                                        :href="getDownloadUrl(newsletter.id)"
                                        @click.prevent="
                                            downloadNewsletter(newsletter.id)
                                        "
                                        class="flex-1 btn-primary text-center inline-flex items-center justify-center"
                                    >
                                        <Download class="w-4 h-4 mr-2" />
                                        Download PDF
                                    </a>
                                    <a
                                        :href="getDownloadUrl(newsletter.id)"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="p-2 text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                        title="View"
                                    >
                                        <Eye class="w-5 h-5" />
                                    </a>
                                </template>

                                <!-- For written newsletters -->
                                <template v-else>
                                    <button
                                        @click="viewNewsletter(newsletter)"
                                        class="flex-1 btn-primary text-center inline-flex items-center justify-center"
                                    >
                                        <Eye class="w-4 h-4 mr-2" />
                                        Read Newsletter
                                    </button>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-12">
                    <FileText class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 class="text-xl font-semibold text-neutral-900 mb-2">
                        No newsletters available
                    </h3>
                    <p class="text-neutral-600">
                        Check back soon for our latest newsletters
                    </p>
                </div>
            </div>
        </section>

        <!-- Newsletter Signup Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-2xl mx-auto text-center">
                    <div class="bg-primary/10 rounded-2xl p-8 md:p-12">
                        <Mail class="w-12 h-12 text-primary mx-auto mb-4" />
                        <h2 class="text-3xl font-bold text-neutral-900 mb-4">
                            Subscribe to Our Newsletter
                        </h2>
                        <p class="text-lg text-neutral-600 mb-6">
                            Get the latest newsletters delivered directly to
                            your inbox. Stay informed about our programs, impact
                            stories, and educational insights from across
                            Africa.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                        >
                            <input
                                v-model="email"
                                type="email"
                                placeholder="Enter your email"
                                class="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                            <button
                                @click="subscribe"
                                :disabled="subscribing"
                                class="btn-primary whitespace-nowrap"
                            >
                                {{
                                    subscribing ? "Subscribing..." : "Subscribe"
                                }}
                            </button>
                        </div>
                        <p
                            v-if="subscribeMessage"
                            class="mt-4 text-sm"
                            :class="
                                subscribeError
                                    ? 'text-red-600'
                                    : 'text-green-600'
                            "
                        >
                            {{ subscribeMessage }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Newsletter Viewer Modal -->
        <div
            v-if="viewingNewsletter"
            class="fixed inset-0 z-50 overflow-y-auto"
        >
            <div
                class="flex items-center justify-center min-h-screen px-4 py-8"
            >
                <div
                    class="fixed inset-0 bg-neutral-900 bg-opacity-75"
                    @click="viewingNewsletter = null"
                ></div>
                <div
                    class="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                >
                    <div
                        class="sticky top-0 bg-white border-b border-neutral-200 p-6 flex items-center justify-between"
                    >
                        <h2 class="text-2xl font-bold text-neutral-900">
                            {{ viewingNewsletter.title }}
                        </h2>
                        <button
                            @click="viewingNewsletter = null"
                            class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="p-6">
                        <div
                            v-if="viewingNewsletter.description"
                            class="text-lg text-neutral-600 mb-6"
                        >
                            {{ viewingNewsletter.description }}
                        </div>
                        <div
                            class="flex items-center space-x-4 text-sm text-neutral-500 mb-6"
                        >
                            <span
                                v-if="viewingNewsletter.category"
                                class="font-medium"
                            >
                                {{ viewingNewsletter.category }}
                            </span>
                            <span>{{
                                formatDate(viewingNewsletter.published_date)
                            }}</span>
                        </div>
                        <div
                            class="prose max-w-none"
                            v-html="viewingNewsletter.content"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { FileText, Download, Eye, Mail } from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";
import apiClient from "@/api/client";

const siteStore = useSiteStore();

const newsletters = ref([]);
const loading = ref(true);
const email = ref("");
const subscribing = ref(false);
const subscribeMessage = ref("");
const subscribeError = ref(false);
const viewingNewsletter = ref(null);

// Fetch newsletters from API
const fetchNewsletters = async () => {
    loading.value = true;
    try {
        const response = await apiClient.get("/api/newsletters/published");

        // Handle pagination response
        if (response.data && response.data.data) {
            newsletters.value = response.data.data;
        } else if (response.data) {
            newsletters.value = response.data;
        } else {
            newsletters.value = [];
        }
    } catch (error) {
        console.error("Failed to fetch newsletters:", error);
        newsletters.value = [];
    } finally {
        loading.value = false;
    }
};

// Subscribe to newsletter
const subscribe = async () => {
    if (!email.value) {
        subscribeMessage.value = "Please enter your email address";
        subscribeError.value = true;
        return;
    }

    subscribing.value = true;
    subscribeMessage.value = "";
    subscribeError.value = false;

    try {
        // TODO: Implement API call when backend endpoint is ready
        // await apiClient.post('/api/newsletter-subscribe', { email: email.value })

        // Simulate successful subscription
        await new Promise((resolve) => setTimeout(resolve, 500));

        subscribeMessage.value =
            "Successfully subscribed! Check your email for confirmation.";
        subscribeError.value = false;
        email.value = "";
    } catch (error) {
        subscribeMessage.value = "Subscription failed. Please try again.";
        subscribeError.value = true;
    } finally {
        subscribing.value = false;
    }
};

// Get download URL
const getDownloadUrl = (id) => {
    return `${import.meta.env.VITE_API_URL}/api/newsletters/${id}/download`;
};

// View newsletter
const viewNewsletter = (newsletter) => {
    viewingNewsletter.value = newsletter;
};

// Download newsletter
const downloadNewsletter = async (id) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/newsletters/${id}/download`
        );
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `newsletter-${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    } catch (error) {
        console.error("Failed to download newsletter:", error);
        alert("Failed to download newsletter. Please try again.");
    }
};

// Format date
const formatDate = (dateString) => {
    if (!dateString) return "";

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
</script>
