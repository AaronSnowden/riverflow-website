<template>
    <footer class="bg-gray-900 text-gray-300">
        <!-- Top -->
        <div
            class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10"
        >
            <!-- Mission -->
            <div>
                <h3
                    class="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                >
                    <Building class="w-5 h-5" /> Our Mission
                </h3>
                <p class="text-sm leading-relaxed">
                    Developing practical reading and learning materials,
                    promoting literacy and numeracy, retooling teachers with
                    practical skills, advocacy, increasing access to inclusive
                    quality education, and building partnerships with key
                    education stakeholders.
                </p>
            </div>

            <!-- About -->
            <div>
                <h3
                    class="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                >
                    About Us
                </h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Home</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> About Us</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Our Organization</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Publications</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Our Background</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Join Us</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Quick Links -->
            <div>
                <h3
                    class="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                >
                    Quick Links
                </h3>
                <ul class="space-y-2 text-sm">
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> What We Do</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Upcoming Events</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> News & Media</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Partners</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Primary Science
                            Kit</a
                        >
                    </li>
                    <li>
                        <a
                            href="#"
                            class="hover:text-white flex items-center gap-2"
                            ><ArrowRight class="w-4 h-4" /> Annual Report</a
                        >
                    </li>
                </ul>
            </div>

            <!-- Contacts -->
            <div>
                <h3
                    class="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                >
                    <Phone class="w-5 h-5" /> Contact Us
                </h3>
                <ul class="space-y-3 text-sm">
                    <li class="flex items-start gap-3">
                        <MapPin class="w-5 h-5 mt-1" />
                        <span
                            >Plot 326 Wamala Street, Ntinda - Kisaasi Road</span
                        >
                    </li>
                    <li class="flex items-start gap-3">
                        <MapPin class="w-5 h-5 mt-1" />
                        <span>P.O.Box 1815 Kampala</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <Phone class="w-5 h-5" />
                        <span>+256 200 904145 / +256 393 193985</span>
                    </li>
                    <li class="flex items-center gap-3">
                        <Mail class="w-5 h-5" />
                        <a
                            href="mailto:info@riverflowinternational.org"
                            class="hover:text-white"
                        >
                            info@riverflowinternational.org
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-gray-700 py-4">
            <div
                class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between text-sm text-gray-400"
            >
                <p>© 2025 Riverflow International — All Rights Reserved.</p>
                <p>
                    Designed by
                    <a href="#" class="hover:text-white">Deepcodeinnovations</a>
                </p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import {
    BookOpen,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    Building,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();
</script>
