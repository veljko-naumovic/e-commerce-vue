import { defineStore } from "pinia";
import { ref } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
	const items = ref<number[]>([]); // čuvamo samo product IDs

	const persist = () => {
		localStorage.setItem("wishlist", JSON.stringify(items.value));
	};

	const hydrate = () => {
		const stored = localStorage.getItem("wishlist");
		if (stored) {
			items.value = JSON.parse(stored);
		}
	};

	const toggle = (productId: number) => {
		if (items.value.includes(productId)) {
			items.value = items.value.filter((id) => id !== productId);
		} else {
			items.value.push(productId);
		}
		persist();
	};

	const isInWishlist = (productId: number) => {
		return items.value.includes(productId);
	};

	const remove = (productId: number) => {
		items.value = items.value.filter((id) => id !== productId);
		persist();
	};

	return {
		items,
		toggle,
		remove,
		isInWishlist,
		hydrate,
	};
});
