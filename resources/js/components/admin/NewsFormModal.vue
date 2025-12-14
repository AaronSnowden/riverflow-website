<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeModal">
    <div class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <!-- Background overlay -->
      <div class="fixed inset-0 transition-opacity bg-neutral-900 bg-opacity-75" @click="closeModal"></div>

      <!-- Modal panel -->
      <div class="inline-block w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
        <!-- Header -->
        <div class="px-6 py-4 border-b border-neutral-200">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-neutral-900">
              {{ isEditMode ? 'Edit News' : 'Create News' }}
            </h3>
            <button @click="closeModal" class="text-neutral-400 hover:text-neutral-600">
              <X class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="px-6 py-4">
          <div class="space-y-4 max-h-[60vh] overflow-y-auto">
            <!-- Title -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Title <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Enter news title"
              />
            </div>

            <!-- Excerpt -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Excerpt
              </label>
              <textarea
                v-model="form.excerpt"
                rows="2"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Short description"
              ></textarea>
            </div>

            <!-- Content -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Content
              </label>
              <textarea
                v-model="form.content"
                rows="6"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Full article content"
              ></textarea>
            </div>

            <!-- Category & Author Row -->
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  v-model="form.category"
                  class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-neutral-700 mb-2">
                  Author
                </label>
                <input
                  v-model="form.author"
                  type="text"
                  class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Author name"
                />
              </div>
            </div>

            <!-- External Source (if external) -->
            <div v-if="form.category === 'external'">
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                External Source
              </label>
              <input
                v-model="form.external_source"
                type="text"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g., The Guardian"
              />
            </div>

            <!-- Status -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Status
              </label>
              <select
                v-model="form.status"
                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <!-- Image Upload -->
            <div>
              <label class="block text-sm font-medium text-neutral-700 mb-2">
                Feature Image
              </label>
              <div class="mt-2">
                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileSelect"
                  class="block w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
              
              <!-- Image Preview -->
              <div v-if="imagePreview || (isEditMode && form.image)" class="mt-4">
                <img :src="imagePreview || form.image" alt="Preview" class="max-h-48 rounded-lg border border-neutral-200" />
              </div>
            </div>
          </div>

          <!-- Alert Messages -->
          <div v-if="errorMessage" class="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {{ errorMessage }}
          </div>

          <!-- Actions -->
          <div class="flex justify-end space-x-3 mt-6 pt-4 border-t border-neutral-200">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading || !form.title"
              class="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">{{ isEditMode ? 'Updating...' : 'Creating...' }}</span>
              <span v-else>{{ isEditMode ? 'Update News' : 'Create News' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  newsItem: Object
})

const emit = defineEmits(['close', 'success'])

const form = ref({
  title: '',
  excerpt: '',
  content: '',
  category: 'internal',
  author: '',
  external_source: '',
  status: 'published',
  image: null
})

const fileInput = ref(null)
const selectedFile = ref(null)
const imagePreview = ref(null)
const loading = ref(false)
const errorMessage = ref('')

const isEditMode = computed(() => !!props.newsItem)

// Watch for newsItem changes (edit mode)
watch(() => props.newsItem, (newItem) => {
  if (newItem) {
    form.value = { ...newItem }
    imagePreview.value = null
    selectedFile.value = null
  } else {
    resetForm()
  }
}, { immediate: true })

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''

  try {
    const { createNews, updateNews } = useNews()
    
    // Prepare FormData
    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('excerpt', form.value.excerpt || '')
    formData.append('content', form.value.content || '')
    formData.append('category', form.value.category)
    formData.append('author', form.value.author || '')
    formData.append('external_source', form.value.external_source || '')
    formData.append('status', form.value.status)
    
    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    if (isEditMode.value) {
      await updateNews(props.newsItem.id, formData)
    } else {
      await createNews(formData)
    }

    emit('success')
    closeModal()
  } catch (error) {
    errorMessage.value = error.data?.message || 'Failed to save news'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    excerpt: '',
    content: '',
    category: 'internal',
    author: '',
    external_source: '',
    status: 'published',
    image: null
  }
  imagePreview.value = null
  selectedFile.value = null
  errorMessage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const closeModal = () => {
  resetForm()
  emit('close')
}
</script>

