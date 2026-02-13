<script setup lang="ts">
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
</script>

<template>
    <div class="cart">
        <h1>Your Cart</h1>

        <!-- EMPTY STATE -->
        <div v-if="cartStore.items.length === 0" class="empty">
            <p>Your cart is empty.</p>
            <RouterLink to="/">Go back to shop</RouterLink>
        </div>

        <!-- CART ITEMS -->
        <div v-else>
            <div v-for="item in cartStore.items" :key="item.product.id" class="cart-item">
                <img :src="item.product.image" :alt="item.product.title" />

                <div class="info">
                    <h3>{{ item.product.title }}</h3>
                    <p>${{ item.product.price }}</p>
                </div>

                <!-- QUANTITY -->
                <div class="quantity">
                    <button @click="
                        cartStore.updateQuantity(
                            item.product.id,
                            item.quantity - 1
                        )
                        ">
                        -
                    </button>

                    <span>{{ item.quantity }}</span>

                    <button @click="
                        cartStore.updateQuantity(
                            item.product.id,
                            item.quantity + 1
                        )
                        ">
                        +
                    </button>
                </div>

                <!-- SUBTOTAL -->
                <div class="subtotal">
                    ${{ item.product.price * item.quantity }}
                </div>

                <!-- REMOVE -->
                <button class="remove" @click="cartStore.removeFromCart(item.product.id)">
                    Remove
                </button>
            </div>

            <!-- TOTAL -->
            <div class="summary">
                <h2>Total: ${{ cartStore.totalPrice }}</h2>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cart {
    padding: 24px;
}

.cart-item {
    display: grid;
    grid-template-columns: 100px 1fr 150px 120px 100px;
    align-items: center;
    gap: 16px;
    border-bottom: 1px solid #ddd;
    padding: 16px 0;

    img {
        width: 100px;
        height: 100px;
        object-fit: cover;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 8px;

        button {
            width: 28px;
            height: 28px;
            border: 1px solid #ccc;
            background: white;
            cursor: pointer;
        }
    }

    .remove {
        background: crimson;
        color: white;
        border: none;
        padding: 6px 10px;
        cursor: pointer;
        border-radius: 4px;
    }
}

.summary {
    margin-top: 24px;
    text-align: right;
}

.empty {
    text-align: center;
    margin-top: 40px;
}
</style>
