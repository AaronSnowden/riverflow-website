<template>
    <div>
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
            <div
                class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
        </div>

        <!-- Not Found -->
        <div v-else-if="!event" class="text-center py-12">
            <h2 class="text-2xl font-bold text-neutral-900 mb-4">
                Event Not Found
            </h2>
            <p class="text-neutral-600 mb-6">
                The event you're looking for doesn't exist.
            </p>
            <router-link :to="{ name: 'admin-events' }" class="btn-primary">
                Back to Events
            </router-link>
        </div>

        <!-- Edit Form -->
        <div v-else>
            <!-- Header -->
            <div class="mb-8 flex items-center justify-between">
                <div>
                    <div class="flex items-center space-x-3 mb-2">
                        <router-link
                            :to="{ name: 'admin-events' }"
                            class="p-2 hover:bg-neutral-100 rounded-md transition-colors"
                        >
                            <ArrowLeft class="w-5 h-5 text-neutral-600" />
                        </router-link>
                        <h1 class="text-3xl font-bold text-neutral-900">
                            Edit Event
                        </h1>
                    </div>
                    <p class="text-neutral-600 ml-14">
                        Update event information
                    </p>
                </div>
            </div>

            <form @submit.prevent="handleSubmit" class="">
                <!-- Basic Information -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Basic Information
                    </h2>

                    <div class="space-y-4">
                        <!-- Title -->
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Event Title <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.title"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <!-- Slug -->
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                URL Slug <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.slug"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <p class="text-xs text-neutral-500 mt-1">
                                This will be used in the event URL.
                            </p>
                        </div>

                        <!-- Category -->
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Category <span class="text-red-500">*</span>
                            </label>
                            <select
                                v-model="form.category"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                                <option value="Workshop">Workshop</option>
                                <option value="Conference">Conference</option>
                                <option value="Launch Event">
                                    Launch Event
                                </option>
                                <option value="Symposium">Symposium</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Training">Training</option>
                                <option value="Webinar">Webinar</option>
                            </select>
                        </div>

                        <!-- Short Description -->
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Short Description
                                <span class="text-red-500">*</span>
                            </label>
                            <textarea
                                v-model="form.description"
                                required
                                rows="3"
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            ></textarea>
                        </div>

                        <!-- Full Description -->
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Full Description
                                <span class="text-red-500">*</span>
                            </label>
                            <RichTextEditor v-model="form.fullDescription" />
                        </div>

                        <!-- Event Image -->
                        <div>
                            <label class="block text-sm font-medium text-neutral-700 mb-2">
                                Event Image <span class="text-red-500">*</span>
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
                                    :required="!form.image"
                                    placeholder="https://example.com/image.jpg"
                                    class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                                />
                                <p class="text-xs text-neutral-500 mt-1">
                                    Recommended size: 800x500px
                                </p>
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
                                <p class="text-xs text-neutral-500 mt-1">
                                    Upload an image from your device (JPG, PNG, GIF - max 5MB)
                                </p>
                                
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
                    </div>
                </div>

                <!-- Date & Time -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Date & Time
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Start Date <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.date"
                                type="date"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                End Date <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.endDate"
                                type="date"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Time <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.time"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <!-- Location -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Location
                    </h2>

                    <div class="space-y-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Location <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.location"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Venue Details
                            </label>
                            <input
                                v-model="form.venue"
                                type="text"
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <!-- Registration Details -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <h2 class="text-xl font-semibold text-neutral-900 mb-4">
                        Registration Details
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Capacity <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model.number="form.capacity"
                                type="number"
                                required
                                min="1"
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div>
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Registration Deadline
                                <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.registrationDeadline"
                                type="date"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>

                        <div class="md:col-span-2">
                            <label
                                class="block text-sm font-medium text-neutral-700 mb-2"
                            >
                                Registration Fee
                                <span class="text-red-500">*</span>
                            </label>
                            <input
                                v-model="form.fee"
                                type="text"
                                required
                                class="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <!-- Speakers -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-semibold text-neutral-900">
                            Speakers
                        </h2>
                        <button
                            type="button"
                            @click="addSpeaker"
                            class="text-sm text-primary hover:text-primary-dark flex items-center"
                        >
                            <Plus class="w-4 h-4 mr-1" />
                            Add Speaker
                        </button>
                    </div>

                    <div
                        v-if="form.speakers.length === 0"
                        class="text-sm text-neutral-500 text-center py-4"
                    >
                        No speakers added yet.
                    </div>

                    <div v-else class="space-y-3">
                        <div
                            v-for="(speaker, index) in form.speakers"
                            :key="index"
                            class="flex items-center space-x-3"
                        >
                            <input
                                v-model="form.speakers[index]"
                                type="text"
                                placeholder="Speaker name and title"
                                class="flex-1 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="button"
                                @click="removeSpeaker(index)"
                                class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Agenda -->
                <div
                    class="bg-white rounded-lg border border-neutral-200 p-6 mb-6"
                >
                    <div class="flex items-center justify-between mb-4">
                        <h2 class="text-xl font-semibold text-neutral-900">
                            Agenda
                        </h2>
                        <button
                            type="button"
                            @click="addAgendaItem"
                            class="text-sm text-primary hover:text-primary-dark flex items-center"
                        >
                            <Plus class="w-4 h-4 mr-1" />
                            Add Item
                        </button>
                    </div>

                    <div
                        v-if="form.agenda.length === 0"
                        class="text-sm text-neutral-500 text-center py-4"
                    >
                        No agenda items added yet.
                    </div>

                    <div v-else class="space-y-3">
                        <div
                            v-for="(item, index) in form.agenda"
                            :key="index"
                            class="flex items-center space-x-3"
                        >
                            <input
                                v-model="form.agenda[index]"
                                type="text"
                                placeholder="Agenda item description"
                                class="flex-1 px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="button"
                                @click="removeAgendaItem(index)"
                                class="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Form Actions -->
                <div class="flex items-center justify-end space-x-4 pb-8">
                    <router-link
                        :to="{ name: 'admin-events' }"
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
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft, Plus, X, Save } from "lucide-vue-next";
import { useEventsStore } from "@/stores/events";
import RichTextEditor from "@/components/RichTextEditor.vue";
import { uploadApi } from "@/api/upload";

const route = useRoute();
const router = useRouter();
const eventsStore = useEventsStore();

const loading = ref(true);
const event = ref(null);
const submitting = ref(false);
const imageSource = ref('url');
const uploading = ref(false);
const uploadProgress = ref(0);
const uploadedFileName = ref('');
const fileInput = ref(null);
const imageError = ref(false);
const uploadError = ref(null);

const form = ref({
    title: "",
    slug: "",
    date: "",
    endDate: "",
    time: "",
    location: "",
    venue: "",
    description: "",
    fullDescription: "",
    image: "",
    category: "",
    capacity: null,
    registrationDeadline: "",
    fee: "",
    speakers: [],
    agenda: [],
});

onMounted(async () => {
    const eventId = route.params.id;

    try {
        // Fetch event from API
        await eventsStore.fetchEventById(eventId);
        event.value = eventsStore.currentEvent;

        if (event.value) {
            console.log('Fetched event:', event.value);
            
            // Helper to format date to YYYY-MM-DD
            const formatDateForInput = (dateStr) => {
                if (!dateStr) return '';
                // If already in YYYY-MM-DD format, return as is
                if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr;
                // Otherwise parse and format
                const date = new Date(dateStr);
                return date.toISOString().split('T')[0];
            };
            
            // Populate form with event data (convert snake_case to camelCase)
            form.value = {
                title: event.value.title || "",
                slug: event.value.slug || "",
                date: formatDateForInput(event.value.date),
                endDate: formatDateForInput(event.value.end_date),
                time: event.value.time || "",
                location: event.value.location || "",
                venue: event.value.venue || "",
                description: event.value.description || "",
                fullDescription: event.value.full_description || "",
                image: event.value.image || "",
                category: event.value.category || "",
                capacity: event.value.capacity || null,
                registrationDeadline: formatDateForInput(event.value.registration_deadline),
                fee: event.value.fee || "",
                speakers: Array.isArray(event.value.speakers) ? [...event.value.speakers] : [],
                agenda: Array.isArray(event.value.agenda) ? [...event.value.agenda] : [],
            };
            
            console.log('Form populated:', form.value);
        }
    } catch (error) {
        console.error("Failed to fetch event:", error);
    } finally {
        loading.value = false;
    }
});

const addSpeaker = () => {
    form.value.speakers.push("");
};

const removeSpeaker = (index) => {
    form.value.speakers.splice(index, 1);
};

const addAgendaItem = () => {
    form.value.agenda.push("");
};

const removeAgendaItem = (index) => {
    form.value.agenda.splice(index, 1);
};

const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        uploadError.value = 'Please select a valid image file';
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        uploadError.value = 'Image size must be less than 5MB';
        return;
    }

    uploadedFileName.value = file.name;
    uploading.value = true;
    uploadProgress.value = 0;
    uploadError.value = null;

    try {
        const response = await uploadApi.uploadFile(file, (progress) => {
            uploadProgress.value = progress;
        });

        // Set the uploaded image URL
        form.value.image = response.url;
        imageError.value = false;
    } catch (err) {
        console.error('Upload failed:', err);
        uploadError.value = 'Failed to upload image. Please try again.';
        uploadedFileName.value = '';
    } finally {
        uploading.value = false;
    }
};

const clearUpload = () => {
    form.value.image = '';
    uploadedFileName.value = '';
    uploadProgress.value = 0;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const handleSubmit = async () => {
    submitting.value = true;
    try {
        // Prepare data for API (convert camelCase to snake_case)
        const eventData = {
            title: form.value.title,
            slug: form.value.slug,
            description: form.value.description,
            full_description: form.value.fullDescription,
            image: form.value.image,
            date: form.value.date,
            end_date: form.value.endDate,
            time: form.value.time,
            location: form.value.location,
            venue: form.value.venue,
            category: form.value.category,
            capacity: form.value.capacity,
            registration_deadline: form.value.registrationDeadline,
            fee: form.value.fee,
            speakers: form.value.speakers.filter((s) => s.trim() !== ""),
            agenda: form.value.agenda.filter((a) => a.trim() !== ""),
            status: "published", // Set initial status as draft
            state: "active", // Set initial state as active
        };

        // Call the store action to update the event
        await eventsStore.updateEvent(route.params.id, eventData);

        alert("Event updated successfully!");
        router.push({ name: "admin-events" });
    } catch (error) {
        console.error("Failed to update event:", error);

        // Extract error message if available
        let errorMessage = "Failed to update event. Please try again.";
        if (
            error.response &&
            error.response.data &&
            error.response.data.errors
        ) {
            const errors = error.response.data.errors;
            errorMessage = Object.values(errors).flat().join("\n");
        } else if (
            error.response &&
            error.response.data &&
            error.response.data.message
        ) {
            errorMessage = error.response.data.message;
        } else if (error.message) {
            errorMessage = error.message;
        }

        alert(errorMessage);
    } finally {
        submitting.value = false;
    }
};
</script>
