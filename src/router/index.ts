// import { createRouter, createWebHistory } from "vue-router";

// const routes = [
// 	{
// 		path: "/",
// 		name: "home",
// 		component: () => import("../views/HomeView.vue"),
// 	},
// 	{
// 		path: "/product/:id",
// 		name: "product-details",
// 		component: () => import("../views/ProductDetailsView.vue"),
// 	},
// 	{
// 		path: "/cart",
// 		name: "cart",
// 		component: () => import("../views/CartView.vue"),
// 	},
// 	{
// 		path: "/login",
// 		name: "login",
// 		component: () => import("../views/LoginView.vue"),
// 	},
// 	{
// 		path: "/admin",
// 		name: "admin",
// 		component: () => import("../views/AdminView.vue"),
// 	},
// ];

// const router = createRouter({
// 	history: createWebHistory(),
// 	routes,
// });

// export default router;

import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";

const routes = [
	{
		path: "/",
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/login",
		component: () => import("../views/LoginView.vue"),
	},
	{
		path: "/admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true },
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
