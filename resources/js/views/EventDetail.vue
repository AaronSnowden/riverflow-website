<template>
    <div>
        <!-- Loading State -->
        <div
            v-if="loading"
            class="min-h-screen flex items-center justify-center"
        >
            <div class="text-center">
                <div
                    class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"
                ></div>
                <p class="text-neutral-600">Loading event details...</p>
            </div>
        </div>

        <!-- Error State -->
        <div
            v-else-if="!event"
            class="min-h-screen flex items-center justify-center bg-neutral-50"
        >
            <div class="text-center max-w-md mx-auto p-8">
                <div
                    class="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <AlertCircle class="w-10 h-10 text-neutral-500" />
                </div>
                <h2 class="text-3xl font-bold text-neutral-900 mb-4">
                    Event Not Found
                </h2>
                <p class="text-neutral-600 mb-8">
                    The event you're looking for doesn't exist or may have been
                    removed.
                </p>
                <router-link :to="{ name: 'events' }" class="btn-primary">
                    <ArrowLeft class="w-4 h-4 inline mr-2" />
                    Back to Events
                </router-link>
            </div>
        </div>

        <!-- Event Content -->
        <div v-else>
            <!-- Hero Section -->
            <section
                class="relative h-[70vh] min-h-[500px] overflow-hidden bg-neutral-900"
            >
                <img
                    v-if="event.image"
                    :src="event.image"
                    :alt="event.title"
                    class="w-full h-full object-cover opacity-50"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"
                ></div>

                <div class="absolute inset-0 flex items-end">
                    <div class="container-custom pb-16">
                        <div class="max-w-5xl">
                            <!-- Breadcrumb -->
                            <nav
                                class="flex items-center space-x-2 text-sm text-white/80 mb-6"
                            >
                                <router-link
                                    :to="{ name: 'home' }"
                                    class="hover:text-white transition-colors"
                                >
                                    Home
                                </router-link>
                                <ChevronRight class="w-4 h-4" />
                                <router-link
                                    :to="{ name: 'events' }"
                                    class="hover:text-white transition-colors"
                                >
                                    Events
                                </router-link>
                                <ChevronRight class="w-4 h-4" />
                                <span class="text-white">{{
                                    event.title
                                }}</span>
                            </nav>

                            <!-- Category Badge -->
                            <div class="mb-4">
                                <span
                                    class="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-full text-sm font-medium"
                                >
                                    <Tag class="w-4 h-4 mr-2" />
                                    {{ event.category }}
                                </span>
                            </div>

                            <!-- Title -->
                            <h1
                                class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                            >
                                {{ event.title }}
                            </h1>

                            <!-- Key Info Grid -->
                            <div
                                class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                            >
                                <div
                                    class="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                                >
                                    <Calendar
                                        class="w-5 h-5 mr-3 text-secondary"
                                    />
                                    <div>
                                        <div class="text-xs text-white/70">
                                            Date
                                        </div>
                                        <div class="font-semibold">
                                            {{ formatDate(event.date) }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                                >
                                    <Clock
                                        class="w-5 h-5 mr-3 text-secondary"
                                    />
                                    <div>
                                        <div class="text-xs text-white/70">
                                            Time
                                        </div>
                                        <div class="font-semibold">
                                            {{ event.time }}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="flex items-center text-white/90 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3"
                                >
                                    <MapPin
                                        class="w-5 h-5 mr-3 text-secondary"
                                    />
                                    <div>
                                        <div class="text-xs text-white/70">
                                            Location
                                        </div>
                                        <div class="font-semibold">
                                            {{ event.location.split(",")[0] }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Content -->
            <section class="py-16 bg-white">
                <div class="container-custom">
                    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <!-- Main Content Column -->
                        <div class="lg:col-span-2">
                            <!-- Description -->
                            <div class="prose prose-lg max-w-none mb-12">
                                <h2
                                    class="text-3xl font-bold text-neutral-900 mb-6"
                                >
                                    About This Event
                                </h2>
                                <div
                                    v-html="event.full_description"
                                    class="event-content text-neutral-700 leading-relaxed"
                                ></div>
                            </div>

                            <!-- Agenda Section -->
                            <div
                                v-if="event.agenda && event.agenda.length > 0"
                                class="mb-12"
                            >
                                <h3
                                    class="text-2xl font-bold text-neutral-900 mb-6"
                                >
                                    Event Agenda
                                </h3>
                                <div class="space-y-3">
                                    <div
                                        v-for="(item, index) in event.agenda"
                                        :key="index"
                                        class="flex items-start space-x-4 p-4 bg-neutral-50 rounded-lg"
                                    >
                                        <div
                                            class="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm"
                                        >
                                            {{ index + 1 }}
                                        </div>
                                        <p class="text-neutral-700 flex-1">
                                            {{ item }}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <!-- Speakers Section -->
                            <div
                                v-if="
                                    event.speakers && event.speakers.length > 0
                                "
                                class="mb-12"
                            >
                                <h3
                                    class="text-2xl font-bold text-neutral-900 mb-6"
                                >
                                    Featured Speakers
                                </h3>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-4"
                                >
                                    <div
                                        v-for="(
                                            speaker, index
                                        ) in event.speakers"
                                        :key="index"
                                        class="flex items-center space-x-3 p-4 border border-neutral-200 rounded-lg hover:border-primary/30 hover:shadow-md transition-all"
                                    >
                                        <div
                                            class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                                        >
                                            <User class="w-6 h-6 text-white" />
                                        </div>
                                        <span
                                            class="text-neutral-700 text-sm"
                                            >{{ speaker }}</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Sidebar -->
                        <div class="lg:col-span-1">
                            <div class="sticky top-24 space-y-6">
                                <!-- Registration Card -->
                                <div
                                    class="bg-gradient-to-br from-primary to-primary-700 text-white rounded-2xl p-8 shadow-xl"
                                >
                                    <h3 class="text-2xl font-bold mb-6">
                                        Event Details
                                    </h3>

                                    <div class="space-y-4 mb-8">
                                        <div class="flex items-start">
                                            <Calendar
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Date & Duration
                                                </div>
                                                <div class="text-white/90">
                                                    {{
                                                        formatDateRange(
                                                            event.date,
                                                            event.endDate
                                                        )
                                                    }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <Clock
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Time
                                                </div>
                                                <div class="text-white/90">
                                                    {{ event.time }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <MapPin
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Venue
                                                </div>
                                                <div class="text-white/90">
                                                    {{ event.venue }}
                                                </div>
                                                <div
                                                    class="text-white/80 text-xs mt-1"
                                                >
                                                    {{ event.location }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <Users
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Capacity
                                                </div>
                                                <div class="text-white/90">
                                                    {{
                                                        event.capacity
                                                    }}
                                                    attendees
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <DollarSign
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Registration Fee
                                                </div>
                                                <div class="text-white/90">
                                                    {{ event.fee }}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="flex items-start">
                                            <CalendarX
                                                class="w-5 h-5 mr-3 flex-shrink-0 mt-0.5"
                                            />
                                            <div class="text-sm">
                                                <div class="font-semibold mb-1">
                                                    Deadline
                                                </div>
                                                <div class="text-white/90">
                                                    {{
                                                        formatDate(
                                                            event.registrationDeadline
                                                        )
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        @click="handleRegister"
                                        class="w-full bg-white text-primary hover:bg-neutral-100 font-bold py-4 px-6 rounded-lg transition-colors shadow-lg flex items-center justify-center"
                                    >
                                        <Send class="w-5 h-5 mr-2" />
                                        Register Now
                                    </button>
                                </div>

                                <!-- Share Card -->
                                <div
                                    class="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
                                >
                                    <h4
                                        class="font-semibold text-neutral-900 mb-4"
                                    >
                                        Share This Event
                                    </h4>
                                    <div class="flex gap-3">
                                        <button
                                            @click="shareOnTwitter"
                                            class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#1a8cd8] transition-colors"
                                            aria-label="Share on Twitter"
                                        >
                                            <Twitter class="w-4 h-4" />
                                        </button>
                                        <button
                                            @click="shareOnFacebook"
                                            class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#4267B2] text-white hover:bg-[#385898] transition-colors"
                                            aria-label="Share on Facebook"
                                        >
                                            <Facebook class="w-4 h-4" />
                                        </button>
                                        <button
                                            @click="shareOnLinkedIn"
                                            class="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0077B5] text-white hover:bg-[#006399] transition-colors"
                                            aria-label="Share on LinkedIn"
                                        >
                                            <Linkedin class="w-4 h-4" />
                                        </button>
                                        <button
                                            @click="copyLink"
                                            class="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-200 text-neutral-700 hover:bg-neutral-300 transition-colors"
                                            aria-label="Copy link"
                                        >
                                            <Link2
                                                v-if="!copied"
                                                class="w-4 h-4"
                                            />
                                            <Check
                                                v-else
                                                class="w-4 h-4 text-primary"
                                            />
                                        </button>
                                    </div>
                                    <p
                                        v-if="copied"
                                        class="text-xs text-primary mt-2"
                                    >
                                        Link copied!
                                    </p>
                                </div>

                                <!-- Contact Card -->
                                <div
                                    class="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
                                >
                                    <h4
                                        class="font-semibold text-neutral-900 mb-4"
                                    >
                                        Have Questions?
                                    </h4>
                                    <p class="text-sm text-neutral-600 mb-4">
                                        Contact us for more information about
                                        this event.
                                    </p>
                                    <router-link
                                        :to="{ name: 'contact' }"
                                        class="text-sm font-semibold text-primary hover:text-primary-700 inline-flex items-center"
                                    >
                                        Contact Us
                                        <ArrowRight class="w-4 h-4 ml-1" />
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- More Events Section -->
            <section class="py-20 bg-neutral-50">
                <div class="container-custom">
                    <div class="text-center mb-12">
                        <h2
                            class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                        >
                            More Upcoming Events
                        </h2>
                        <p class="text-neutral-600 max-w-2xl mx-auto">
                            Discover other exciting opportunities to engage with
                            the education community
                        </p>
                    </div>
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <EventCard
                            v-for="otherEvent in otherEvents"
                            :key="otherEvent.id"
                            :event="otherEvent"
                        />
                    </div>
                    <div class="text-center mt-12">
                        <router-link
                            :to="{ name: 'events' }"
                            class="btn-primary"
                        >
                            View All Events
                        </router-link>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSiteStore } from "@/stores/site";
import { useEventsStore } from "@/stores/events";
import EventCard from "@/components/EventCard.vue";
import apiClient from "@/api/client";
import {
    Calendar,
    Clock,
    MapPin,
    ChevronRight,
    ArrowLeft,
    ArrowRight,
    AlertCircle,
    Tag,
    User,
    Users,
    DollarSign,
    CalendarX,
    Send,
    Twitter,
    Facebook,
    Linkedin,
    Link2,
    Check,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const store = useSiteStore();
const eventsStore = useEventsStore();
const loading = ref(true);
const copied = ref(false);
const event = ref(null);

// Get other upcoming events (excluding current)
const otherEvents = computed(() => {
    if (!event.value) return [];
    return eventsStore.allEvents
        .filter((item) => item.id !== event.value.id)
        .slice(0, 3);
});

// Format date
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Format date range
const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return "";
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate === endDate) {
        return formatDate(startDate);
    }

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const year = start.getFullYear();

    if (startMonth === endMonth) {
        return `${startMonth} ${start.getDate()}-${end.getDate()}, ${year}`;
    } else {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
};

// Registration handler
const handleRegister = () => {
    // Navigate to contact page with event info
    router.push({
        name: "contact",
        query: { event: event.value.title },
    });
};

// Share functions
const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(event.value.title);
    window.open(
        `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
        "_blank"
    );
};

const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
    );
};

const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
        "_blank"
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
        console.error("Failed to copy:", err);
    }
};

// Fetch event on mount
onMounted(async () => {
    loading.value = true;

    try {
        const slug = route.params.slug;

        // First, try to fetch all published events
        await eventsStore.fetchPublishedEvents();

        // Find event by slug
        const foundEvent = eventsStore.allEvents.find((e) => e.slug === slug);

        if (foundEvent) {
            // Fetch full event details by ID
            const response = await apiClient.get(
                `/api/events/${foundEvent.id}`
            );
            event.value = response.data || response;
        }
    } catch (err) {
        console.error("Failed to fetch event:", err);
    } finally {
        loading.value = false;

        // Redirect to events page if event not found after a delay
        if (!event.value) {
            setTimeout(() => {
                router.push({ name: "events" });
            }, 2000);
        }
    }
});
</script>

<style scoped>
@reference '../../../resources/css/app.css';

/* Event content styling */
:deep(.event-content p) {
    @apply mb-6 text-lg leading-relaxed;
}

:deep(.event-content h2) {
    @apply text-2xl font-bold text-neutral-900 mt-12 mb-6;
}

:deep(.event-content h3) {
    @apply text-xl font-bold text-neutral-900 mt-10 mb-4;
}

:deep(.event-content ul),
:deep(.event-content ol) {
    @apply mb-6 ml-6;
}

:deep(.event-content li) {
    @apply mb-2;
}

:deep(.event-content a) {
    @apply text-primary hover:text-primary-700 underline;
}
</style>
