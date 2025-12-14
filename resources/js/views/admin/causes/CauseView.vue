<template>
    <div>
        <!-- Header -->
        <div class="mb-6">
            <router-link
                :to="{ name: 'admin-causes' }"
                class="inline-flex items-center text-sm font-medium text-neutral-600 hover:text-primary mb-4"
            >
                <ArrowLeft class="w-4 h-4 mr-2" />
                Back to Causes
            </router-link>
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-3xl font-bold text-neutral-900">
                        Cause Details
                    </h1>
                    <p class="text-neutral-600 mt-2">
                        View cause information and statistics
                    </p>
                </div>
                <div class="flex gap-3">
                    <router-link
                        v-if="cause"
                        :to="{ name: 'admin-causes-edit', params: { id: cause.id } }"
                        class="btn-primary flex items-center"
                    >
                        <Edit class="w-5 h-5 mr-2" />
                        Edit Cause
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div
            v-if="causesStore.loading"
            class="flex items-center justify-center py-12"
        >
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
        </div>

        <!-- Cause Details -->
        <div v-else-if="cause" class="space-y-6">
            <!-- Main Image and Basic Info -->
            <div class="bg-white rounded-lg border border-neutral-200 overflow-hidden">
                <div class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 relative">
                    <img
                        :src="cause.image"
                        :alt="cause.title"
                        class="w-full h-full object-cover"
                    />
                    <div class="absolute top-4 right-4">
                        <span
                            :class="[
                                'px-3 py-1 rounded-full text-sm font-semibold uppercase',
                                getUrgencyClass(cause.urgency),
                            ]"
                        >
                            {{ cause.urgency }}
                        </span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="mb-4">
                        <span
                            class="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold uppercase"
                        >
                            {{ cause.category }}
                        </span>
                    </div>
                    <h2 class="text-3xl font-bold text-neutral-900 mb-4">
                        {{ cause.title }}
                    </h2>
                    <p class="text-lg text-neutral-700 leading-relaxed">
                        {{ cause.fullDescription || cause.description }}
                    </p>
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg border border-neutral-200 p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-medium text-neutral-600">Goal Amount</p>
                        <DollarSign class="w-5 h-5 text-neutral-400" />
                    </div>
                    <p class="text-2xl font-bold text-neutral-900">
                        {{ formatCurrency(cause.goalAmount) }}
                    </p>
                </div>
                <div class="bg-white rounded-lg border border-neutral-200 p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-medium text-neutral-600">Raised Amount</p>
                        <TrendingUp class="w-5 h-5 text-green-500" />
                    </div>
                    <p class="text-2xl font-bold text-green-600">
                        {{ formatCurrency(cause.raisedAmount) }}
                    </p>
                </div>
                <div class="bg-white rounded-lg border border-neutral-200 p-6">
                    <div class="flex items-center justify-between mb-2">
                        <p class="text-sm font-medium text-neutral-600">Progress</p>
                        <CheckCircle class="w-5 h-5 text-primary" />
                    </div>
                    <p class="text-2xl font-bold text-primary">
                        {{ getProgress(cause) }}%
                    </p>
                </div>
            </div>

            <!-- Progress Bar -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Funding Progress</h3>
                <div class="w-full bg-neutral-200 rounded-full h-4 overflow-hidden">
                    <div
                        class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                        :style="{ width: getProgress(cause) + '%' }"
                    ></div>
                </div>
                <div class="flex justify-between mt-2 text-sm text-neutral-600">
                    <span>{{ formatCurrency(cause.raisedAmount) }} raised</span>
                    <span>{{ formatCurrency(cause.goalAmount) }} goal</span>
                </div>
            </div>

            <!-- Beneficiaries -->
            <div class="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 class="text-lg font-bold text-neutral-900 mb-2">Beneficiaries</h3>
                <div class="flex items-center gap-2 text-neutral-700">
                    <Users class="w-5 h-5 text-primary" />
                    <span class="text-lg">{{ cause.beneficiaries }}</span>
                </div>
            </div>

            <!-- Impact -->
            <div v-if="cause.impact && cause.impact.length > 0" class="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Expected Impact</h3>
                <ul class="space-y-3">
                    <li
                        v-for="(item, index) in cause.impact"
                        :key="index"
                        class="flex items-start gap-3"
                    >
                        <div
                            class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        >
                            <CheckCircle class="w-4 h-4 text-primary" />
                        </div>
                        <span class="text-neutral-700">{{ item }}</span>
                    </li>
                </ul>
            </div>

            <!-- Donation Tiers -->
            <div v-if="cause.donationTiers && cause.donationTiers.length > 0" class="bg-white rounded-lg border border-neutral-200 p-6">
                <h3 class="text-lg font-bold text-neutral-900 mb-4">Donation Tiers</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        v-for="(tier, index) in cause.donationTiers"
                        :key="index"
                        class="p-4 border-2 border-neutral-200 rounded-lg"
                    >
                        <div class="flex items-center justify-between mb-2">
                            <span class="text-2xl font-bold text-primary">
                                ${{ tier.amount }}
                            </span>
                            <DollarSign class="w-5 h-5 text-primary" />
                        </div>
                        <p class="text-sm text-neutral-600">{{ tier.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
            <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">Cause not found</h3>
            <p class="text-neutral-600 mb-6">
                The cause you're looking for doesn't exist or has been removed.
            </p>
            <router-link :to="{ name: 'admin-causes' }" class="btn-primary inline-flex items-center">
                <ArrowLeft class="w-5 h-5 mr-2" />
                Back to Causes
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
    ArrowLeft,
    Edit,
    DollarSign,
    TrendingUp,
    CheckCircle,
    Users,
    AlertTriangle,
} from "lucide-vue-next";
import { useCausesStore } from "@/stores/causes";

const route = useRoute();
const router = useRouter();
const causesStore = useCausesStore();

const cause = computed(() => causesStore.currentCause);

const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(amount || 0);
};

const getProgress = (cause) => {
    return causesStore.getCauseProgress(cause);
};

const getUrgencyClass = (urgency) => {
    const classes = {
        Critical: "bg-red-100 text-red-700",
        High: "bg-orange-100 text-orange-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Low: "bg-green-100 text-green-700",
    };
    return classes[urgency] || "bg-neutral-100 text-neutral-700";
};

onMounted(async () => {
    const causeId = route.params.id;
    try {
        await causesStore.fetchCause(causeId);
    } catch (error) {
        console.error("Error loading cause:", error);
        alert("Failed to load cause details.");
    }
});
</script>
