import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product } from "@/types/product";

interface CartItem {
	product: Product;
	quantity: number;
}

export const useCartStore = defineStore("cart", () => {
	const items = ref<CartItem[]>([]);

	// count of items
	const totalItems = computed(() =>
		items.value.reduce((sum, item) => sum + item.quantity, 0),
	);

	//  total price
	const totalPrice = computed(() =>
		items.value.reduce(
			(sum, item) => sum + item.product.price * item.quantity,
			0,
		),
	);

	//  check local storage
	const persist = () => {
		localStorage.setItem("cart", JSON.stringify(items.value));
	};

	const hydrate = () => {
		const stored = localStorage.getItem("cart");
		if (stored) {
			items.value = JSON.parse(stored);
		}
	};

	// add to chart
	const addToCart = (product: Product) => {
		const existing = items.value.find(
			(item) => item.product.id === product.id,
		);

		if (existing) {
			existing.quantity++;
		} else {
			items.value.push({ product, quantity: 1 });
		}

		persist();
	};

	// remove from chart
	const removeFromCart = (productId: number) => {
		items.value = items.value.filter(
			(item) => item.product.id !== productId,
		);

		persist();
	};

	//  update quantity
	const updateQuantity = (productId: number, quantity: number) => {
		const item = items.value.find((item) => item.product.id === productId);

		if (!item) return;

		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		item.quantity = quantity;
		persist();
	};

	return {
		items,
		totalItems,
		totalPrice,
		addToCart,
		removeFromCart,
		updateQuantity,
		hydrate,
	};
});
