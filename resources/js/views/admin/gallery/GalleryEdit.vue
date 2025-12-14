<template>
  <div>
    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
      ></div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!galleryItem" class="text-center py-12">
      <h2 class="text-2xl font-bold text-neutral-900 mb-4">
        Gallery Item Not Found
      </h2>
      <p class="text-neutral-600 mb-6">
        The gallery item you're looking for doesn't exist.
      </p>
      <router-link :to="{ name: 'admin-gallery' }" class="btn-primary">
        Back to Gallery
      </router-link>
    </div>

    <!-- Edit Form -->
    <div v-else>
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <div class="flex items-center space-x-3 mb-2">
            <router-link
              :to="{ name: 'admin-gallery' }"
              class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <ArrowLeft class="w-5 h-5 text-neutral-600" />
            </router-link>
            <h1 class="text-3xl font-bold text-neutral-900">
              Edit Gallery Image
            </h1>
          </div>
          <p class="text-neutral-600 ml-14">Update gallery item information</p>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="w-full">
        <!-- Image Display Section -->
        <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">
            Current Image
          </h2>

          <div class="space-y-4">
            <!-- Current Image Preview -->
            <div class="border border-neutral-200 rounded-lg p-4 bg-neutral-50">
              <div
                class="aspect-square max-w-sm mx-auto bg-neutral-100 rounded-lg overflow-hidden"
              >
                <img
                  :src="newImagePreview || currentImageUrl"
                  :alt="form.title"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>

            <!-- Replace Image Option -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Replace Image (Optional)
              </label>
              <div class="flex items-center space-x-3">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  class="hidden"
                  @change="handleFileSelect"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
                >
                  Choose New Image
                </button>
                <span v-if="newImage" class="text-sm text-neutral-600">
                  {{ newImage.name }} ({{ formatFileSize(newImage.size) }})
                </span>
                <button
                  v-if="newImage"
                  type="button"
                  @click="clearNewImage"
                  class="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <p class="text-xs text-neutral-500 mt-1">
                Leave empty to keep the current image. Max file size: 10MB
              </p>
            </div>
          </div>
        </div>

        <!-- Image Details -->
        <div class="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <h2 class="text-xl font-semibold text-neutral-900 mb-4">
            Image Details
          </h2>

          <div class="space-y-4">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <!-- Category -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Category <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.category"
                required
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="Training">Training</option>
                <option value="Activities">Activities</option>
                <option value="Events">Events</option>
              </select>
            </div>

            <!-- Date -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Date <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.date"
                type="date"
                required
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <!-- Description (Optional) -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                v-model="form.description"
                rows="3"
                placeholder="Add any additional details about this image..."
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              ></textarea>
            </div>

            <!-- Photographer -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Photographer (Optional)
              </label>
              <input
                v-model="form.photographer"
                type="text"
                placeholder="Photographer name"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <!-- Location -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Location (Optional)
              </label>
              <input
                v-model="form.location"
                type="text"
                placeholder="Where was this taken?"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end space-x-4 pb-8">
          <router-link
            :to="{ name: 'admin-gallery' }"
            class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark disabled:opacity-50 flex items-center"
          >
            <Save class="w-4 h-4 mr-2" />
            {{ submitting ? "Saving..." : "Save Changes" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Save } from "lucide-vue-next";
import { useGalleryStore } from "@/stores/gallery";

const route = useRoute();
const router = useRouter();
const galleryStore = useGalleryStore();

const loading = computed(() => galleryStore.loadingCurrent);
const galleryItem = computed(() => galleryStore.currentGalleryItem);
const submitting = ref(false);
const newImage = ref(null);
const newImagePreview = ref(null);

const form = ref({
  title: "",
  category: "",
  date: "",
  description: "",
  photographer: "",
  location: "",
  status: "published",
});

const currentImageUrl = computed(() => {
  if (!galleryItem.value) return ''
  // Handle both relative and absolute image paths
  const imagePath = galleryItem.value.image
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  return `/${imagePath}`
});

onMounted(async () => {
  const itemId = parseInt(route.params.id);
  try {
    await galleryStore.fetchGalleryItemById(itemId);
    
    if (galleryItem.value) {
      // Populate form with gallery item data
      form.value = {
        title: galleryItem.value.title || "",
        category: galleryItem.value.category || "",
        date: galleryItem.value.date || "",
        description: galleryItem.value.description || "",
        photographer: galleryItem.value.photographer || "",
        location: galleryItem.value.location || "",
        status: galleryItem.value.status || "published",
      };
    }
  } catch (error) {
    console.error('Failed to load gallery item:', error);
  }
});

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    newImage.value = file;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      newImagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const clearNewImage = () => {
  newImage.value = null;
  newImagePreview.value = null;
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const handleSubmit = async () => {
  if (!galleryItem.value) return;
  
  submitting.value = true;
  try {
    let updateData;
    
    // If there's a new image, use FormData
    if (newImage.value) {
      updateData = new FormData();
      updateData.append('image', newImage.value);
      updateData.append('title', form.value.title);
      updateData.append('category', form.value.category);
      updateData.append('date', form.value.date);
      updateData.append('status', form.value.status);
      
      if (form.value.description) {
        updateData.append('description', form.value.description);
      }
      if (form.value.photographer) {
        updateData.append('photographer', form.value.photographer);
      }
      if (form.value.location) {
        updateData.append('location', form.value.location);
      }
    } else {
      // No new image, just update text fields
      updateData = {
        title: form.value.title,
        category: form.value.category,
        date: form.value.date,
        description: form.value.description || null,
        photographer: form.value.photographer || null,
        location: form.value.location || null,
        status: form.value.status,
      };
    }

    await galleryStore.updateGalleryItem(galleryItem.value.id, updateData);

    alert("Gallery item updated successfully!");
    router.push({ name: "admin-gallery" });
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update gallery item';
    const validationErrors = error.response?.data?.errors;
    
    if (validationErrors) {
      const errorList = Object.values(validationErrors).flat().join('\n');
      alert(`Validation errors:\n${errorList}`);
    } else {
      alert(errorMessage);
    }
    
    console.error('Update error:', error);
  } finally {
    submitting.value = false;
  }
};
</script>
