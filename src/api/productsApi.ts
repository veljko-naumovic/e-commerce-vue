import { mockProducts } from "@/data/products";
import type { Product } from "@/types/product";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let productsDB: Product[] = [...mockProducts];

// GET ALL
export const getProducts = async (): Promise<Product[]> => {
	await delay(1000);

	return [...productsDB];
};

// GET BY ID
export const getProductById = async (id: number): Promise<Product | null> => {
	await delay(700);

	return productsDB.find((p) => p.id === id) || null;
};

// CREATE
export const createProduct = async (product: Product): Promise<Product> => {
	await delay(800);
	productsDB.push(product);
	return product;
};

// UPDATE
export const updateProduct = async (updated: Product): Promise<Product> => {
	await delay(800);
	productsDB = productsDB.map((p) => (p.id === updated.id ? updated : p));
	return updated;
};

// DELETE
export const deleteProduct = async (id: number) => {
	await delay(800);
	productsDB = productsDB.filter((p) => p.id !== id);
};
