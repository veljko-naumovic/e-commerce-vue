<script setup lang="ts">
import type { Product } from "@/types/product";

defineProps<{
    product: Product;
}>();
</script>

<template>
    <div class="card">
        <img :src="product.image" :alt="product.title" />

        <h3>{{ product.title }}</h3>
        <p>{{ product.description }}</p>

        <div class="bottom">
            <span class="price">${{ product.price }}</span>
            <span v-if="product.stock > 0" class="stock in">
                In stock
            </span>
            <span v-else class="stock out">
                Out of stock
            </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    background: white;

    img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }

    h3 {
        margin: 12px 0 6px;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-weight: bold;
    }

    .stock.in {
        color: green;
    }

    .stock.out {
        color: red;
    }
}
</style>
