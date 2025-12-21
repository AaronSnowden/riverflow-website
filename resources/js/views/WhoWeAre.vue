<!-- about us page -->
<template>
    <div>
        <!-- Hero Section with Background -->
        <section class="relative bg-primary py-32 overflow-hidden">
            <!-- Background Image with overlay -->
            <div class="absolute inset-0">
                <img
                    src="/images/hero1.jpg"
                    alt="What We Do"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/65"></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <div class="inline-block mb-2">
                        <span
                            class="text-sm text-green-200 font-extrabold tracking-[6px] uppercase"
                            >RIVERFLOW INTERNATIONAL</span
                        >
                    </div>
                    <h1
                        class="text-5xl md:text-6xl text-white custom-font text-4xl lg:text-6xl font-bold leading-tight"
                    >
                        About US
                    </h1>
                    <p
                        class="text-2xl font-thin md:text-2xl text-white/90 mb-8 leading-relaxed"
                    >
                        Empowering educators and inspiring young minds across
                        Africa through excellence in science education
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center">
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                2017
                            </div>
                            <div class="text-sm text-white/80">Established</div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">72%</div>
                            <div class="text-sm text-white/80">
                                Africa Coverage
                            </div>
                        </div>
                        <div
                            class="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4"
                        >
                            <div class="text-3xl font-bold text-white">
                                2000+
                            </div>
                            <div class="text-sm text-white/80">
                                Educators Trained
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Who We Are -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <!-- Image Side -->
                        <div class="relative">
                            <div
                                class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/hero2.jpg"
                                    alt="STIA Team Collaboration"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                            <!-- Floating Card -->
                            <div
                                class="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 max-w-xs"
                            >
                                <div class="flex items-center gap-4">
                                    <div
                                        class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
                                    >
                                        <Target class="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <div
                                            class="text-2xl font-bold text-neutral-900"
                                        >
                                            NGO
                                        </div>
                                        <div class="text-sm text-neutral-600">
                                            Non-Profit Organization
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Content Side -->
                        <div>
                            <div class="inline-block mb-4">
                                <span
                                    class="text-primary font-semibold text-sm uppercase tracking-wide"
                                    >BACKGROUND</span
                                >
                            </div>
                            <h2
                                class="text-4xl font-bold text-neutral-900 mb-6 leading-tight"
                            >
                                About Riverflow International
                            </h2>
                            <p
                                class="text-lg text-neutral-600 mb-6 leading-relaxed"
                            >
                                River Flow International (RIFI) is a social
                                enterprise organization that works with
                                teachers, senior educationists, and innovators
                                to improve the quality of education in Africa
                                and promote the use of scientific knowledge,
                                best teaching practices, research, and
                                innovation in solving socio-economic challenges.
                            </p>
                            <p
                                class="text-lg text-neutral-600 mb-8 leading-relaxed"
                            >
                                RIFI supports teachers and innovators to develop
                                unique learning materials that promote skill
                                development and life-long learning and runs a
                                comprehensive retooling and teacher- support
                                program for all-inclusive quality education.
                            </p>

                            <!-- Key Points -->
                            <div class="space-y-4">
                                <div class="flex items-start gap-3">
                                    <div
                                        class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                    >
                                        <div
                                            class="w-2 h-2 bg-primary rounded-full"
                                        ></div>
                                    </div>
                                    <p class="text-neutral-700">
                                        Promoting scientific knowledge,
                                        innovation, and research
                                    </p>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div
                                        class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                    >
                                        <div
                                            class="w-2 h-2 bg-primary rounded-full"
                                        ></div>
                                    </div>
                                    <p class="text-neutral-700">
                                        Tackling socio-economic challenges
                                        across the continent
                                    </p>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div
                                        class="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                    >
                                        <div
                                            class="w-2 h-2 bg-primary rounded-full"
                                        ></div>
                                    </div>
                                    <p class="text-neutral-700">
                                        Empowering youth to drive positive
                                        change
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Mission & Vision -->
        <section class="py-20 bg-neutral-50">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Mission Card -->
                        <div
                            class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6"
                            >
                                <Target class="w-8 h-8 text-white" />
                            </div>
                            <h3
                                class="text-2xl font-bold text-neutral-900 mb-4"
                            >
                                Our Mission
                            </h3>
                            <div
                                class="h-1 w-20 bg-primary mb-6 rounded-full"
                            ></div>
                            <p class="text-neutral-600 leading-relaxed text-lg">
                                To promote the use of scientific knowledge and
                                skills in solving socio-economic challenges.
                            </p>
                        </div>

                        <!-- Vision Card -->
                        <div
                            class="bg-primary rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-white"
                        >
                            <div
                                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                            >
                                <Eye class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">Our Vision</h3>
                            <div
                                class="h-1 w-20 bg-white/50 mb-6 rounded-full"
                            ></div>
                            <p class="text-white/90 leading-relaxed text-lg">
                                Transforming scientific knowledge into skills
                                for socio-economic development.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Impact Stats -->
        <section class="py-20 bg-primary text-white relative overflow-hidden">
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-10">
                <div
                    class="absolute inset-0"
                    style="
                        background-image: radial-gradient(
                            circle at 2px 2px,
                            white 1px,
                            transparent 0
                        );
                        background-size: 40px 40px;
                    "
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="text-center mb-12">
                    <span
                        class="text-white/80 font-semibold text-sm uppercase tracking-wide"
                        >Our Impact</span
                    >
                    <h2 class="text-4xl font-bold mt-4 mb-4">
                        Making a Difference
                    </h2>
                </div>

                <div
                    class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto"
                >
                    <div class="text-center">
                        <div
                            class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <div class="text-5xl font-bold mb-2">72%</div>
                        <div class="text-white/80">Coverage in Uganda</div>
                    </div>

                    <div class="text-center">
                        <div
                            class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                            </svg>
                        </div>
                        <div class="text-5xl font-bold mb-2">72%</div>
                        <div class="text-white/80">Coverage in Africa</div>
                    </div>

                    <div class="text-center">
                        <div
                            class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                ></path>
                            </svg>
                        </div>
                        <div class="text-5xl font-bold mb-2">2000+</div>
                        <div class="text-white/80">Educators Trained</div>
                    </div>

                    <div class="text-center">
                        <div
                            class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4"
                        >
                            <svg
                                class="w-10 h-10"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                ></path>
                            </svg>
                        </div>
                        <div class="text-5xl font-bold mb-2">500+</div>
                        <div class="text-white/80">Schools Impacted</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Expanding Horizons -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                    >
                        <!-- Content -->
                        <div class="order-2 lg:order-1">
                            <span
                                class="text-primary font-semibold text-sm uppercase tracking-wide"
                                >Continental Expansion</span
                            >
                            <h2
                                class="text-4xl font-bold text-neutral-900 mt-4 mb-6 leading-tight"
                            >
                                Expanding Horizons Across Africa
                            </h2>
                            <p
                                class="text-lg text-neutral-600 mb-6 leading-relaxed"
                            >
                                River Flow International partners with Education
                                Ministries of different countries and different
                                non-governmental organizations to promote
                                quality education in Africa.
                            </p>

                            <!-- Partnership Highlight -->
                            <div
                                class="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
                            >
                                <div class="flex items-start gap-4">
                                    <div
                                        class="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
                                    >
                                        <svg
                                            class="w-6 h-6 text-blue-900"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h4
                                            class="font-bold text-neutral-900 mb-2"
                                        >
                                            Key Partnership
                                        </h4>
                                        <p class="text-neutral-600 text-sm">
                                            River Flow International (RIFI) has
                                            provided vital financial support for
                                            over six years, enabling STIA to
                                            pursue its mission effectively.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Image Grid -->
                        <div class="order-1 lg:order-2">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-4">
                                    <div
                                        class="aspect-square rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src="/images/hero3.jpg"
                                            alt="Science Education"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div
                                        class="aspect-square rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src="/images/models.jpg"
                                            alt="Student Learning"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                                <div class="space-y-4 pt-8">
                                    <div
                                        class="aspect-square rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=400&fit=crop"
                                            alt="Collaborative Learning"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div
                                        class="aspect-square rounded-xl overflow-hidden shadow-lg"
                                    >
                                        <img
                                            src="/images/children-screaming.jpg"
                                            alt="Educational Impact"
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Core Values -->
        <section class="py-20 bg-neutral-50">
            <div class="container-custom">
                <div class="max-w-6xl mx-auto">
                    <div class="text-center mb-12">
                        <span
                            class="text-primary font-semibold text-sm uppercase tracking-wide"
                            >Our Values</span
                        >
                        <h2
                            class="text-4xl font-bold text-neutral-900 mt-4 mb-4"
                        >
                            What Drives Us
                        </h2>
                        <p class="text-xl text-neutral-600 max-w-3xl mx-auto">
                            Our purpose and direction is driven by our core
                            values
                        </p>
                    </div>

                    <div
                        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <!-- Excellence -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Excellence
                            </h3>
                            <p class="text-neutral-600">
                                Committed to the highest standards in education
                                and professional development
                            </p>
                        </div>

                        <!-- Innovation -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Innovation
                            </h3>
                            <p class="text-neutral-600">
                                Fostering creative and practical indigenous
                                solutions for Africa
                            </p>
                        </div>

                        <!-- Collaboration -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Collaboration
                            </h3>
                            <p class="text-neutral-600">
                                Building partnerships for sustainable and
                                lasting impact
                            </p>
                        </div>

                        <!-- Professional Intelligence -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Professional Intelligence
                            </h3>
                            <p class="text-neutral-600">
                                Leveraging expertise and knowledge for effective
                                solutions
                            </p>
                        </div>

                        <!-- Cultural Sensitivity -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Cultural Sensitivity
                            </h3>
                            <p class="text-neutral-600">
                                Respecting and embracing diverse African
                                contexts and traditions
                            </p>
                        </div>

                        <!-- Advocacy -->
                        <div
                            class="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 border border-neutral-200"
                        >
                            <div
                                class="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4"
                            >
                                <svg
                                    class="w-6 h-6 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                                    ></path>
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-neutral-900 mb-2">
                                Advocacy
                            </h3>
                            <p class="text-neutral-600">
                                Championing educators' rights and quality
                                science education
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- The Future -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto text-center">
                    <span
                        class="text-primary font-semibold text-sm uppercase tracking-wide"
                        >Looking Ahead</span
                    >
                    <h2
                        class="text-4xl md:text-5xl font-bold text-neutral-900 mt-4 mb-6"
                    >
                        Building Africa's Future
                    </h2>
                    <p class="text-xl text-neutral-600 mb-12 leading-relaxed">
                        STIA aspires to anchor science educators across Africa,
                        supporting them in embracing change, driving homegrown
                        innovation, and achieving excellence in science
                        pedagogy.
                    </p>

                    <!-- CTA Box -->
                    <div
                        class="bg-primary rounded-2xl p-12 text-white shadow-2xl"
                    >
                        <h3 class="text-3xl font-bold mb-4">
                            Join Our Mission
                        </h3>
                        <p class="text-xl text-white/90 mb-8">
                            Together, we're building a future where young
                            Africans are equipped to lead with knowledge,
                            creativity, and resilience.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <router-link
                                :to="{ name: 'contact' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-xl hover:bg-neutral-100 transition-colors shadow-lg"
                            >
                                Partner With Us
                                <svg
                                    class="w-5 h-5 ml-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    ></path>
                                </svg>
                            </router-link>
                            <router-link
                                :to="{ name: 'opportunities' }"
                                class="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-colors border-2 border-white/30"
                            >
                                View Opportunities
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { Target, Eye } from "lucide-vue-next";
import { useSiteStore } from "@/stores/site";
import LeaderCard from "@/components/LeaderCard.vue";
import StatsDisplay from "@/components/StatsDisplay.vue";

const store = useSiteStore();
</script>

<style>
.custom-font {
    font-family: "Maven Pro", Sans-serif;
    font-size: 64px;
    font-weight: 600;
}
</style>
