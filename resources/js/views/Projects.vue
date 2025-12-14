<template>
    <div>
        <!-- Hero Section -->
        <section
            class="relative bg-gradient-to-br from-primary to-primary-700 py-32 overflow-hidden"
        >
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/teaching-kits.jpg"
                    alt="Our Projects"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/70"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-block mb-6">
                        <span
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold"
                        >
                            Making a Difference
                        </span>
                    </div>
                    <h1
                        class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Our Projects
                    </h1>
                    <p
                        class="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                    >
                        Transforming education through innovative programs and
                        sustainable initiatives across Africa
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                <span v-if="loading">
                                    <Loader2 class="w-8 h-8 animate-spin" />
                                </span>
                                <span v-else>
                                    {{ publicProjects.length }}
                                </span>
                            </div>
                            <div class="text-sm text-white/80">
                                Active Projects
                            </div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">15+</div>
                            <div class="text-sm text-white/80">
                                Countries Reached
                            </div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                50K+
                            </div>
                            <div class="text-sm text-white/80">
                                Lives Impacted
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Introduction Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto text-center">
                    <span
                        class="text-primary font-semibold text-sm uppercase tracking-wide"
                    >
                        Our Approach
                    </span>
                    <h2 class="text-4xl font-bold text-neutral-900 mt-4 mb-6">
                        Strategic Initiatives for Educational Excellence
                    </h2>
                    <p class="text-xl text-neutral-600 leading-relaxed">
                        Each of our projects is carefully designed to address
                        specific challenges in science education across Africa.
                        Through collaboration, innovation, and sustainable
                        practices, we're creating lasting change in communities
                        and schools.
                    </p>
                </div>
            </div>
        </section>

        <!-- Projects Grid -->
        <section class="py-20 bg-gradient-to-br from-neutral-50 to-neutral-100">
            <div class="container-custom">
                <div class="max-w-7xl mx-auto">
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
                                Loading projects...
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
                                Unable to Load Projects
                            </h3>
                            <p class="text-neutral-600 mb-4">{{ error }}</p>
                            <button
                                @click="fetchPublicProjects"
                                class="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center mx-auto"
                            >
                                <RefreshCcw class="w-4 h-4 mr-2" />
                                Try Again
                            </button>
                        </div>
                    </div>

                    <!-- Empty State -->
                    <div
                        v-else-if="publicProjects.length === 0"
                        class="text-center py-12"
                    >
                        <div class="max-w-md mx-auto">
                            <Award
                                class="w-16 h-16 text-neutral-400 mx-auto mb-4"
                            />
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                No Active Projects
                            </h3>
                            <p class="text-neutral-600">
                                There are currently no active projects
                                available.
                            </p>
                        </div>
                    </div>

                    <!-- Projects Grid -->
                    <div
                        v-else
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <div
                            v-for="project in publicProjects"
                            :key="project.id"
                            class="group"
                        >
                            <div
                                class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200 h-full flex flex-col"
                            >
                                <!-- Image -->
                                <div
                                    class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
                                >
                                    <img
                                        :src="project.image"
                                        :alt="project.name"
                                        class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>

                                <!-- Content -->
                                <div class="p-6 flex-1 flex flex-col">
                                    <!-- Status Badge -->
                                    <div class="mb-4">
                                        <span
                                            class="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wide"
                                        >
                                            {{ project.status }}
                                        </span>
                                    </div>

                                    <!-- Title -->
                                    <h3
                                        class="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors"
                                    >
                                        {{ project.name }}
                                    </h3>

                                    <!-- Description -->
                                    <p
                                        class="text-neutral-600 mb-4 leading-relaxed line-clamp-3"
                                    >
                                        {{ project.description }}
                                    </p>

                                    <!-- Meta Info -->
                                    <div class="mt-auto space-y-3">
                                        <div
                                            class="flex items-center gap-2 text-sm text-neutral-500"
                                        >
                                            <MapPin class="w-4 h-4" />
                                            <span>{{ project.location }}</span>
                                        </div>
                                        <div
                                            class="flex items-center gap-2 text-sm text-neutral-500"
                                        >
                                            <Users class="w-4 h-4" />
                                            <span>{{
                                                project.beneficiaries
                                            }}</span>
                                        </div>
                                    </div>

                                    <!-- View More Button -->
                                    <button
                                        @click="selectedProject = project"
                                        class="mt-6 w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center group"
                                    >
                                        Learn More
                                        <ChevronRight
                                            class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto">
                    <div
                        class="bg-primary rounded-2xl p-12 text-white shadow-2xl text-center"
                    >
                        <div
                            class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Handshake class="w-8 h-8 text-white" />
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">
                            Partner With Us
                        </h2>
                        <p class="text-xl text-white/90 mb-8 leading-relaxed">
                            Join us in transforming education across Africa.
                            Whether through funding, expertise, or
                            collaboration, your partnership can help us expand
                            our impact.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <router-link
                                :to="{ name: 'contact' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                            >
                                Contact Us
                                <ChevronRight class="w-5 h-5 ml-2" />
                            </router-link>
                            <router-link
                                :to="{ name: 'opportunities' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border-2 border-white/30"
                            >
                                View Opportunities
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Project Detail Modal -->
        <div
            v-if="selectedProject"
            class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
            @click.self="selectedProject = null"
        >
            <div
                class="bg-white rounded-2xl max-w-4xl w-full shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
                <!-- Modal Header Image -->
                <div
                    class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
                >
                    <img
                        :src="selectedProject.image"
                        :alt="selectedProject.name"
                        class="w-full h-full object-cover"
                    />
                </div>

                <!-- Modal Content -->
                <div class="p-8">
                    <!-- Close Button -->
                    <button
                        @click="selectedProject = null"
                        class="float-right p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <X class="w-6 h-6 text-neutral-600" />
                    </button>

                    <!-- Status Badge -->
                    <span
                        class="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold uppercase tracking-wide mb-4"
                    >
                        {{ selectedProject.status }}
                    </span>

                    <!-- Title -->
                    <h2
                        class="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        {{ selectedProject.name }}
                    </h2>

                    <!-- Meta Info Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div
                            class="flex items-center gap-2 text-sm text-neutral-600"
                        >
                            <MapPin class="w-4 h-4 text-primary" />
                            <span>{{ selectedProject.location }}</span>
                        </div>
                        <div
                            class="flex items-center gap-2 text-sm text-neutral-600"
                        >
                            <Calendar class="w-4 h-4 text-primary" />
                            <span
                                >Since
                                {{
                                    formatDate(
                                        selectedProject.start_date ||
                                            selectedProject.startDate
                                    )
                                }}</span
                            >
                        </div>
                        <div
                            class="flex items-center gap-2 text-sm text-neutral-600"
                        >
                            <Users class="w-4 h-4 text-primary" />
                            <span>{{ selectedProject.beneficiaries }}</span>
                        </div>
                    </div>

                    <!-- Description -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            About This Project
                        </h3>
                        <p class="text-neutral-700 leading-relaxed">
                            {{
                                selectedProject.full_description ||
                                selectedProject.fullDescription
                            }}
                        </p>
                    </div>

                    <!-- Objectives -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            Key Objectives
                        </h3>
                        <ul class="space-y-2">
                            <li
                                v-for="(
                                    objective, index
                                ) in selectedProject.objectives"
                                :key="index"
                                class="flex items-start gap-3"
                            >
                                <div
                                    class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                                >
                                    <CheckCircle class="w-4 h-4 text-primary" />
                                </div>
                                <span class="text-neutral-700">{{
                                    objective
                                }}</span>
                            </li>
                        </ul>
                    </div>

                    <!-- Impact -->
                    <div class="mb-6">
                        <h3 class="text-xl font-bold text-neutral-900 mb-3">
                            Our Impact
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div
                                v-for="(
                                    impact, index
                                ) in selectedProject.impact"
                                :key="index"
                                class="flex items-start gap-3 p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg"
                            >
                                <Award
                                    class="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
                                />
                                <span class="text-neutral-700 text-sm">{{
                                    impact
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div
                        class="flex flex-col sm:flex-row gap-3 pt-6 border-t border-neutral-200"
                    >
                        <router-link
                            :to="{ name: 'contact' }"
                            class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-center"
                            @click="selectedProject = null"
                        >
                            Support This Project
                        </router-link>
                        <button
                            @click="selectedProject = null"
                            class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
    MapPin,
    Users,
    ChevronRight,
    Handshake,
    X,
    Calendar,
    CheckCircle,
    Award,
    Loader2,
    AlertCircle,
    RefreshCcw,
} from "lucide-vue-next";
import { useProjectsStore } from "@/stores/projects";
import axios from "axios";

const projectsStore = useProjectsStore();
const selectedProject = ref(null);

// Loading and error states
const loading = ref(false);
const error = ref(null);
const publicProjects = ref([]);

// Fetch public projects from API
const fetchPublicProjects = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get("/api/projects/active");
        publicProjects.value = response.data.data || response.data;

        // Also update the projects store for backward compatibility
        projectsStore.projects = publicProjects.value;
        projectsStore.updateStatistics();
    } catch (err) {
        error.value =
            err.response?.data?.message ||
            "Failed to load projects. Please try again.";
        console.error("Error fetching public projects:", err);
    } finally {
        loading.value = false;
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
    });
};

// Mount hook to fetch data
onMounted(() => {
    fetchPublicProjects();
});
</script>
