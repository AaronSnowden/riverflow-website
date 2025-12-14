<template>
    <div class="bg-neutral-50">
        <!-- Simple Hero -->
        <section class="relative py-32 lg:py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/hero2.jpg"
                    alt="Competency-Based Education"
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
                        <GraduationCap class="w-5 h-5 text-primary" />
                        <span class="text-sm font-semibold"
                            >Curriculum Innovation Program</span
                        >
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-5xl lg:text-7xl font-black mb-6 leading-tight"
                    >
                        Competency-Based<br />
                        <span class="text-primary">Education</span>
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        Shifting from time-based to mastery-based learning,
                        empowering students to progress at their own pace and
                        develop real-world skills.
                    </p>

                    <!-- Metrics -->
                    <div class="flex justify-center gap-12 mb-12">
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                80+
                            </div>
                            <div class="text-sm text-white/80">Schools</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                3K+
                            </div>
                            <div class="text-sm text-white/80">Teachers</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                92%
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
                            View Resources
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
                        Traditional Education<br />
                        <span class="text-primary">One-Size-Fits-All</span>
                    </h2>

                    <div class="grid md:grid-cols-2 gap-8 mb-12">
                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center mb-6"
                            >
                                <Clock class="w-8 h-8 text-red-400" />
                            </div>
                            <h3 class="text-black/80 text-xl font-bold mb-3">
                                Time-Based Progression
                            </h3>
                            <p class="text-black leading-relaxed">
                                Students advance based on time spent rather than
                                actual mastery, leaving gaps in understanding
                                and limiting individual potential.
                            </p>
                        </div>

                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6"
                            >
                                <Users class="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 class="text-black text-xl font-bold mb-3">
                                Standardized Approach
                            </h3>
                            <p class="text-black/80 leading-relaxed">
                                One pace for all students ignores diverse
                                learning speeds, styles, and needs, creating
                                frustration and disengagement.
                            </p>
                        </div>
                    </div>

                    <blockquote
                        class="border-l-4 border-primary pl-6 italic text-xl text-black/90"
                    >
                        "Every student learns differently and at their own pace.
                        Education systems must adapt to individual needs, not
                        force students into rigid timelines."
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
                        A comprehensive competency-based education framework
                        designed to prioritize mastery, autonomy, and lifelong
                        learning
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
                                <Target class="w-4 h-4 inline mr-2" />
                                Mastery-Based Learning
                            </div>
                            <h3 class="text-4xl font-black mb-6">
                                Students Progress When<br />They're Ready
                            </h3>
                            <p class="text-lg text-white/90 mb-8 max-w-xl">
                                Our CBE framework focuses on demonstrated
                                competency rather than seat time, ensuring every
                                student achieves true understanding before
                                advancing.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Personalized learning pathways for each
                                        student</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Clear competency standards and
                                        expectations</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Continuous formative assessment and
                                        feedback</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div
                            class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        ></div>
                    </div>

                    <!-- Student-Centered Card -->
                    <div class="bg-green-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <User class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Student-Centered
                        </h3>
                        <p class="text-white/90 mb-6">
                            Learners take ownership of their educational journey
                        </p>
                        <div class="text-4xl font-black">Voice</div>
                        <p class="text-sm text-white/80">
                            Choice & agency in learning
                        </p>
                    </div>

                    <!-- Real-World Card -->
                    <div class="bg-blue-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Briefcase class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Real-World Skills
                        </h3>
                        <p class="text-white/90 mb-6">
                            Focus on practical competencies for life and careers
                        </p>
                        <div class="text-4xl font-black">Applied</div>
                        <p class="text-sm text-white/80">
                            Authentic learning experiences
                        </p>
                    </div>

                    <!-- Flexible Card -->
                    <div class="bg-purple-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Zap class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">Flexible Pacing</h3>
                        <p class="text-white/90 mb-6">
                            Students advance as they demonstrate mastery
                        </p>
                        <div class="text-4xl font-black">Your</div>
                        <p class="text-sm text-white/80">Own pace, own path</p>
                    </div>

                    <!-- Assessment Card -->
                    <div class="bg-orange-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <ClipboardCheck class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Continuous Assessment
                        </h3>
                        <p class="text-white/90 mb-6">
                            Ongoing feedback drives improvement
                        </p>
                        <div class="text-4xl font-black">Growth</div>
                        <p class="text-sm text-white/80">Mindset development</p>
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
                        What's <span class="text-primary">Included</span>
                    </h2>
                    <p class="text-xl text-white/70 max-w-2xl mx-auto">
                        Comprehensive resources and support to implement CBE in
                        your school
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
                                <BookOpen class="w-8 h-8 text-primary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Curriculum Framework
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Competency maps for all subject
                                        areas</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Learning progressions and
                                        pathways</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Standards alignment documentation</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span>Curriculum customization tools</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >All Subjects Covered</span
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
                                <ClipboardCheck
                                    class="w-8 h-8 text-secondary"
                                />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Assessment Tools
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Formative assessment templates</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Performance-based tasks and
                                        rubrics</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Student self-assessment
                                        frameworks</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Progress tracking systems</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Digital & Paper-Based</span
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
                                <GraduationCap class="w-8 h-8 text-green-400" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Teacher Training
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >CBE philosophy and principles
                                        workshop</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Differentiated instruction
                                        strategies</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Assessment design and
                                        implementation</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Student-centered facilitation
                                        techniques</span
                                    >
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >5-Day Intensive</span
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
                                <Settings class="w-8 h-8 text-purple-400" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Implementation Support
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>School-wide rollout planning</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Leadership coaching and mentoring</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Parent and community engagement</span>
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Ongoing consultation and
                                        troubleshooting</span
                                    >
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Year-Round Access</span
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
                        Implementation <span class="text-primary">Journey</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        A structured approach to transforming your school's
                        educational model
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
                                Discovery & Readiness Assessment
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                We evaluate your school's current practices,
                                culture, and readiness for CBE. This includes
                                stakeholder interviews, classroom observations,
                                and systems analysis to create a tailored
                                implementation roadmap.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    School Audit
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Stakeholder Input
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Gap Analysis
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
                                Curriculum Design & Adaptation
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Collaboratively develop competency frameworks
                                aligned with your curriculum standards. We help
                                map learning progressions, create assessment
                                rubrics, and design flexible pathways for
                                student mastery.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Competency Mapping
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Standards Alignment
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Rubric Creation
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
                                Teacher Professional Development
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Intensive training equips educators with CBE
                                pedagogy, assessment strategies, and
                                differentiation techniques. Teachers learn to
                                facilitate student-centered learning and provide
                                meaningful feedback.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    5-Day Workshop
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Coaching Sessions
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Peer Learning
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div
                        class="flex flex-col lg:flex-row-reverse items-center gap-12 mb-24"
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
                                Pilot Implementation & Refinement
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Launch CBE with selected grades or subjects. Our
                                team provides on-site support, observes
                                implementation, gathers feedback, and makes
                                real-time adjustments to ensure success.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Pilot Classes
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Data Collection
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Iteration
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Step 5 -->
                    <div class="flex flex-col lg:flex-row items-center gap-12">
                        <div class="lg:w-1/3">
                            <div class="relative">
                                <div
                                    class="absolute -top-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-full"
                                ></div>
                                <div
                                    class="relative w-20 h-20 rounded-full bg-orange-600 text-white flex items-center justify-center text-3xl font-black"
                                >
                                    05
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-2/3">
                            <h3
                                class="text-3xl font-black text-neutral-900 mb-4"
                            >
                                Scale & Sustain
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Expand CBE school-wide with continued coaching,
                                monitoring, and support. Build internal capacity
                                through teacher leaders and establish systems
                                for ongoing improvement and sustainability.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-sm font-semibold"
                                >
                                    School-Wide Rollout
                                </span>
                                <span
                                    class="px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-sm font-semibold"
                                >
                                    Leadership Development
                                </span>
                                <span
                                    class="px-4 py-2 bg-orange-500/10 text-orange-600 rounded-full text-sm font-semibold"
                                >
                                    Continuous Support
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
                        Transformation <span class="text-primary">Stories</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Real results from schools embracing competency-based
                        education
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <!-- Story 1 - Large Feature -->
                    <div
                        class="lg:row-span-2 bg-white rounded-3xl overflow-hidden shadow-xl"
                    >
                        <div class="relative h-96">
                            <img
                                src="/images/hero2.jpg"
                                alt="School Success Story"
                                class="w-full h-full object-cover"
                            />
                            <div class="absolute inset-0 bg-black/60"></div>
                            <div
                                class="absolute bottom-0 left-0 right-0 p-8 text-white"
                            >
                                <div
                                    class="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6"
                                >
                                    <School class="w-8 h-8" />
                                </div>
                                <blockquote class="text-2xl font-bold mb-4">
                                    "CBE transformed how we think about teaching
                                    and learning. Students are more engaged and
                                    achieving at higher levels."
                                </blockquote>
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <div class="font-bold">
                                            Margaret Wanjiru
                                        </div>
                                        <div class="text-sm text-white/80">
                                            School Director • Nairobi
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
                                Since implementing CBE, we've seen remarkable
                                changes. Students take ownership of their
                                learning, teachers focus on individual needs,
                                and achievement gaps are closing. The
                                transformation has been profound for our entire
                                school community.
                            </p>
                            <div
                                class="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200"
                            >
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        60%
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Higher Mastery
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        800
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Students
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        2yrs
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Implementing
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
                            <GraduationCap class="w-8 h-8" />
                        </div>
                        <blockquote class="text-xl font-bold mb-4">
                            "I finally feel like I'm teaching the way students
                            actually learn"
                        </blockquote>
                        <p class="text-white/90 mb-6">
                            CBE training gave me the tools to differentiate
                            effectively and meet each student where they are.
                            The flexibility to let students progress at their
                            own pace has been game-changing.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-white/20"
                        >
                            <div>
                                <div class="font-bold">David Kimani</div>
                                <div class="text-sm text-white/80">
                                    Mathematics Teacher
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Story 3 -->
                    <div class="bg-white rounded-3xl p-8 shadow-lg">
                        <div
                            class="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-6"
                        >
                            <Users class="w-8 h-8 text-secondary" />
                        </div>
                        <blockquote
                            class="text-xl font-bold mb-4 text-neutral-900"
                        >
                            "Parents love seeing exactly what their children are
                            mastering"
                        </blockquote>
                        <p class="text-neutral-600 mb-6">
                            The transparent competency tracking helps parents
                            understand their child's progress. They appreciate
                            knowing their student won't move forward until
                            concepts are truly mastered.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-neutral-200"
                        >
                            <div>
                                <div class="font-bold text-neutral-900">
                                    Patricia Ochieng
                                </div>
                                <div class="text-sm text-neutral-600">
                                    Deputy Head Teacher
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
                    src="/images/what-we-do-hero.jpg"
                    alt="Transform Education"
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
                            Join 80+ Schools
                        </span>
                    </div>

                    <h2
                        class="text-5xl lg:text-7xl font-black text-white mb-8 leading-none"
                    >
                        Ready to Embrace<br />
                        <span class="text-primary"
                            >Mastery-Based Learning?</span
                        >
                    </h2>

                    <p class="text-xl text-white/90 mb-12 leading-relaxed">
                        Transform your school's approach to education. Let's
                        work together to create a learning environment where
                        every student can thrive at their own pace.
                    </p>

                    <div class="flex flex-wrap gap-6 mb-12">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-10 py-5 bg-primary hover:bg-primary-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center shadow-2xl"
                        >
                            Schedule Consultation
                            <ArrowRight
                                class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                            />
                        </router-link>

                        <a
                            href="#"
                            class="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-bold text-lg border-2 border-white/30 transition-all flex items-center"
                        >
                            <Download class="w-6 h-6 mr-3" />
                            Download Framework
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
    GraduationCap,
    ArrowRight,
    FileText,
    CheckCircle,
    Sparkles,
    BookOpen,
    Star,
    Download,
    Mail,
    Phone,
    Clock,
    Users,
    Target,
    User,
    Briefcase,
    Zap,
    ClipboardCheck,
    Settings,
    School,
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
