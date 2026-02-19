<script setup lang="ts">
import { computed } from "vue";
import { useWishlistStore } from "@/stores/wishlist";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useToastStore } from "@/stores/toast";

const wishlistStore = useWishlistStore();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const toast = useToastStore();

const wishlistProducts = computed(() =>
    wishlistStore.items
        .map(id => productsStore.getProductById(id))
        .filter((p): p is NonNullable<typeof p> => !!p)
);

const moveToCart = (productId: number) => {
    const product = productsStore.getProductById(productId);
    if (!product) return;

    cartStore.addToCart(product);
    wishlistStore.remove(productId);
    toast.show("Moved to cart", "success");
};

</script>

<template>
    <div class="wishlist">
        <h1>Your Wishlist</h1>

        <div v-if="wishlistProducts.length === 0" class="empty">
            <p>No items in wishlist.</p>
            <RouterLink to="/">Go back to shop</RouterLink>
        </div>

        <div v-else class="grid">
            <div v-for="product in wishlistProducts" :key="product.id" class="wishlist-card">
                <img :src="product.image" :alt="product.title" />

                <h3>{{ product.title }}</h3>

                <p>${{ product.price }}</p>

                <div class="actions">
                    <button class="move" @click="moveToCart(product.id)">
                        Move to Cart
                    </button>

                    <button class="remove" @click="wishlistStore.remove(product.id)">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wishlist {
    padding: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
}

.wishlist-card {
    flex: 1 1 260px;
    min-width: 260px;
    max-width: 300px;

    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
    }

    h3 {
        margin: 12px 0;
    }

    .actions {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }

    button {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
    }

    .move {
        background: #111;
        color: white;

        &:hover {
            background: #333;
        }
    }

    .remove {
        background: crimson;
        color: white;

        &:hover {
            background: #b40028;
        }
    }
}

.empty {
    text-align: center;
    margin-top: 40px;
}
</style>
