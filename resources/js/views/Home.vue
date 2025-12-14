<template>
    <div>
        <!-- Hero Section 0a5fa8, old tagline=TOGETHER WE CAN CHANGE THE WORLD -->
        <section
            class="relative bg-[#063d73] text-white overflow-hidden py-24 2xl:py-40"
        >
            <div class="absolute inset-0 z-0">
                <ClientOnly>
                    <div
                        v-for="(image, index) in heroImages"
                        :key="index"
                        :class="[
                            'absolute inset-0 bg-cover bg-center transition-opacity duration-1000',
                            currentImageIndex === index
                                ? 'opacity-100'
                                : 'opacity-0',
                        ]"
                        :style="{ backgroundImage: `url(${image})` }"
                    ></div>

                    <!-- Dark Overlay -->
                    <div
                        class="absolute inset-0 bg-black/54 backdrop-blur-[2px]"
                    ></div>
                </ClientOnly>
            </div>
            <!-- <div
                style="background-image: url('images/children-screaming.jpg')"
                class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            ></div> -->

            <!-- <div class="absolute inset-0 bg-black/60"></div> -->

            <div
                class="container-custom relative z-10 mx-auto px-6 py-24 text-center items-center gap-10"
            >
                <!-- Left Text Content -->
                <div class="space-y-6">
                    <span
                        class="text-sm text-green-200 font-extrabold tracking-[6px] uppercase"
                        >RIVERFLOW INTERNATIONAL</span
                    >

                    <h1
                        class="custom-font text-4xl lg:text-6xl font-bold leading-tight"
                    >
                        Education Changes The World
                    </h1>

                    <div class="space-y-6 text-center max-w-full">
                        <p
                            class="text-2xl font-thin text-white/80 max-w-lg mx-auto"
                        >
                            Empower the next generation. Your support provides
                            quality education, resources, and hope to children
                            in underserved communities.
                        </p>

                        <div class="flex justify-center flex-wrap gap-4">
                            <a
                                href="#"
                                class="bg-green-400 text-[#0d3c30] px-6 py-3 rounded-full font-semibold hover:bg-yellow-300 transition"
                                >Get Involved</a
                            >
                            <a
                                href="#"
                                class="border flex justify-between border-white/40 px-6 py-3 rounded-full font-semibold backdrop-blur-md hover:bg-white hover:text-[#063d73] transition"
                            >
                                <Play class="mx-1 w-5" />
                                View Helping Stories</a
                            >
                        </div>
                    </div>
                </div>

                <!-- <div class="relative">
                    <div
                        class="absolute inset-0 bg-yellow-400 rounded-bl-[100px] rounded-tr-[100px] -z-10"
                    ></div>
                    <img
                        src="/images/hero3.jpg"
                        alt="Kids"
                        class="rounded-xl shadow-lg object-cover w-full h-[450px]"
                    />
                </div> -->
            </div>

            <!-- Decorative Shapes -->
            <div
                class="absolute right-10 top-10 w-20 h-20 bg-yellow-400 rounded-full opacity-40 blur-2xl"
            ></div>
            <div
                class="absolute left-0 bottom-0 w-40 h-40 bg-yellow-300 rounded-full opacity-30 blur-3xl"
            ></div>
        </section>

        <!-- About Section - Clean and Modern -->
        <section class="py-24 bg-gradient-to-b from-white to-gray-50">
            <div class="container-custom">
                <div class="max-w-7xl mx-auto">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                    >
                        <!-- Content -->
                        <div class="space-y-6">
                            <div class="space-y-4">
                                <span
                                    class="inline-block px-4 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold"
                                >
                                    Who We Are
                                </span>
                                <h2
                                    class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                                >
                                    Empowering Education for a Brighter Africa
                                </h2>
                                <div class="h-1 w-20 bg-blue-600"></div>
                            </div>
                            <p class="text-lg text-gray-600 leading-relaxed">
                                River Flow International (RIFI) is a social
                                enterprise organization that works with
                                teachers, senior educationists, and innovators
                                to improve the quality of education in Africa
                                and promote the use of scientific knowledge,
                                best teaching practices, research, and
                                innovation in solving socio-economic challenges
                            </p>
                            <!-- Key Stats -->
                            <div class="gap-6 py-6">
                                <div class="space-y-2 mb-4">
                                    <div
                                        class="text-2xl font-bold text-gray-600"
                                    >
                                        10,000+ Teachers Trained
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Delectus distinctio
                                        cumque quidem nulla facilis dolorum
                                        dolor.
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <div
                                        class="text-2xl font-bold text-gray-600"
                                    >
                                        500+ Schools Supported
                                    </div>
                                    <div class="text-sm text-gray-500">
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Doloribus magnam
                                        necessitatibus saepe modi animi amet
                                        vitae porro natus quos.
                                    </div>
                                </div>
                            </div>
                            <router-link
                                :to="{ name: 'who-we-are' }"
                                class="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-full font-semibold hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900 transition-colors duration-300 group"
                            >
                                Learn More About Us
                                <ArrowRight
                                    class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </router-link>
                        </div>
                        <!-- Image Grid - Modern Masonry -->
                        <ClientOnly>
                            <div class="grid grid-cols-1 gap-4">
                                <div class="space-y-4">
                                    <div
                                        class="relative h-full rounded-2xl overflow-hidden group"
                                    >
                                        <svg
                                            viewBox="0 0 400 400"
                                            class="w-full h-auto"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <defs>
                                                <clipPath
                                                    id="heroClip"
                                                    clipPathUnits="objectBoundingBox"
                                                >
                                                    <path
                                                        d="M0.85,0.05 C0.95,0.15 1,0.35 0.95,0.55 C0.90,0.75 0.75,0.95 0.55,1 C0.35,1 0.15,0.90 0.05,0.75 C-0.05,0.60 0,0.40 0.10,0.20 C0.20,0 0.45,-0.05 0.65,0 C0.75,0.02 0.80,0.03 0.85,0.05 Z"
                                                    />
                                                </clipPath>
                                            </defs>
                                            <image
                                                href="/images/hero3.jpg"
                                                width="100%"
                                                height="100%"
                                                preserveAspectRatio="xMidYMid slice"
                                                clip-path="url(#heroClip)"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </ClientOnly>
                    </div>
                </div>
            </div>
        </section>

        <!-- stats display -->
        <StatsDisplay :stats="store.stats" />

        <!-- What We Do Section -->
        <section class="py-4 bg-white">
            <div class="container-custom">
                <!-- PROGRAMS SECTION -->
                <section class="py-20">
                    <div class="max-w-7xl mx-auto px-6">
                        <!-- HEADER: Title Left, Controls Right -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="text-left mb-5">
                                <div class="inline-block mb-4">
                                    <span
                                        class="inline-block px-4 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold"
                                    >
                                        Our Programs
                                    </span>
                                </div>
                                <h2
                                    class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
                                >
                                    What We Do
                                </h2>
                                <div class="h-1 w-20 bg-primary"></div>
                                <p
                                    class="text-lg text-neutral-600 max-w-2xl mt-8"
                                >
                                    Developing practical reading/learning
                                    materials, promoting literacy and numeracy,
                                    retooling of teachers on practical teaching
                                    skills, advocacy, increasing access to
                                    inclusive quality education, and
                                    partnerships with education stakeholders.
                                </p>
                            </div>

                            <div class="flex gap-3">
                                <button
                                    @click="scrollLeft"
                                    class="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition"
                                >
                                    ‹
                                </button>
                                <button
                                    @click="scrollRight"
                                    class="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-200 hover:bg-neutral-300 transition"
                                >
                                    ›
                                </button>
                            </div>
                        </div>

                        <!-- CAROUSEL WRAPPER -->
                        <div
                            ref="carousel"
                            class="carousel-wrapper overflow-x-auto flex gap-6 pb-4 scroll-smooth snap-x snap-mandatory"
                        >
                            <!-- CARD 1 -->
                            <div
                                class="min-w-[320px] md:min-w-[360px] bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all snap-start"
                            >
                                <div class="relative h-56 overflow-hidden">
                                    <img
                                        src="/images/hero3.jpg"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                                    >
                                        Science Education
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold mb-3">
                                        Mini-Laboratory for Primary Schools
                                    </h3>
                                    <p class="text-neutral-600 mb-4">
                                        Essential labs bringing practical
                                        science learning to schools across
                                        Africa.
                                    </p>
                                    <router-link
                                        to="what-we-do/mini-laboratory"
                                        class="text-primary font-semibold inline-flex items-center"
                                    >
                                        Learn More →
                                    </router-link>
                                </div>
                            </div>

                            <!-- CARD 2 -->
                            <div
                                class="min-w-[320px] md:min-w-[360px] bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all snap-start"
                            >
                                <div class="relative h-56 overflow-hidden">
                                    <img
                                        src="/images/hero2.jpg"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                                    >
                                        Curriculum Development
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold mb-3">
                                        Competency-Based Education
                                    </h3>
                                    <p class="text-neutral-600 mb-4">
                                        Learner-centered teaching focusing on
                                        problem solving & independence.
                                    </p>
                                    <router-link
                                        to="what-we-do/competency-based-education"
                                        class="text-primary font-semibold inline-flex items-center"
                                    >
                                        Learn More →
                                    </router-link>
                                </div>
                            </div>

                            <!-- CARD 3 -->
                            <div
                                class="min-w-[320px] md:min-w-[360px] bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all snap-start"
                            >
                                <div class="relative h-56 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1573169790341-483eec303e04?w=1500&auto=format&fit=crop&q=60"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                                    >
                                        Foundation Skills
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold mb-3">
                                        Literacy & Numeracy Programs
                                    </h3>
                                    <p class="text-neutral-600 mb-4">
                                        Evidence-based methods to build
                                        essential reading & math skills.
                                    </p>
                                    <router-link
                                        to="what-we-do/literacy-numeracy-programs"
                                        class="text-primary font-semibold inline-flex items-center"
                                    >
                                        Learn More →
                                    </router-link>
                                </div>
                            </div>

                            <!-- CARD 4 -->
                            <div
                                class="min-w-[320px] md:min-w-[360px] bg-neutral-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all snap-start"
                            >
                                <div class="relative h-56 overflow-hidden">
                                    <img
                                        src="/images/what-we-do-hero.jpg"
                                        class="w-full h-full object-cover"
                                    />
                                    <div
                                        class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold"
                                    >
                                        Teacher Development
                                    </div>
                                </div>
                                <div class="p-6">
                                    <h3 class="text-xl font-bold mb-3">
                                        CPD Teacher Support Program
                                    </h3>
                                    <p class="text-neutral-600 mb-4">
                                        Ongoing mentorship & professional
                                        development for educators.
                                    </p>
                                    <router-link
                                        to="what-we-do/teacher-support-program"
                                        class="text-primary font-semibold inline-flex items-center"
                                    >
                                        Learn More →
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <!-- VIEW ALL CTA -->
                        <div class="text-left mt-10">
                            <router-link
                                :to="{ name: 'what-we-do' }"
                                class="btn-primary rounded-full bg-blue-900 inline-flex items-center hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900"
                            >
                                View All Programs
                                <ArrowRight
                                    class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                />
                            </router-link>
                        </div>
                    </div>
                </section>
            </div>
        </section>

        <!-- Media & Learning Resources Section -->
        <section class="py-20 bg-neutral-50">
            <div class="container-custom mx-auto px-6">
                <div class="max-w-7x1 mx-auto px-6">
                    <!-- Header Row -->
                    <div
                        class="flex flex-col md:flex-row md:items-center md:justify-between mb-16"
                    >
                        <!-- Left: Title & Description -->
                        <div class="max-w-2xl">
                            <span
                                class="text-primary font-semibold text-sm uppercase tracking-wide inline-block px-4 py-1 bg-green-100 rounded-full mb-4"
                            >
                                Media & Resources
                            </span>

                            <h2
                                class="text-4xl md:text-5xl font-bold text-neutral-900 mb-4"
                            >
                                Media & Learning Resources
                            </h2>

                            <div class="h-1 w-20 bg-primary mb-6"></div>

                            <p class="text-lg text-neutral-600">
                                Explore our visual stories, teaching
                                demonstrations, and educational content.
                            </p>
                        </div>

                        <!-- Right: CTA Button -->
                        <div class="mt-8 md:mt-0">
                            <router-link
                                :to="{ name: 'contact' }"
                                class="btn-primary rounded-full bg-blue-900 inline-flex items-center hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900"
                            >
                                View All Resources
                                <ArrowRight class="w-5 h-5 ml-2" />
                            </router-link>
                        </div>
                    </div>

                    <!-- Video Grid -->
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        <div
                            v-for="v in videos"
                            :key="v.url"
                            class="group relative bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-all"
                        >
                            <!-- Video Wrapper -->
                            <div class="relative">
                                <iframe
                                    :src="v.url"
                                    class="w-full h-56 md:h-48 lg:h-44"
                                    frameborder="0"
                                    allowfullscreen
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                ></iframe>

                                <!-- Hover Play Icon -->
                                <div
                                    class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"
                                >
                                    <Play
                                        class="w-14 h-14 text-white opacity-90"
                                    />
                                </div>
                            </div>

                            <!-- Title -->
                            <div class="p-5">
                                <h3
                                    class="font-semibold text-neutral-900 group-hover:text-primary transition-colors"
                                >
                                    {{ v.title }}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Partners -->
        <section class="py-20 relative bg-gradient-to-b from-white to-gray-50">
            <div
                style="background-image: url('images/children-screaming.jpg')"
                class="absolute bg-fixed inset-0 bg-cover bg-center bg-no-repeat"
            ></div>

            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-[3px]"></div>

            <div class="container-custom relative z-10">
                <!-- Header Row -->
                <div
                    class="flex flex-col md:flex-row md:items-center md:justify-between mb-16"
                >
                    <!-- Left: Title & Description -->
                    <div class="max-w-2xl">
                        <span
                            class="text-primary font-semibold text-sm uppercase tracking-wide inline-block px-4 py-1 bg-green-100 rounded-full mb-4"
                        >
                            Our Partners
                        </span>

                        <h2
                            class="text-4xl md:text-5xl font-bold text-white mb-4"
                        >
                            Collaborating for Impact
                        </h2>

                        <div class="h-1 w-20 bg-primary mb-6"></div>

                        <p class="text-lg text-neutral-100">
                            We work with leading organizations, governments, and
                            institutions across Africa to create sustainable
                            change in education systems.
                        </p>
                    </div>

                    <!-- Right: CTA Button -->
                    <div class="mt-8 md:mt-0">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="btn-primary rounded-full bg-blue-900 inline-flex items-center hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900"
                        >
                            Become a Partner
                            <ArrowRight class="w-5 h-5 ml-2" />
                        </router-link>
                    </div>
                </div>

                <!-- Partner Logos Grid -->
                <div
                    ref="partnersGrid"
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8 overflow-hidden transition-all duration-700 ease-in-out"
                    :style="{
                        maxHeight: showAllPartners
                            ? partnersGridHeight + 'px'
                            : initialGridHeight + 'px',
                    }"
                >
                    <div
                        v-for="(partner, index) in partners"
                        :key="partner.name"
                        :class="[
                            'group relative bg-white rounded-lg border border-neutral-200 p-6 flex items-center justify-center hover:border-primary hover:shadow-lg transition-all duration-300',
                            !showAllPartners && index >= 5
                                ? 'opacity-0'
                                : 'opacity-100',
                        ]"
                    >
                        <div class="text-center">
                            <div
                                class="mb-3 w-24 flex items-center justify-center"
                            >
                                <img
                                    :src="partner.icon"
                                    class="rounded text-neutral-400 group-hover:text-primary transition-colors"
                                />
                            </div>
                            <h3
                                class="text-sm font-semibold text-neutral-800 group-hover:text-primary transition-colors"
                            >
                                {{ partner.name }}
                            </h3>
                            <p class="text-xs text-neutral-500 mt-1">
                                {{ partner.type }}
                            </p>
                        </div>
                    </div>
                </div>

                <!-- View All/Less Button -->
                <div class="text-center mb-12">
                    <button
                        @click="showAllPartners = !showAllPartners"
                        class="inline-flex items-center px-6 py-3 text-sm font-medium text-neutral-100 bg-primary/60 rounded-lg hover:bg-primary/20 transition-colors"
                    >
                        <span v-if="!showAllPartners"
                            >View All Partners ({{ partners.length }})</span
                        >
                        <span v-else>Show Less</span>
                        <ChevronDown
                            :class="[
                                'w-5 h-5 ml-2 transition-transform duration-300',
                                showAllPartners ? 'rotate-180' : '',
                            ]"
                        />
                    </button>
                </div>
            </div>
        </section>

        <!-- Latest News Section -->
        <section class="py-20 bg-blue-50">
            <div class="container-custom">
                <!-- Header Row -->
                <div
                    class="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
                >
                    <!-- Left: Title + subtitle -->
                    <div class="md:w-2/3">
                        <span
                            class="inline-block px-4 py-1 bg-blue-100 text-blue-900 rounded-full text-sm font-semibold"
                        >
                            Stay Informed
                        </span>

                        <h2
                            class="text-4xl font-bold text-neutral-900 mt-2 mb-3"
                        >
                            Latest News & Updates
                        </h2>
                        <div class="h-1 w-20 bg-primary mb-6"></div>

                        <p class="text-lg text-neutral-600 max-w-xl">
                            Discover our recent achievements, partnerships, and
                            impact stories from across Africa.
                        </p>
                    </div>

                    <!-- Right: CTA -->
                    <div class="mt-6 md:mt-0 md:w-auto">
                        <router-link
                            :to="{ name: 'news' }"
                            class="btn-primary rounded-full bg-blue-900 inline-flex items-center px-6 py-3 hover:bg-white hover:text-blue-900 hover:border hover:border-blue-900"
                        >
                            View All News
                            <ArrowRight class="w-5 h-5 ml-2" />
                        </router-link>
                    </div>
                </div>

                <!-- Loading State -->
                <div v-if="newsLoading" class="text-center py-8">
                    <Loader2
                        class="w-8 h-8 animate-spin mx-auto text-primary"
                    />
                    <p class="mt-2 text-neutral-600">Loading news...</p>
                </div>

                <!-- Error State -->
                <div v-else-if="newsError" class="text-center py-8">
                    <AlertCircle class="w-8 h-8 mx-auto text-red-500 mb-2" />
                    <p class="text-red-600">{{ newsError }}</p>
                    <button @click="fetchLatestNews" class="btn-primary mt-4">
                        Try Again
                    </button>
                </div>

                <!-- News Grid -->
                <div
                    v-else-if="latestNews && latestNews.length > 0"
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="article in latestNews"
                        :key="article.id"
                        class="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow duration-300 group"
                    >
                        <!-- Image -->
                        <div
                            class="relative h-48 overflow-hidden bg-neutral-200"
                        >
                            <img
                                v-if="article.image"
                                :src="article.image"
                                :alt="article.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div
                                v-else
                                class="w-full h-full flex items-center justify-center"
                            >
                                <Newspaper class="w-12 h-12 text-neutral-400" />
                            </div>

                            <!-- Category Badge -->
                            <div class="absolute top-3 left-3">
                                <span
                                    :class="[
                                        'px-2 py-1 text-xs font-semibold rounded-full',
                                        article.category === 'external'
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-primary text-white',
                                    ]"
                                >
                                    {{
                                        article.category === "external"
                                            ? "External"
                                            : "RIFI News"
                                    }}
                                </span>
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="p-4">
                            <!-- Date -->
                            <p class="text-xs text-neutral-500 mb-2">
                                {{ formatDate(article.published_date) }}
                            </p>

                            <!-- Title -->
                            <h3
                                class="text-lg font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors"
                            >
                                {{ article.title }}
                            </h3>

                            <!-- Excerpt -->
                            <p
                                class="text-sm text-neutral-600 line-clamp-3 mb-4"
                            >
                                {{ article.excerpt }}
                            </p>

                            <!-- Read More Link -->
                            <router-link
                                :to="{
                                    name: 'news-detail',
                                    params: { slug: article.slug },
                                }"
                                class="text-sm font-semibold text-primary hover:text-primary-700 inline-flex items-center"
                            >
                                Read More
                                <ArrowRight class="w-4 h-4 ml-1" />
                            </router-link>
                        </div>
                    </div>
                </div>

                <!-- No News Message -->
                <div v-else class="text-center py-8">
                    <Newspaper
                        class="w-12 h-12 mx-auto text-neutral-400 mb-4"
                    />
                    <p class="text-neutral-600">No recent news available.</p>
                    <p class="text-neutral-500 text-sm mt-2">
                        Stay tuned for the latest updates and stories!
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="relative py-20 bg-lime-700hg text-white">
            <div
                style="background-image: url('images/ECD-3.jpg')"
                class="absolute bg-fixed inset-0 bg-cover bg-center bg-no-repeat"
            ></div>

            <!-- Dark Overlay -->
            <div class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>

            <div class="container-custom relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <h2 class="text-4xl font-bold mb-6">
                        Improving The Quality of Education in Africa
                    </h2>
                    <p class="text-xl font-thin mb-8 opacity-90">
                        Promote the use of scientific knowledge and skills in
                        solving social-economic challenges.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <router-link
                            :to="{ name: 'opportunities' }"
                            class="btn-secondary bg-white text-lime-800 hover:bg-neutral-100"
                        >
                            Join Us
                        </router-link>
                        <router-link
                            :to="{ name: 'contact' }"
                            class="btn-outline border-white text-white hover:bg-white hover:text-secondary"
                        >
                            Contact Us
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import {
    BookOpen,
    Mail,
    Building,
    CheckCircle,
    ArrowRight,
    Globe,
    Building2,
    Users,
    GraduationCap,
    Landmark,
    HeartHandshake,
    Globe2,
    School,
    Award,
    BookOpenCheck,
    ChevronDown,
    Newspaper,
    Loader2,
    AlertCircle,
    FlaskConical,
    Play,
} from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";
import ClientOnly from "@/components/ClientOnly.vue";
import NewsCard from "@/components/NewsCard.vue";
import EventCard from "@/components/EventCard.vue";
import StatsDisplay from "@/components/StatsDisplay.vue";
import axios from "axios";

const store = useSiteStore();

// Dynamic data fetching state
const upcomingEvents = ref([]);
const latestNews = ref([]);
const eventsLoading = ref(true);
const newsLoading = ref(true);
const eventsError = ref(null);
const newsError = ref(null);
const carousel = ref(null);

const scrollLeft = () => {
    carousel.value.scrollBy({ left: -350, behavior: "smooth" });
};

const scrollRight = () => {
    carousel.value.scrollBy({ left: 350, behavior: "smooth" });
};

const videos = ref([
    {
        title: "Practical Teaching",
        url: "https://www.youtube.com/embed/aXzl_6AuOSU",
    },
    {
        title: "Online Safety Intro",
        url: "https://www.youtube.com/embed/iOmoxgUyuWI",
    },
    {
        title: "Promoting Learner-Centered Teaching",
        url: "https://www.youtube.com/embed/Wlm7TccFf3E",
    },
]);

// Fetch upcoming events
const fetchUpcomingEvents = async () => {
    eventsLoading.value = true;
    eventsError.value = null;

    try {
        const response = await axios.get("/api/events/published");

        upcomingEvents.value = response.data.data.data || response.data || [];
    } catch (err) {
        eventsError.value = "Failed to load events";
        console.error("Error fetching events:", err);
    } finally {
        eventsLoading.value = false;
    }
};

// Fetch latest news
const fetchLatestNews = async () => {
    newsLoading.value = true;
    newsError.value = null;

    try {
        const response = await axios.get("/api/news/published", {
            params: {
                per_page: 4, // Limit to 4 articles for the homepage
                sort_by: "created_at",
                sort_order: "desc",
            },
        });
        latestNews.value = response.data.data || response.data || [];
    } catch (err) {
        newsError.value = "Failed to load news";
        console.error("Error fetching news:", err);
    } finally {
        newsLoading.value = false;
    }
};

// Format date helper
const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

// Partners visibility state
const showAllPartners = ref(false);
const partnersGrid = ref(null);
const partnersGridHeight = ref(1000); // Default full height
const initialGridHeight = ref(200); // Default collapsed height

// Partners data
const partners = ref([
    {
        name: "UNESCO",
        type: "UN Agency",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Flag_of_UNESCO.svg/1200px-Flag_of_UNESCO.svg.png",
    },
    {
        name: "UNICEF",
        type: "UN Agency",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Flag_of_UNICEF.svg/1200px-Flag_of_UNICEF.svg.png",
    },
    {
        name: "World Bank",
        type: "Financial Institution",
        icon: "data:image/png;base64,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",
    },
    {
        name: "USAID",
        type: "Development Agency",
        icon: "data:image/jpeg;base64,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",
    },
    {
        name: "African Union",
        type: "Continental Body",
        icon: "data:image/png;base64,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",
    },
    {
        name: "DFID",
        type: "Development Agency",
        icon: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDw0NDQ0PDg4NDQ0NDQ8NDw8ODQ4NFREWFhYRFRUYHSghGBolGxUVITYhJikrLy4vFx8zRDQtNyovLisBCgoKDg0OFxAQGC4iHyUtLSsrKysrLS4rLS0tLSstKy0tKy0tLS0tLS4tLSsrLSsrKy0tLS0rLS0rLS0tLS0tLf/AABEIALgBEgMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQcCBAYDAQj/xABHEAACAgECAwQDCQ4EBwEAAAABAgADBAUREiExBhNBUQcyYRQiNXFygZGxsxUWIzNCUlRzg5KTstHSF1OCoSQ0YmR0wuHB/8QAGQEBAAMBAQAAAAAAAAAAAAAAAAMEBQIB/8QAMBEBAAIBAgQEBQMFAQEAAAAAAAECAxExBBIhURQzQfATMmGBwSJxsSORodHhYkL/2gAMAwEAAhEDEQA/AISbTFICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdN94eq/o6/xqv6yDxOPun8Nk7H3h6r+jr/ABqv6x4nH3PDZOzyv7E6qnP3IWH/AEWUsfo4t/8AaexxGOfV5PD5I9EHlY1tLcF1b1P+bYjI23nsZLExPWEUxMTpLynrxnRU1jpWg3ax1RRvtuzEADf4zEzpGpEazo6P7w9V/R1/jVf1kHicfdP4bJ2PvD1X9HX+NV/WPE4+54bJ2PvD1X9HX+NV/WPE4+54bJ2aup9k8/Eqe++pUqTh4iLa2PvmCjkDueZE6rnpadIlzbBesay09I0TLzu89y1d6aghccdaEBt9vWI39Uzq+StNOaXNMdr68sJBOxOrE7e4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bG25nhVwTt8wnlo1iYe1nSYlZz+kvAB5U5RHmEqH1vKHhL94X/F07S4/t1r9Go2Y9lAsArqdGFqhTuW38CZZ4fFOOJiVbPli8xMOZk6AgdV2D7RY+mnKa9bG75aQgqVWPvS+++5G3rCV+IxWyaaJ+Hy1x66utT0laeTzpyl9pSoj/Z5X8JfvCzHF07Squ9wzuw6M7MPiJ3mhGyhO8u87LducTCw6ca2rIZ6u84jWtZQ8VjMNt3B6HylPLw1r3m0TC1i4itKRWYlK/wCJeB/kZX7lP98j8HfvCTxdO0+/uf4l4H6PlfuU/wB8eEv3g8XTtPv7vO30nYgHvMXIY+HGakH0hjPY4O3rMHi69pQOq+kXNuBXHRMVT+Uv4W35mI2H0SanC0jfqhvxVp26OPtsZ2Z3ZndjuzOSzMfMk9ZZiNOkK0zr1ljAQJzQ9aqx8fNxbqrHXMFYLVOiMgXfpxAjxkWTHNrRaPRLjyRWtqz6scjXEXFbBw6WpptcPkWW2C2+4jbYEhQFXkOQHh8e6MczbmtPUnJpXlrHR7Ua9U+HThZKX/8ADO7U24tq1uVYkmtwwI259fi+fycU882rp17vYyxNIrOvTs1ez2s+4sv3TwF62FqWVlt2epx6pY9eYU7+O06yY+enK5x5OS/MYuu2VZw1BVBYWs4rJ2XuyCvd7+ACHYfEInHE05CMkxfnY65nY95dqFyVNljWMt9yvWm+5KooHTc9Seg2jHW1d9DJaLba/du6h2nNmVhZdNXA2HTTVwuQQ/AW36dAQxE5rh0raszu6tm1tFojZnldo6hXqC41NiPqdgfIa11Za13JKJsOe5ZuZ25HpPIxTrXmnZ7OWNLcsb7pV8vHowNCuyKrLO6syLaxU6p79Ldwrbg7qTseXP3vtkfLa2S8RKTWsY6TMIfG7TkX6jkW1cTZ+PbSAjbCviAA69QAAJLOHpWInZFXN+q0zG7KntKirpK9yx+5ruze+H4XiIOw8uk8nDP6+u72M0RydNnzB7SirI1CxqmajUe9FqK/BagZmKlW/OHEfpntsOtaxr1h5XLpa06dJamJqdNGXjZFa3vXQwcjItV7XPPxAAUcxy59J1NJmkxOnXs5i8RaJjXp3aep5YvvvvClRddbaFJ3Kh3Lbf7zqtdKxDm1tbTLUnTkgICAgICAgICAgICAgICAgICAgICAgICAgICAgZtc7KqM7FU34FLEqu/XhHQRpBrLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgf/9k=",
    },
    {
        name: "Save the Children",
        type: "NGO",
        icon: "data:image/jpeg;base64,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",
    },
    {
        name: "Education International",
        type: "Teachers Union",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Room to Read",
        type: "NGO",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Teach For All",
        type: "Education Network",
        icon: "data:image/png;base64,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",
    },
    {
        name: "VSO International",
        type: "NGO",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Comic Relief",
        type: "Charity",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Mastercard Foundation",
        type: "Foundation",
        icon: "data:image/jpeg;base64,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",
    },
    {
        name: "Open Society Foundation",
        type: "Foundation",
        icon: "data:image/png;base64,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",
    },
    {
        name: "Various Ministries of Education",
        type: "Government",
        icon: "data:image/png;base64,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",
    },
]);

// Hero background images
const heroImages = ref([
    "/images/children-screaming.jpg",
    "/images/hero2.jpg",
    "/images/hero3.jpg",
]);

const currentImageIndex = ref(0);
let imageInterval = null;

// Calculate grid heights for smooth animation
const calculateGridHeights = () => {
    if (partnersGrid.value) {
        // Get the full scroll height
        partnersGridHeight.value = partnersGrid.value.scrollHeight;

        // Calculate height for one row (5 items)
        // Approximate: height of one card + gap
        const cardElement = partnersGrid.value.querySelector(".group");
        if (cardElement) {
            initialGridHeight.value = cardElement.offsetHeight + 24; // 24px gap
        }
    }
};

// Rotate background images every 5 seconds
onMounted(async () => {
    // Fetch upcoming events
    await fetchUpcomingEvents();

    // Fetch latest news
    await fetchLatestNews();

    imageInterval = setInterval(() => {
        currentImageIndex.value =
            (currentImageIndex.value + 1) % heroImages.value.length;
    }, 5000);

    // Calculate grid heights after component is mounted
    setTimeout(() => {
        calculateGridHeights();
    }, 100);
});

onUnmounted(() => {
    if (imageInterval) {
        clearInterval(imageInterval);
    }
});
</script>

<style>
.custom-font {
    font-family: "Maven Pro", Sans-serif;
    font-size: 64px;
    font-weight: 600;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
.animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
}
/* Chrome, Safari */
.carousel-wrapper::-webkit-scrollbar {
    display: none;
}

/* Firefox */
.carousel-wrapper {
    scrollbar-width: none;
}
</style>
