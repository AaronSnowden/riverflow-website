<template>
  <div
    class="min-h-screen bg-neutral-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <div
          class="mx-auto h-16 w-16 bg-primary rounded-lg flex items-center justify-center"
        >
          <Lock class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold text-neutral-900">
          Admin Login
        </h2>
        <p class="mt-2 text-center text-sm text-neutral-600">
          Sign in to access the admin dashboard
        </p>
      </div>

      <div
        v-if="errorMessage"
        class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded"
      >
        {{ errorMessage }}
      </div>

      <div
        v-if="successMessage"
        class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded"
      >
        {{ successMessage }}
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              v-model="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-neutral-300 placeholder-neutral-500 text-neutral-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm">
            <router-link
              :to="{ name: 'admin-forgot-password' }"
              class="font-medium text-primary hover:text-primary-700"
            >
              Forgot your password?
            </router-link>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
          >
            <span v-if="loading">Signing in...</span>
            <span v-else>Sign in</span>
          </button>
        </div>
      </form>

      <div class="text-center text-sm text-neutral-600">
        <p>Demo credentials:</p>
        <p class="font-mono text-xs mt-1">admin@stiafrica.org / Admin@123</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Lock } from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  // Simulate login with hardcoded credentials for development
  // In production, this should call a real API
  if (email.value === "admin@stiafrica.org" && password.value === "Admin@123") {
    // Manually set the user in the store
    authStore.user = {
      id: 1,
      name: "Admin User",
      email: email.value,
      role: "admin",
    };
    authStore.isAuthenticated = true;
    
    // Save to localStorage
    localStorage.setItem("auth_user", JSON.stringify(authStore.user));
    
    successMessage.value = "Login successful! Redirecting...";
    setTimeout(() => {
      router.push({ name: "admin-dashboard" });
    }, 1000);
  } else {
    errorMessage.value = "Invalid email or password";
  }

  loading.value = false;
};
</script>
