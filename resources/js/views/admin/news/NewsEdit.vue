<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center mb-4">
        <router-link
          :to="{ name: 'admin-news' }"
          class="p-2 text-neutral-600 hover:text-primary hover:bg-primary-50 rounded-md transition-colors mr-2"
        >
          <ArrowLeft class="w-5 h-5" />
        </router-link>
        <h1 class="text-3xl font-bold text-neutral-900">Edit News Article</h1>
      </div>
      <p class="text-neutral-600">Update the news article details below</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg border border-neutral-200 p-12">
      <div class="text-center">
        <Loader class="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
        <p class="text-neutral-500">Loading article...</p>
      </div>
    </div>

    <!-- Form -->
    <div v-else class="bg-white rounded-lg border border-neutral-200 p-6">
      <form @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="mb-6">
          <label for="title" class="block text-sm font-medium text-neutral-900 mb-2">
            Title <span class="text-red-500">*</span>
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Enter article title"
          />
        </div>

        <!-- Excerpt -->
        <div class="mb-6">
          <label for="excerpt" class="block text-sm font-medium text-neutral-900 mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            v-model="form.excerpt"
            rows="2"
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Brief summary of the article"
          ></textarea>
          <p class="text-xs text-neutral-500 mt-1">Optional short description for previews</p>
        </div>

        <!-- Content -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-neutral-900 mb-2">
            Content <span class="text-red-500">*</span>
          </label>
          <RichTextEditor v-model="form.content" />
          <p class="text-xs text-neutral-500 mt-1">Use the toolbar to format your content</p>
        </div>

        <!-- Category, Status & State Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Category -->
          <div>
            <label for="category" class="block text-sm font-medium text-neutral-900 mb-2">
              Category <span class="text-red-500">*</span>
            </label>
            <select
              id="category"
              v-model="form.category"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select category</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </div>

          <!-- Status -->
          <div>
            <label for="status" class="block text-sm font-medium text-neutral-900 mb-2">
              Status <span class="text-red-500">*</span>
            </label>
            <select
              id="status"
              v-model="form.status"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <!-- State -->
          <div>
            <label for="state" class="block text-sm font-medium text-neutral-900 mb-2">
              State <span class="text-red-500">*</span>
            </label>
            <select
              id="state"
              v-model="form.state"
              required
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <!-- Author -->
        <div class="mb-6">
          <label for="author" class="block text-sm font-medium text-neutral-900 mb-2">
            Author
          </label>
          <input
            id="author"
            v-model="form.author"
            type="text"
            class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Author name"
          />
        </div>

        <!-- Image -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-neutral-900 mb-2">
            Featured Image
          </label>
          
          <!-- Image Source Toggle -->
          <div class="flex items-center space-x-4 mb-3">
            <button
              @click="imageSource = 'url'"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                imageSource === 'url'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              ]"
              type="button"
            >
              Enter URL
            </button>
            <button
              @click="imageSource = 'upload'"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                imageSource === 'upload'
                  ? 'bg-primary text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              ]"
              type="button"
            >
              Upload Image
            </button>
          </div>

          <!-- URL Input -->
          <div v-if="imageSource === 'url'">
            <input
              v-model="form.image"
              type="url"
              class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
            <p class="text-xs text-neutral-500 mt-1">Enter the full URL to the article image</p>
          </div>

          <!-- Upload Input -->
          <div v-else>
            <div class="flex items-center space-x-3">
              <label class="flex-1 cursor-pointer">
                <input
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
                />
                <div class="flex items-center justify-center px-4 py-2 border-2 border-dashed border-neutral-300 rounded-md hover:border-primary transition-colors">
                  <svg class="w-5 h-5 mr-2 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span class="text-sm text-neutral-700">
                    {{ uploadedFileName || 'Click to select an image' }}
                  </span>
                </div>
              </label>
              <button
                v-if="uploadedFileName"
                @click="clearUpload"
                type="button"
                class="px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Clear
              </button>
            </div>
            <p class="text-xs text-neutral-500 mt-1">Upload an image from your device (JPG, PNG, GIF)</p>
            
            <!-- Upload Progress -->
            <div v-if="uploading" class="mt-3">
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-neutral-200 rounded-full h-2">
                  <div class="bg-primary h-2 rounded-full transition-all" :style="{ width: uploadProgress + '%' }"></div>
                </div>
                <span class="text-xs text-neutral-600">{{ uploadProgress }}%</span>
              </div>
            </div>
          </div>
          
          <!-- Image Preview -->
          <div v-if="form.image" class="mt-3">
            <img
              :src="form.image"
              alt="Preview"
              class="w-full max-w-md h-48 object-cover rounded-lg border border-neutral-200"
              @error="imageError = true"
            />
            <p v-if="imageError" class="text-xs text-red-500 mt-1">Failed to load image</p>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end space-x-3 pt-6 border-t border-neutral-200">
          <router-link
            :to="{ name: 'admin-news' }"
            class="px-6 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </router-link>
          <button
            type="submit"
            :disabled="submitting"
            class="px-6 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors flex items-center"
          >
            <Save v-if="!submitting" class="w-4 h-4 mr-2" />
            <span v-if="submitting">Updating...</span>
            <span v-else>Update Article</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Loader, Save } from 'lucide-vue-next'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { uploadApi } from '@/api/upload'
import { newsApi } from '@/api/news'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const form = ref({
  title: '',
  excerpt: '',
  content: '',
  category: '',
  status: 'draft',
  state: 'active',
  author: '',
  image: ''
})

const submitting = ref(false)
const error = ref(null)
const imageError = ref(false)
const imageSource = ref('url')
const uploading = ref(false)
const uploadProgress = ref(0)
const uploadedFileName = ref('')
const fileInput = ref(null)

// Load news article
onMounted(async () => {
  try {
    const article = await newsApi.getById(route.params.id)
    form.value = {
      title: article.title || '',
      excerpt: article.excerpt || '',
      content: article.content || '',
      category: article.category || '',
      status: article.status || 'draft',
      state: article.state || 'active',
      author: article.author || '',
      image: article.image || ''
    }
  } catch (err) {
    console.error('Failed to load article:', err)
    error.value = 'Failed to load article. Please try again.'
  } finally {
    loading.value = false
  }
})

// Reset image error when URL changes
watch(() => form.value.image, () => {
  imageError.value = false
})

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Please select a valid image file'
    return
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Image size must be less than 5MB'
    return
  }

  uploadedFileName.value = file.name
  uploading.value = true
  uploadProgress.value = 0
  error.value = null

  try {
    const formData = new FormData()
    formData.append('file', file)

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      if (uploadProgress.value < 90) {
        uploadProgress.value += 10
      }
    }, 200)

    const response = await uploadApi.uploadFile(file, (progress) => {
      uploadProgress.value = progress
    })

    clearInterval(progressInterval)
    uploadProgress.value = 100

    // Set the uploaded image URL
    form.value.image = response.url
    imageError.value = false
  } catch (err) {
    console.error('Upload failed:', err)
    error.value = 'Failed to upload image. Please try again.'
    uploadedFileName.value = ''
  } finally {
    uploading.value = false
  }
}

const clearUpload = () => {
  form.value.image = ''
  uploadedFileName.value = ''
  uploadProgress.value = 0
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const handleSubmit = async () => {
  submitting.value = true
  error.value = null

  try {
    const payload = {
      title: form.value.title,
      excerpt: form.value.excerpt || '',
      content: form.value.content,
      image: form.value.image || '',
      author: form.value.author || 'Admin',
      category: form.value.category,
      status: form.value.status,
      state: form.value.state
    }

    await newsApi.update(route.params.id, payload)
    
    // Navigate back to news list
    router.push({ name: 'admin-news' })
  } catch (err) {
    console.error('Failed to update news:', err)
    error.value = err.message || 'Failed to update article. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
