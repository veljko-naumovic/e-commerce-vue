import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { mockProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";

export type SortOption = "price-asc" | "price-desc" | "none";

export const useProductsStore = defineStore("products", () => {
	const products = ref<Product[]>(mockProducts);

	const searchQuery = ref("");
	const selectedCategory = ref<ProductCategory | "all">("all");
	const sortOption = ref<SortOption>("none");

	// 🎯 FILTER + SEARCH + SORT
	const filteredProducts = computed(() => {
		let result = [...products.value];

		// Search
		if (searchQuery.value) {
			result = result.filter((product) =>
				product.title
					.toLowerCase()
					.includes(searchQuery.value.toLowerCase()),
			);
		}

		// Category filter
		if (selectedCategory.value !== "all") {
			result = result.filter(
				(product) => product.category === selectedCategory.value,
			);
		}

		// Sorting
		if (sortOption.value === "price-asc") {
			result.sort((a, b) => a.price - b.price);
		}

		if (sortOption.value === "price-desc") {
			result.sort((a, b) => b.price - a.price);
		}

		return result;
	});

	const setSearch = (query: string) => {
		searchQuery.value = query;
	};

	const setCategory = (category: ProductCategory | "all") => {
		selectedCategory.value = category;
	};

	const setSort = (option: SortOption) => {
		sortOption.value = option;
	};

	const getProductById = (id: number) => {
		return products.value.find((p) => p.id === id);
	};
	/////////////////////
	const addProduct = (product: Product) => {
		products.value.push(product);
	};

	// ✏️ UPDATE
	const updateProduct = (updated: Product) => {
		const index = products.value.findIndex((p) => p.id === updated.id);
		if (index !== -1) {
			products.value[index] = updated;
		}
	};

	// 🗑 DELETE
	const deleteProduct = (id: number) => {
		products.value = products.value.filter((p) => p.id !== id);
	};

	// 💎 Optimistic price update
	const updatePriceOptimistic = (id: number, newPrice: number) => {
		const product = products.value.find((p) => p.id === id);
		if (!product) return;

		const oldPrice = product.price;

		product.price = newPrice;

		// Simulacija API call-a
		setTimeout(() => {
			const success = true; // promeni u false da simuliraš error

			if (!success) {
				product.price = oldPrice;
			}
		}, 800);
	};

	return {
		products,
		searchQuery,
		selectedCategory,
		sortOption,
		filteredProducts,
		setSearch,
		setCategory,
		setSort,
		getProductById,
		addProduct,
		updateProduct,
		deleteProduct,
		updatePriceOptimistic,
	};
});
