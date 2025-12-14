<template>
    <div>
        <!-- Hero Section -->
        <section class="relative bg-primary py-28 overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute inset-0"
                    style="
                        background-image: radial-gradient(
                            circle at 2px 2px,
                            white 1px,
                            transparent 0
                        );
                        background-size: 40px 40px;
                    "
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-block mb-6">
                        <span
                            class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold"
                        >
                            Our Team
                        </span>
                    </div>
                    <h1
                        class="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
                    >
                        Meet Our Team
                    </h1>
                    <p
                        class="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                    >
                        Experienced professionals dedicated to transforming
                        science education across Africa
                    </p>
                </div>
            </div>
        </section>

        <!-- Team Members Grid -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <!-- Loading State -->
                    <div
                        v-if="loading"
                        class="flex items-center justify-center py-12"
                    >
                        <div
                            class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
                        ></div>
                    </div>

                    <!-- Other Team Members Section -->
                    <div v-else="otherMembers.length > 0 && !loading">
                        <!-- Team Members Grid -->
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            <div
                                v-for="member in otherMembers"
                                :key="member.id"
                                class="group"
                            >
                                <div
                                    class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-neutral-200"
                                >
                                    <!-- Image Section -->
                                    <div
                                        class="aspect-[4/3] overflow-hidden bg-neutral-100"
                                    >
                                        <img
                                            :src="getImageUrl(member)"
                                            :alt="member.name"
                                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            @error="handleImageError"
                                        />
                                    </div>

                                    <!-- Content Section -->
                                    <div class="p-6">
                                        <!-- Name & Role -->
                                        <div class="mb-3">
                                            <h3
                                                class="text-xl font-bold text-neutral-900 mb-2"
                                            >
                                                {{ member.name }}
                                            </h3>
                                            <div
                                                class="inline-block px-4 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                            >
                                                {{ member.position }}
                                            </div>
                                        </div>

                                        <!-- Bio -->
                                        <p
                                            class="text-neutral-600 leading-relaxed mb-4 line-clamp-3"
                                        >
                                            {{ member.bio }}
                                        </p>

                                        <!-- Decorative Element -->
                                        <div
                                            class="h-1 w-20 bg-secondary rounded-full"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Empty State (if no team members) -->
                    <div
                        v-if="store.leaders.length === 0"
                        class="text-center py-16"
                    >
                        <div
                            class="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6"
                        >
                            <Users class="w-10 h-10 text-neutral-400" />
                        </div>
                        <h3 class="text-2xl font-bold text-neutral-900 mb-2">
                            No Team Members Yet
                        </h3>
                        <p class="text-neutral-600">
                            Team member information will be available soon.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Join Our Team CTA -->
        <section class="py-20 bg-neutral-50">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto">
                    <div
                        class="bg-primary rounded-2xl p-12 text-white shadow-2xl text-center"
                    >
                        <div
                            class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
                        >
                            <Briefcase class="w-8 h-8 text-white" />
                        </div>
                        <h2 class="text-3xl md:text-4xl font-bold mb-4">
                            Join Our Mission
                        </h2>
                        <p class="text-xl text-white/90 mb-8 leading-relaxed">
                            Are you passionate about transforming education in
                            Africa? Explore career opportunities and volunteer
                            positions with STIA.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <router-link
                                :to="{ name: 'opportunities' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                            >
                                View Opportunities
                                <svg
                                    class="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </router-link>
                            <router-link
                                :to="{ name: 'contact' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border-2 border-white/30"
                            >
                                Contact Us
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <span
                            class="text-primary font-semibold text-sm uppercase tracking-wide"
                        >
                            What We Stand For
                        </span>
                        <h2
                            class="text-4xl font-bold text-neutral-900 mt-4 mb-4"
                        >
                            Our Core Values
                        </h2>
                        <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
                            These values guide our work and shape our approach
                            to education
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <!-- Excellence -->
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Award class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Excellence
                            </h3>
                            <p class="text-neutral-600">
                                Committed to the highest standards in education
                                and professional development
                            </p>
                        </div>

                        <!-- Collaboration -->
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Users class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Collaboration
                            </h3>
                            <p class="text-neutral-600">
                                Building partnerships for sustainable and
                                lasting impact
                            </p>
                        </div>

                        <!-- Innovation -->
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"
                            >
                                <Lightbulb class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Innovation
                            </h3>
                            <p class="text-neutral-600">
                                Fostering creative and practical indigenous
                                solutions for Africa
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { Users, Briefcase, Award, Lightbulb } from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";
import { getImageUrl } from "../utils";
import axios from "axios";

const store = useSiteStore();

// Loading and error states
const loading = ref(false);
const error = ref(null);

// Leadership roles to identify top leadership
const team = ref([]);

const leadershipRoles = [
    "Executive Director",
    "Director",
    "CEO",
    "President",
    "Vice President",
    "Chairman",
    "Chairperson",
    "Managing Director",
    "Chief",
];

// Separate leadership members from other team members
const leadershipMembers = computed(() => {
    return store.leaders.filter((leader) =>
        leadershipRoles.some((role) =>
            leader.role.toLowerCase().includes(role.toLowerCase())
        )
    );
});

const otherMembers = computed(() => {
    return team.value.filter(
        (leader) =>
            !leadershipRoles.some((position) =>
                leader.position.toLowerCase().includes(position.toLowerCase())
            )
    );
});

// Handle image loading errors
const handleImageError = (event) => {
    event.target.src =
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";
};

const fetchTeam = async () => {
    loading.value = true;
    error.value = null;

    try {
        const response = await axios.get("/api/team/published");
        team.value = response.data.data || response.data;
    } catch (err) {
        error.value =
            err.response?.data?.message ||
            "Failed to load team. Please try again.";
        console.error("Error fetching public team:", err);
    } finally {
        loading.value = false;
    }
};

onMounted(async () => {
    await fetchTeam();
});
</script>
