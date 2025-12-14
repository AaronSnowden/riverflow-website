<template>
    <div class="min-h-screen bg-neutral-50">
        <!-- Top Navigation -->
        <nav
            class="bg-white border-b border-neutral-200 fixed top-0 w-full z-50 shadow-sm"
        >
            <div class="px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex items-center space-x-4">
                        <!-- Mobile menu button -->
                        <button
                            v-if="authStore.isAuthenticated"
                            @click="mobileMenuOpen = !mobileMenuOpen"
                            class="lg:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                        >
                            <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
                            <X v-else class="w-6 h-6" />
                        </button>

                        <div class="flex-shrink-0">
                            <!-- Logo -->
                            <router-link
                                :to="{
                                    name: authStore.isAuthenticated
                                        ? 'admin-dashboard'
                                        : 'home',
                                }"
                                class="flex items-center space-x-3"
                            >
                                <div class="w-48 md:w-64">
                                    <img
                                        src="/assets/logo.jpg"
                                        alt="STIA logo"
                                        class="w-full"
                                    />
                                </div>
                            </router-link>
                        </div>

                        <!-- Admin Badge -->
                        <div
                            v-if="authStore.isAuthenticated"
                            class="hidden md:flex items-center px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                        >
                            <Shield class="w-3 h-3 mr-1" />
                            Admin Panel
                        </div>
                    </div>

                    <div
                        class="flex items-center space-x-2 md:space-x-4"
                        v-if="authStore.isAuthenticated"
                    >
                        <!-- View Site Link -->
                        <router-link
                            :to="{ name: 'home' }"
                            target="_blank"
                            class="hidden md:flex items-center space-x-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        >
                            <ExternalLink class="w-4 h-4" />
                            <span>View Site</span>
                        </router-link>

                        <!-- User Menu -->
                        <div
                            class="hidden md:flex items-center space-x-3 px-3 py-2 bg-neutral-50 rounded-lg"
                        >
                            <div
                                class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm"
                            >
                                {{ getUserInitials(authStore.user?.name) }}
                            </div>
                            <div class="hidden lg:block">
                                <p class="text-sm font-medium text-neutral-900">
                                    {{ authStore.user?.name }}
                                </p>
                                <p class="text-xs text-neutral-500">
                                    Administrator
                                </p>
                            </div>
                        </div>

                        <button
                            @click="handleLogout"
                            class="flex items-center space-x-2 px-3 md:px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-700 rounded-md transition-colors"
                        >
                            <LogOut class="w-4 h-4" />
                            <span class="hidden md:inline">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <div class="pt-16 flex">
            <!-- Mobile Sidebar Overlay -->
            <Transition name="fade">
                <div
                    v-if="mobileMenuOpen && authStore.isAuthenticated"
                    class="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    @click="mobileMenuOpen = false"
                ></div>
            </Transition>

            <!-- Sidebar -->
            <aside
                v-if="authStore.isAuthenticated"
                :class="[
                    'w-64 bg-white border-r border-neutral-200 min-h-screen fixed z-40 transition-transform duration-300',
                    'lg:translate-x-0',
                    mobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
                ]"
            >
                <nav class="mt-5 px-3 space-y-1">
                    <!-- Dashboard -->
                    <router-link
                        :to="{ name: 'admin-dashboard' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name === 'admin-dashboard',
                        }"
                    >
                        <LayoutDashboard class="mr-3 h-5 w-5" />
                        Dashboard
                    </router-link>

                    <!-- Content Management Section -->
                    <div class="pt-4 pb-2">
                        <p
                            class="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                        >
                            Content
                        </p>
                    </div>

                    <router-link
                        :to="{ name: 'admin-news' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name?.startsWith('admin-news'),
                        }"
                    >
                        <Newspaper class="mr-3 h-5 w-5" />
                        News
                        <span
                            v-if="newsStore.allNews.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ newsStore.allNews.length }}</span
                        >
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-events' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name === 'admin-events',
                        }"
                    >
                        <Calendar class="mr-3 h-5 w-5" />
                        Events
                        <span
                            v-if="siteStore.events.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ eventsStore.allEvents.length }}</span
                        >
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-gallery' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name === 'admin-gallery',
                        }"
                    >
                        <ImageIcon class="mr-3 h-5 w-5" />
                        Gallery
                        <span
                            v-if="galleryStore.allGalleryItems.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ galleryStore.allGalleryItems.length }}</span
                        >
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-newsletters' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name?.startsWith('admin-newsletters'),
                        }"
                    >
                        <Mail class="mr-3 h-5 w-5" />
                        Newsletters
                        <span
                            v-if="newsletterStore.newsletters.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ newsletterStore.newsletters.length }}</span
                        >
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-projects' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name?.startsWith('admin-projects'),
                        }"
                    >
                        <Briefcase class="mr-3 h-5 w-5" />
                        Projects
                        <span
                            v-if="siteStore.projects.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ projectsStore.allProjects.length }}</span
                        >
                    </router-link>

                    <!-- Organization Section -->
                    <div class="pt-4 pb-2">
                        <p
                            class="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                        >
                            Organization
                        </p>
                    </div>

                    <router-link
                        :to="{ name: 'admin-team' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name === 'admin-team',
                        }"
                    >
                        <Users class="mr-3 h-5 w-5" />
                        Team
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-opportunities' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5 text-neutral-700 hover:text-primary transition-all"
                        :class="{
                            'bg-primary/10 text-primary':
                                $route.name === 'admin-opportunities',
                        }"
                    >
                        <Briefcase class="mr-3 h-5 w-5" />
                        Opportunities
                    </router-link>

                    <router-link
                        :to="{ name: 'admin-causes' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-red-500/5 text-neutral-700 hover:text-red-600 transition-all"
                        :class="{
                            'bg-red-500/10 text-red-600':
                                $route.name?.startsWith('admin-causes'),
                        }"
                    >
                        <Heart class="mr-3 h-5 w-5" />
                        Causes
                        <span
                            v-if="siteStore.causes.length"
                            class="ml-auto text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full"
                            >{{ causesStore.allCauses.length }}</span
                        >
                    </router-link>

                    <!-- System Section -->
                    <div class="pt-4 pb-2">
                        <p
                            class="px-4 text-xs font-semibold text-neutral-500 uppercase tracking-wider"
                        >
                            System
                        </p>
                    </div>

                    <router-link
                        :to="{ name: 'admin-users' }"
                        @click="mobileMenuOpen = false"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-purple-500/5 text-neutral-700 hover:text-purple-600 transition-all"
                        :class="{
                            'bg-purple-500/10 text-purple-600':
                                $route.name?.startsWith('admin-users'),
                        }"
                    >
                        <UserCog class="mr-3 h-5 w-5" />
                        Users
                    </router-link>

                    <div class="border-t border-neutral-200 my-4"></div>

                    <router-link
                        :to="{ name: 'home' }"
                        target="_blank"
                        class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg hover:bg-secondary/5 text-neutral-700 hover:text-secondary transition-all"
                    >
                        <ExternalLink class="mr-3 h-5 w-5" />
                        View Public Site
                    </router-link>
                </nav>
            </aside>

            <!-- Main Content -->
            <main
                :class="['flex-1', authStore.isAuthenticated ? 'lg:ml-64' : '']"
            >
                <div class="py-6 px-4 sm:px-6 lg:px-8">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import {
    Menu,
    X,
    Shield,
    LogOut,
    LayoutDashboard,
    Newspaper,
    Calendar,
    Image as ImageIcon,
    Users,
    Briefcase,
    ExternalLink,
    UserCog,
    Heart,
    Mail,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";
import { useNewsStore } from "@/stores/news";
import { useEventsStore } from "@/stores/events";
import { useCausesStore } from "@/stores/causes";
import { useProjectsStore } from "@/stores/projects";
import { useNewsletterStore } from "@/stores/newsletters";
import { useGalleryStore } from "@/stores/gallery";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const siteStore = useSiteStore();
const newsStore = useNewsStore();
const eventsStore = useEventsStore();
const causesStore = useCausesStore();
const projectsStore = useProjectsStore();
const newsletterStore = useNewsletterStore();
const galleryStore = useGalleryStore();

const router = useRouter();
const route = useRoute();

const mobileMenuOpen = ref(false);

const handleLogout = async () => {
    await authStore.logout();
    router.push({ name: "admin-login" });
};

const getUserInitials = (name) => {
    if (!name) return "AD";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
};

// Close mobile menu when route changes
router.afterEach(() => {
    mobileMenuOpen.value = false;
});
</script>

<style scoped>
/* Fade transition for mobile menu overlay */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
