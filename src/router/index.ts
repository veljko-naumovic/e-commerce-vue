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
				path: "/product/:id",
				name: "product-details",
				component: () => import("@/views/ProductDetailsView.vue"),
			},
			{
				path: "wishlist",
				name: "wishlist",
				component: () => import("@/views/WishlistView.vue"),
			},
			{
				path: "/checkout",
				component: () => import("@/views/CheckoutView.vue"),
			},
			{
				path: "/success",
				component: () => import("@/views/SuccessView.vue"),
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
