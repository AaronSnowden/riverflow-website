<template>
    <div>
        <!-- Hero with Background Image -->
        <section class="relative h-[540px] py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/teacher-in-class.jpg"
                    alt="Gallery"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/65 to-black/50"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <span
                        class="text-sm text-green-200 font-extrabold tracking-[6px] uppercase"
                        >RIVERFLOW INTERNATIONAL</span
                    >
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                        Gallery
                    </h1>
                    <p class="text-xl md:text-2xl text-white/90 font-thin">
                        Capturing moments from our trainings, events, and
                        community activities
                    </p>
                </div>
            </div>
        </section>

        <!-- Gallery Grid -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <div
                        v-for="image in galleryStore.allGalleryItems"
                        :key="image.id"
                        @click="openLightbox(image)"
                        class="group relative overflow-hidden rounded-xl cursor-pointer border border-neutral-200 hover:shadow-2xl transition-all duration-300"
                    >
                        <!-- Image -->
                        <div
                            class="aspect-square overflow-hidden bg-neutral-200"
                        >
                            <img
                                v-if="image.image"
                                :src="getImageUrl(image)"
                                :alt="image.title"
                                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                            />
                            <div
                                v-else
                                class="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200"
                            >
                                <ImageIcon class="w-16 h-16 text-neutral-400" />
                            </div>

                            <!-- Overlay -->
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <div
                                    class="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                                >
                                    <div
                                        class="flex items-center gap-2 text-xs font-medium mb-2"
                                    >
                                        <span
                                            class="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                                            >{{ image.category }}</span
                                        >
                                    </div>
                                    <h3
                                        class="font-semibold text-sm line-clamp-2"
                                    >
                                        {{ image.title }}
                                    </h3>
                                    <p class="text-xs text-white/80 mt-1">
                                        {{ formatDate(image.date) }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div
                    v-if="filteredGallery.length === 0"
                    class="text-center py-12"
                >
                    <ImageIcon
                        class="w-16 h-16 text-neutral-400 mx-auto mb-4"
                    />
                    <p class="text-neutral-600">
                        No images found in this category.
                    </p>
                </div>
            </div>
        </section>

        <!-- Lightbox Modal -->
        <Teleport to="body">
            <div
                v-if="lightboxOpen"
                @click="closeLightbox"
                class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            >
                <button
                    @click="closeLightbox"
                    class="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                    <X class="w-6 h-6" />
                </button>

                <div @click.stop class="max-w-5xl w-full">
                    <img
                        v-if="selectedImage"
                        :src="getImageUrl(selectedImage)"
                        :alt="selectedImage.title"
                        class="w-full h-auto rounded-lg shadow-2xl"
                    />
                    <div
                        v-if="selectedImage"
                        class="mt-4 text-center text-white"
                    >
                        <span
                            class="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-2"
                        >
                            {{ selectedImage.category }}
                        </span>
                        <h3 class="text-2xl font-bold mb-2">
                            {{ selectedImage.title }}
                        </h3>
                        <p class="text-white/80">
                            {{ formatDate(selectedImage.date) }}
                        </p>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { Image as ImageIcon, X } from "lucide-vue-next";
import { useGalleryStore } from "@/stores/gallery";

const galleryStore = useGalleryStore();
const activeFilter = ref("all");
const lightboxOpen = ref(false);
const selectedImage = ref(null);

// Helper to get full image URL
const getImageUrl = (item) => {
    if (!item || !item.image) return null;

    let imageUrl;
    if (item.image_url) {
        imageUrl = item.image_url;
    } else {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
        imageUrl = `${baseUrl}/${item.image.replace(/^\//, "")}`;
    }

    console.log("[Gallery] Image URL for", item.title, ":", imageUrl);
    console.log("[Gallery] Raw item.image:", item.image);
    console.log("[Gallery] Raw item.image_url:", item.image_url);

    return imageUrl;
};

// Fetch published gallery items on mount
onMounted(async () => {
    try {
        await galleryStore.fetchPublishedGalleryItems();
        console.log(
            "[Gallery] Loaded published items:",
            galleryStore.publishedGalleryItems
        );
    } catch (error) {
        console.error("Failed to load gallery:", error);
    }
});

// Get unique categories from published items
const categories = computed(() => {
    const cats = [
        ...new Set(
            galleryStore.publishedGalleryItems.map((img) => img.category)
        ),
    ];
    return cats.sort();
});

// Filter gallery
const filteredGallery = computed(() => {
    if (activeFilter.value === "all") {
        return galleryStore.publishedGalleryItems;
    }
    return galleryStore.publishedGalleryItems.filter(
        (img) => img.category === activeFilter.value
    );
});

// Lightbox functions
const openLightbox = (image) => {
    selectedImage.value = image;
    lightboxOpen.value = true;
    document.body.style.overflow = "hidden";
};

const closeLightbox = () => {
    lightboxOpen.value = false;
    selectedImage.value = null;
    document.body.style.overflow = "";
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
</script>
