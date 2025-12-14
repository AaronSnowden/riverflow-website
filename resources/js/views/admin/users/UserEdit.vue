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

    <!-- Edit Form -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <router-link :to="{ name: 'admin-users' }" class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ArrowLeft class="w-5 h-5 text-neutral-600" />
          </router-link>
          <h1 class="text-3xl font-bold text-neutral-900">Edit User</h1>
        </div>
        <p class="text-neutral-600 ml-14">Update user information for {{ form.name }}</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg border border-neutral-200 p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Current Avatar Display -->
          <div v-if="currentAvatar && !avatarPreview" class="mb-6">
            <p class="text-sm font-semibold text-neutral-700 mb-2">Current Avatar:</p>
            <div class="w-24 h-24 rounded-full overflow-hidden bg-neutral-100">
              <img :src="getAvatarUrl(currentAvatar)" alt="Current" class="w-full h-full object-cover" @error="handleImageError" />
            </div>
          </div>

          <!-- Avatar Upload -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Profile Picture {{ currentAvatar ? '(Optional - leave empty to keep current)' : '' }}
            </label>
            <input
              type="file"
              ref="avatarInput"
              @change="handleAvatarChange"
              accept="image/*"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.avatar }"
            />
            <p v-if="errors.avatar" class="mt-1 text-sm text-red-600">{{ errors.avatar }}</p>
            <p class="mt-1 text-xs text-neutral-500">Upload a new avatar to replace the current one (JPEG, PNG, GIF, or WebP, max 5MB)</p>

            <!-- Avatar Preview -->
            <div v-if="avatarPreview" class="mt-4">
              <p class="text-sm font-medium text-neutral-700 mb-2">New Avatar Preview:</p>
              <div class="w-24 h-24 rounded-full overflow-hidden bg-neutral-100">
                <img :src="avatarPreview" alt="Preview" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Name -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Password (Optional - leave empty to keep current)
            </label>
            <input
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            <p class="mt-1 text-xs text-neutral-500">Minimum 8 characters (only if changing)</p>
          </div>

          <!-- Phone -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Phone Number (Optional)
            </label>
            <input
              v-model="form.phone"
              type="tel"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.phone }"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-600">{{ errors.phone }}</p>
          </div>

          <!-- Role -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Role <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.role"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              :class="{ 'border-red-500': errors.role }"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
          </div>

          <!-- Status -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Status
            </label>
            <select
              v-model="form.status"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <router-link
              :to="{ name: 'admin-users' }"
              class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium text-center"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Loader v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
              {{ isSubmitting ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ArrowLeft, Loader, AlertTriangle } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const isLoading = ref(true)
const notFound = ref(false)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const currentAvatar = ref('')
const avatarFile = ref(null)
const avatarPreview = ref('')

const form = reactive({
  id: '',
  name: '',
  email: '',
  password: '',
  phone: '',
  role: 'user',
  status: 'active'
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  phone: '',
  role: '',
  avatar: ''
})

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  isLoading.value = true
  try {
    const response = await axios.get(`/api/admin/users/${route.params.id}`)
    const user = response.data
    
    form.id = user.id
    form.name = user.name || ''
    form.email = user.email || ''
    form.phone = user.phone || ''
    form.role = user.role || 'user'
    form.status = user.status || 'active'
    currentAvatar.value = user.avatar
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

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  Object.keys(errors).forEach(key => errors[key] = '')

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('role', form.role)
    formData.append('status', form.status)
    
    if (form.password) formData.append('password', form.password)
    if (form.phone) formData.append('phone', form.phone)
    if (avatarFile.value) formData.append('avatar', avatarFile.value)

    await axios.post(`/api/admin/users/${form.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    successMessage.value = 'User updated successfully!'
    setTimeout(() => router.push({ name: 'admin-users' }), 1000)
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Failed to update user'
    const validationErrors = error.response?.data?.errors
    
    if (validationErrors) {
      Object.keys(validationErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) errors[key] = validationErrors[key][0]
      })
      errorMessage.value = 'Please fix the validation errors above'
    } else {
      errorMessage.value = errorMsg
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>
