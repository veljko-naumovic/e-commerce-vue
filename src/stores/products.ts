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
	};
});
