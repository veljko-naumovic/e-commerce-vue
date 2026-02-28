<script setup lang="ts">
import { useProductsStore } from "@/stores/products";
import ProductCard from "@/components/product/ProductCard.vue";
import { onMounted } from "vue";
import SkeletonCard from "@/components/ui/SkeletonCard.vue";

const productsStore = useProductsStore();

onMounted(() => {
    productsStore.fetchProducts();
});

</script>

<template>
    <div class="home">
        <h1>Shop</h1>
        <!-- Controls -->
        <div class="controls">
            <input type="text" placeholder="Search..." v-model="productsStore.searchQuery" />
            <select v-model="productsStore.selectedCategory">
                <option value="all">All</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
                <option value="home">Home</option>
            </select>
            <select v-model="productsStore.sortOption">
                <option value="none">No sort</option>
                <option value="price-asc">Price ↑</option>
                <option value="price-desc">Price ↓</option>
            </select>
        </div>
        <!-- Flex Products -->
        <div class="grid">
            <SkeletonCard v-if="productsStore.isLoading" v-for="n in 6" :key="n" />
            <ProductCard v-else v-for="product in productsStore.filteredProducts" :key="product.id"
                :product="product" />
        </div>
        <p v-if="productsStore.filteredProducts.length === 0" class="empty">
            No products found.
        </p>
    </div>
</template>

<style scoped lang="scss">
.home {
    width: 100%;
    padding: 20px 12px;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    margin-bottom: 20px;
}

// Controls

.controls {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 24px;
    background: #fff;
    padding: 16px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.controls input,
.controls select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 16px;
}

.grid :deep(.card) {
    width: 100%;
    max-width: 340px;
}

@media (min-width: 600px) {

    .grid {
        /* back to normal layout  */
        grid-template-columns: repeat(2, 1fr);
        justify-items: stretch;
    }

    .controls {
        flex-direction: row;
        flex-wrap: wrap;
    }

    .controls input {
        flex: 1;
    }

    .controls select {
        width: auto;
    }
}

@media (min-width: 1024px) {

    .home {
        padding: 40px;
    }

    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

.empty {
    text-align: center;
    margin-top: 30px;
    color: #777;
}
</style>