<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Not Found State -->
    <div v-else-if="notFound" class="text-center py-20">
      <AlertTriangle class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
      <h2 class="text-2xl font-bold text-neutral-900 mb-2">User Not Found</h2>
      <p class="text-neutral-600 mb-6">The user you're looking for doesn't exist or has been removed.</p>
      <router-link :to="{ name: 'admin-users' }" class="btn-primary inline-flex items-center">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Back to Users
      </router-link>
    </div>

    <!-- User Details -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-3">
            <router-link :to="{ name: 'admin-users' }" class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </router-link>
            <h1 class="text-3xl font-bold text-neutral-900">User Details</h1>
          </div>
          <div class="flex gap-3">
            <router-link
              :to="{ name: 'admin-users-edit', params: { id: user.id } }"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center"
            >
              <Edit class="w-4 h-4 mr-2" />
              Edit User
            </router-link>
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
          <div class="bg-white rounded-lg border border-neutral-200 p-6 sticky top-6">
            <!-- Avatar -->
            <div class="mb-6">
              <div v-if="user.avatar" class="w-32 h-32 mx-auto rounded-full overflow-hidden bg-neutral-100">
                <img :src="getAvatarUrl(user.avatar)" :alt="user.name" class="w-full h-full object-cover" @error="handleImageError" />
              </div>
              <div v-else class="w-32 h-32 mx-auto rounded-full bg-primary-100 flex items-center justify-center">
                <span class="text-4xl font-bold text-primary-700">{{ getInitials(user.name) }}</span>
              </div>
            </div>

            <!-- Basic Info -->
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-neutral-900 mb-2">{{ user.name }}</h2>
              <p class="text-neutral-600 mb-3">{{ user.email }}</p>
              <div class="flex items-center justify-center gap-2">
                <span
                  :class="['px-3 py-1 text-xs font-semibold rounded-full', getRoleBadge(user.role)]"
                >
                  {{ user.role }}
                </span>
                <span
                  :class="['px-3 py-1 text-xs font-semibold rounded-full', getStatusBadge(user.status)]"
                >
                  {{ user.status }}
                </span>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="space-y-2">
              <router-link
                :to="{ name: 'admin-users-edit', params: { id: user.id } }"
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
                Delete User
              </button>
            </div>
          </div>
        </div>

        <!-- Details Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-lg border border-neutral-200 p-6 space-y-6">
            <!-- Account Information -->
            <div>
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User class="w-5 h-5 text-primary" />
                </div>
                <h3 class="text-xl font-bold text-neutral-900">Account Information</h3>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Mail class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Email</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">{{ user.email }}</p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Phone class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Phone</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">{{ user.phone || 'Not provided' }}</p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Shield class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900 capitalize">{{ user.role }}</p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Activity class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900 capitalize">{{ user.status }}</p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Calendar class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Joined</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">{{ formatDate(user.created_at) }}</p>
                </div>

                <div class="p-4 bg-neutral-50 rounded-lg">
                  <div class="flex items-center gap-2 mb-2">
                    <Clock class="w-4 h-4 text-neutral-500" />
                    <span class="text-xs font-medium text-neutral-500 uppercase tracking-wider">Last Updated</span>
                  </div>
                  <p class="text-sm font-semibold text-neutral-900">{{ formatDate(user.updated_at) }}</p>
                </div>
              </div>
            </div>

            <!-- Account ID -->
            <div class="border-t border-neutral-200 pt-6">
              <div class="flex items-center gap-2 mb-4">
                <div class="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Hash class="w-5 h-5 text-secondary" />
                </div>
                <h3 class="text-xl font-bold text-neutral-900">Account ID</h3>
              </div>
              <div class="p-4 bg-neutral-50 rounded-lg">
                <p class="text-sm text-neutral-600 mb-1">User ID</p>
                <p class="text-lg font-mono font-semibold text-neutral-900">#{{ user.id }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen px-4">
          <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
          <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
            <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mb-4">
              <AlertTriangle class="w-6 h-6 text-red-600" />
            </div>
            <h3 class="text-xl font-bold text-neutral-900 mb-2">Delete User?</h3>
            <p class="text-neutral-600 mb-6">
              Are you sure you want to delete <strong>{{ user.name }}</strong>? This action cannot be undone.
            </p>
            <div class="flex gap-3">
              <button
                @click="showDeleteModal = false"
                class="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                @click="handleDelete"
                :disabled="isDeleting"
                class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
              >
                {{ isDeleting ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  Shield,
  Activity,
  Calendar,
  Clock,
  Hash,
  Loader,
  AlertTriangle
} from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
const notFound = ref(false)
const showDeleteModal = ref(false)
const isDeleting = ref(false)
const user = ref(null)

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`/api/admin/users/${route.params.id}`)
    user.value = response.data
  } catch (error) {
    console.error('Failed to load user:', error)
    notFound.value = true
  } finally {
    isLoading.value = false
  }
}

const getAvatarUrl = (avatarPath) => {
  if (!avatarPath) return null
  if (avatarPath.startsWith('http')) return avatarPath
  return `/storage/${avatarPath}`
}

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const getRoleBadge = (role) => {
  const badges = {
    admin: 'bg-purple-100 text-purple-800',
    user: 'bg-blue-100 text-blue-800',
  }
  return badges[role] || 'bg-neutral-100 text-neutral-800'
}

const getStatusBadge = (status) => {
  const badges = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-red-100 text-red-800',
  }
  return badges[status] || 'bg-neutral-100 text-neutral-800'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const confirmDelete = () => {
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!user.value) return

  isDeleting.value = true
  try {
    await axios.delete(`/api/admin/users/${user.value.id}`)
    alert('User deleted successfully!')
    router.push({ name: 'admin-users' })
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('Failed to delete user')
    isDeleting.value = false
    showDeleteModal.value = false
  }
}
</script>
