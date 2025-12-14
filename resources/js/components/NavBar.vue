<template>
    <nav
        :class="[
            'fixed z-50 transition-all duration-300',
            isScrolled
                ? 'bg-white shadow-md top-0 left-0 w-full'
                : 'bg-black/10 backdrop-blur-md top-5 left-[12.5%] w-3/4',
        ]"
    >
        <div class="container-custom">
            <div class="flex items-center justify-between h-20">
                <!-- Logo -->
                <router-link
                    :to="{ name: 'home' }"
                    class="flex items-center space-x-3"
                >
                    <div class="w-25">
                        <img src="/assets/RIFI-Logo.png" alt="STIA logo" />
                    </div>
                </router-link>

                <!-- Desktop Navigation -->
                <div class="hidden lg:flex items-center space-x-1">
                    <router-link
                        :to="{ name: 'home' }"
                        class="px-4 py-2 text-sm font-medium hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        :class="[
                            isScrolled ? 'text-neutral-700' : 'text-white',
                        ]"
                    >
                        Home
                    </router-link>

                    <!-- Who We Are Dropdown -->
                    <div
                        class="relative dropdown-container"
                        @mouseenter="whoWeAreDropdownOpen = true"
                        @mouseleave="whoWeAreDropdownOpen = false"
                    >
                        <button
                            class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors flex items-center"
                            :class="[
                                isScrolled ? 'text-neutral-700' : 'text-white',
                            ]"
                        >
                            Who We Are
                            <ChevronDown
                                :class="[
                                    'w-4 h-4 ml-1 transition-transform',
                                    whoWeAreDropdownOpen ? 'rotate-180' : '',
                                ]"
                            />
                        </button>

                        <!-- Dropdown Menu -->
                        <div
                            v-show="whoWeAreDropdownOpen"
                            class="absolute top-full left-0 pt-2 w-48"
                        >
                            <div
                                class="bg-white rounded-lg shadow-xl border border-neutral-200 py-2 overflow-hidden"
                            >
                                <router-link
                                    :to="{ name: 'who-we-are' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <Info class="w-4 h-4 inline mr-2" />
                                    About Us
                                </router-link>
                                <router-link
                                    :to="{ name: 'team' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <Users class="w-4 h-4 inline mr-2" />
                                    Our Team
                                </router-link>
                                <router-link
                                    :to="{ name: 'opportunities' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <BriefcaseBusiness
                                        class="w-4 h-4 inline mr-2"
                                    />
                                    Opportunities
                                </router-link>
                                <router-link
                                    :to="{ name: 'contact' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <Handshake class="w-4 h-4 inline mr-2" />
                                    Partner With Us
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <router-link
                        :to="{ name: 'what-we-do' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        :class="[
                            isScrolled ? 'text-neutral-700' : 'text-white',
                        ]"
                    >
                        What We Do
                    </router-link>

                    <!-- Media/resources Dropdown -->
                    <div
                        class="relative dropdown-container"
                        @mouseenter="mediaDropdownOpen = true"
                        @mouseleave="mediaDropdownOpen = false"
                    >
                        <button
                            class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors flex items-center"
                            :class="[
                                isScrolled ? 'text-neutral-700' : 'text-white',
                            ]"
                        >
                            Resources
                            <ChevronDown
                                :class="[
                                    'w-4 h-4 ml-1 transition-transform',
                                    mediaDropdownOpen ? 'rotate-180' : '',
                                ]"
                            />
                        </button>

                        <!-- Dropdown Menu -->
                        <div
                            v-show="mediaDropdownOpen"
                            class="absolute top-full left-0 pt-2 w-48"
                        >
                            <div
                                class="bg-white rounded-lg shadow-xl border border-neutral-200 py-2 overflow-hidden"
                            >
                                <router-link
                                    :to="{ name: 'news' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <Newspaper class="w-4 h-4 inline mr-2" />
                                    News
                                </router-link>
                                <router-link
                                    :to="{ name: 'events' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <TargetIcon class="w-4 h-4 inline mr-2" />
                                    Events
                                </router-link>
                                <router-link
                                    :to="{ name: 'gallery' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <Image class="w-4 h-4 inline mr-2" />
                                    Gallery
                                </router-link>
                                <router-link
                                    :to="{ name: 'newsletters' }"
                                    class="block px-4 py-2 text-sm text-neutral-700 hover:text-primary hover:bg-neutral-50 transition-colors"
                                >
                                    <FileText class="w-4 h-4 inline mr-2" />
                                    Publications
                                </router-link>
                            </div>
                        </div>
                    </div>

                    <router-link
                        :to="{ name: 'contact' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        :class="[
                            isScrolled ? 'text-neutral-700' : 'text-white',
                        ]"
                    >
                        Contact Us
                    </router-link>
                    <router-link
                        :to="{ name: 'causes' }"
                        class="ml-4 btn-primary bg-[#0a5fa8] hover:bg-[#063d73] rounded-full hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900"
                    >
                        Donate Now
                    </router-link>
                </div>

                <!-- Mobile Menu Button -->
                <button
                    @click="mobileMenuOpen = !mobileMenuOpen"
                    class="lg:hidden p-2 text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md"
                >
                    <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
                    <X v-else class="w-6 h-6" />
                </button>
            </div>

            <!-- Mobile Navigation -->
            <div
                v-show="mobileMenuOpen"
                class="lg:hidden py-4 border-t border-neutral-200"
            >
                <div class="flex flex-col space-y-2">
                    <router-link
                        :to="{ name: 'home' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        @click="mobileMenuOpen = false"
                    >
                        Home
                    </router-link>

                    <!-- Who We Are Section (Mobile) -->
                    <div>
                        <button
                            @click="mobileWhoWeAreOpen = !mobileWhoWeAreOpen"
                            class="w-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors flex items-center justify-between"
                        >
                            <span>Who We Are</span>
                            <ChevronDown
                                :class="[
                                    'w-4 h-4 transition-transform',
                                    mobileWhoWeAreOpen ? 'rotate-180' : '',
                                ]"
                            />
                        </button>
                        <div
                            v-show="mobileWhoWeAreOpen"
                            class="ml-4 mt-2 space-y-2"
                        >
                            <router-link
                                :to="{ name: 'who-we-are' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <Info class="w-4 h-4 inline mr-2" />
                                About Us
                            </router-link>
                            <router-link
                                :to="{ name: 'team' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <Users class="w-4 h-4 inline mr-2" />
                                Our Team
                            </router-link>
                            <router-link
                                :to="{ name: 'opportunities' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <BriefcaseBusiness
                                    class="w-4 h-4 inline mr-2"
                                />
                                Opportunities
                            </router-link>
                            <router-link
                                :to="{ name: 'contact' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <Handshake class="w-4 h-4 inline mr-2" />
                                Partner With Us
                            </router-link>
                        </div>
                    </div>
                    <router-link
                        :to="{ name: 'what-we-do' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        @click="mobileMenuOpen = false"
                    >
                        What We Do
                    </router-link>
                    <router-link
                        :to="{ name: 'projects' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        @click="mobileMenuOpen = false"
                    >
                        Projects
                    </router-link>
                    <router-link
                        :to="{ name: 'causes' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        @click="mobileMenuOpen = false"
                    >
                        Causes
                    </router-link>

                    <!-- Media Section (Mobile) -->
                    <div>
                        <button
                            @click="mobileMediaOpen = !mobileMediaOpen"
                            class="w-full px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors flex items-center justify-between"
                        >
                            <span>Media</span>
                            <ChevronDown
                                :class="[
                                    'w-4 h-4 transition-transform',
                                    mobileMediaOpen ? 'rotate-180' : '',
                                ]"
                            />
                        </button>
                        <div
                            v-show="mobileMediaOpen"
                            class="ml-4 mt-2 space-y-2"
                        >
                            <router-link
                                :to="{ name: 'news' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <Newspaper class="w-4 h-4 inline mr-2" />
                                News
                            </router-link>
                            <router-link
                                :to="{ name: 'events' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <TargetIcon class="w-4 h-4 inline mr-2" />
                                Events
                            </router-link>
                            <router-link
                                :to="{ name: 'gallery' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <Image class="w-4 h-4 inline mr-2" />
                                Gallery
                            </router-link>
                            <router-link
                                :to="{ name: 'newsletters' }"
                                class="block px-4 py-2 text-sm text-neutral-600 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                                @click="mobileMenuOpen = false"
                            >
                                <FileText class="w-4 h-4 inline mr-2" />
                                Newsletters
                            </router-link>
                        </div>
                    </div>

                    <router-link
                        :to="{ name: 'contact' }"
                        class="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary hover:bg-neutral-50 rounded-md transition-colors"
                        @click="mobileMenuOpen = false"
                    >
                        Contact Us
                    </router-link>
                    <router-link
                        :to="{ name: 'causes' }"
                        class="mx-4 mt-2 btn-primary bg-secondary justify-center"
                        @click="mobileMenuOpen = false"
                    >
                        Donate Now
                    </router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
    Menu,
    X,
    ChevronDown,
    Newspaper,
    Image,
    FileText,
    Info,
    Users,
    Handshake,
    BriefcaseBusiness,
    TargetIcon,
} from "lucide-vue-next";

const mobileMenuOpen = ref(false);
const whoWeAreDropdownOpen = ref(false);
const publicationsDropdownOpen = ref(false);
const mediaDropdownOpen = ref(false);
const mobileWhoWeAreOpen = ref(false);
const mobileMediaOpen = ref(false);

const isScrolled = ref(false);

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
    window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
header {
    backdrop-filter: blur(6px);
}
</style>
