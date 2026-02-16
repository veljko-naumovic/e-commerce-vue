<script setup lang="ts">
import type { Product } from "@/types/product";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";

const props = defineProps<{
    product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();

const goToDetails = () => {
    router.push(`/product/${props.product.id}`);
};

const handleAdd = () => {
    if (props.product.stock > 0) {
        cartStore.addToCart(props.product);
    }
};
</script>

<template>
    <div class="card">
        <img :src="product.image" :alt="product.title" @click="goToDetails" />

        <h3 @click="goToDetails">
            {{ product.title }}
        </h3>

        <p>{{ product.description }}</p>

        <div class="bottom">
            <span class="price">${{ product.price }}</span>

            <button :disabled="product.stock === 0" @click="handleAdd">
                Add to Cart
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    flex: 1 1 260px;
    min-width: 260px;
    max-width: 300px;

    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    }

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        cursor: pointer;
    }

    h3 {
        margin: 16px;
        font-size: 18px;
        cursor: pointer;
    }

    p {
        margin: 0 16px 16px;
        font-size: 14px;
        color: #666;
    }

    .bottom {
        margin-top: auto;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .price {
        font-weight: 600;
        font-size: 16px;
    }

    button {
        padding: 8px 14px;
        border: none;
        border-radius: 6px;
        background: #111;
        color: white;
        cursor: pointer;
        font-size: 13px;
        transition: background 0.2s ease;

        &:hover {
            background: #333;
        }

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}
</style>
