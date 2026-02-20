<!-- <script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useToastStore } from "@/stores/toast";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const toast = useToastStore()

const productId = Number(route.params.id);

const product = computed(() =>
    productsStore.getProductById(productId)
);

const handleAdd = () => {
    if (product.value && product.value.stock > 0) {
        toast.show("Product added to cart", "success");
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
</style> -->

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

// const quantity = ref(1);

// const increase = () => {
//     if (product.value && quantity.value < product.value.stock) {
//         quantity.value++;
//     }
// };

// const decrease = () => {
//     if (quantity.value > 1) {
//         quantity.value--;
//     }
// };

// const handleAdd = () => {
//     if (!product.value) return;

//     if (product.value.stock === 0) {
//         toast.show("Product is out of stock", "error");
//         return;
//     }

//     cartStore.addToCart(product.value, quantity.value);

//     toast.show(
//         `${quantity.value} x ${product.value.title} added to cart`,
//         "success"
//     );

//     quantity.value = 1;
// };

const quantity = ref(1);

// Kada se učita proizvod
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
</script>

<template>
    <div v-if="product" class="details">
        <img :src="product.image" :alt="product.title" />

        <div class="info">
            <h1>{{ product.title }}</h1>

            <p class="price">${{ product.price }}</p>
            <p v-if="cartStore.getProductQuantity(product.id) > 0">
                Already in cart: {{ cartStore.getProductQuantity(product.id) }}
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
