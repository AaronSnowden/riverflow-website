<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <router-link :to="{ name: 'admin-users' }" class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
          <ArrowLeft class="w-5 h-5 text-neutral-600" />
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">Add New User</h1>
      </div>
      <p class="text-neutral-600 ml-14">Create a new user account</p>
    </div>

    <!-- Form -->
    <div class="bg-white rounded-lg border border-neutral-200 p-6">
      <form @submit.prevent="handleSubmit">
        <!-- Avatar Upload -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-neutral-700 mb-2">
            Profile Picture (Optional)
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
          <p class="mt-1 text-xs text-neutral-500">Upload a profile picture (JPEG, PNG, GIF, or WebP, max 5MB)</p>

          <!-- Avatar Preview -->
          <div v-if="avatarPreview" class="mt-4">
            <p class="text-sm font-medium text-neutral-700 mb-2">Preview:</p>
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
            placeholder="John Doe"
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
            placeholder="john.doe@example.com"
            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-neutral-700 mb-2">
            Password <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            :class="{ 'border-red-500': errors.password }"
          />
          <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          <p class="mt-1 text-xs text-neutral-500">Minimum 8 characters</p>
        </div>

        <!-- Phone -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-neutral-700 mb-2">
            Phone Number (Optional)
          </label>
          <input
            v-model="form.phone"
            type="tel"
            placeholder="+1234567890"
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
            <option value="">Select Role</option>
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
            {{ isSubmitting ? 'Creating...' : 'Create User' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, Loader } from 'lucide-vue-next'
import axios from 'axios'

const router = useRouter()

const form = reactive({
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

const avatarFile = ref(null)
const avatarPreview = ref('')
const avatarInput = ref(null)
const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleAvatarChange = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarFile.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      avatarPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
    errors.avatar = ''
  }
}

const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  Object.keys(errors).forEach(key => errors[key] = '')

  isSubmitting.value = true

  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('email', form.email)
    formData.append('password', form.password)
    formData.append('role', form.role)
    formData.append('status', form.status)
    
    if (form.phone) formData.append('phone', form.phone)
    if (avatarFile.value) formData.append('avatar', avatarFile.value)

    const response = await axios.post('/api/admin/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    successMessage.value = 'User created successfully!'
    setTimeout(() => {
      router.push({ name: 'admin-users' })
    }, 1000)
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Failed to create user'
    const validationErrors = error.response?.data?.errors

    if (validationErrors) {
      Object.keys(validationErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) {
          errors[key] = validationErrors[key][0]
        }
      })
      errorMessage.value = 'Please fix the validation errors above'
    } else {
      errorMessage.value = errorMsg
    }
    console.error('Create error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
