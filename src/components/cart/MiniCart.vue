<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";

import { useRoute } from "vue-router";

const route = useRoute();


const cartStore = useCartStore();
const router = useRouter();

const items = computed(() => cartStore.items);

const goToCart = () => {
    router.push("/cart");
};

const isCartPage = computed(() => route.path === "/cart");

</script>

<template>
    <div class="mini-cart">
        <h4>Your Cart</h4>

        <div v-if="items.length === 0" class="empty">
            Cart is empty
        </div>

        <div v-else class="items">
            <div v-for="item in items" :key="item.product.id" class="mini-item">
                <img :src="item.product.image" />

                <div class="info">
                    <span class="title">
                        {{ item.product.title }}
                    </span>

                    <span class="qty">
                        {{ item.quantity }} × $
                        {{
                            item.product.discount
                                ? (item.product.price *
                                    (1 - item.product.discount / 100)).toFixed(2)
                                : item.product.price
                        }}
                    </span>
                </div>
            </div>

            <div class="total">
                Total: ${{ cartStore.totalPrice.toFixed(2) }}
            </div>

            <button v-if="!isCartPage" class="go" @click="goToCart">
                Go to Cart
            </button>
        </div>
    </div>

</template>

<style scoped lang="scss">
.mini-cart {
    position: absolute;
    top: 100%;
    right: 0;
    width: 320px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
    padding: 16px;
    z-index: 1000;

    pointer-events: auto;
}

.mini-item {
    display: flex;
    gap: 10px;
    margin-bottom: 12px;

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        font-size: 13px;
    }

    .title {
        font-weight: 600;
    }

    .qty {
        color: #777;
    }
}

.total {
    font-weight: 700;
    margin-top: 10px;
}

.go {
    margin-top: 12px;
    width: 100%;
    padding: 8px;
    border: none;
    border-radius: 6px;
    background: #111;
    color: white;
    cursor: pointer;
}

.empty {
    text-align: center;
    padding: 10px 0;
    color: #777;
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>