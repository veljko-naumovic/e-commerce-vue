export type ProductCategory = "electronics" | "clothing" | "books" | "home";

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	category: ProductCategory;
	stock: number;
	image: string;
	discount?: number;
}
