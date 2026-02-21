<script setup lang="ts">
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";

const cartStore = useCartStore();
const router = useRouter();
const toast = useToastStore();

const increase = (id: number) => {
    const item = cartStore.items.find(i => i.product.id === id);
    if (!item) return;

    cartStore.updateQuantity(id, item.quantity + 1);
};

const decrease = (id: number) => {
    const item = cartStore.items.find(i => i.product.id === id);
    if (!item) return;

    cartStore.updateQuantity(id, item.quantity - 1);
};

const remove = (id: number) => {
    cartStore.removeFromCart(id);
    toast.show("Item removed from cart", "info");
};

const checkout = () => {
    toast.show("Checkout not implemented (demo)", "info");
};
</script>

<template>
    <div class="cart-page">

        <h1>Your Cart</h1>

        <div v-if="cartStore.items.length === 0" class="empty">
            <p>Your cart is empty.</p>
            <button @click="router.push('/')">
                Go Shopping
            </button>
        </div>

        <div v-else class="cart-layout">

            <!-- LEFT: ITEMS -->
            <div class="cart-items">
                <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
                    <img :src="item.product.image" />

                    <div class="info">
                        <h3>{{ item.product.title }}</h3>

                        <p class="price">
                            $
                            {{
                                item.product.discount
                                    ? (item.product.price *
                                        (1 - item.product.discount / 100)).toFixed(2)
                                    : item.product.price
                            }}
                        </p>

                        <div class="quantity">
                            <button @click="decrease(item.product.id)">-</button>
                            <span>{{ item.quantity }}</span>
                            <button @click="increase(item.product.id)">+</button>
                        </div>

                        <button class="remove" @click="remove(item.product.id)">
                            Remove
                        </button>
                    </div>

                    <div class="subtotal">
                        $
                        {{
                            (
                                (item.product.discount
                                    ? item.product.price *
                                    (1 - item.product.discount / 100)
                                    : item.product.price) *
                                item.quantity
                        ).toFixed(2)
                        }}
                    </div>
                </div>
            </div>

            <!-- RIGHT: SUMMARY -->
            <div class="cart-summary">
                <h2>Order Summary</h2>

                <div class="summary-row">
                    <span>Items</span>
                    <span>{{ cartStore.totalItems }}</span>
                </div>

                <div class="summary-row">
                    <span>Total</span>
                    <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
                </div>

                <button class="checkout" @click="checkout">
                    Proceed to Checkout
                </button>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.cart-page {
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;

    h1 {
        margin-bottom: 30px;
    }
}

.empty {
    text-align: center;
    padding: 60px 0;

    button {
        margin-top: 20px;
        padding: 10px 20px;
        background: #111;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
    }
}

.cart-layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;
}

.cart-items {
    flex: 2;
}

.cart-item {
    display: flex;
    gap: 20px;
    align-items: center;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
        border-radius: 8px;
    }

    .info {
        flex: 1;
    }

    h3 {
        margin-bottom: 8px;
    }

    .price {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;

        button {
            width: 30px;
            height: 30px;
            border: none;
            background: #eee;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
        }
    }

    .remove {
        background: none;
        border: none;
        color: crimson;
        cursor: pointer;
        font-size: 13px;
    }

    .subtotal {
        font-weight: 700;
        font-size: 16px;
    }
}

.cart-summary {
    flex: 1;
    position: sticky;
    top: 100px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    h2 {
        margin-bottom: 20px;
    }

    .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-weight: 500;
    }

    .checkout {
        margin-top: 20px;
        width: 100%;
        padding: 12px;
        background: #111;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 600;
    }
}
</style>