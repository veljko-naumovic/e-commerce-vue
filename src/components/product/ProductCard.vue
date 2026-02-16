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
        <div class="image-wrapper">
            <!-- DISCOUNT BADGE -->
            <span v-if="product.discount" class="badge discount">
                -{{ product.discount }}%
            </span>

            <!-- LOW STOCK BADGE -->
            <span v-else-if="product.stock > 0 && product.stock < 5" class="badge low">
                Low Stock
            </span>

            <!-- OUT OF STOCK -->
            <span v-else-if="product.stock === 0" class="badge out">
                Out of Stock
            </span>

            <img :src="product.image" :alt="product.title" @click="goToDetails" />
        </div>

        <h3 @click="goToDetails">
            {{ product.title }}
        </h3>

        <p>{{ product.description }}</p>

        <div class="bottom">
            <div class="price-wrapper">
                <span v-if="product.discount" class="old-price">
                    ${{ product.price }}
                </span>

                <span class="price">
                    ${{
                        product.discount
                            ? (product.price * (1 - product.discount / 100)).toFixed(2)
                            : product.price
                    }}
                </span>
            </div>

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
}

/* IMAGE WRAPPER */

img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    cursor: pointer;
}

/* STOCK BADGE */

.badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    color: white;
}

.badge.in {
    background: #2ecc71;
    /* green */
}

.badge.out {
    background: crimson;
}

/* CONTENT */

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

.image-wrapper {
    position: relative;
}

/* BADGES */

.badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 10px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 20px;
    color: white;
}

/* DISCOUNT */
.badge.discount {
    background: #e74c3c;
}

/* LOW STOCK */
.badge.low {
    background: #f39c12;
}

/* OUT OF STOCK */
.badge.out {
    background: crimson;
}

/* PRICE WRAPPER */

.price-wrapper {
    display: flex;
    flex-direction: column;
}

.old-price {
    font-size: 13px;
    text-decoration: line-through;
    color: #888;
}

.price {
    font-weight: 700;
    font-size: 16px;
}
</style>
