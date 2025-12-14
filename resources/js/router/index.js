import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AdminLayout from "@/layouts/AdminLayout.vue";

const routes = [
    {
        path: "/",
        component: DefaultLayout,
        children: [
            {
                path: "",
                name: "home",
                component: () => import("@/views/Home.vue"),
            },

            {
                path: "who-we-are",
                name: "who-we-are",
                component: () => import("@/views/WhoWeAre.vue"),
            },

            // TODO: Add these as children of the what-we-do path
            {
                path: "what-we-do",
                name: "what-we-do",
                component: () => import("@/views/what-we-do/WhatWeDo.vue"),
            },
            {
                path: "what-we-do/mini-laboratory",
                name: "min-laboratory",
                component: () =>
                    import("@/views/what-we-do/MiniLaboratory.vue"),
            },
            {
                path: "what-we-do/competency-based-education",
                name: "competency-based-education",
                component: () =>
                    import("@/views/what-we-do/CompetencyBasedEducation.vue"),
            },
            {
                path: "what-we-do/literacy-numeracy-programs",
                name: "literacy-numeracy-programs",
                component: () =>
                    import("@/views/what-we-do/LiteracyNumeracyPrograms.vue"),
            },
            {
                path: "what-we-do/teacher-support-program",
                name: "teacher-support-program",
                component: () =>
                    import("@/views/what-we-do/TeacherSupportProgram.vue"),
            },
            {
                path: "projects",
                name: "projects",
                component: () => import("@/views/Projects.vue"),
            },
            {
                path: "causes",
                name: "causes",
                component: () => import("@/views/Causes.vue"),
            },
            {
                path: "news",
                name: "news",
                component: () => import("@/views/News.vue"),
            },
            {
                path: "news/:slug",
                name: "news-detail",
                component: () => import("@/views/NewsDetail.vue"),
            },
            {
                path: "events",
                name: "events",
                component: () => import("@/views/Events.vue"),
            },
            {
                path: "events/:slug",
                name: "event-detail",
                component: () => import("@/views/EventDetail.vue"),
            },
            {
                path: "gallery",
                name: "gallery",
                component: () => import("@/views/Gallery.vue"),
            },
            {
                path: "opportunities",
                name: "opportunities",
                component: () => import("@/views/Opportunities.vue"),
            },
            {
                path: "newsletters",
                name: "newsletters",
                component: () => import("@/views/Newsletters.vue"),
            },
            {
                path: "contact",
                name: "contact",
                component: () => import("@/views/Contact.vue"),
            },
            {
                path: "team",
                name: "team",
                component: () => import("@/views/Team.vue"),
            },
        ],
    },
    {
        path: "/admin",
        component: AdminLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "",
                name: "admin-dashboard",
                component: () => import("@/views/admin/Dashboard.vue"),
                meta: { requiresAuth: true },
            },
            {
                path: "login",
                name: "admin-login",
                component: () => import("@/views/admin/Login.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "forgot-password",
                name: "admin-forgot-password",
                component: () => import("@/views/admin/ForgotPassword.vue"),
                meta: { requiresAuth: false },
            },
            {
                path: "news",
                name: "admin-news",
                component: () => import("@/views/admin/news/NewsIndex.vue"),
            },
            {
                path: "news/create",
                name: "admin-news-create",
                component: () => import("@/views/admin/news/NewsCreate.vue"),
            },
            {
                path: "news/:id",
                name: "admin-news-edit",
                component: () => import("@/views/admin/news/NewsEdit.vue"),
            },
            {
                path: "news/view/:id",
                name: "admin-news-view",
                component: () => import("@/views/admin/news/NewsView.vue"),
            },
            {
                path: "events",
                name: "admin-events",
                component: () => import("@/views/admin/events/EventsIndex.vue"),
            },
            {
                path: "events/create",
                name: "admin-events-create",
                component: () => import("@/views/admin/events/EventCreate.vue"),
            },
            {
                path: "events/view/:id",
                name: "admin-events-view",
                component: () => import("@/views/admin/events/EventView.vue"),
            },
            {
                path: "events/edit/:id",
                name: "admin-events-edit",
                component: () => import("@/views/admin/events/EventEdit.vue"),
            },
            {
                path: "gallery",
                name: "admin-gallery",
                component: () =>
                    import("@/views/admin/gallery/GalleryIndex.vue"),
            },
            {
                path: "gallery/upload",
                name: "admin-gallery-upload",
                component: () =>
                    import("@/views/admin/gallery/GalleryUpload.vue"),
            },
            {
                path: "gallery/view/:id",
                name: "admin-gallery-view",
                component: () =>
                    import("@/views/admin/gallery/GalleryView.vue"),
            },
            {
                path: "gallery/edit/:id",
                name: "admin-gallery-edit",
                component: () =>
                    import("@/views/admin/gallery/GalleryEdit.vue"),
            },
            {
                path: "opportunities",
                name: "admin-opportunities",
                component: () =>
                    import(
                        "@/views/admin/opportunities/OpportunitiesIndex.vue"
                    ),
            },
            {
                path: "opportunities/create",
                name: "admin-opportunities-create",
                component: () =>
                    import("@/views/admin/opportunities/OpportunityCreate.vue"),
            },
            {
                path: "opportunities/view/:id",
                name: "admin-opportunities-view",
                component: () =>
                    import("@/views/admin/opportunities/OpportunityView.vue"),
            },
            {
                path: "opportunities/edit/:id",
                name: "admin-opportunities-edit",
                component: () =>
                    import("@/views/admin/opportunities/OpportunityEdit.vue"),
            },
            {
                path: "team",
                name: "admin-team",
                component: () => import("@/views/admin/team/TeamIndex.vue"),
            },
            {
                path: "team/create",
                name: "admin-team-create",
                component: () => import("@/views/admin/team/TeamCreate.vue"),
            },
            {
                path: "team/view/:id",
                name: "admin-team-view",
                component: () => import("@/views/admin/team/TeamView.vue"),
            },
            {
                path: "team/edit/:id",
                name: "admin-team-edit",
                component: () => import("@/views/admin/team/TeamEdit.vue"),
            },
            {
                path: "users",
                name: "admin-users",
                component: () => import("@/views/admin/users/UsersIndex.vue"),
            },
            {
                path: "users/create",
                name: "admin-users-create",
                component: () => import("@/views/admin/users/UserCreate.vue"),
            },
            {
                path: "users/view/:id",
                name: "admin-users-view",
                component: () => import("@/views/admin/users/UserView.vue"),
            },
            {
                path: "users/edit/:id",
                name: "admin-users-edit",
                component: () => import("@/views/admin/users/UserEdit.vue"),
            },
            {
                path: "causes",
                name: "admin-causes",
                component: () => import("@/views/admin/causes/CausesIndex.vue"),
            },
            {
                path: "causes/create",
                name: "admin-causes-create",
                component: () => import("@/views/admin/causes/CauseCreate.vue"),
            },
            {
                path: "causes/view/:id",
                name: "admin-causes-view",
                component: () => import("@/views/admin/causes/CauseView.vue"),
            },
            {
                path: "causes/edit/:id",
                name: "admin-causes-edit",
                component: () => import("@/views/admin/causes/CauseEdit.vue"),
            },
            {
                path: "projects",
                name: "admin-projects",
                component: () =>
                    import("@/views/admin/projects/ProjectsIndex.vue"),
            },
            {
                path: "projects/create",
                name: "admin-projects-create",
                component: () =>
                    import("@/views/admin/projects/ProjectCreate.vue"),
            },
            {
                path: "projects/view/:id",
                name: "admin-projects-view",
                component: () =>
                    import("@/views/admin/projects/ProjectView.vue"),
            },
            {
                path: "projects/edit/:id",
                name: "admin-projects-edit",
                component: () =>
                    import("@/views/admin/projects/ProjectEdit.vue"),
            },
            {
                path: "newsletters",
                name: "admin-newsletters",
                component: () =>
                    import("@/views/admin/newsletters/NewsletterIndex.vue"),
            },
            {
                path: "newsletters/create",
                name: "admin-newsletters-create",
                component: () =>
                    import("@/views/admin/newsletters/NewsletterCreate.vue"),
            },
            {
                path: "newsletters/view/:id",
                name: "admin-newsletters-view",
                component: () =>
                    import("@/views/admin/newsletters/NewsletterView.vue"),
            },
            {
                path: "newsletters/edit/:id",
                name: "admin-newsletters-edit",
                component: () =>
                    import("@/views/admin/newsletters/NewsletterEdit.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

// Navigation guard for auth routes
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Initialize auth on first navigation
    if (!authStore.user) {
        authStore.initAuth();
    }

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Redirect to login page if not authenticated
        next({ name: "admin-login", query: { redirect: to.fullPath } });
    } else if (to.name === "admin-login" && authStore.isAuthenticated) {
        // Redirect to dashboard page if already logged in
        next({ name: "admin-dashboard" });
    } else {
        next();
    }
});

export default router;
