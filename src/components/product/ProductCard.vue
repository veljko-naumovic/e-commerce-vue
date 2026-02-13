<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import type { Product } from "@/types/product";
import { useRouter } from "vue-router";

const props = defineProps<{
    product: Product;
}>();


const cartStore = useCartStore();
const router = useRouter();

const handleAdd = () => {
    if (props.product.stock > 0) {
        cartStore.addToCart(props.product);
    }
};

const goToDetails = () => {
    router.push(`/product/${props.product.id}`);
};

</script>

<template>
    <div class="card">
        <img :src="product.image" :alt="product.title" />

        <h3 @click="goToDetails" class="clickable">{{ product.title }}</h3>
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

    button {
        padding: 6px 10px;
        background: black;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}
</style>
