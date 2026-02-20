<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useToastStore } from "@/stores/toast";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const toast = useToastStore();

const productId = Number(route.params.id);

const product = computed(() =>
    productsStore.getProductById(productId)
);

const quantity = ref(1);

// When load product
watch(
    () => product.value,
    (newProduct) => {
        if (!newProduct) return;

        const existingQty = cartStore.getProductQuantity(newProduct.id);

        quantity.value = existingQty > 0 ? existingQty : 1;
    },
    { immediate: true }
);

const increase = () => {
    if (!product.value) return;

    const existingQty = cartStore.getProductQuantity(product.value.id);
    const total = existingQty + quantity.value;

    if (total < product.value.stock) {
        quantity.value++;
    }
};

const decrease = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const handleAdd = () => {
    if (!product.value) return;

    const existingQty = cartStore.getProductQuantity(product.value.id);
    const total = existingQty + quantity.value;

    if (total > product.value.stock) {
        toast.show("Not enough stock available", "error");
        return;
    }

    cartStore.addToCart(product.value, quantity.value);

    toast.show(
        `${quantity.value} x ${product.value.title} added to cart`,
        "success"
    );

    quantity.value = cartStore.getProductQuantity(product.value.id);
};

const existingQuantity = computed(() => {
    if (!product.value) return 0;
    return cartStore.getProductQuantity(product.value.id);
});

</script>

<template>
    <div v-if="product" class="details">
        <img :src="product.image" :alt="product.title" />

        <div class="info">
            <h1>{{ product.title }}</h1>

            <p class="price">${{ product.price }}</p>
            <p v-if="existingQuantity > 0">
                Already in cart: {{ existingQuantity }}
            </p>
            <p class="description">
                {{ product.description }}
            </p>

            <!-- STOCK INFO -->
            <p v-if="product.stock > 0 && product.stock < 5" class="low-stock">
                Only {{ product.stock }} left in stock!
            </p>

            <p v-if="product.stock === 0" class="out">
                Out of stock
            </p>

            <!-- QUANTITY SELECTOR -->
            <div class="quantity">
                <button @click="decrease">-</button>
                <span>{{ quantity }}</span>
                <button @click="increase">+</button>
            </div>

            <button class="add" :disabled="product.stock === 0" @click="handleAdd">
                Add to Cart
            </button>
        </div>
    </div>

    <div v-else class="not-found">
        <p>Product not found.</p>
    </div>
</template>

<style scoped lang="scss">
.details {
    display: flex;
    gap: 40px;
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;

    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
    }

    .info {
        flex: 1;
    }

    h1 {
        margin-bottom: 16px;
    }

    .price {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .description {
        margin-bottom: 20px;
        color: #666;
    }

    .low-stock {
        color: #f39c12;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .out {
        color: crimson;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;

        button {
            width: 34px;
            height: 34px;
            border: none;
            background: #eee;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
        }

        span {
            min-width: 24px;
            text-align: center;
            font-weight: 600;
        }
    }

    .add {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        background: #111;
        color: white;
        cursor: pointer;
        font-weight: 600;

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}
</style>
