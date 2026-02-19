import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

import "./styles/main.scss";

const app = createApp(App);

const pinia = createPinia();

app.use(pinia);
app.use(router);

const auth = useAuthStore();
const cart = useCartStore();
const wishlist = useWishlistStore();

auth.hydrate();
cart.hydrate();
wishlist.hydrate();

app.mount("#app");
