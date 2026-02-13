import type { Product } from "@/types/product";

export const mockProducts: Product[] = [
	{
		id: 1,
		title: "Wireless Headphones",
		description: "High quality noise cancelling headphones.",
		price: 120,
		category: "electronics",
		stock: 10,
		image: "https://via.placeholder.com/300",
	},
	{
		id: 2,
		title: "Basic T-Shirt",
		description: "Comfortable cotton t-shirt.",
		price: 25,
		category: "clothing",
		stock: 20,
		image: "https://via.placeholder.com/300",
	},
	{
		id: 3,
		title: "Modern Lamp",
		description: "Stylish desk lamp.",
		price: 60,
		category: "home",
		stock: 5,
		image: "https://via.placeholder.com/300",
	},
];
