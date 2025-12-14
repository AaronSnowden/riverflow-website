<template>
    <div ref="statsSection" class="bg-[#0d3c30] text-white py-4">
        <div class="container-custom">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div class="text-center">
                    <!-- <School class="w-12 h-12 mx-auto mb-4 opacity-80" /> -->
                    <div class="text-5xl font-bold mb-2">
                        {{ formatNumber(animatedStats.schools) }}+
                    </div>
                    <div class="text-md opacity-90">Schools Impacted</div>
                </div>
                <div class="text-center">
                    <!-- <GraduationCap class="w-12 h-12 mx-auto mb-4 opacity-80" /> -->
                    <div class="text-5xl font-bold mb-2">
                        {{ formatNumber(animatedStats.learners) }}+
                    </div>
                    <div class="text-md opacity-90">Learners Benefited</div>
                </div>
                <div class="text-center">
                    <!-- <Award class="w-12 h-12 mx-auto mb-4 opacity-80" /> -->
                    <div class="text-5xl font-bold mb-2">
                        {{ formatNumber(animatedStats.trained) }}+
                    </div>
                    <div class="text-md opacity-90">Teachers Trained</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import { Users, School, GraduationCap, Award } from "lucide-vue-next";

const props = defineProps({
    stats: {
        type: Object,
        required: true,
    },
});

const statsSection = ref(null);
const animatedStats = reactive({
    teachers: 0,
    schools: 0,
    learners: 0,
    trained: 0,
});

let hasAnimated = false;
let observer = null;

const formatNumber = (num) => {
    return Math.floor(num).toLocaleString("en-US");
};

// Animate counting from 0 to target value
const animateValue = (key, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            animatedStats[key] = target;
            clearInterval(timer);
        } else {
            animatedStats[key] = current;
        }
    }, 16);
};

const startAnimation = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    // Animate each stat with slight delays for a staggered effect
    setTimeout(() => animateValue("teachers", props.stats.teachers), 0);
    setTimeout(() => animateValue("schools", props.stats.schools), 200);
    setTimeout(() => animateValue("learners", props.stats.learners), 400);
    setTimeout(() => animateValue("trained", props.stats.trained), 600);
};

onMounted(() => {
    // Set up intersection observer to trigger animation when in view
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAnimation();
                }
            });
        },
        { threshold: 0.3 } // Trigger when 30% of the element is visible
    );

    if (statsSection.value) {
        observer.observe(statsSection.value);
    }
});

onUnmounted(() => {
    if (observer && statsSection.value) {
        observer.unobserve(statsSection.value);
    }
});
</script>
