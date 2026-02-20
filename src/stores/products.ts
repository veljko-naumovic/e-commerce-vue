import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Product, ProductCategory } from "@/types/product";
import * as productsApi from "@/api/productsApi";
export type SortOption = "price-asc" | "price-desc" | "none";

export const useProductsStore = defineStore("products", () => {
	const products = ref<Product[]>([]);
	const error = ref<string | null>(null);

	const searchQuery = ref("");
	const selectedCategory = ref<ProductCategory | "all">("all");
	const sortOption = ref<SortOption>("none");
	const isLoading = ref(false);

	const isDetailsLoading = ref(false);

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

	const addProduct = async (product: Product) => {
		const created = await productsApi.createProduct(product);
		products.value.push(created);
	};

	const updateProduct = async (updated: Product) => {
		const result = await productsApi.updateProduct(updated);
		products.value = products.value.map((p) =>
			p.id === result.id ? result : p,
		);
	};

	const deleteProduct = async (id: number) => {
		await productsApi.deleteProduct(id);
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
			const success = true;

			if (!success) {
				product.price = oldPrice;
			}
		}, 800);
	};

	const fetchProducts = async () => {
		isLoading.value = true;
		error.value = null;

		try {
			products.value = await productsApi.getProducts();
		} catch (err: any) {
			error.value = err.message;
		} finally {
			isLoading.value = false;
		}
	};

	const fetchProductById = async (id: number) => {
		isDetailsLoading.value = true;
		error.value = null;

		try {
			return await productsApi.getProductById(id);
		} catch (err: any) {
			error.value = err.message;
			return null;
		} finally {
			isDetailsLoading.value = false;
		}
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
		isLoading,
		error,
		fetchProducts,
		isDetailsLoading,
		fetchProductById,
	};
});
