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

const moveToCart = async (productId: string) => {
    const product = await productsStore.fetchProductById(productId);
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
* {
    box-sizing: border-box;
}

.wishlist {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    h1 {
        margin-bottom: 30px;
    }
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
}

.wishlist-card {
    background: white;
    padding: 16px;
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;

    &:hover {
        transform: translateY(-4px);
    }

    img {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius: 8px;
    }

    h3 {
        margin: 12px 0;
        font-size: 16px;
    }

    p {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .actions {
        display: flex;
        gap: 10px;
        margin-top: auto;
    }

    button {
        flex: 1;
        padding: 10px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.2s ease;
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

@media (max-width: 992px) {
    .wishlist {
        padding: 30px 20px;
    }
}

@media (max-width: 768px) {

    .wishlist {
        padding: 20px 16px;
    }

    .grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }

    .wishlist-card img {
        height: 160px;
    }
}

@media (max-width: 480px) {

    .wishlist {
        padding: 16px 12px;
    }

    .grid {
        grid-template-columns: 1fr;
    }

    .wishlist-card img {
        height: 200px;
    }

    .wishlist-card button {
        font-size: 15px;
    }
}
</style>