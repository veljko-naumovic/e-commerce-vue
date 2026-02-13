<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import ProductCard from "@/components/product/ProductCard.vue";

const productsStore = useProductsStore();
</script>

<template>
    <div class="home">
        <h1>Shop</h1>

        <!-- Controls -->
        <div class="controls">
            <!-- SEARCH -->
            <input type="text" placeholder="Search..." v-model="productsStore.searchQuery" />

            <!-- CATEGORY FILTER -->
            <select v-model="productsStore.selectedCategory">
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
            </select>

            <!-- SORT -->
            <select v-model="productsStore.sortOption">
                <option value="none">No sort</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
            </select>
        </div>

        <!-- PRODUCTS GRID -->
        <div class="grid">
            <ProductCard v-for="product in productsStore.filteredProducts" :key="product.id" :product="product" />
        </div>

        <!-- EMPTY STATE -->
        <p v-if="productsStore.filteredProducts.length === 0">
            No products found.
        </p>
    </div>
</template>

<style scoped lang="scss">
.home {
    padding: 24px;
}

.controls {
    display: flex;
    gap: 16px;
    margin-bottom: 24px;

    input,
    select {
        padding: 8px 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
    }
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
}
</style>
