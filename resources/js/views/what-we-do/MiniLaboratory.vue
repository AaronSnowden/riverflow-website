<template>
    <div class="bg-neutral-50">
        <!-- Simple Hero -->
        <section class="relative py-32 lg:py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/hero3.jpg"
                    alt="Mini Laboratory for Primary Schools"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-b from-neutral-900/95 via-neutral-900/90 to-neutral-900/95"
                ></div>
            </div>

            <!-- Content -->
            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center text-white">
                    <!-- Badge -->
                    <div
                        class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20"
                    >
                        <FlaskConical class="w-5 h-5 text-primary" />
                        <span class="text-sm font-semibold"
                            >Science Innovation Program</span
                        >
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-5xl lg:text-7xl font-black mb-6 leading-tight"
                    >
                        Mini-Laboratory for<br />
                        <span class="text-primary">Primary Schools</span>
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        Transforming theoretical science education into
                        hands-on, practical learning experiences for every
                        African primary school.
                    </p>

                    <!-- Metrics -->
                    <div class="flex justify-center gap-12 mb-12">
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                150+
                            </div>
                            <div class="text-sm text-white/80">Schools</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                5K+
                            </div>
                            <div class="text-sm text-white/80">Students</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                85%
                            </div>
                            <div class="text-sm text-white/80">Improvement</div>
                        </div>
                    </div>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap justify-center gap-4">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-8 py-4 bg-primary hover:bg-primary-600 text-white rounded-full font-semibold transition-all flex items-center"
                        >
                            Get Started
                            <ArrowRight
                                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                            />
                        </router-link>

                        <a
                            href="#video"
                            class="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-semibold border-2 border-white/30 transition-all flex items-center"
                        >
                            <Play class="w-5 h-5 mr-2" />
                            Watch Demo
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- The Problem - Diagonal Section -->
        <section
            class="relative py-32 bg-neutral-200 text-white overflow-hidden"
        >
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-0 left-0 w-full h-1 bg-white"></div>
                <div class="absolute bottom-0 left-0 w-full h-1 bg-white"></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl">
                    <div class="flex items-center space-x-4 mb-8">
                        <div class="w-16 h-1 bg-primary"></div>
                        <span
                            class="text-sm font-bold uppercase tracking-widest text-primary"
                            >The Challenge</span
                        >
                    </div>

                    <h2
                        class="text-4xl lg:text-6xl font-black text-black mb-8 leading-tight"
                    >
                        Science Education<br />
                        <span class="text-primary">Stuck in Theory</span>
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-6"
                            >
                                <AlertTriangle class="w-8 h-8 text-red-400" />
                            </div>
                            <h3 class="text-black/80 text-xl font-bold mb-3">
                                No Practical Learning
                            </h3>
                            <p class="text-black leading-relaxed">
                                Most African primary schools teach science
                                purely through chalkboard lessons, limiting
                                understanding and engagement.
                            </p>
                        </div>

                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6"
                            >
                                <Lightbulb class="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 class="text-black text-xl font-bold mb-3">
                                Missing Equipment
                            </h3>
                            <p class="text-black/80 leading-relaxed">
                                Schools lack the facilities and resources needed
                                for hands-on experimentation and scientific
                                exploration.
                            </p>
                        </div>
                    </div>

                    <blockquote
                        class="border-l-4 border-primary pl-6 italic text-xl text-black/90"
                    >
                        "Experimentation and practical work form the foundation
                        of scientific understanding, yet remain inaccessible to
                        most students."
                    </blockquote>
                </div>
            </div>

            <!-- Diagonal Bottom -->
            <div
                class="absolute bottom-0 left-0 right-0 h-32 bg-white"
                style="clip-path: polygon(0 100%, 100% 0, 100% 100%, 0 100%)"
            ></div>
        </section>

        <!-- The Solution - Card Grid Layout -->
        <section class="py-32 bg-white relative -mt-16">
            <div class="container-custom">
                <div class="text-center max-w-3xl mx-auto mb-20">
                    <div
                        class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
                    >
                        <Sparkles class="w-10 h-10 text-primary" />
                    </div>
                    <h2
                        class="text-4xl lg:text-6xl font-black text-neutral-900 mb-6"
                    >
                        Our Solution
                    </h2>
                    <p class="text-xl text-neutral-600 leading-relaxed">
                        A comprehensive, cost-effective mini-laboratory system
                        designed specifically for African primary schools
                    </p>
                </div>

                <!-- Bento Grid Layout -->
                <div
                    class="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    <!-- Large Feature Card -->
                    <div
                        class="lg:col-span-2 lg:row-span-2 group relative bg-primary rounded-3xl p-12 text-white overflow-hidden"
                    >
                        <div class="relative z-10">
                            <div
                                class="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6"
                            >
                                <Sparkles class="w-4 h-4 inline mr-2" />
                                Complete Kit
                            </div>
                            <h3 class="text-4xl font-black mb-6">
                                Everything You Need<br />in One Box
                            </h3>
                            <p class="text-lg text-white/90 mb-8 max-w-xl">
                                From beakers and microscopes to comprehensive
                                teaching guides - we've carefully curated every
                                item to align with your curriculum.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >200+ laboratory equipment pieces</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >50+ curriculum-aligned
                                        experiments</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Complete teacher training
                                        included</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div
                            class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        ></div>
                    </div>

                    <!-- Cost Card -->
                    <div class="bg-green-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <DollarSign class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Affordable</h3>
                        <p class="text-white/90 mb-6">
                            Budget-friendly pricing designed for African schools
                        </p>
                        <div class="text-4xl font-black">75%</div>
                        <p class="text-sm text-white/80">
                            Cheaper than traditional labs
                        </p>
                    </div>

                    <!-- Training Card -->
                    <div class="bg-blue-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Users class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Training</h3>
                        <p class="text-white/90 mb-6">
                            Comprehensive teacher development programs
                        </p>
                        <div class="text-4xl font-black">3 Days</div>
                        <p class="text-sm text-white/80">Intensive workshop</p>
                    </div>

                    <!-- Support Card -->
                    <div class="bg-purple-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Headphones class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Support</h3>
                        <p class="text-white/90 mb-6">
                            Ongoing assistance and resources
                        </p>
                        <div class="text-4xl font-black">24/7</div>
                        <p class="text-sm text-white/80">Always available</p>
                    </div>

                    <!-- Results Card -->
                    <div class="bg-orange-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <TrendingUp class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Results</h3>
                        <p class="text-white/90 mb-6">
                            Proven improvement in student outcomes
                        </p>
                        <div class="text-4xl font-black">+85%</div>
                        <p class="text-sm text-white/80">Score increase</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- What's Inside - Interactive Cards -->
        <section
            class="py-32 bg-neutral-900 text-white relative overflow-hidden"
        >
            <!-- Background Pattern -->
            <div class="absolute inset-0 opacity-5">
                <div
                    class="absolute inset-0"
                    style="
                        background-image: repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 50px,
                                white 50px,
                                white 51px
                            ),
                            repeating-linear-gradient(
                                90deg,
                                transparent,
                                transparent 50px,
                                white 50px,
                                white 51px
                            );
                    "
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="text-center mb-20">
                    <h2 class="text-5xl lg:text-7xl font-black mb-6">
                        What's <span class="text-primary">Inside</span>
                    </h2>
                    <p class="text-xl text-white/70 max-w-2xl mx-auto">
                        Every component carefully selected for maximum
                        educational impact
                    </p>
                </div>

                <!-- Horizontal Scroll Cards -->
                <div class="overflow-x-auto pb-8 -mx-6 px-6">
                    <div class="flex space-x-6 min-w-max">
                        <!-- Card 1 -->
                        <div
                            class="w-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-primary transition-all hover:scale-105"
                        >
                            <div
                                class="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-6"
                            >
                                <FlaskConical class="w-8 h-8 text-primary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Lab Equipment
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Professional grade beakers, test tubes
                                        & flasks</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Quality microscopes for cell
                                        study</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span>Precision measuring instruments</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Safety equipment & protective
                                        gear</span
                                    >
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >50+ Items</span
                                >
                            </div>
                        </div>

                        <!-- Card 2 -->
                        <div
                            class="w-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-primary transition-all hover:scale-105"
                        >
                            <div
                                class="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mb-6"
                            >
                                <Package class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Experiment Materials
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Safe chemical reagents for primary
                                        level</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Biological specimens & samples</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Physics demonstration kits</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Environmental science materials</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >100+ Materials</span
                                >
                            </div>
                        </div>

                        <!-- Card 3 -->
                        <div
                            class="w-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-primary transition-all hover:scale-105"
                        >
                            <div
                                class="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mb-6"
                            >
                                <BookOpen class="w-8 h-8 text-green-400" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Teaching Resources
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span>Comprehensive teacher's guide</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >50+ detailed experiment protocols</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Student worksheets & activity
                                        sheets</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span>Safety guidelines & protocols</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >200+ Pages</span
                                >
                            </div>
                        </div>

                        <!-- Card 4 -->
                        <div
                            class="w-96 bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:border-primary transition-all hover:scale-105"
                        >
                            <div
                                class="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6"
                            >
                                <GraduationCap
                                    class="w-8 h-8 text-purple-400"
                                />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Training Program
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>3-day intensive workshop</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Hands-on equipment training</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Curriculum integration strategies</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Ongoing support & mentorship</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Certificate Included</span
                                >
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Scroll Indicator -->
                <div class="flex justify-center mt-8">
                    <div class="flex items-center space-x-2 text-white/40">
                        <ArrowRight class="w-5 h-5 animate-pulse" />
                        <span class="text-sm">Scroll to explore more</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- Process Timeline - Vertical -->
        <section class="py-32 bg-white">
            <div class="container-custom">
                <div class="text-center mb-20">
                    <h2
                        class="text-5xl lg:text-7xl font-black text-neutral-900 mb-6"
                    >
                        How It <span class="text-primary">Works</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        From assessment to ongoing support - we're with you
                        every step
                    </p>
                </div>

                <div class="max-w-5xl mx-auto">
                    <!-- Step 1 -->
                    <div
                        class="flex flex-col lg:flex-row items-center gap-12 mb-24"
                    >
                        <div class="lg:w-1/3">
                            <div class="relative">
                                <div
                                    class="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full"
                                ></div>
                                <div
                                    class="relative w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-3xl font-black"
                                >
                                    01
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-2/3">
                            <h3
                                class="text-3xl font-black text-neutral-900 mb-4"
                            >
                                Assessment & Planning
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                We conduct a comprehensive needs assessment of
                                your school, evaluating current resources, space
                                availability, and specific curriculum
                                requirements to create a customized
                                implementation plan.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Site Visit
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Needs Analysis
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Custom Plan
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div
                        class="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24"
                    >
                        <div class="lg:w-1/3 flex lg:justify-end">
                            <div class="relative">
                                <div
                                    class="absolute -top-4 -right-4 w-24 h-24 bg-secondary/10 rounded-full"
                                ></div>
                                <div
                                    class="relative w-20 h-20 rounded-full bg-secondary text-white flex items-center justify-center text-3xl font-black"
                                >
                                    02
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-2/3 lg:text-right">
                            <h3
                                class="text-3xl font-black text-neutral-900 mb-4"
                            >
                                Delivery & Setup
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Your mini-laboratory kit arrives fully equipped
                                and organized. Our team ensures proper storage
                                setup, equipment organization, and optimal
                                placement for easy access during classes.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Fast Delivery
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Professional Setup
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Quality Check
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div
                        class="flex flex-col lg:flex-row items-center gap-12 mb-24"
                    >
                        <div class="lg:w-1/3">
                            <div class="relative">
                                <div
                                    class="absolute -top-4 -left-4 w-24 h-24 bg-green-500/10 rounded-full"
                                ></div>
                                <div
                                    class="relative w-20 h-20 rounded-full bg-green-600 text-white flex items-center justify-center text-3xl font-black"
                                >
                                    03
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-2/3">
                            <h3
                                class="text-3xl font-black text-neutral-900 mb-4"
                            >
                                Teacher Training
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Intensive 3-day workshops equip teachers with
                                practical skills, safety protocols, experiment
                                techniques, and strategies for integrating
                                hands-on learning into their curriculum.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Hands-on Training
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Safety First
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Certificate
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div
                        class="flex flex-col lg:flex-row-reverse items-center gap-12"
                    >
                        <div class="lg:w-1/3 flex lg:justify-end">
                            <div class="relative">
                                <div
                                    class="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full"
                                ></div>
                                <div
                                    class="relative w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-black"
                                >
                                    04
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-2/3 lg:text-right">
                            <h3
                                class="text-3xl font-black text-neutral-900 mb-4"
                            >
                                Ongoing Support
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Continuous support through regular check-ins,
                                refresher training, equipment maintenance
                                guidance, and access to updated teaching
                                resources and experiment ideas.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    24/7 Support
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Updates
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Community
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Success Stories - Magazine Style -->
        <section class="py-32 bg-neutral-50">
            <div class="container-custom">
                <div class="text-center mb-20">
                    <h2
                        class="text-5xl lg:text-7xl font-black text-neutral-900 mb-6"
                    >
                        Real <span class="text-primary">Impact</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Stories from educators transforming their classrooms
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <!-- Story 1 - Large Feature -->
                    <div
                        class="lg:row-span-2 bg-white rounded-3xl overflow-hidden shadow-xl"
                    >
                        <div class="relative h-96">
                            <img
                                src="/images/hero3.jpg"
                                alt="Teacher Success Story"
                                class="w-full h-full object-cover"
                            />
                            <div class="absolute inset-0 bg-black/60"></div>
                            <div
                                class="absolute bottom-0 left-0 right-0 p-8 text-white"
                            >
                                <div
                                    class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                                >
                                    <User class="w-8 h-8" />
                                </div>
                                <blockquote class="text-2xl font-bold mb-4">
                                    "My students are now excited to come to
                                    science class. Their understanding has
                                    improved dramatically."
                                </blockquote>
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <div class="font-bold">
                                            Sarah Nakato
                                        </div>
                                        <div class="text-sm text-white/80">
                                            Primary School Teacher • Kampala
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="p-8">
                            <div class="flex items-center space-x-3 mb-6">
                                <div class="flex text-yellow-400">
                                    <Star class="w-5 h-5 fill-current" />
                                    <Star class="w-5 h-5 fill-current" />
                                    <Star class="w-5 h-5 fill-current" />
                                    <Star class="w-5 h-5 fill-current" />
                                    <Star class="w-5 h-5 fill-current" />
                                </div>
                                <span class="text-sm text-neutral-600"
                                    >5.0</span
                                >
                            </div>
                            <p class="text-neutral-600 leading-relaxed mb-6">
                                Before the mini-laboratory, science was just
                                theory. Now, my students conduct real
                                experiments, see chemical reactions, and study
                                cells under microscopes. Exam scores increased
                                by 45% in just one term.
                            </p>
                            <div
                                class="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200"
                            >
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        45%
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Score Increase
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        120
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Students
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        1yr
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Using Kit
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Story 2 -->
                    <div class="bg-primary text-white rounded-3xl p-8">
                        <div
                            class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                        >
                            <Briefcase class="w-8 h-8" />
                        </div>
                        <blockquote class="text-xl font-bold mb-4">
                            "Best investment we've made in our school's future"
                        </blockquote>
                        <p class="text-white/90 mb-6">
                            The mini-laboratory transformed our science program.
                            Teachers are confident, students are engaged, and
                            parents are impressed with the quality of education
                            we're providing.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-white/20"
                        >
                            <div>
                                <div class="font-bold">James Omondi</div>
                                <div class="text-sm text-white/80">
                                    Head Teacher
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Story 3 -->
                    <div class="bg-white rounded-3xl p-8 shadow-lg">
                        <div
                            class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6"
                        >
                            <GraduationCap class="w-8 h-8 text-secondary" />
                        </div>
                        <blockquote
                            class="text-xl font-bold mb-4 text-neutral-900"
                        >
                            "Science is now my favorite subject!"
                        </blockquote>
                        <p class="text-neutral-600 mb-6">
                            Doing real experiments is so much better than just
                            reading from books. I want to become a scientist
                            when I grow up.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-neutral-200"
                        >
                            <div>
                                <div class="font-bold text-neutral-900">
                                    Grace Akinyi
                                </div>
                                <div class="text-sm text-neutral-600">
                                    Student, P6
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA - Split Design -->
        <section
            class="relative min-h-[600px] flex items-center overflow-hidden"
        >
            <div class="absolute inset-0">
                <img
                    src="/images/hero2.jpg"
                    alt="Join Us"
                    class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-neutral-900/90"></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-3xl">
                    <div
                        class="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8"
                    >
                        <Sparkles class="w-5 h-5 text-primary" />
                        <span class="text-sm font-semibold text-white">
                            Join 150+ Schools
                        </span>
                    </div>

                    <h2
                        class="text-5xl lg:text-7xl font-black text-white mb-8 leading-none"
                    >
                        Ready to Transform Your<br />
                        <span class="text-primary">Science Program?</span>
                    </h2>

                    <p class="text-xl text-white/90 mb-12 leading-relaxed">
                        Get started today with a free consultation and discover
                        how our mini-laboratory can revolutionize science
                        education at your school.
                    </p>

                    <div class="flex flex-wrap gap-6 mb-12">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-10 py-5 bg-primary hover:bg-primary-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center shadow-2xl"
                        >
                            Start Your Journey
                            <ArrowRight
                                class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                            />
                        </router-link>

                        <a
                            href="#"
                            class="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-bold text-lg border-2 border-white/30 transition-all flex items-center"
                        >
                            <Download class="w-6 h-6 mr-3" />
                            Download Brochure
                        </a>
                    </div>

                    <!-- Contact Info -->
                    <div class="flex flex-wrap gap-8 text-white/80">
                        <a
                            href="mailto:info@stiafrica.org"
                            class="flex items-center hover:text-white transition-colors"
                        >
                            <Mail class="w-5 h-5 mr-2" />
                            info@stiafrica.org
                        </a>

                        <a
                            href="tel:+256123456789"
                            class="flex items-center hover:text-white transition-colors"
                        >
                            <Phone class="w-5 h-5 mr-2" />
                            +256 123 456 789
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import {
    FlaskConical,
    ArrowRight,
    Play,
    CheckCircle,
    Sparkles,
    Package,
    BookOpen,
    GraduationCap,
    Star,
    Download,
    Mail,
    Phone,
    AlertTriangle,
    Lightbulb,
    DollarSign,
    Users,
    Headphones,
    TrendingUp,
    User,
    Briefcase,
} from "lucide-vue-next";
</script>

<style scoped>
/* Smooth scroll for horizontal cards */
.overflow-x-auto::-webkit-scrollbar {
    height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
    background: rgba(99, 102, 241, 0.5);
    border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb:hover {
    background: rgba(99, 102, 241, 0.7);
}
</style>
