<template>
    <div class="bg-neutral-50">
        <!-- Simple Hero -->
        <section class="relative py-32 lg:py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022"
                    alt="Literacy & Numeracy Programs"
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
                        <BookOpen class="w-5 h-5 text-primary" />
                        <span class="text-sm font-semibold"
                            >Foundation Skills Program</span
                        >
                    </div>

                    <!-- Title -->
                    <h1
                        class="text-5xl lg:text-7xl font-black mb-6 leading-tight"
                    >
                        Literacy & Numeracy<br />
                        <span class="text-primary">Programs</span>
                    </h1>

                    <!-- Description -->
                    <p
                        class="text-xl lg:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto"
                    >
                        Building strong foundational skills in reading, writing,
                        and mathematics to empower every student for lifelong
                        learning success.
                    </p>

                    <!-- Metrics -->
                    <div class="flex justify-center gap-12 mb-12">
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                95+
                            </div>
                            <div class="text-sm text-white/80">Schools</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                8K+
                            </div>
                            <div class="text-sm text-white/80">Students</div>
                        </div>
                        <div>
                            <div class="text-4xl font-black text-primary mb-2">
                                78%
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
                            href="#resources"
                            class="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-semibold border-2 border-white/30 transition-all flex items-center"
                        >
                            <FileText class="w-5 h-5 mr-2" />
                            View Curriculum
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
                        Foundation Skills<br />
                        <span class="text-primary">Gap Crisis</span>
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
                                Reading Difficulties
                            </h3>
                            <p class="text-black leading-relaxed">
                                Many students struggle with basic reading
                                comprehension and fluency, hindering their
                                ability to learn across all subjects and
                                limiting future opportunities.
                            </p>
                        </div>

                        <div
                            class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
                        >
                            <div
                                class="w-16 h-16 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6"
                            >
                                <Calculator class="w-8 h-8 text-yellow-400" />
                            </div>
                            <h3 class="text-black text-xl font-bold mb-3">
                                Math Anxiety & Gaps
                            </h3>
                            <p class="text-black/80 leading-relaxed">
                                Students lack foundational numeracy skills and
                                develop math anxiety, creating barriers to
                                problem-solving and critical thinking
                                development.
                            </p>
                        </div>
                    </div>

                    <blockquote
                        class="border-l-4 border-primary pl-6 italic text-xl text-black/90"
                    >
                        "Literacy and numeracy are the foundation of all
                        learning. Without these essential skills, students
                        cannot reach their full potential in any subject area."
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
                        A comprehensive literacy and numeracy framework designed
                        to build strong foundational skills through
                        evidence-based methods
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
                                <BookOpen class="w-4 h-4 inline mr-2" />
                                Evidence-Based Methods
                            </div>
                            <h3 class="text-4xl font-black mb-6">
                                Proven Strategies for<br />Reading & Math
                                Success
                            </h3>
                            <p class="text-lg text-white/90 mb-8 max-w-xl">
                                Our program combines phonics instruction,
                                reading comprehension strategies, and
                                concrete-to-abstract math teaching to ensure
                                every student masters foundational skills.
                            </p>
                            <ul class="space-y-4">
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Structured phonics and decoding
                                        strategies</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Number sense and mathematical
                                        reasoning</span
                                    >
                                </li>
                                <li class="flex items-center">
                                    <CheckCircle
                                        class="w-6 h-6 mr-3 flex-shrink-0"
                                    />
                                    <span
                                        >Differentiated instruction for all
                                        levels</span
                                    >
                                </li>
                            </ul>
                        </div>
                        <div
                            class="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                        ></div>
                    </div>

                    <!-- Early Intervention Card -->
                    <div class="bg-green-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Zap class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Early Intervention
                        </h3>
                        <p class="text-white/90 mb-6">
                            Identify and address learning gaps before they
                            become barriers
                        </p>
                        <div class="text-4xl font-black">K-3</div>
                        <p class="text-sm text-white/80">
                            Critical learning years
                        </p>
                    </div>

                    <!-- Engaging Card -->
                    <div class="bg-blue-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Smile class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Engaging Methods
                        </h3>
                        <p class="text-white/90 mb-6">
                            Fun, interactive activities that make learning
                            enjoyable
                        </p>
                        <div class="text-4xl font-black">Play</div>
                        <p class="text-sm text-white/80">
                            Based learning approach
                        </p>
                    </div>

                    <!-- Progress Card -->
                    <div class="bg-purple-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <LineChart class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Progress Tracking
                        </h3>
                        <p class="text-white/90 mb-6">
                            Regular assessments to monitor student growth
                        </p>
                        <div class="text-4xl font-black">Data</div>
                        <p class="text-sm text-white/80">Driven instruction</p>
                    </div>

                    <!-- Family Card -->
                    <div class="bg-orange-600 rounded-3xl p-8 text-white">
                        <div
                            class="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center mb-6"
                        >
                            <Users class="w-8 h-8" />
                        </div>
                        <h3 class="text-2xl font-bold mb-3">
                            Family Partnership
                        </h3>
                        <p class="text-white/90 mb-6">
                            Resources to support learning at home
                        </p>
                        <div class="text-4xl font-black">Home</div>
                        <p class="text-sm text-white/80">Learning connection</p>
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
                        Program <span class="text-primary">Components</span>
                    </h2>
                    <p class="text-xl text-white/70 max-w-2xl mx-auto">
                        Comprehensive resources and strategies to build literacy
                        and numeracy skills
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
                                Reading Program
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Phonics and phonemic awareness
                                        instruction</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Reading comprehension strategies</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Leveled reading materials and
                                        libraries</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-primary mt-2 mr-3"
                                    ></span>
                                    <span>Fluency development activities</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Grades K-6</span
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
                                <Calculator class="w-8 h-8 text-secondary" />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Math Program
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Number sense and place value
                                        concepts</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Concrete-to-abstract teaching
                                        methods</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Mental math and problem-solving
                                        strategies</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-secondary mt-2 mr-3"
                                    ></span>
                                    <span>Manipulatives and visual aids</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Hands-On Learning</span
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
                                <ClipboardCheck
                                    class="w-8 h-8 text-green-400"
                                />
                            </div>
                            <h3 class="text-2xl font-bold mb-4">
                                Assessment Tools
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Diagnostic assessments for
                                        placement</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Progress monitoring tools and
                                        benchmarks</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Data tracking and reporting
                                        systems</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-green-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Intervention identification
                                        protocols</span
                                    >
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >Data-Driven</span
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
                                Teacher Training
                            </h3>
                            <ul class="space-y-3 text-white/80">
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Evidence-based literacy instruction
                                        methods</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Math teaching strategies and
                                        approaches</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span
                                        >Differentiation and intervention
                                        techniques</span
                                    >
                                </li>
                                <li class="flex items-start">
                                    <span
                                        class="w-2 h-2 rounded-full bg-purple-400 mt-2 mr-3"
                                    ></span>
                                    <span>Ongoing coaching and support</span>
                                </li>
                            </ul>
                            <div class="mt-8 pt-6 border-t border-white/10">
                                <span class="text-sm text-white/60"
                                    >4-Day Workshop</span
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
                        Implementation <span class="text-primary">Pathway</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        A systematic approach to building foundational literacy
                        and numeracy skills
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
                                Baseline Assessment
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Comprehensive diagnostic testing to identify
                                current literacy and numeracy levels for each
                                student, pinpointing specific strengths and
                                areas requiring intervention.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Reading Assessment
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Math Testing
                                </span>
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                                >
                                    Data Analysis
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
                                Curriculum Customization
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Adapt literacy and numeracy curriculum to match
                                student needs and learning levels. Design
                                differentiated instruction plans with tiered
                                activities for diverse learners.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Level Grouping
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Material Selection
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-semibold"
                                >
                                    Lesson Planning
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
                                Intensive training in evidence-based literacy
                                and numeracy instruction, including phonics
                                methods, reading comprehension strategies, and
                                concrete math teaching approaches.
                            </p>
                            <div class="flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    4-Day Training
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Practice Sessions
                                </span>
                                <span
                                    class="px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-semibold"
                                >
                                    Resource Kits
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
                                Monitor & Support
                            </h3>
                            <p
                                class="text-lg text-neutral-600 leading-relaxed mb-6"
                            >
                                Regular progress monitoring through formative
                                assessments, data analysis meetings, classroom
                                observations, and ongoing coaching to ensure
                                continuous improvement and sustained growth.
                            </p>
                            <div class="flex flex-wrap gap-3 lg:justify-end">
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Weekly Testing
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Data Reviews
                                </span>
                                <span
                                    class="px-4 py-2 bg-purple-500/10 text-purple-600 rounded-full text-sm font-semibold"
                                >
                                    Coaching Support
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
                        Success <span class="text-primary">Stories</span>
                    </h2>
                    <p class="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Real results from students mastering foundational skills
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <!-- Story 1 - Large Feature -->
                    <div
                        class="lg:row-span-2 bg-white rounded-3xl overflow-hidden shadow-xl"
                    >
                        <div class="relative h-96">
                            <img
                                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022"
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
                                    "Students who couldn't read simple words are
                                    now reading entire books independently. The
                                    transformation is incredible."
                                </blockquote>
                                <div class="flex items-center space-x-4">
                                    <div>
                                        <div class="font-bold">
                                            Mary Achieng
                                        </div>
                                        <div class="text-sm text-white/80">
                                            Grade 2 Teacher • Kisumu
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
                                The structured phonics approach made a massive
                                difference. Students who struggled all year are
                                now reading at grade level. Parents are amazed
                                by their children's progress, and my classroom
                                atmosphere has completely changed.
                            </p>
                            <div
                                class="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-200"
                            >
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        82%
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        At Grade Level
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        45
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        Students
                                    </div>
                                </div>
                                <div>
                                    <div
                                        class="text-2xl font-bold text-primary"
                                    >
                                        6mo
                                    </div>
                                    <div class="text-xs text-neutral-600">
                                        In Program
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
                            <Calculator class="w-8 h-8" />
                        </div>
                        <blockquote class="text-xl font-bold mb-4">
                            "Math is no longer scary for my students. They're
                            actually excited about solving problems!"
                        </blockquote>
                        <p class="text-white/90 mb-6">
                            Using manipulatives and concrete examples helped
                            students understand abstract concepts. The hands-on
                            approach eliminated math anxiety and built genuine
                            confidence in their abilities.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-white/20"
                        >
                            <div>
                                <div class="font-bold">Peter Mutua</div>
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
                            <BookOpen class="w-8 h-8 text-secondary" />
                        </div>
                        <blockquote
                            class="text-xl font-bold mb-4 text-neutral-900"
                        >
                            "My daughter now reads bedtime stories to her
                            younger brother"
                        </blockquote>
                        <p class="text-neutral-600 mb-6">
                            The reading program gave her the skills and
                            confidence she needed. She went from struggling with
                            simple words to reading chapter books in just one
                            school year. We're so grateful.
                        </p>
                        <div
                            class="flex items-center space-x-4 pt-4 border-t border-neutral-200"
                        >
                            <div>
                                <div class="font-bold text-neutral-900">
                                    Grace Wambui
                                </div>
                                <div class="text-sm text-neutral-600">
                                    Parent
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
                    alt="Transform Learning"
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
                            Join 95+ Schools
                        </span>
                    </div>

                    <h2
                        class="text-5xl lg:text-7xl font-black text-white mb-8 leading-none"
                    >
                        Ready to Build Strong<br />
                        <span class="text-primary">Foundation Skills?</span>
                    </h2>

                    <p class="text-xl text-white/90 mb-12 leading-relaxed">
                        Transform your students' literacy and numeracy outcomes.
                        Let's work together to ensure every child masters the
                        foundational skills needed for lifelong success.
                    </p>

                    <div class="flex flex-wrap gap-6 mb-12">
                        <router-link
                            :to="{ name: 'contact' }"
                            class="group px-10 py-5 bg-primary hover:bg-primary-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center shadow-2xl"
                        >
                            Start Your Program
                            <ArrowRight
                                class="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform"
                            />
                        </router-link>

                        <a
                            href="#"
                            class="px-10 py-5 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-full font-bold text-lg border-2 border-white/30 transition-all flex items-center"
                        >
                            <Download class="w-6 h-6 mr-3" />
                            Download Resources
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
    BookOpen,
    ArrowRight,
    FileText,
    CheckCircle,
    Sparkles,
    Star,
    Download,
    Mail,
    Phone,
    AlertTriangle,
    Calculator,
    Users,
    GraduationCap,
    User,
    ClipboardCheck,
    Zap,
    Smile,
    LineChart,
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
