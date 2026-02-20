<script setup lang="ts">
import type { Product } from "@/types/product";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useToastStore } from "@/stores/toast";
import { ref } from "vue";

const wishlistStore = useWishlistStore();

const props = defineProps<{
    product: Product;
}>();

const router = useRouter();
const cartStore = useCartStore();
const toast = useToastStore()

const goToDetails = () => {
    router.push(`/product/${props.product.id}`);
};

const toggleWishlist = () => {
    wishlistStore.toggle(props.product.id);
};

const quantity = ref(1);

const increase = () => {
    if (quantity.value < props.product.stock) {
        quantity.value++;
    }
};

const decrease = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

const handleAdd = () => {
    if (props.product.stock === 0) {
        toast.show("Product is out of stock", "error");
        return;
    }

    cartStore.addToCart(props.product, quantity.value);
    toast.show(
        `${quantity.value} x ${props.product.title} added to cart`,
        "success"
    );

    quantity.value = 1;
};
</script>

<template>
    <div class="card">
        <div class="image-wrapper">
            <!-- DISCOUNT BADGE -->
            <span v-if="product.discount" class="badge discount">
                -{{ product.discount }}%
            </span>

            <button class="wishlist" @click.stop="toggleWishlist">
                <span :class="[
                    'heart',
                    wishlistStore.isInWishlist(product.id) ? 'active' : '']">
                    ♥
                </span>
            </button>

            <!-- LOW STOCK BADGE -->
            <span v-if="product.stock === 0" class="badge out">
                Out of stock
            </span>
            <span v-else-if="product.stock > 0 && product.stock < 5" class="badge low">
                Low Stock
            </span>

            <img :src="product.image" :alt="product.title" @click="goToDetails" />
        </div>

        <h3 @click="goToDetails">
            {{ product.title }}
        </h3>

        <p>{{ product.description }}</p>

        <div class="price-wrapper">
            <span v-if="product.discount" class="save">
                Save $
                {{
                    (product.price * (product.discount / 100)).toFixed(2)
                }}
            </span>

            <span :class="['price', { discounted: product.discount }]">
                ${{
                    product.discount
                        ? (product.price * (1 - product.discount / 100)).toFixed(2)
                        : product.price
                }}
            </span>
        </div>
        <div class="bottom">
            <div class="quantity">
                <button @click="decrease">-</button>
                <span>{{ quantity }}</span>
                <button @click="increase">+</button>
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

    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
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
    margin: 0 16px 12px;
    display: flex;
    align-items: center;
    gap: 8px;
}

.old-price {
    font-size: 13px;
    text-decoration: line-through;
    color: #888;
}

.price.discounted {
    color: #e74c3c;
}

.price {
    font-weight: 700;
    font-size: 18px;
    color: #e74c3c;
}

.save {
    font-size: 12px;
    color: #2ecc71;
}

/* WISHLIST */

.wishlist {
    position: absolute;
    top: 12px;
    left: 12px;
    background: white;
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.15s ease;

    &:hover {
        transform: scale(1.1);
    }
}

.heart {
    font-size: 16px;
    color: #aaa;
    transition: color 0.2s ease;
}

.heart.active {
    color: crimson;
}

.quantity {
    display: flex;
    align-items: center;
    gap: 8px;

    button {
        width: 28px;
        height: 28px;
        border: none;
        background: #eee;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }

    span {
        min-width: 20px;
        text-align: center;
        font-weight: 600;
    }
}
</style>
