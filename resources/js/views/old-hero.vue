  <!-- Modern Hero Section -->
        <section class="relative h-screen min-h-[600px] overflow-hidden">
            <!-- Background Images with Parallax Effect -->
            <div class="absolute inset-0">
                <ClientOnly>
                    <div
                        v-for="(image, index) in heroImages"
                        :key="index"
                        :class="[
                            'absolute inset-0 bg-cover bg-center transition-all duration-1000 transform',
                            currentImageIndex === index
                                ? 'opacity-100 scale-100'
                                : 'opacity-0 scale-105',
                        ]"
                        :style="{ backgroundImage: `url(${image})` }"
                    ></div>
                </ClientOnly>

                <!-- Modern Gradient Overlay -->
                <div class="absolute inset-0 bg-black/50"></div>
            </div>
            <!-- Hero Content -->
            <div
                class="container-custom relative z-10 h-full flex items-center justify-center px-4"
            >
                <div
                    class="max-w-4xl mx-auto text-center space-y-8 animate-fade-in"
                >
                    <!-- Animated Badge -->
                    <div
                        class="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                    >
                        <span class="text-white text-sm font-medium"
                            >Transforming Education Across Africa</span
                        >
                    </div>
                    <!-- Main Heading -->
                    <h1
                        class="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight"
                    >
                        {{ store.organizationName }}
                    </h1>
                    <!-- Tagline -->
                    <p
                        class="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-light"
                    >
                        {{ store.tagline }}
                    </p>
                    <!-- CTA Buttons -->
                    <div
                        class="flex flex-col sm:flex-row gap-4 justify-center pt-4"
                    >
                        <router-link
                            :to="{ name: 'what-we-do' }"
                            class="group px-8 py-4 bg-white text-blue-900 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                            <span class="flex items-center justify-center">
                                <BookOpen class="w-5 h-5 mr-2" />
                                Explore Our Programs
                                <ArrowRight
                                    class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </span>
                        </router-link>
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg"
                        >
                            <span class="flex items-center justify-center">
                                <Mail class="w-5 h-5 mr-2" />
                                Get Involved
                            </span>
                        </router-link>
                    </div>
                    <!-- Scroll Indicator -->
                    <div class="pt-12 animate-bounce">
                        <div
                            class="w-6 h-10 border-2 border-white rounded-full mx-auto flex items-start justify-center p-2"
                        >
                            <div class="w-1 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
