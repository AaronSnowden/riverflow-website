<template>
  <div class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <div class="mx-auto h-16 w-16 bg-secondary rounded-lg flex items-center justify-center">
          <Mail class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold text-neutral-900">
          Reset Password
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-600">
          Enter your email address and we'll send you instructions to reset your password
        </p>
      </div>

      <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
        {{ successMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleResetRequest">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            v-model="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="appearance-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50"
          >
            <span v-if="loading">Sending...</span>
            <span v-else>Send Reset Instructions</span>
          </button>
        </div>

        <div class="text-center">
          <router-link :to="{ name: 'admin-login' }" class="font-medium text-primary hover:text-primary-700 text-sm">
            Back to login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Mail } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const handleResetRequest = () => {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  const result = authStore.requestPasswordReset(email.value)
  
  if (result.success) {
    successMessage.value = result.message
    email.value = ''
  } else {
    errorMessage.value = result.message
  }
  
  loading.value = false
}
</script>

