import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Product, ProductCategory } from "@/types/product";
import * as productsApi from "@/api/productsApi";
import { useUiStore } from "@/stores/ui";

export type SortOption = "price-asc" | "price-desc" | "none";

export const useProductsStore = defineStore("products", () => {
	const products = ref<Product[]>([]);
	const isLoading = ref(false);
	const isDetailsLoading = ref(false);

	const searchQuery = ref("");
	const selectedCategory = ref<ProductCategory | "all">("all");
	const sortOption = ref<SortOption>("none");

	const fetchProducts = async () => {
		const uiStore = useUiStore();

		isLoading.value = true;
		uiStore.startLoading();

		try {
			products.value = await productsApi.getProducts();
		} finally {
			isLoading.value = false;
			uiStore.stopLoading();
		}
	};

	const fetchProductById = async (id: string) => {
		const uiStore = useUiStore();

		isDetailsLoading.value = true;
		uiStore.startLoading();

		try {
			return await productsApi.getProductById(id);
		} finally {
			isDetailsLoading.value = false;
			uiStore.stopLoading();
		}
	};

	const filteredProducts = computed(() => {
		let result = [...products.value];

		if (searchQuery.value) {
			result = result.filter((product) =>
				product.title
					.toLowerCase()
					.includes(searchQuery.value.toLowerCase()),
			);
		}

		if (selectedCategory.value !== "all") {
			result = result.filter(
				(product) => product.category === selectedCategory.value,
			);
		}

		if (sortOption.value === "price-asc") {
			result.sort((a, b) => a.price - b.price);
		}

		if (sortOption.value === "price-desc") {
			result.sort((a, b) => b.price - a.price);
		}

		return result;
	});

	const updateProduct = async (updated: Product) => {
		const result = await productsApi.updateProduct(updated);

		products.value = products.value.map((p) =>
			p.id === result.id ? result : p,
		);
	};

	const addProduct = async (product: Product) => {
		const result = await productsApi.createProduct(product);

		products.value = [...products.value, result];
	};

	const deleteProduct = async (id: string) => {
		await productsApi.deleteProduct(id);
		products.value = products.value.filter((p) => p.id !== id);
	};

	return {
		products,
		isLoading,
		isDetailsLoading,
		searchQuery,
		selectedCategory,
		sortOption,
		filteredProducts,
		fetchProducts,
		fetchProductById,
		addProduct,
		updateProduct,
		deleteProduct,
	};
});
