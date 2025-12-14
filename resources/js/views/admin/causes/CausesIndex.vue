<template>
    <div>
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-bold text-neutral-900">
                    Causes Management
                </h1>
                <p class="text-neutral-600 mt-2">
                    Manage fundraising causes and donation campaigns
                </p>
            </div>
            <router-link
                :to="{ name: 'admin-causes-create' }"
                class="btn-primary flex items-center"
            >
                <Plus class="w-5 h-5 mr-2" />
                Add New Cause
            </router-link>
        </div>

        <!-- Search and Filter Bar -->
        <div class="mb-6 bg-white rounded-lg border border-neutral-200 p-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-2">
                    <div class="relative">
                        <Search
                            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400"
                        />
                        <input
                            v-model="causesStore.filters.search"
                            type="text"
                            placeholder="Search causes by title or description..."
                            class="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>
                <div>
                    <select
                        v-model="causesStore.filters.category"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Categories</option>
                        <option value="Education">Education</option>
                        <option value="Resources">Resources</option>
                        <option value="Technology">Technology</option>
                        <option value="Empowerment">Empowerment</option>
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Emergency">Emergency</option>
                    </select>
                </div>
                <div>
                    <select
                        v-model="causesStore.filters.urgency"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                        <option value="">All Urgency</option>
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-lg border border-neutral-200 p-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-neutral-600">Total Causes</p>
                        <p class="text-2xl font-bold text-neutral-900">
                            {{ causesStore.statistics.total || 0 }}
                        </p>
                    </div>
                    <div class="p-3 bg-blue-50 rounded-lg">
                        <Heart class="w-6 h-6 text-blue-600" />
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg border border-neutral-200 p-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-neutral-600">Active Causes</p>
                        <p class="text-2xl font-bold text-neutral-900">
                            {{ causesStore.statistics.active || 0 }}
                        </p>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <CheckCircle class="w-6 h-6 text-green-600" />
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg border border-neutral-200 p-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-neutral-600">Total Goal</p>
                        <p class="text-2xl font-bold text-neutral-900">
                            {{
                                formatCurrency(causesStore.statistics.totalGoal)
                            }}
                        </p>
                    </div>
                    <div class="p-3 bg-purple-50 rounded-lg">
                        <DollarSign class="w-6 h-6 text-purple-600" />
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-lg border border-neutral-200 p-4">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-neutral-600">Total Raised</p>
                        <p class="text-2xl font-bold text-neutral-900">
                            {{
                                formatCurrency(
                                    causesStore.statistics.totalRaised
                                )
                            }}
                        </p>
                    </div>
                    <div class="p-3 bg-green-50 rounded-lg">
                        <TrendingUp class="w-6 h-6 text-green-600" />
                    </div>
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

        <!-- Causes Grid -->
        <div
            v-else-if="filteredCauses.length > 0"
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
            <div
                v-for="cause in filteredCauses"
                :key="cause.id"
                class="bg-white rounded-lg border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
                <!-- Image -->
                <div
                    class="aspect-video overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 relative"
                >
                    <img
                        :src="cause.image"
                        :alt="cause.title"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div class="absolute top-3 right-3">
                        <span
                            :class="[
                                'px-2 py-1 rounded-full text-xs font-semibold uppercase',
                                getUrgencyClass(cause.urgency),
                            ]"
                        >
                            {{ cause.urgency }}
                        </span>
                    </div>
                </div>

                <!-- Content -->
                <div class="p-5">
                    <!-- Category Badge -->
                    <div class="mb-3">
                        <span
                            class="inline-block px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold uppercase"
                        >
                            {{ cause.category }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h3
                        class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors line-clamp-2"
                    >
                        {{ cause.title }}
                    </h3>

                    <!-- Description -->
                    <p class="text-sm text-neutral-600 mb-3 line-clamp-2">
                        {{ cause.description }}
                    </p>

                    <!-- Progress Bar -->
                    <div class="mb-4">
                        <div class="flex justify-between text-xs mb-1">
                            <span class="text-neutral-600">
                                Raised: {{ formatCurrency(cause.raisedAmount) }}
                            </span>
                            <span class="text-neutral-900 font-semibold">
                                Goal: {{ formatCurrency(cause.goalAmount) }}
                            </span>
                        </div>
                        <div
                            class="w-full bg-neutral-200 rounded-full h-2 overflow-hidden"
                        >
                            <div
                                class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-500"
                                :style="{
                                    width: getProgress(cause) + '%',
                                }"
                            ></div>
                        </div>
                        <p class="text-xs text-neutral-500 mt-1">
                            {{ getProgress(cause) }}% funded
                        </p>
                    </div>

                    <!-- Beneficiaries -->
                    <div class="mb-4">
                        <div
                            class="flex items-center gap-2 text-sm text-neutral-500"
                        >
                            <Users class="w-4 h-4" />
                            <span>{{ cause.beneficiaries }}</span>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-2">
                        <router-link
                            :to="{
                                name: 'admin-causes-view',
                                params: { id: cause.id },
                            }"
                            class="flex-1 px-3 py-2 text-center border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors text-sm font-medium"
                        >
                            <Eye class="w-4 h-4 inline mr-1" />
                            View
                        </router-link>
                        <router-link
                            :to="{
                                name: 'admin-causes-edit',
                                params: { id: cause.id },
                            }"
                            class="flex-1 px-3 py-2 text-center bg-primary text-white rounded-md hover:bg-primary-600 transition-colors text-sm font-medium"
                        >
                            <Edit class="w-4 h-4 inline mr-1" />
                            Edit
                        </router-link>
                        <button
                            @click="confirmDelete(cause)"
                            class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Empty State -->
        <div
            v-else
            class="bg-white rounded-lg border border-neutral-200 p-12 text-center"
        >
            <Heart class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">
                No causes found
            </h3>
            <p class="text-neutral-600 mb-6">
                Get started by creating your first fundraising cause.
            </p>
            <router-link
                :to="{ name: 'admin-causes-create' }"
                class="btn-primary inline-flex items-center"
            >
                <Plus class="w-5 h-5 mr-2" />
                Create Your First Cause
            </router-link>
        </div>

        <!-- Delete Confirmation Modal -->
        <div
            v-if="showDeleteModal"
            class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            @click.self="showDeleteModal = false"
        >
            <div
                class="bg-white rounded-lg max-w-md w-full p-6 shadow-2xl animate-fadeIn"
            >
                <div class="flex items-center mb-4">
                    <div
                        class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4"
                    >
                        <AlertTriangle class="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-neutral-900">
                            Delete Cause
                        </h3>
                        <p class="text-sm text-neutral-600">
                            This action cannot be undone
                        </p>
                    </div>
                </div>
                <p class="text-neutral-700 mb-6">
                    Are you sure you want to delete
                    <span class="font-semibold">{{ causeToDelete?.title }}</span
                    >? All associated data will be permanently removed.
                </p>
                <div class="flex gap-3">
                    <button
                        @click="showDeleteModal = false"
                        class="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-md hover:bg-neutral-50 transition-colors font-medium"
                        :disabled="deleting"
                    >
                        Cancel
                    </button>
                    <button
                        @click="deleteCause"
                        class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                        :disabled="deleting"
                    >
                        {{ deleting ? "Deleting..." : "Delete Cause" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
    Plus,
    Search,
    Heart,
    Eye,
    Edit,
    Trash2,
    Users,
    CheckCircle,
    DollarSign,
    TrendingUp,
    AlertTriangle,
} from "lucide-vue-next";
import { useCausesStore } from "@/stores/causes";

const router = useRouter();
const causesStore = useCausesStore();

const showDeleteModal = ref(false);
const causeToDelete = ref(null);
const deleting = ref(false);

// Computed
const filteredCauses = computed(() => causesStore.filteredCauses);

// Methods
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "UGX",
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

const confirmDelete = (cause) => {
    causeToDelete.value = cause;
    showDeleteModal.value = true;
};

const deleteCause = async () => {
    if (!causeToDelete.value) return;

    deleting.value = true;

    try {
        await causesStore.deleteCause(causeToDelete.value.id);

        alert(
            `Cause "${causeToDelete.value.title}" has been deleted successfully.`
        );
        showDeleteModal.value = false;
        causeToDelete.value = null;
    } catch (error) {
        console.error("Error deleting cause:", error);
        alert(
            error.response?.data?.message ||
                "Failed to delete cause. Please try again."
        );
    } finally {
        deleting.value = false;
    }
};

// Lifecycle
onMounted(async () => {
    try {
        await causesStore.fetchCauses();
        await causesStore.fetchStatistics();
    } catch (error) {
        console.error("Error loading causes:", error);
        alert("Failed to load causes. Please refresh the page.");
    }
});
</script>
