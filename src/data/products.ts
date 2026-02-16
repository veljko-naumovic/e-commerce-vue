import { Product } from "@/types/product";

export const mockProducts: Product[] = [
	{
		id: 1,
		title: "Wireless Headphones",
		description: "High quality noise cancelling headphones.",
		price: 120,
		category: "electronics",
		stock: 10,
		image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80",
		discount: 20,
	},
	{
		id: 2,
		title: "Basic T-Shirt",
		description: "Comfortable cotton t-shirt.",
		price: 25,
		category: "clothing",
		stock: 20,
		image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
	},
	{
		id: 3,
		title: "Modern Lamp",
		description: "Stylish desk lamp.",
		price: 60,
		category: "home",
		stock: 5,
		image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
	},
];
