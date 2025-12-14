<template>
    <div class="bg-neutral-50">
        <!-- Simple Hero -->
        <section class="relative py-32 lg:py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/what-we-do-hero.jpg"
                    alt="CPD Teacher Support Program"
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
                        <Users class="w-5 h-5 text-primary" />
                        <span class="text-sm font-semibold"
                            >Teacher Development Program</span
                        >
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-5xl lg:text-7xl font-black mb-6 leading-tight"
                    >
                        CPD Teacher Support<br />
                        <span class="text-primary">Program</span>
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        Empowering educators through continuous professional
                        development, collaborative learning, and ongoing
                        mentorship for sustained teaching excellence.
                    </p>

                    <!-- Metrics -->
                    <div class="flex justify-center gap-12 mb-12">
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                200+
                            </div>
                            <div class="text-sm text-white/80">Teachers</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                60+
                            </div>
                            <div class="text-sm text-white/80">Schools</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                96%
                            </div>
                            <div class="text-sm text-white/80">
                                Satisfaction
                            </div>
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
                            href="#resources"
                            class="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-semibold border-2 border-white/30 transition-all flex items-center"
                        >
                            <FileText class="w-5 h-5 mr-2" />
                            View Programs
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
                        Teacher Development<br />
                        <span class="text-primary">Often Neglected</span>
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-6"
                            >
                                <UserX class="w-8 h-8 text-red-400" />
                            </div>
                            <h3 class="text-black/80 text-xl font-bold mb-3">
                                Professional Isolation
                            </h3>
                            <p class="text-black leading-relaxed">
                                Many teachers work in isolation without
                                opportunities for collaboration, peer learning,
                                or ongoing professional support and mentorship.
                            </p>
                        </div>

                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6"
                            >
                                <TrendingDown class="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 class="text-black text-xl font-bold mb-3">
                                Limited Growth Opportunities
                            </h3>
                            <p class="text-black/80 leading-relaxed">
                                After initial training, teachers often lack
                                access to continuous learning, updated
                                pedagogies, and career advancement pathways.
                            </p>
                        </div>
                    </div>

                    <blockquote
                        class="border-l-4 border-primary pl-6 italic text-xl text-black/90"
                    >
                        "Teaching is a profession that requires continuous
                        learning and growth. Teachers need ongoing support,
                        collaboration, and professional development to remain
                        effective and motivated."
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
                        Our Approach
                    </h2>
                    <p class="text-xl text-neutral-600 leading-relaxed">
                        A comprehensive teacher support framework designed to
                        foster continuous growth, collaboration, and
                        professional excellence
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
                                <Users class="w-4 h-4 inline mr-2" />
                                Continuous Development
                            </div>
                            <h3 class="text-4xl font-black mb-6">
                                Sustained Growth Through<br />Ongoing Support
                            </h3>
                            <p class="text-lg text-white/90 mb-8 max-w-xl">
                                Our CPD program provides year-round professional
                                development through workshops, coaching, peer
                                learning communities, and personalized
                                mentorship tailored to each teacher's needs.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Personalized professional development
                                        plans</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Regular coaching and classroom
                                        observations</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Collaborative learning
                                        communities</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div
                            class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        ></div>
                    </div>

                    <!-- Mentorship Card -->
                    <div class="bg-green-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <UserCheck class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Mentorship</h3>
                        <p class="text-white/90 mb-6">
                            One-on-one coaching from experienced educators
                        </p>
                        <div class="text-4xl font-black">1:1</div>
                        <p class="text-sm text-white/80">
                            Personalized support
                        </p>
                    </div>

                    <!-- Community Card -->
                    <div class="bg-blue-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Network class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Community</h3>
                        <p class="text-white/90 mb-6">
                            Peer learning networks and collaboration
                        </p>
                        <div class="text-4xl font-black">Connect</div>
                        <p class="text-sm text-white/80">Learn together</p>
                    </div>

                    <!-- Resources Card -->
                    <div class="bg-purple-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Folder class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Resources</h3>
                        <p class="text-white/90 mb-6">
                            Teaching materials and digital library
                        </p>
                        <div class="text-4xl font-black">500+</div>
                        <p class="text-sm text-white/80">Resources available</p>
                    </div>

                    <!-- Recognition Card -->
                    <div class="bg-orange-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Award class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Recognition</h3>
                        <p class="text-white/90 mb-6">
                            Certifications and career advancement
                        </p>
                        <div class="text-4xl font-black">Grow</div>
                        <p class="text-sm text-white/80">
                            Professional pathway
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- What's Included - Interactive Cards -->
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
                        Program <span class="text-primary">Features</span>
                    </h2>
                    <p class="text-xl text-white/70 max-w-2xl mx-auto">
                        Comprehensive support system for teacher professional
                        growth and development
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
                                <GraduationCap class="w-8 h-8 text-primary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Professional Workshops
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Monthly skill-building workshops</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Subject-specific training
                                        sessions</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Pedagogical strategy development</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span>Technology integration training</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >12 Sessions/Year</span
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
                                <UserCheck class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Coaching & Mentorship
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Personalized one-on-one coaching</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Classroom observation and
                                        feedback</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Goal setting and action planning</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Experienced mentor matching</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Bi-Weekly Sessions</span
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
                                <Users class="w-8 h-8 text-green-400" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Learning Communities
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span>Subject-specific teacher groups</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Collaborative lesson planning
                                        sessions</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Peer observation and feedback
                                        circles</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span>Best practice sharing forums</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Weekly Meetings</span
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
                                <Folder class="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Resource Library
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Lesson plans and unit templates</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Assessment tools and rubrics</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Teaching guides and materials</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Digital learning resources</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >500+ Resources</span
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
                        Support <span class="text-primary">Journey</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        A structured approach to continuous professional
                        development and growth
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
                                Needs Assessment & Goal Setting
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Comprehensive evaluation of each teacher's
                                current skills, professional goals, and
                                development areas. Create personalized growth
                                plans with clear objectives and milestones.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Skills Audit
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Goal Setting
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Personal Plan
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
                                Mentor Matching & Community Building
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Pair teachers with experienced mentors based on
                                subject expertise and teaching styles. Connect
                                educators into collaborative learning
                                communities for peer support and shared growth.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Mentor Pairing
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Group Formation
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Network Access
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
                                Workshop Participation & Skill Building
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Engage in monthly professional development
                                workshops covering pedagogy, subject content,
                                classroom management, and educational
                                technology. Hands-on sessions with immediate
                                classroom application.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Monthly Sessions
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Skill Practice
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Certificates
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
                                Ongoing Coaching & Recognition
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Regular coaching sessions, classroom
                                observations, and constructive feedback.
                                Celebrate achievements, recognize growth, and
                                provide pathways for career advancement and
                                leadership opportunities.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Bi-Weekly Coaching
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Observations
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Recognition
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
                        Teacher <span class="text-primary">Growth</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Real stories from educators thriving with ongoing
                        support
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <!-- Story 1 - Large Feature -->
                    <div
                        class="lg:row-span-2 bg-white rounded-3xl overflow-hidden shadow-xl"
                    >
                        <div class="relative h-96">
                            <img
                                src="/images/what-we-do-hero.jpg"
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
                                    <GraduationCap class="w-8 h-8" />
                                </div>
                                <blockquote class="text-2xl font-bold mb-4">
                                    "The mentorship program reignited my passion
                                    for teaching. I feel supported, valued, and
                                    continuously challenged to grow."
                                </blockquote>
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <div class="font-bold">
                                            Elizabeth Mwangi
                                        </div>
                                        <div class="text-sm text-white/80">
                                            Secondary Teacher • Mombasa
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
                                After 10 years of teaching, I was feeling burnt
                                out and stuck. The CPD program gave me new
                                strategies, connected me with inspiring
                                colleagues, and helped me rediscover why I
                                became a teacher. My students have noticed the
                                difference too.
                            </p>
                            <div
                                class="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200"
                            >
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        100%
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Engagement
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        2yrs
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        In Program
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        Lead
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Now Mentor
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
                            <UserCheck class="w-8 h-8" />
                        </div>
                        <blockquote class="text-xl font-bold mb-4">
                            "The peer learning community transformed how I
                            approach teaching"
                        </blockquote>
                        <p class="text-white/90 mb-6">
                            Collaborating with other teachers, sharing
                            challenges and solutions, and learning from each
                            other's experiences has been invaluable. I no longer
                            feel isolated in my classroom.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-white/20"
                        >
                            <div>
                                <div class="font-bold">John Kamau</div>
                                <div class="text-sm text-white/80">
                                    Primary Teacher
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Story 3 -->
                    <div class="bg-white rounded-3xl p-8 shadow-lg">
                        <div
                            class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6"
                        >
                            <Award class="w-8 h-8 text-secondary" />
                        </div>
                        <blockquote
                            class="text-xl font-bold mb-4 text-neutral-900"
                        >
                            "Professional development opened doors to leadership
                            opportunities"
                        </blockquote>
                        <p class="text-neutral-600 mb-6">
                            The program didn't just improve my teaching - it
                            helped me develop leadership skills. I'm now the
                            head of department and mentoring other teachers,
                            something I never imagined possible.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-neutral-200"
                        >
                            <div>
                                <div class="font-bold text-neutral-900">
                                    Rachel Njeri
                                </div>
                                <div class="text-sm text-neutral-600">
                                    Department Head
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
                    src="/images/hero1.jpg"
                    alt="Join CPD Program"
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
                            Join 200+ Teachers
                        </span>
                    </div>

                    <h2
                        class="text-5xl lg:text-7xl font-black text-white mb-8 leading-none"
                    >
                        Ready to Elevate<br />
                        <span class="text-primary">Your Teaching Career?</span>
                    </h2>

                    <p class="text-xl text-white/90 mb-12 leading-relaxed">
                        Join a community of educators committed to continuous
                        growth and excellence. Get the support, resources, and
                        mentorship you deserve to thrive in your teaching
                        career.
                    </p>

                    <div class="flex flex-wrap gap-6 mb-12">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-10 py-5 bg-primary hover:bg-primary-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center shadow-2xl"
                        >
                            Join the Program
                            <ArrowRight
                                class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                            />
                        </router-link>

                        <a
                            href="#"
                            class="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-bold text-lg border-2 border-white/30 transition-all flex items-center"
                        >
                            <Download class="w-6 h-6 mr-3" />
                            Program Guide
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
    Users,
    ArrowRight,
    FileText,
    CheckCircle,
    Sparkles,
    Star,
    Download,
    Mail,
    Phone,
    UserX,
    TrendingDown,
    GraduationCap,
    UserCheck,
    Network,
    Folder,
    Award,
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
