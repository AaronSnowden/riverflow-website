<template>
    <div>
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p class="text-neutral-600 mt-2">
                Welcome back,
                <span class="text-primary font-semibold">{{
                    authStore.user?.name
                }}</span
                >!
            </p>
        </div>

        <!-- Stats Cards -->
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8"
        >
            <div
                class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-sm font-medium text-neutral-600">
                            Total News
                        </p>
                        <p class="text-3xl font-bold text-neutral-900 mt-2">
                            {{ newsStore.allNews.length }}
                        </p>
                    </div>
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-primary to-primary-700 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <Newspaper class="w-7 h-7 text-white" />
                    </div>
                </div>
                <div class="flex items-center text-xs text-green-600">
                    <TrendingUp class="w-3 h-3 mr-1" />
                    <span
                        >{{
                            newsStore.allNews.filter(
                                (n) => n.category === "internal"
                            ).length
                        }}
                        internal articles</span
                    >
                </div>
            </div>

            <div
                class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-sm font-medium text-neutral-600">
                            Upcoming Events
                        </p>
                        <p class="text-3xl font-bold text-neutral-900 mt-2">
                            {{ eventsStore.upcomingEvents.length }}
                        </p>
                    </div>
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-secondary to-secondary-700 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <Calendar class="w-7 h-7 text-white" />
                    </div>
                </div>
                <div class="flex items-center text-xs text-neutral-600">
                    <Clock class="w-3 h-3 mr-1" />
                    <span>{{ eventsStore.allEvents.length }} total events</span>
                </div>
            </div>

            <div
                class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-sm font-medium text-neutral-600">
                            Gallery Images
                        </p>
                        <p class="text-3xl font-bold text-neutral-900 mt-2">
                            {{ galleryStore.allGalleryItems.length }}
                        </p>
                    </div>
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-accent to-accent-700 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <ImageIcon class="w-7 h-7 text-white" />
                    </div>
                </div>
                <div class="flex items-center text-xs text-neutral-600">
                    <Layers class="w-3 h-3 mr-1" />
                    <span>{{ uniqueCategories.length }} categories</span>
                </div>
            </div>

            <div
                class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-sm font-medium text-neutral-600">
                            Projects
                        </p>
                        <p class="text-3xl font-bold text-neutral-900 mt-2">
                            {{ projectsStore.allProjects.length }}
                        </p>
                    </div>
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <Target class="w-7 h-7 text-white" />
                    </div>
                </div>
                <div class="flex items-center text-xs text-neutral-600">
                    <Target class="w-3 h-3 mr-1" />
                    <span>Projects</span>
                </div>
            </div>

            <div
                class="bg-white rounded-xl border border-neutral-200 p-6 hover:shadow-lg transition-shadow"
            >
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <p class="text-sm font-medium text-neutral-600">
                            Active Causes
                        </p>
                        <p class="text-3xl font-bold text-neutral-900 mt-2">
                            {{ causesStore.allCauses.length }}
                        </p>
                    </div>
                    <div
                        class="w-14 h-14 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <Heart class="w-7 h-7 text-white" />
                    </div>
                </div>
                <div class="flex items-center text-xs text-green-600">
                    <TrendingUp class="w-3 h-3 mr-1" />
                    <span>Fundraising campaigns</span>
                </div>
            </div>
        </div>

        <!-- Quick Actions & Recent Content -->
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <!-- Quick Actions -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-xl border border-neutral-200 p-6">
                    <h2 class="text-xl font-bold text-neutral-900 mb-6">
                        Quick Actions
                    </h2>
                    <div class="space-y-3">
                        <router-link
                            :to="{ name: 'admin-news-create' }"
                            class="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-primary hover:bg-primary/5 transition-all group"
                        >
                            <div class="flex items-center">
                                <div
                                    class="w-10 h-10 bg-primary/10 group-hover:bg-primary rounded-lg flex items-center justify-center mr-3 transition-colors"
                                >
                                    <Plus
                                        class="w-5 h-5 text-primary group-hover:text-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="font-semibold text-neutral-900 text-sm"
                                    >
                                        New Article
                                    </p>
                                    <p class="text-xs text-neutral-500">
                                        Create news post
                                    </p>
                                </div>
                            </div>
                            <ChevronRight
                                class="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors"
                            />
                        </router-link>

                        <router-link
                            :to="{ name: 'admin-events' }"
                            class="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-secondary hover:bg-secondary/5 transition-all group"
                        >
                            <div class="flex items-center">
                                <div
                                    class="w-10 h-10 bg-secondary/10 group-hover:bg-secondary rounded-lg flex items-center justify-center mr-3 transition-colors"
                                >
                                    <Calendar
                                        class="w-5 h-5 text-secondary group-hover:text-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="font-semibold text-neutral-900 text-sm"
                                    >
                                        Add Event
                                    </p>
                                    <p class="text-xs text-neutral-500">
                                        Schedule new event
                                    </p>
                                </div>
                            </div>
                            <ChevronRight
                                class="w-5 h-5 text-neutral-400 group-hover:text-secondary transition-colors"
                            />
                        </router-link>

                        <router-link
                            :to="{ name: 'admin-gallery' }"
                            class="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-accent hover:bg-accent/5 transition-all group"
                        >
                            <div class="flex items-center">
                                <div
                                    class="w-10 h-10 bg-accent/10 group-hover:bg-accent rounded-lg flex items-center justify-center mr-3 transition-colors"
                                >
                                    <ImageIcon
                                        class="w-5 h-5 text-accent group-hover:text-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="font-semibold text-neutral-900 text-sm"
                                    >
                                        Gallery Image
                                    </p>
                                    <p class="text-xs text-neutral-500">
                                        Upload photo
                                    </p>
                                </div>
                            </div>
                            <ChevronRight
                                class="w-5 h-5 text-neutral-400 group-hover:text-accent transition-colors"
                            />
                        </router-link>

                        <router-link
                            :to="{ name: 'admin-users' }"
                            class="flex items-center justify-between p-4 rounded-lg border-2 border-dashed border-neutral-200 hover:border-purple-500 hover:bg-purple-500/5 transition-all group"
                        >
                            <div class="flex items-center">
                                <div
                                    class="w-10 h-10 bg-purple-500/10 group-hover:bg-purple-500 rounded-lg flex items-center justify-center mr-3 transition-colors"
                                >
                                    <UserPlus
                                        class="w-5 h-5 text-purple-600 group-hover:text-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <p
                                        class="font-semibold text-neutral-900 text-sm"
                                    >
                                        Users
                                    </p>
                                    <p class="text-xs text-neutral-500">
                                        Manage users
                                    </p>
                                </div>
                            </div>
                            <ChevronRight
                                class="w-5 h-5 text-neutral-400 group-hover:text-purple-500 transition-colors"
                            />
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Recent News -->
            <div class="lg:col-span-2">
                <div class="bg-white rounded-xl border border-neutral-200 p-6">
                    <div class="flex items-center justify-between mb-6">
                        <h2 class="text-xl font-bold text-neutral-900">
                            Recent News
                        </h2>
                        <router-link
                            :to="{ name: 'admin-news' }"
                            class="text-sm font-medium text-primary hover:text-primary-700 flex items-center"
                        >
                            View All
                            <ChevronRight class="w-4 h-4 ml-1" />
                        </router-link>
                    </div>
                    <div class="space-y-4">
                        <div
                            v-for="article in recentNews"
                            :key="article.id"
                            class="flex items-start space-x-4 p-4 rounded-lg hover:bg-neutral-50 transition-colors group cursor-pointer"
                            @click="
                                router.push({
                                    name: 'admin-news-view',
                                    params: { id: article.id },
                                })
                            "
                        >
                            <div class="flex-shrink-0">
                                <img
                                    v-if="article.image"
                                    :src="article.image"
                                    :alt="article.title"
                                    class="w-16 h-16 rounded-lg object-cover"
                                />
                                <div
                                    v-else
                                    class="w-16 h-16 bg-neutral-200 rounded-lg flex items-center justify-center"
                                >
                                    <Newspaper
                                        class="w-6 h-6 text-neutral-400"
                                    />
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3
                                    class="text-sm font-semibold text-neutral-900 group-hover:text-primary transition-colors line-clamp-1"
                                >
                                    {{ article.title }}
                                </h3>
                                <p
                                    class="text-xs text-neutral-600 mt-1 line-clamp-2"
                                >
                                    {{ article.excerpt }}
                                </p>
                                <div
                                    class="flex items-center mt-2 space-x-4 text-xs text-neutral-500"
                                >
                                    <span class="flex items-center">
                                        <Clock class="w-3 h-3 mr-1" />
                                        {{ formatDate(article.published_date) }}
                                    </span>
                                    <span class="flex items-center">
                                        <User class="w-3 h-3 mr-1" />
                                        {{ article.author }}
                                    </span>
                                </div>
                            </div>
                            <span
                                class="px-2 py-1 text-xs rounded-full"
                                :class="
                                    article.category === 'external'
                                        ? 'bg-accent/10 text-accent'
                                        : 'bg-primary/10 text-primary'
                                "
                            >
                                {{ article.category }}
                            </span>
                        </div>
                        <div
                            v-if="siteStore.news.length === 0"
                            class="text-center py-12 text-neutral-500"
                        >
                            <Newspaper
                                class="w-12 h-12 mx-auto mb-3 text-neutral-300"
                            />
                            <p>No news articles yet</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- System Status -->
            <div class="bg-white rounded-xl border border-neutral-200 p-6">
                <h2 class="text-xl font-bold text-neutral-900 mb-6">
                    System Status
                </h2>
                <div class="space-y-4">
                    <div
                        class="flex items-center justify-between p-4 bg-green-50 rounded-lg"
                    >
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                            >
                                <CheckCircle class="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                                <p
                                    class="text-sm font-semibold text-neutral-900"
                                >
                                    Website Online
                                </p>
                                <p class="text-xs text-neutral-600">
                                    All services operational
                                </p>
                            </div>
                        </div>
                        <span class="text-xs text-green-600 font-medium"
                            >Active</span
                        >
                    </div>

                    <div
                        class="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
                    >
                        <div class="flex items-center space-x-3">
                            <div
                                class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                            >
                                <Activity class="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <p
                                    class="text-sm font-semibold text-neutral-900"
                                >
                                    Last Login
                                </p>
                                <p class="text-xs text-neutral-600">
                                    {{ getCurrentTime() }}
                                </p>
                            </div>
                        </div>
                        <span class="text-xs text-blue-600 font-medium"
                            >Now</span
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import {
    Newspaper,
    Calendar,
    Image as ImageIcon,
    Users,
    Plus,
    ChevronRight,
    Clock,
    User,
    TrendingUp,
    Layers,
    UserPlus,
    CheckCircle,
    Activity,
    Heart,
    BriefcaseBusiness,
    Target,
} from "lucide-vue-next";
import { useAuthStore } from "@/stores/auth";
import { useSiteStore } from "@/stores/site";
import { useNewsStore } from "@/stores/news";
import { useEventsStore } from "@/stores/events";
import { useUsersStore } from "@/stores/users";
import { useCausesStore } from "@/stores/causes";
import { useProjectsStore } from "@/stores/projects";
import { useNewsletterStore } from "@/stores/newsletters";
import { useGalleryStore } from "@/stores/gallery";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const siteStore = useSiteStore();
const newsStore = useNewsStore();
const eventsStore = useEventsStore();
const usersStore = useUsersStore();
const causesStore = useCausesStore();
const projectsStore = useProjectsStore();
const newsletterStore = useNewsletterStore();
const galleryStore = useGalleryStore();

const router = useRouter();

// Mock users data (in a real app, this would come from a store/API)
const mockUsers = ref([
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@stiafrica.org",
        username: "johndoe",
        role: "admin",
        status: "active",
        lastLogin: "2025-10-07T14:30:00",
        createdAt: "2024-01-15T10:00:00",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@stiafrica.org",
        username: "janesmith",
        role: "editor",
        status: "active",
        lastLogin: "2025-10-07T09:15:00",
        createdAt: "2024-02-20T14:30:00",
    },
    {
        id: "3",
        name: "Michael Johnson",
        email: "michael.j@stiafrica.org",
        username: "michaelj",
        role: "author",
        status: "active",
        lastLogin: "2025-10-06T16:45:00",
        createdAt: "2024-03-10T08:20:00",
    },
    {
        id: "4",
        name: "Sarah Williams",
        email: "sarah.w@stiafrica.org",
        username: "sarahw",
        role: "editor",
        status: "inactive",
        lastLogin: "2025-09-28T11:20:00",
        createdAt: "2024-04-05T16:45:00",
    },
    {
        id: "5",
        name: "David Brown",
        email: "david.b@stiafrica.org",
        username: "davidb",
        role: "viewer",
        status: "active",
        lastLogin: "2025-10-07T08:00:00",
        createdAt: "2024-05-12T13:10:00",
    },
]);

const recentNews = computed(() => {
    return newsStore.allNews.slice(0, 3);
});

const recentUsers = computed(() => {
    return mockUsers.value
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
});

const recentTeamMembers = computed(() => {
    return siteStore.leaders.slice(0, 4);
});

const uniqueCategories = computed(() => {
    const categories = new Set(siteStore.gallery.map((item) => item.category));
    return Array.from(categories);
});

const getInitials = (name) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

const getRoleBadge = (role) => {
    const badges = {
        admin: "bg-purple-100 text-purple-800",
        editor: "bg-blue-100 text-blue-800",
        author: "bg-green-100 text-green-800",
        viewer: "bg-neutral-100 text-neutral-800",
    };
    return badges[role] || "bg-neutral-100 text-neutral-800";
};

const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });
};

const navigateToTeamEdit = (id) => {
    router.push({ name: "admin-team" });
};

onMounted(async () => {
    newsStore.fetchNews();
    eventsStore.fetchEvents();
    usersStore.fetchUsers();
    causesStore.fetchCauses();
    projectsStore.fetchProjects();
    newsletterStore.fetchNewsletters();
    galleryStore.fetchGalleryItems();
});
</script>
