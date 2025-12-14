<template>
  <div>
    <!-- Header -->
    <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">Team Management</h1>
        <p class="text-neutral-600 mt-2">
          Manage your leadership team members
        </p>
      </div>
      <router-link
        :to="{ name: 'admin-team-create' }"
        class="btn-primary inline-flex items-center justify-center"
      >
        <Plus class="w-5 h-5 mr-2" />
        Add Team Member
      </router-link>
    </div>

    <!-- Search and Filters -->
    <div class="mb-6 bg-white rounded-xl border border-neutral-200 p-4">
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by name or role..."
              class="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        <div class="flex gap-2">
          <button
            @click="viewMode = 'grid'"
            :class="[
              'p-2 rounded-lg border transition-colors',
              viewMode === 'grid'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50',
            ]"
          >
            <Grid class="w-5 h-5" />
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'p-2 rounded-lg border transition-colors',
              viewMode === 'list'
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-neutral-600 border-neutral-300 hover:bg-neutral-50',
            ]"
          >
            <List class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Team Members Count -->
    <div v-else class="mb-4 text-sm text-neutral-600">
      Showing {{ filteredTeamMembers.length }} of
      {{ teamMembers.length }} team members
    </div>

    <!-- Grid View -->
    <div
      v-if="viewMode === 'grid' && !isLoading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      <div
        v-for="leader in filteredTeamMembers"
        :key="leader.id"
        class="bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group"
      >
        <!-- Image -->
        <div class="aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200">
          <img
            :src="getImageUrl(leader.image)"
            :alt="leader.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            @error="handleImageError"
          />
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 class="text-lg font-bold text-neutral-900 mb-1 line-clamp-1">
            {{ leader.name }}
          </h3>
          <p
            class="text-sm text-primary font-medium mb-3 line-clamp-1"
          >
            {{ leader.position || leader.role }}
          </p>
          <p class="text-sm text-neutral-600 mb-4 line-clamp-2">
            {{ leader.bio }}
          </p>

          <!-- Actions -->
          <div class="flex gap-2">
            <button
              @click="viewTeamMember(leader.id)"
              class="flex-1 px-3 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium flex items-center justify-center"
            >
              <Eye class="w-4 h-4 mr-1" />
              View
            </button>
            <button
              @click="editTeamMember(leader.id)"
              class="flex-1 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium flex items-center justify-center"
            >
              <Edit class="w-4 h-4 mr-1" />
              Edit
            </button>
            <button
              @click="confirmDelete(leader)"
              class="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- List View -->
    <div v-else-if="!isLoading" class="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Member
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Bio
              </th>
              <th class="px-6 py-3 text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="leader in filteredTeamMembers"
              :key="leader.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-green-500 to-teal-500">
                    <img
                      :src="getImageUrl(leader.image)"
                      :alt="leader.name"
                      class="w-full h-full object-cover"
                      @error="handleImageError"
                    />
                  </div>
                  <div>
                    <div class="text-sm font-semibold text-neutral-900">
                      {{ leader.name }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                >
                  {{ leader.position || leader.role }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-neutral-600 line-clamp-2 max-w-md">
                  {{ leader.bio }}
                </div>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    @click="viewTeamMember(leader.id)"
                    class="p-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye class="w-4 h-4" />
                  </button>
                  <button
                    @click="editTeamMember(leader.id)"
                    class="p-2 text-neutral-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </button>
                  <button
                    @click="confirmDelete(leader)"
                    class="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div
        v-if="filteredTeamMembers.length === 0"
        class="text-center py-12 text-neutral-500"
      >
        <Users class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
        <p class="text-lg font-medium text-neutral-900 mb-2">
          No team members found
        </p>
        <p class="text-sm text-neutral-600 mb-6">
          {{ searchQuery ? 'Try a different search term' : 'Get started by adding your first team member' }}
        </p>
        <router-link
          v-if="!searchQuery"
          :to="{ name: 'admin-team-create' }"
          class="btn-primary inline-flex items-center"
        >
          <Plus class="w-5 h-5 mr-2" />
          Add Team Member
        </router-link>
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
          <strong>{{ memberToDelete?.name }}</strong>? This action cannot be
          undone.
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  Search,
  Grid,
  List,
  Eye,
  Edit,
  Trash2,
  Users,
  AlertTriangle,
} from "lucide-vue-next";
import axios from "axios";

const router = useRouter();

const searchQuery = ref("");
const viewMode = ref("grid");
const showDeleteModal = ref(false);
const memberToDelete = ref(null);
const isDeleting = ref(false);
const isLoading = ref(true);
const teamMembers = ref([]);

onMounted(async () => {
  await fetchTeamMembers();
});

const fetchTeamMembers = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('/api/admin/team');
    teamMembers.value = response.data.data || response.data;
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    alert('Failed to load team members');
  } finally {
    isLoading.value = false;
  }
};

const filteredTeamMembers = computed(() => {
  if (!searchQuery.value) {
    return teamMembers.value;
  }

  const query = searchQuery.value.toLowerCase();
  return teamMembers.value.filter(
    (leader) =>
      leader.name.toLowerCase().includes(query) ||
      (leader.position && leader.position.toLowerCase().includes(query)) ||
      (leader.bio && leader.bio.toLowerCase().includes(query))
  );
});

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';
  if (imagePath.startsWith('http')) return imagePath;
  return `/storage/${imagePath}`;
};

const handleImageError = (event) => {
  event.target.src =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";
};

const viewTeamMember = (id) => {
  router.push({ name: "admin-team-view", params: { id } });
};

const editTeamMember = (id) => {
  router.push({ name: "admin-team-edit", params: { id } });
};

const confirmDelete = (leader) => {
  memberToDelete.value = leader;
  showDeleteModal.value = true;
};

const deleteTeamMember = async () => {
  if (!memberToDelete.value) return;
  
  isDeleting.value = true;
  try {
    await axios.delete(`/api/admin/team/${memberToDelete.value.id}`);
    
    // Remove from local list
    teamMembers.value = teamMembers.value.filter(m => m.id !== memberToDelete.value.id);
    
    alert("Team member deleted successfully!");
    showDeleteModal.value = false;
    memberToDelete.value = null;
  } catch (error) {
    console.error('Failed to delete team member:', error);
    alert('Failed to delete team member');
  } finally {
    isDeleting.value = false;
  }
};
</script>
