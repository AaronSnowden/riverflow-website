<template>
  <div>
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-neutral-900">User Management</h1>
        <p class="text-neutral-600 mt-2">Manage system users and their permissions</p>
      </div>
      <router-link :to="{ name: 'admin-users-create' }" class="btn-primary flex items-center">
        <UserPlus class="w-5 h-5 mr-2" />
        Add New User
      </router-link>
    </div>

    <!-- Search and Filter Bar -->
    <div class="mb-6 bg-white rounded-lg border border-neutral-200 p-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-2">
          <div class="relative">
            <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              v-model="searchQuery"
              @input="fetchUsers"
              type="text"
              placeholder="Search by name, email, or phone..."
              class="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
        <div>
          <select
            v-model="filterRole"
            @change="fetchUsers"
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            @change="fetchUsers"
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div class="bg-white rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Total Users</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.total || 0 }}</p>
          </div>
          <div class="p-3 bg-blue-50 rounded-lg">
            <Users class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Active Users</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.active || 0 }}</p>
          </div>
          <div class="p-3 bg-green-50 rounded-lg">
            <UserCheck class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Admins</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.admins || 0 }}</p>
          </div>
          <div class="p-3 bg-purple-50 rounded-lg">
            <Shield class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg border border-neutral-200 p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-neutral-600">Inactive</p>
            <p class="text-2xl font-bold text-neutral-900">{{ stats.inactive || 0 }}</p>
          </div>
          <div class="p-3 bg-red-50 rounded-lg">
            <UserX class="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Users Table -->
    <div v-else-if="users.length > 0" class="bg-white rounded-lg border border-neutral-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="bg-neutral-50 border-b border-neutral-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Joined</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-200">
            <tr
              v-for="user in users"
              :key="user.id"
              class="hover:bg-neutral-50 transition-colors"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div v-if="user.avatar" class="h-10 w-10 rounded-full overflow-hidden">
                      <img :src="getAvatarUrl(user.avatar)" :alt="user.name" class="h-full w-full object-cover" @error="handleImageError" />
                    </div>
                    <div v-else class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span class="text-primary-700 font-semibold text-sm">
                        {{ getInitials(user.name) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-neutral-900">{{ user.name }}</div>
                    <div class="text-sm text-neutral-500">{{ user.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="['px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', getRoleBadge(user.role)]"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="['px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusBadge(user.status)]"
                >
                  {{ user.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                {{ user.phone || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                {{ formatDate(user.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end space-x-2">
                  <router-link
                    :to="{ name: 'admin-users-view', params: { id: user.id } }"
                    class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                    title="View Details"
                  >
                    <Eye class="w-4 h-4" />
                  </router-link>
                  <router-link
                    :to="{ name: 'admin-users-edit', params: { id: user.id } }"
                    class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <Edit class="w-4 h-4" />
                  </router-link>
                  <button
                    @click="confirmDelete(user)"
                    class="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
      <Users class="w-16 h-16 text-neutral-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-neutral-900 mb-2">No users found</h3>
      <p class="text-neutral-600 mb-6">
        {{ searchQuery || filterRole || filterStatus ? 'Try adjusting your filters' : 'Get started by adding your first user' }}
      </p>
      <router-link :to="{ name: 'admin-users-create' }" class="btn-primary inline-flex items-center">
        <UserPlus class="w-5 h-5 mr-2" />
        Add User
      </router-link>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-neutral-900 bg-opacity-75" @click="showDeleteModal = false"></div>
        <div class="relative bg-white rounded-lg p-6 max-w-md w-full">
          <h3 class="text-lg font-bold text-neutral-900 mb-2">Delete User?</h3>
          <p class="text-neutral-600 mb-6">
            Are you sure you want to delete "{{ itemToDelete?.name }}"? This action cannot be undone.
          </p>
          <div class="flex justify-end space-x-3">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              :disabled="deleting"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { UserPlus, Search, Users, UserCheck, Shield, UserX, Eye, Edit, Trash2 } from 'lucide-vue-next'
import axios from 'axios'

const searchQuery = ref('')
const filterRole = ref('')
const filterStatus = ref('')
const loading = ref(true)
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const deleting = ref(false)
const users = ref([])
const stats = ref({
  total: 0,
  active: 0,
  admins: 0,
  inactive: 0
})

onMounted(async () => {
  await Promise.all([fetchUsers(), fetchStatistics()])
})

const fetchUsers = async () => {
  loading.value = true
  try {
    const params = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (filterRole.value) params.role = filterRole.value
    if (filterStatus.value) params.status = filterStatus.value

    const response = await axios.get('/api/admin/users', { params })
    users.value = response.data.data || response.data
  } catch (error) {
    console.error('Failed to fetch users:', error)
    alert('Failed to load users')
  } finally {
    loading.value = false
  }
}

const fetchStatistics = async () => {
  try {
    const response = await axios.get('/api/admin/users/statistics')
    stats.value = response.data
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
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
    month: 'short',
    day: 'numeric'
  })
}

const confirmDelete = (user) => {
  itemToDelete.value = user
  showDeleteModal.value = true
}

const handleDelete = async () => {
  if (!itemToDelete.value) return

  deleting.value = true
  try {
    await axios.delete(`/api/admin/users/${itemToDelete.value.id}`)
    users.value = users.value.filter(u => u.id !== itemToDelete.value.id)
    await fetchStatistics()
    alert('User deleted successfully!')
    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (error) {
    console.error('Failed to delete user:', error)
    alert('Failed to delete user')
  } finally {
    deleting.value = false
  }
}
</script>
