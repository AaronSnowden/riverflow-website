<template>
  <div>
    <!-- Hero with Background Image -->
    <section class="relative py-40 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=2000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNvbnRhY3QlMjB1c3xlbnwwfHwwfHx8MA%3D%3D"
          alt="Contact Us"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/95 to-black/80"
        ></div>
      </div>

      <div class="container-custom relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
            Contact Us
          </h1>
          <p class="text-xl md:text-2xl text-white/90">
            Get in touch with our team - we'd love to hear from you
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-20 bg-white">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Contact Form -->
          <div class="bg-white rounded-lg border border-neutral-200 p-8">
            <h2 class="text-2xl font-bold text-neutral-900 mb-6">
              Send us a message
            </h2>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-neutral-700 mb-2"
                  >Full Name</label
                >
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-neutral-700 mb-2"
                  >Email</label
                >
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  for="subject"
                  class="block text-sm font-medium text-neutral-700 mb-2"
                  >Subject</label
                >
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-neutral-700 mb-2"
                  >Message</label
                >
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button type="submit" class="w-full btn-primary justify-center">
                <Send class="w-5 h-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <div>
              <h2 class="text-2xl font-bold text-neutral-900 mb-6">
                Get in touch
              </h2>
              <div class="space-y-6">
                <div class="flex items-start space-x-4">
                  <div
                    class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Mail class="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-1">Email</h3>
                    <a
                      :href="`mailto:${store.contact.email}`"
                      class="text-neutral-600 hover:text-primary"
                    >
                      {{ store.contact.email }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <Phone class="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-1">Phone</h3>
                    <a
                      :href="`tel:${store.contact.phone}`"
                      class="text-neutral-600 hover:text-secondary"
                    >
                      {{ store.contact.phone }}
                    </a>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div
                    class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0"
                  >
                    <MapPin class="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-neutral-900 mb-1">Address</h3>
                    <p class="text-neutral-600">{{ store.contact.address }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Social Media -->
            <div>
              <h3 class="font-semibold text-neutral-900 mb-4">Follow us</h3>
              <div class="flex items-center space-x-4">
                <a
                  :href="store.contact.socialMedia.facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Facebook class="w-5 h-5" />
                </a>
                <a
                  :href="store.contact.socialMedia.twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Twitter class="w-5 h-5" />
                </a>
                <a
                  :href="store.contact.socialMedia.linkedin"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Linkedin class="w-5 h-5" />
                </a>
                <a
                  :href="store.contact.socialMedia.instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                >
                  <Instagram class="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";

const store = useSiteStore();

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const handleSubmit = () => {
  // Mock form submission
  alert(
    "Thank you for your message! This is a demo - in production, this would send your message."
  );
  form.value = { name: "", email: "", subject: "", message: "" };
};
</script>
