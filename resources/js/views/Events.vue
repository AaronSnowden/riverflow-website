<template>
    <div>
        <!-- Hero with Background Image -->
        <section class="relative h-[540px] py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/children-screaming.jpg"
                    alt="Upcoming Events"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/75 to-black/60"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                        Upcoming Events
                    </h1>
                    <p class="text-xl md:text-2xl text-white/90 font-thin">
                        Join us at workshops, conferences, and training sessions
                        across Africa
                    </p>
                </div>
            </div>
        </section>

        <!-- Events List -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <!-- Loading State -->
                <div
                    v-if="loading"
                    class="flex items-center justify-center py-12"
                >
                    <div class="text-center">
                        <Loader2
                            class="w-12 h-12 animate-spin text-primary mx-auto mb-4"
                        />
                        <p class="text-neutral-600 text-lg">
                            Loading events...
                        </p>
                    </div>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="text-center py-12">
                    <div class="max-w-md mx-auto">
                        <AlertCircle
                            class="w-16 h-16 text-red-500 mx-auto mb-4"
                        />
                        <h3 class="text-xl font-bold text-neutral-900 mb-2">
                            Unable to Load Events
                        </h3>
                        <p class="text-neutral-600 mb-4">{{ error }}</p>
                        <button
                            @click="fetchPublicEvents"
                            class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center mx-auto"
                        >
                            <RefreshCcw class="w-4 h-4 mr-2" />
                            Try Again
                        </button>
                    </div>
                </div>

                <!-- Events Grid -->
                <div
                    v-else-if="publicEvents.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <EventCard
                        v-for="event in publicEvents"
                        :key="event.id"
                        :event="event"
                    />
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-12">
                    <Calendar class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                    <h3 class="text-xl font-bold text-neutral-900 mb-2">
                        No Upcoming Events
                    </h3>
                    <p class="text-neutral-600">
                        No upcoming events at the moment. Check back soon!
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Calendar, Loader2, AlertCircle, RefreshCcw } from "lucide-vue-next";
import { useEventsStore } from "@/stores/events";
import EventCard from "@/components/EventCard.vue";
import apiClient from "@/api/client";

const eventsStore = useEventsStore();

// Loading and error states
const loading = ref(false);
const error = ref(null);
const publicEvents = ref([]);

// Fetch public events from API
const fetchPublicEvents = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await apiClient.get("/api/events/published");
        console.log("Events response:", response);

        publicEvents.value = response.data.data || response.data;

        // Also update the events store for backward compatibility
        eventsStore.allEvents = publicEvents.value;
    } catch (err) {
        error.value =
            err.response?.data?.message ||
            "Failed to load events. Please try again.";
        console.error("Error fetching public events:", err);
    } finally {
        loading.value = false;
    }
};

// Mount hook to fetch data
onMounted(() => {
    fetchPublicEvents();
});
</script>
