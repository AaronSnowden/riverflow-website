<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center gap-3 mb-2">
        <button
          @click="router.back()"
          class="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft class="w-5 h-5 text-neutral-600" />
        </button>
        <h1 class="text-3xl font-bold text-neutral-900">Add Team Member</h1>
      </div>
      <p class="text-neutral-600 ml-14">
        Fill in the details to add a new team member
      </p>
    </div>

    <!-- Form -->
    <div class="">
      <div class="bg-white rounded-xl border border-neutral-200 p-6">
        <form @submit.prevent="handleSubmit">
          <!-- Image Upload -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Profile Image <span class="text-red-500">*</span>
            </label>
            <input
              type="file"
              ref="imageInput"
              @change="handleImageChange"
              accept="image/*"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-red-500': errors.image }"
            />
            <p v-if="errors.image" class="mt-1 text-sm text-red-600">
              {{ errors.image }}
            </p>
            <p class="mt-1 text-xs text-neutral-500">
              Upload a profile image (JPEG, PNG, GIF, or WebP, max 5MB)
            </p>

            <!-- Image Preview -->
            <div v-if="imagePreview" class="mt-4">
              <p class="text-sm font-medium text-neutral-700 mb-2">Preview:</p>
              <div
                class="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200"
              >
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-full h-full object-cover"
                />
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
              placeholder="Dr. John Doe"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">
              {{ errors.name }}
            </p>
          </div>

          <!-- Position -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Position <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.position"
              type="text"
              placeholder="Executive Director"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-red-500': errors.position }"
            />
            <p v-if="errors.position" class="mt-1 text-sm text-red-600">
              {{ errors.position }}
            </p>
          </div>

          <!-- Bio -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Biography <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.bio"
              rows="4"
              placeholder="Brief biography and experience..."
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              :class="{ 'border-red-500': errors.bio }"
            ></textarea>
            <p v-if="errors.bio" class="mt-1 text-sm text-red-600">
              {{ errors.bio }}
            </p>
            <p class="mt-1 text-xs text-neutral-500">
              {{ form.bio.length }} characters
            </p>
          </div>

          <!-- Email (Optional) -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Email (Optional)
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="john.doe@stiafrica.org"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">
              {{ errors.email }}
            </p>
          </div>

          <!-- Phone (Optional) -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Phone (Optional)
            </label>
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+1234567890"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- Social Links (Optional) -->
          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              LinkedIn Profile (Optional)
            </label>
            <input
              v-model="form.linkedin"
              type="url"
              placeholder="https://linkedin.com/in/username"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-semibold text-neutral-700 mb-2">
              Twitter/X Profile (Optional)
            </label>
            <input
              v-model="form.twitter"
              type="url"
              placeholder="https://twitter.com/username"
              class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <!-- Error Message -->
          <div
            v-if="errorMessage"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>

          <!-- Success Message -->
          <div
            v-if="successMessage"
            class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <p class="text-sm text-green-800">{{ successMessage }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button
              type="button"
              @click="router.back()"
              class="flex-1 px-6 py-3 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Loader v-if="isSubmitting" class="w-5 h-5 mr-2 animate-spin" />
              {{ isSubmitting ? "Adding..." : "Add Team Member" }}
            </button>
          </div>
        </form>
      </div>

      <!-- Tips Card -->
      <div class="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div class="flex items-start gap-3">
          <div
            class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <Lightbulb class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-blue-900 mb-2">Tips</h3>
            <ul class="text-sm text-blue-800 space-y-1">
              <li>• Use high-quality professional photos</li>
              <li>• Keep biographies concise but informative</li>
              <li>• Include relevant credentials and experience</li>
              <li>• Ensure all information is accurate and up-to-date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, Loader, Lightbulb } from "lucide-vue-next";
import axios from "axios";

const router = useRouter();

const form = reactive({
  name: "",
  position: "",
  bio: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
});

const errors = reactive({
  name: "",
  position: "",
  bio: "",
  image: "",
  email: "",
});

const imageFile = ref(null);
const imagePreview = ref("");
const imageInput = ref(null);
const isSubmitting = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
    errors.image = "";
  }
};

const validateForm = () => {
  let isValid = true;
  Object.keys(errors).forEach((key) => (errors[key] = ""));

  if (!form.name.trim()) {
    errors.name = "Name is required";
    isValid = false;
  }

  if (!form.position.trim()) {
    errors.position = "Position is required";
    isValid = false;
  }

  if (!form.bio.trim()) {
    errors.bio = "Biography is required";
    isValid = false;
  } else if (form.bio.length < 20) {
    errors.bio = "Biography must be at least 20 characters";
    isValid = false;
  }

  if (!imageFile.value) {
    errors.image = "Profile image is required";
    isValid = false;
  }

  if (form.email && !isValidEmail(form.email)) {
    errors.email = "Please enter a valid email address";
    isValid = false;
  }

  return isValid;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  if (!validateForm()) {
    errorMessage.value = "Please fix the errors above";
    return;
  }

  isSubmitting.value = true;

  try {
    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('position', form.position);
    formData.append('bio', form.bio);
    
    if (form.email) formData.append('email', form.email);
    if (form.phone) formData.append('phone', form.phone);
    if (imageFile.value) formData.append('image', imageFile.value);
    
    // Build social links object
    const socialLinks = {};
    if (form.linkedin) socialLinks.linkedin = form.linkedin;
    if (form.twitter) socialLinks.twitter = form.twitter;
    if (Object.keys(socialLinks).length > 0) {
      formData.append('social_links', JSON.stringify(socialLinks));
    }
    
    formData.append('status', 'active');

    const response = await axios.post('/api/admin/team', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    successMessage.value = "Team member added successfully!";
    setTimeout(() => {
      router.push({ name: "admin-team" });
    }, 1000);
  } catch (error) {
    const errorMsg = error.response?.data?.message || 'Failed to add team member. Please try again.';
    const validationErrors = error.response?.data?.errors;
    
    if (validationErrors) {
      Object.keys(validationErrors).forEach(key => {
        if (errors.hasOwnProperty(key)) {
          errors[key] = validationErrors[key][0];
        }
      });
      errorMessage.value = "Please fix the validation errors above";
    } else {
      errorMessage.value = errorMsg;
    }
    console.error('Create error:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
