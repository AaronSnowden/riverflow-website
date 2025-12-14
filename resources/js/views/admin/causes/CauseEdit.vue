<template>
    <div>
        <div class="mb-6">
            <div class="flex items-center gap-3 mb-2">
                <router-link
                    :to="{ name: 'admin-causes' }"
                    class="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                    <ArrowLeft class="w-5 h-5 text-neutral-600" />
                </router-link>
                <h1 class="text-3xl font-bold text-neutral-900">Edit Cause</h1>
            </div>
            <p class="text-neutral-600 ml-14">Update cause information</p>
        </div>

        <!-- Loading State -->
        <div v-if="isLoading" class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <!-- Form -->
        <div v-else-if="cause" class="bg-white rounded-lg border border-neutral-200 p-6">
            <form @submit.prevent="handleSubmit">
                <!-- Current Image Display -->
                <div v-if="cause.image && !imagePreview" class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Current Image
                    </label>
                    <div class="w-full max-w-md aspect-video rounded-lg overflow-hidden bg-neutral-100">
                        <img :src="cause.image" alt="Current" class="w-full h-full object-cover" />
                    </div>
                </div>

                <!-- Image Upload -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Update Image (Optional)
                    </label>
                    <input
                        type="file"
                        ref="imageInput"
                        @change="handleImageChange"
                        accept="image/*"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        :class="{ 'border-red-500': errors.image }"
                    />
                    <p v-if="errors.image" class="mt-1 text-sm text-red-600">{{ errors.image }}</p>
                    <p class="mt-1 text-xs text-neutral-500">
                        Upload a new image to replace the current one (JPEG, PNG, JPG, GIF, or WebP, max 2MB)
                    </p>

                    <!-- New Image Preview -->
                    <div v-if="imagePreview" class="mt-4">
                        <p class="text-sm font-medium text-neutral-700 mb-2">New Preview:</p>
                        <div class="w-full max-w-md aspect-video rounded-lg overflow-hidden bg-neutral-100">
                            <img :src="imagePreview" alt="New Preview" class="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>

                <!-- Title -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Title <span class="text-red-500">*</span>
                    </label>
                    <input
                        v-model="form.title"
                        type="text"
                        required
                        placeholder="Teacher Training Fund"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        :class="{ 'border-red-500': errors.title }"
                    />
                    <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
                </div>

                <!-- Description -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Short Description <span class="text-red-500">*</span>
                    </label>
                    <textarea
                        v-model="form.description"
                        required
                        rows="3"
                        placeholder="Brief description of the cause..."
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        :class="{ 'border-red-500': errors.description }"
                    ></textarea>
                    <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
                </div>

                <!-- Full Description -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Full Description (Optional)
                    </label>
                    <textarea
                        v-model="form.full_description"
                        rows="5"
                        placeholder="Detailed description of the cause, its goals, and impact..."
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        :class="{ 'border-red-500': errors.full_description }"
                    ></textarea>
                    <p v-if="errors.full_description" class="mt-1 text-sm text-red-600">{{ errors.full_description }}</p>
                </div>

                <!-- Grid Layout for Category, Urgency, Status -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <!-- Category -->
                    <div>
                        <label class="block text-sm font-semibold text-neutral-700 mb-2">
                            Category <span class="text-red-500">*</span>
                        </label>
                        <select
                            v-model="form.category"
                            required
                            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            :class="{ 'border-red-500': errors.category }"
                        >
                            <option value="">Select Category</option>
                            <option value="Education">Education</option>
                            <option value="Resources">Resources</option>
                            <option value="Technology">Technology</option>
                            <option value="Empowerment">Empowerment</option>
                            <option value="Infrastructure">Infrastructure</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                        <p v-if="errors.category" class="mt-1 text-sm text-red-600">{{ errors.category }}</p>
                    </div>

                    <!-- Urgency -->
                    <div>
                        <label class="block text-sm font-semibold text-neutral-700 mb-2">
                            Urgency <span class="text-red-500">*</span>
                        </label>
                        <select
                            v-model="form.urgency"
                            required
                            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            :class="{ 'border-red-500': errors.urgency }"
                        >
                            <option value="Critical">Critical</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <p v-if="errors.urgency" class="mt-1 text-sm text-red-600">{{ errors.urgency }}</p>
                    </div>

                    <!-- Status -->
                    <div>
                        <label class="block text-sm font-semibold text-neutral-700 mb-2">
                            Status
                        </label>
                        <select
                            v-model="form.status"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                <!-- Grid Layout for Amounts -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <!-- Goal Amount -->
                    <div>
                        <label class="block text-sm font-semibold text-neutral-700 mb-2">
                            Goal Amount (USD) <span class="text-red-500">*</span>
                        </label>
                        <input
                            v-model="form.goal_amount"
                            type="number"
                            min="0"
                            step="0.01"
                            required
                            placeholder="50000"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            :class="{ 'border-red-500': errors.goal_amount }"
                        />
                        <p v-if="errors.goal_amount" class="mt-1 text-sm text-red-600">{{ errors.goal_amount }}</p>
                    </div>

                    <!-- Raised Amount -->
                    <div>
                        <label class="block text-sm font-semibold text-neutral-700 mb-2">
                            Raised Amount (USD)
                        </label>
                        <input
                            v-model="form.raised_amount"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0"
                            class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            :class="{ 'border-red-500': errors.raised_amount }"
                        />
                        <p v-if="errors.raised_amount" class="mt-1 text-sm text-red-600">{{ errors.raised_amount }}</p>
                    </div>
                </div>

                <!-- Beneficiaries -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Beneficiaries
                    </label>
                    <input
                        v-model="form.beneficiaries"
                        type="text"
                        placeholder="500+ teachers, 25,000+ students"
                        class="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        :class="{ 'border-red-500': errors.beneficiaries }"
                    />
                    <p v-if="errors.beneficiaries" class="mt-1 text-sm text-red-600">{{ errors.beneficiaries }}</p>
                </div>

                <!-- Impact Points -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Impact Points
                    </label>
                    <div class="space-y-2">
                        <div
                            v-for="(impact, index) in form.impact"
                            :key="index"
                            class="flex gap-2"
                        >
                            <input
                                v-model="form.impact[index]"
                                type="text"
                                placeholder="Train 500 teachers in modern pedagogy"
                                class="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="button"
                                @click="removeImpact(index)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        @click="addImpact"
                        class="mt-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm flex items-center"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Impact Point
                    </button>
                </div>

                <!-- Donation Tiers -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-neutral-700 mb-2">
                        Donation Tiers
                    </label>
                    <div class="space-y-3">
                        <div
                            v-for="(tier, index) in form.donation_tiers"
                            :key="index"
                            class="flex gap-2"
                        >
                            <input
                                v-model.number="tier.amount"
                                type="number"
                                min="0"
                                step="1"
                                placeholder="Amount"
                                class="w-32 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <input
                                v-model="tier.description"
                                type="text"
                                placeholder="Description"
                                class="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <button
                                type="button"
                                @click="removeTier(index)"
                                class="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                            >
                                <X class="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <button
                        type="button"
                        @click="addTier"
                        class="mt-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium text-sm flex items-center"
                    >
                        <Plus class="w-4 h-4 mr-2" />
                        Add Donation Tier
                    </button>
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
                        :to="{ name: 'admin-causes' }"
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
                        {{ isSubmitting ? 'Updating...' : 'Update Cause' }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Error State -->
        <div v-else class="bg-white rounded-lg border border-neutral-200 p-12 text-center">
            <AlertTriangle class="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h3 class="text-lg font-medium text-neutral-900 mb-2">Cause not found</h3>
            <p class="text-neutral-600 mb-6">
                The cause you're trying to edit doesn't exist or has been removed.
            </p>
            <router-link :to="{ name: 'admin-causes' }" class="btn-primary inline-flex items-center">
                <ArrowLeft class="w-5 h-5 mr-2" />
                Back to Causes
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft, Plus, X, Loader, AlertTriangle } from 'lucide-vue-next';
import { useCausesStore } from '@/stores/causes';

const route = useRoute();
const router = useRouter();
const causesStore = useCausesStore();

const cause = ref(null);
const isLoading = ref(true);

const form = reactive({
    title: '',
    description: '',
    full_description: '',
    category: '',
    urgency: 'Medium',
    status: 'active',
    goal_amount: '',
    raised_amount: 0,
    beneficiaries: '',
    impact: [''],
    donation_tiers: [{ amount: '', description: '' }],
});

const errors = reactive({
    title: '',
    description: '',
    full_description: '',
    image: '',
    category: '',
    urgency: '',
    goal_amount: '',
    raised_amount: '',
    beneficiaries: '',
});

const imageFile = ref(null);
const imagePreview = ref('');
const imageInput = ref(null);
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const loadCause = async () => {
    isLoading.value = true;
    try {
        const causeId = route.params.id;
        const loadedCause = await causesStore.fetchCause(causeId);
        cause.value = loadedCause;

        // Pre-populate form
        form.title = loadedCause.title;
        form.description = loadedCause.description;
        form.full_description = loadedCause.fullDescription || '';
        form.category = loadedCause.category;
        form.urgency = loadedCause.urgency;
        form.status = loadedCause.status;
        form.goal_amount = loadedCause.goalAmount;
        form.raised_amount = loadedCause.raisedAmount;
        form.beneficiaries = loadedCause.beneficiaries || '';
        form.impact = loadedCause.impact && loadedCause.impact.length > 0 ? [...loadedCause.impact] : [''];
        form.donation_tiers = loadedCause.donationTiers && loadedCause.donationTiers.length > 0 
            ? [...loadedCause.donationTiers] 
            : [{ amount: '', description: '' }];
    } catch (error) {
        console.error('Error loading cause:', error);
        errorMessage.value = 'Failed to load cause data.';
    } finally {
        isLoading.value = false;
    }
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

const addImpact = () => {
    form.impact.push('');
};

const removeImpact = (index) => {
    if (form.impact.length > 1) {
        form.impact.splice(index, 1);
    }
};

const addTier = () => {
    form.donation_tiers.push({ amount: '', description: '' });
};

const removeTier = (index) => {
    if (form.donation_tiers.length > 1) {
        form.donation_tiers.splice(index, 1);
    }
};

const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
        errors[key] = '';
    });
    errorMessage.value = '';
};

const handleSubmit = async () => {
    clearErrors();
    isSubmitting.value = true;
    errorMessage.value = '';
    successMessage.value = '';

    try {
        const causeData = {
            title: form.title,
            description: form.description,
            full_description: form.full_description,
            category: form.category,
            urgency: form.urgency,
            status: form.status,
            goal_amount: parseFloat(form.goal_amount),
            raised_amount: parseFloat(form.raised_amount) || 0,
            beneficiaries: form.beneficiaries,
            impact: form.impact.filter((i) => i.trim() !== ''),
            donation_tiers: form.donation_tiers.filter((t) => t.amount && t.description),
        };

        // Only add image if a new one was uploaded
        if (imageFile.value) {
            causeData.image = imageFile.value;
        }

        await causesStore.updateCause(cause.value.id, causeData);

        successMessage.value = 'Cause updated successfully!';
        setTimeout(() => {
            router.push({ name: 'admin-causes' });
        }, 1500);
    } catch (error) {
        console.error('Error updating cause:', error);

        if (error.errors) {
            Object.keys(error.errors).forEach((key) => {
                if (key in errors) {
                    errors[key] = Array.isArray(error.errors[key])
                        ? error.errors[key][0]
                        : error.errors[key];
                }
            });
        }

        errorMessage.value = error.message || 'Failed to update cause. Please check the form and try again.';
    } finally {
        isSubmitting.value = false;
    }
};

onMounted(() => {
    loadCause();
});
</script>
