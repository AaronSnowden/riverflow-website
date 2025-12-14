<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-20">
      <Loader class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Not Found State -->
    <div v-else-if="notFound" class="text-center py-20">
      <AlertTriangle class="w-16 h-16 mx-auto mb-4 text-neutral-300" />
      <h2 class="text-2xl font-bold text-neutral-900 mb-2">
        Team Member Not Found
      </h2>
      <p class="text-neutral-600 mb-6">
        The team member you're looking for doesn't exist or has been removed.
      </p>
      <router-link :to="{ name: 'admin-team' }" class="btn-primary inline-flex items-center">
        <ArrowLeft class="w-5 h-5 mr-2" />
        Back to Team Management
      </router-link>
    </div>

    <!-- Edit Form -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-2">
          <button @click="router.push({ name: 'admin-team' })" class="p-2 hover:bg-neutral-100 rounded-lg transition-colors">
            <ArrowLeft class="w-5 h-5 text-neutral-600" />
          </button>
          <h1 class="text-3xl font-bold text-neutral-900">Edit Team Member</h1>
        </div>
        <p class="text-neutral-600 ml-14">Update the details for {{ form.name }}</p>
      </div>

      <!-- Form -->
      <div>
        <div class="bg-white rounded-xl border border-neutral-200 p-6">
          <form @submit.prevent="handleSubmit">
            <!-- Current Image Display -->
            <div v-if="currentImage && !imagePreview" class="mb-6">
              <p class="text-sm font-semibold text-neutral-700 mb-2">Current Image:</p>
              <div class="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                <img :src="getImageUrl(currentImage)" alt="Current" class="w-full h-full object-cover" @error="handleImageError" />
              </div>
            </div>

            <!-- Image Upload -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">
                Profile Image {{ currentImage ? '(Optional - leave empty to keep current)' : '*' }}
              </label>
              <input type="file" ref="imageInput" @change="handleImageChange" accept="image/*" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" :class="{ 'border-red-500': errors.image }" />
              <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
              <p class="mt-1 text-xs text-neutral-500">Upload a new image to replace the current one (JPEG, PNG, GIF, or WebP, max 5MB)</p>

              <!-- Image Preview -->
              <div v-if="imagePreview" class="mt-4">
                <p class="text-sm font-medium text-neutral-700 mb-2">New Image Preview:</p>
                <div class="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200">
                  <img :src="imagePreview" alt="Preview" class="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            <!-- Name -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Full Name <span class="text-red-500">*</span></label>
              <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" :class="{ 'border-red-500': errors.name }" />
              <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
            </div>

            <!-- Position -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Position <span class="text-red-500">*</span></label>
              <input v-model="form.position" type="text" required class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" :class="{ 'border-red-500': errors.position }" />
              <p v-if="errors.position" class="mt-1 text-sm text-red-600">{{ errors.position }}</p>
            </div>

            <!-- Bio -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Biography <span class="text-red-500">*</span></label>
              <textarea v-model="form.bio" rows="4" required class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none" :class="{ 'border-red-500': errors.bio }"></textarea>
              <p v-if="errors.bio" class="mt-1 text-sm text-red-600">{{ errors.bio }}</p>
              <p class="mt-1 text-xs text-neutral-500">{{ form.bio.length }} characters</p>
            </div>

            <!-- Email -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Email (Optional)</label>
              <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" :class="{ 'border-red-500': errors.email }" />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <!-- Phone -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Phone (Optional)</label>
              <input v-model="form.phone" type="tel" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <!-- Social Links -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">LinkedIn Profile (Optional)</label>
              <input v-model="form.linkedin" type="url" placeholder="https://linkedin.com/in/username" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Twitter/X Profile (Optional)</label>
              <input v-model="form.twitter" type="url" placeholder="https://twitter.com/username" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />
            </div>

            <!-- Status -->
            <div class="mb-6">
              <label class="block text-sm font-semibold text-neutral-700 mb-2">Status</label>
              <select v-model="form.status" class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
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
              <button type="button" @click="router.push({ name: 'admin-team' })" class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium">Cancel</button>
              <button type="submit" :disabled="isSubmitting" class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
                <Loader v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
                {{ isSubmitting ? "Saving..." : "Save Changes" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ArrowLeft, Loader, AlertTriangle } from "lucide-vue-next";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const notFound = ref(false);
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const currentImage = ref("");
const imageFile = ref(null);
const imagePreview = ref("");

const form = reactive({
  id: "",
  name: "",
  position: "",
  bio: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  status: "active",
});

const errors = reactive({
  name: "",
  position: "",
  bio: "",
  image: "",
  email: "",
});

onMounted(() => {
  loadTeamMember();
});

const loadTeamMember = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(`/api/admin/team/${route.params.id}`);
    const member = response.data;
    
    form.id = member.id;
    form.name = member.name || "";
    form.position = member.position || "";
    form.bio = member.bio || "";
    form.email = member.email || "";
    form.phone = member.phone || "";
    form.status = member.status || "active";
    currentImage.value = member.image;
    
    if (member.social_links) {
      form.linkedin = member.social_links.linkedin || "";
      form.twitter = member.social_links.twitter || "";
    }
  } catch (error) {
    console.error('Failed to load team member:', error);
    notFound.value = true;
  } finally {
    isLoading.value = false;
  }
};

const getImageUrl = (imagePath) => {
  if (!imagePath) return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop';
  if (imagePath.startsWith('http')) return imagePath;
  return `/storage/${imagePath}`;
};

const handleImageError = (event) => {
  event.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop";
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', form.name);
    formData.append('position', form.position);
    formData.append('bio', form.bio);
    formData.append('status', form.status);
    
    if (form.email) formData.append('email', form.email);
    if (form.phone) formData.append('phone', form.phone);
    if (imageFile.value) formData.append('image', imageFile.value);
    
    const socialLinks = {};
    if (form.linkedin) socialLinks.linkedin = form.linkedin;
    if (form.twitter) socialLinks.twitter = form.twitter;
    if (Object.keys(socialLinks).length > 0) {
      formData.append('social_links', JSON.stringify(socialLinks));
    }

    await axios.post(`/api/admin/team/${form.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    successMessage.value = "Team member updated successfully!";
    setTimeout(() => router.push({ name: "admin-team" }), 1000);
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Failed to update team member';
    const validationErrors = error.response?.data?.errors;
    
    if (validationErrors) {
      Object.keys(validationErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) errors[key] = validationErrors[key][0];
      });
      errorMessage.value = "Please fix the validation errors above";
    } else {
      errorMessage.value = errorMsg;
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>
