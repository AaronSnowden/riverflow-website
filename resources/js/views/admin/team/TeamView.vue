<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Not Found State -->
    <div v-else-if="notFound" class="text-center py-20">
      <AlertTriangle class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
      <h2 class="text-2xl font-bold text-neutral-900 mb-2">Team Member Not Found</h2>
      <p class="text-neutral-600 mb-6">
        The team member you're looking for doesn't exist or has been removed.
      </p>
      <router-link :to="{ name: 'admin-team' }" class="btn-primary inline-flex items-center">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Back to Team Management
      </router-link>
    </div>

    <!-- Team Member Details -->
    <div v-else>
      <!-- Header with Actions -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div class="flex items-center gap-3">
            <button
              @click="router.push({ name: 'admin-team' })"
              class="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </button>
            <h1 class="text-3xl font-bold text-neutral-900">Team Member Details</h1>
          </div>
          <div class="flex gap-3 ml-14 sm:ml-0">
            <button
              @click="router.push({ name: 'admin-team-edit', params: { id: teamMember.id } })"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center"
            >
              <Edit class="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
            >
              <Trash2 class="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Card -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl border border-neutral-200 p-6 sticky top-6">
            <!-- Profile Image -->
            <div class="mb-6">
              <div
                class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-green-500 to-teal-500 shadow-lg"
              >
                <img
                  :src="teamMember.image"
                  :alt="teamMember.name"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
            </div>

            <!-- Basic Info -->
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-neutral-900 mb-2">
                {{ teamMember.name }}
              </h2>
              <span
                class="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
              >
                {{ teamMember.role }}
              </span>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div class="text-center p-4 bg-neutral-50 rounded-lg">
                <div class="text-2xl font-bold text-neutral-900">
                  {{ formatDate(Date.now()) }}
                </div>
                <div class="text-xs text-neutral-600 mt-1">Joined</div>
              </div>
              <div class="text-center p-4 bg-neutral-50 rounded-lg">
                <div class="text-2xl font-bold text-neutral-900">Active</div>
                <div class="text-xs text-neutral-600 mt-1">Status</div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="space-y-2">
              <router-link
                :to="{ name: 'admin-team-edit', params: { id: teamMember.id } }"
                class="w-full px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors font-medium flex items-center justify-center"
              >
                <Edit class="w-4 h-4 mr-2" />
                Edit Profile
              </router-link>
              <button
                @click="confirmDelete"
                class="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center justify-center"
              >
                <Trash2 class="w-4 h-4 mr-2" />
                Delete Member
              </button>
            </div>
          </div>
        </div>

        <!-- Details Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl border border-neutral-200 p-6 space-y-6">
            <!-- Biography -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div
                  class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center"
                >
                  <FileText class="w-5 h-5 text-primary" />
                </div>
                <h3 class="text-xl font-bold text-neutral-900">Biography</h3>
              </div>
              <p class="text-neutral-700 leading-relaxed">
                {{ teamMember.bio }}
              </p>
            </div>

            <!-- Information Grid -->
            <div class="border-t border-neutral-200 pt-6">
              <div class="flex items-center gap-2 mb-4">
                <div
                  class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center"
                >
                  <Info class="w-5 h-5 text-secondary" />
                </div>
                <h3 class="text-xl font-bold text-neutral-900">Information</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <User class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Member ID
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">
                    #{{ teamMember.id }}
                  </p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Briefcase class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Position
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">
                    {{ teamMember.role }}
                  </p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Calendar class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Added
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">
                    {{ formatDate(Date.now()) }}
                  </p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Activity class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Last Updated
                    </span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">
                    {{ formatDate(Date.now()) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Activity Log (placeholder) -->
            <div class="border-t border-neutral-200 pt-6">
              <div class="flex items-center gap-2 mb-4">
                <div
                  class="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center"
                >
                  <Clock class="w-5 h-5 text-accent" />
                </div>
                <h3 class="text-xl font-bold text-neutral-900">Recent Activity</h3>
              </div>
              <div class="text-center py-8 text-neutral-500">
                <Clock class="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                <p class="text-sm">No recent activity to display</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div
        v-if="showDeleteModal"
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        @click.self="showDeleteModal = false"
      >
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle class="w-6 h-6 text-red-600" />
          </div>
          <h3 class="text-xl font-bold text-neutral-900 mb-2">Delete Team Member</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete
            <strong>{{ teamMember.name }}</strong>? This action cannot be undone.
          </p>
          <div class="flex gap-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              @click="deleteTeamMember"
              :disabled="isDeleting"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isDeleting ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  Edit,
  Trash2,
  FileText,
  Info,
  User,
  Briefcase,
  Calendar,
  Activity,
  Clock,
  Loader,
  AlertTriangle,
} from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";

const router = useRouter();
const route = useRoute();
const siteStore = useSiteStore();

const isLoading = ref(true);
const notFound = ref(false);
const showDeleteModal = ref(false);
const isDeleting = ref(false);
const teamMember = ref(null);

onMounted(() => {
  loadTeamMember();
});

const loadTeamMember = () => {
  const memberId = route.params.id;
  const member = siteStore.leaders.find((l) => l.id === memberId);

  if (member) {
    teamMember.value = member;
    isLoading.value = false;
  } else {
    notFound.value = true;
    isLoading.value = false;
  }
};

const handleImageError = (event) => {
  event.target.src =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";
};

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const confirmDelete = () => {
  showDeleteModal.value = true;
};

const deleteTeamMember = () => {
  isDeleting.value = true;

  // Simulate API call
  setTimeout(() => {
    // In a real app, this would be an API call
    // await api.deleteTeamMember(teamMember.value.id)
    // siteStore.deleteLeader(teamMember.value.id)

    isDeleting.value = false;
    showDeleteModal.value = false;

    alert("Team member deleted successfully!");
    router.push({ name: "admin-team" });
  }, 1000);
};
</script>
