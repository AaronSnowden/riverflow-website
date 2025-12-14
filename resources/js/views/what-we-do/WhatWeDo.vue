<template>
    <div>
        <!-- Hero with Background Image -->
        <section class="relative h-[540px] py-40 overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0">
                <img
                    src="/images/teaching-rep.jpg"
                    alt="What We Do"
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-black/80 to-black/75"
                ></div>
            </div>

            <div class="container-custom relative z-10">
                <div class="max-w-4xl mx-auto text-center">
                    <span
                        class="text-sm text-green-200 font-extrabold tracking-[6px] uppercase"
                        >RIVERFLOW INTERNATIONAL</span
                    >
                    <h1
                        class="custom-font text-5xl md:text-7xl font-bold text-white mb-6 leading-tight tracking-wide"
                    >
                        What We Do
                    </h1>
                    <p
                        class="text-2xl font-thin text-xl md:text-2xl text-white/95 leading-relaxed"
                    >
                        Transforming African education through innovative
                        programs, practical science teaching, and
                        community-centered approaches
                    </p>
                </div>
            </div>
        </section>

        <!-- Programs Overview -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-3xl mx-auto text-center mb-16">
                    <h2
                        class="text-4xl md:text-5xl font-bold text-neutral-900 mb-6"
                    >
                        Our Programs & Initiatives
                    </h2>
                    <p class="text-xl text-neutral-600 leading-relaxed">
                        We empower educators, enhance learning environments, and
                        promote sustainable educational practices across Africa
                    </p>
                </div>

                <div class="space-y-20">
                    <!-- Mini-Laboratory for Primary Schools -->
                    <div class="flex flex-col lg:flex-row gap-12 items-center">
                        <div class="lg:w-1/2 order-2 lg:order-1">
                            <div class="inline-block">
                                <div class="h-1 w-20 bg-secondary mb-6"></div>
                            </div>
                            <h3
                                class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6"
                            >
                                Mini-Laboratory for Primary Schools
                            </h3>
                            <p
                                class="text-lg text-neutral-600 mb-6 leading-relaxed"
                            >
                                Experimentation and practical work form a basic
                                block for teaching science, understanding
                                scientific concepts and enhancing creativity and
                                innovative skills. Unfortunately, up to now
                                teaching science in primary schools is still
                                being done theoretically on the chalk board.
                            </p>
                            <p class="text-lg text-neutral-600 leading-relaxed">
                                Our mini-laboratory has teaching and learning
                                aids that cannot be easily improvised by the
                                teacher. It is a cost-friendly, essential and
                                fitting alternative to the lack of laboratories
                                in most primary schools.
                            </p>
                            <div class="mt-8 flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                >
                                    <FlaskConical class="w-4 h-4 inline mr-1" />
                                    Practical Learning
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-blue-600 rounded-full text-sm font-medium"
                                >
                                    <Microscope class="w-4 h-4 inline mr-1" />
                                    Science Education
                                </span>
                            </div>
                        </div>
                        <div class="lg:w-1/2 order-1 lg:order-2">
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/hero3.jpg"
                                    alt="Mini Laboratory"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- Promoting Competency-Based Education -->
                    <div class="flex flex-col lg:flex-row gap-12 items-center">
                        <div class="lg:w-1/2">
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/hero2.jpg"
                                    alt="Competency Based Education"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="inline-block">
                                <div class="h-1 w-20 bg-secondary mb-6"></div>
                            </div>
                            <h3
                                class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6"
                            >
                                Promoting Competency-Based Education
                            </h3>
                            <p class="text-lg text-neutral-600 leading-relaxed">
                                STIA advocates a competence and skill-based
                                curriculum as opposed to a teacher-centered
                                knowledge-based curriculum. The STIA
                                learner-centered approach is aimed at developing
                                learner autonomy and independence with a major
                                focus on practices that enable lifelong learning
                                and independent problem-solving skills through
                                construction of projects.
                            </p>
                            <div class="mt-8 flex flex-wrap gap-3">
                                <span
                                    class="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                                >
                                    <GraduationCap
                                        class="w-4 h-4 inline mr-1"
                                    />
                                    Learner-Centered
                                </span>
                                <span
                                    class="px-4 py-2 bg-secondary/10 text-blue-600 rounded-full text-sm font-medium"
                                >
                                    <Target class="w-4 h-4 inline mr-1" /> Skill
                                    Development
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Promoting Literacy & Numeracy -->
                    <div class="flex flex-col lg:flex-row gap-12 items-center">
                        <div class="lg:w-1/2 order-2 lg:order-1">
                            <div class="inline-block">
                                <div class="h-1 w-20 bg-secondary mb-6"></div>
                            </div>
                            <h3
                                class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6"
                            >
                                Promoting Literacy & Numeracy
                            </h3>
                            <p
                                class="text-lg text-neutral-600 mb-6 leading-relaxed"
                            >
                                We recognize that strong foundational literacy
                                and numeracy skills are essential for all future
                                learning. Our programs focus on developing these
                                critical skills through engaging, hands-on
                                activities and evidence-based teaching methods.
                            </p>
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
                            >
                                <div class="flex items-start space-x-3">
                                    <CheckCircle
                                        class="w-6 h-6 text-secondary flex-shrink-0 mt-1"
                                    />
                                    <span class="text-neutral-700"
                                        >Reading comprehension programs</span
                                    >
                                </div>
                                <div class="flex items-start space-x-3">
                                    <CheckCircle
                                        class="w-6 h-6 text-secondary flex-shrink-0 mt-1"
                                    />
                                    <span class="text-neutral-700"
                                        >Mathematics enrichment</span
                                    >
                                </div>
                                <div class="flex items-start space-x-3">
                                    <CheckCircle
                                        class="w-6 h-6 text-secondary flex-shrink-0 mt-1"
                                    />
                                    <span class="text-neutral-700"
                                        >Interactive learning materials</span
                                    >
                                </div>
                                <div class="flex items-start space-x-3">
                                    <CheckCircle
                                        class="w-6 h-6 text-secondary flex-shrink-0 mt-1"
                                    />
                                    <span class="text-neutral-700"
                                        >Teacher training workshops</span
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="lg:w-1/2 order-1 lg:order-2">
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1573169790341-483eec303e04?w=1500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGl0ZXJhY3l8ZW58MHx8MHx8fDA%3D"
                                    alt="Literacy and Numeracy"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    <!-- CPD Teacher Support Program -->
                    <div class="flex flex-col lg:flex-row gap-12 items-center">
                        <div class="lg:w-1/2">
                            <div
                                class="relative rounded-2xl overflow-hidden shadow-2xl"
                            >
                                <img
                                    src="/images/what-we-do-hero.jpg"
                                    alt="CPD Teacher Support"
                                    class="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div class="lg:w-1/2">
                            <div class="inline-block">
                                <div class="h-1 w-20 bg-secondary mb-6"></div>
                            </div>
                            <h3
                                class="text-3xl md:text-4xl font-bold text-neutral-900 mb-6"
                            >
                                CPD Teacher Support Program
                            </h3>
                            <p
                                class="text-lg text-neutral-600 mb-6 leading-relaxed"
                            >
                                Continuous Professional Development (CPD) is at
                                the heart of our mission. We provide ongoing
                                support, training, and mentorship to teachers,
                                ensuring they have the skills, knowledge, and
                                confidence to deliver high-quality education.
                            </p>
                            <div class="space-y-4">
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                    >
                                        <Users class="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4
                                            class="font-semibold text-neutral-900 mb-1"
                                        >
                                            Mentorship Programs
                                        </h4>
                                        <p class="text-neutral-600">
                                            Experienced educators supporting new
                                            teachers
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                    >
                                        <BookOpen
                                            class="w-6 h-6 text-primary"
                                        />
                                    </div>
                                    <div>
                                        <h4
                                            class="font-semibold text-neutral-900 mb-1"
                                        >
                                            Resource Materials
                                        </h4>
                                        <p class="text-neutral-600">
                                            Comprehensive teaching guides and
                                            lesson plans
                                        </p>
                                    </div>
                                </div>
                                <div class="flex items-start space-x-4">
                                    <div
                                        class="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                                    >
                                        <Award class="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4
                                            class="font-semibold text-neutral-900 mb-1"
                                        >
                                            Professional Certifications
                                        </h4>
                                        <p class="text-neutral-600">
                                            Recognized qualifications for career
                                            advancement
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Impact Stats -->
        <section class="py-20 bg-primary text-white">
            <div class="container-custom">
                <div class="text-center mb-16">
                    <h2 class="text-4xl md:text-5xl font-bold mb-6">
                        Our Impact
                    </h2>
                    <p class="text-xl text-white/90 max-w-2xl mx-auto">
                        Measuring success through the lives we touch and the
                        communities we transform
                    </p>
                </div>
                <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
                        >
                            <Users class="w-10 h-10" />
                        </div>
                        <div class="text-5xl font-bold mb-2">500+</div>
                        <div class="text-lg text-white/90">
                            Teachers Trained
                        </div>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
                        >
                            <School class="w-10 h-10" />
                        </div>
                        <div class="text-5xl font-bold mb-2">150+</div>
                        <div class="text-lg text-white/90">
                            Schools Supported
                        </div>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
                        >
                            <GraduationCap class="w-10 h-10" />
                        </div>
                        <div class="text-5xl font-bold mb-2">10,000+</div>
                        <div class="text-lg text-white/90">
                            Students Impacted
                        </div>
                    </div>
                    <div class="text-center">
                        <div
                            class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-4"
                        >
                            <Globe class="w-10 h-10" />
                        </div>
                        <div class="text-5xl font-bold mb-2">5</div>
                        <div class="text-lg text-white/90">
                            African Countries
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-20 bg-white">
            <div class="container-custom">
                <div class="max-w-4xl mx-auto">
                    <div
                        class="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl"
                    >
                        <h2 class="text-4xl md:text-5xl font-bold mb-6">
                            Join Our Mission
                        </h2>
                        <p
                            class="text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed"
                        >
                            Partner with us to create lasting change in African
                            education. Whether through support, collaboration,
                            or participation, your involvement matters.
                        </p>
                        <div
                            class="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <router-link
                                :to="{ name: 'contact' }"
                                class="btn-primary bg-secondary hover:bg-secondary-700 text-white px-8 py-4 text-lg"
                            >
                                Get Involved
                            </router-link>
                            <router-link
                                :to="{ name: 'opportunities' }"
                                class="btn-secondary bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 text-lg"
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
import {
    FlaskConical,
    Microscope,
    GraduationCap,
    Target,
    CheckCircle,
    Users,
    BookOpen,
    Award,
    School,
    Globe,
} from "lucide-vue-next";
</script>

<style>
.custom-font {
    font-family: "Maven Pro", Sans-serif;
    font-size: 64px;
    font-weight: 600;
}
</style>
