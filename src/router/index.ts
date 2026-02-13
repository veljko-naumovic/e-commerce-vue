import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/MainLayout.vue"),
		children: [
			{
				path: "",
				component: () => import("@/views/HomeView.vue"),
			},
			{
				path: "cart",
				component: () => import("@/views/CartView.vue"),
			},
			{
				path: "login",
				component: () => import("@/views/LoginView.vue"),
			},
			{
				path: "admin",
				component: () => import("@/views/AdminView.vue"),
				meta: { requiresAuth: true },
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to) => {
	const auth = useAuthStore();

	if (to.meta.requiresAuth && !auth.isAuthenticated) {
		return "/login";
	}
});

export default router;
