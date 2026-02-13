<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();

const productId = Number(route.params.id);

const product = computed(() =>
    productsStore.getProductById(productId)
);

const handleAdd = () => {
    if (product.value && product.value.stock > 0) {
        cartStore.addToCart(product.value);
    }
};
</script>

<template>
    <div v-if="product" class="details">
        <img :src="product.image" :alt="product.title" />

        <div class="info">
            <h1>{{ product.title }}</h1>

            <p class="description">
                {{ product.description }}
            </p>

            <p class="price">
                ${{ product.price }}
            </p>

            <p :class="[
                'stock',
                product.stock > 0 ? 'in' : 'out'
            ]">
                {{ product.stock > 0 ? 'In stock' : 'Out of stock' }}
            </p>

            <button :disabled="product.stock === 0" @click="handleAdd">
                Add to Cart
            </button>
        </div>
    </div>

    <p v-else>Product not found.</p>
</template>

<style scoped lang="scss">
.details {
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 40px;
    padding: 40px;

    img {
        width: 100%;
        border-radius: 8px;
    }

    .price {
        font-size: 24px;
        font-weight: bold;
    }

    .stock.in {
        color: green;
    }

    .stock.out {
        color: red;
    }

    button {
        margin-top: 16px;
        padding: 10px 16px;
        background: black;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 6px;

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}
</style>
