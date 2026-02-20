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

        <!-- FLEX PRODUCTS -->
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
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        margin-bottom: 30px;
    }
}

/* Controls */

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 32px;
    background: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    input,
    select {
        padding: 10px 14px;
        border: 1px solid #ddd;
        border-radius: 6px;
        font-size: 14px;
        min-width: 180px;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: #111;
        }
    }

    input {
        flex: 1;
    }
}

/* FLEX Layout */

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.empty {
    margin-top: 40px;
    text-align: center;
    color: #777;
}
</style>
