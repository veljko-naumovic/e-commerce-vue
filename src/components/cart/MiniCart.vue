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
        <div v-else>
            <!-- Scrollable products -->
            <div class="items">
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
                        <span class="subtotal">
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
                        </span>
                    </div>
                </div>
            </div>
            <!-- Fixed total -->
            <div class="cart-total">
                <span class="total">Total</span>
                <span class="amount">
                    ${{ cartStore.totalPrice.toFixed(2) }}
                </span>
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
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    padding: 16px;
    z-index: 1000;

    display: flex;
    flex-direction: column;
    max-height: 420px;

    h4 {
        margin-bottom: 12px;
        font-size: 15px;
        font-weight: 600;
        flex-shrink: 0;
        color: var(--color-primary);
    }
}

/* Scrollable product list */
.items {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
}

/* Product */
.mini-item {
    display: flex;
    gap: 10px;
    padding: 10px 0;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    transition: background 0.2s ease;

    &:hover {
        background: #f9f9f9;
    }

    img {
        width: 50px;
        height: 50px;
        object-fit: cover;
        border-radius: 6px;
        flex-shrink: 0;
    }

    .info {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }

    .title {
        font-weight: 600;
        font-size: 13px;
        color: var(--color-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .qty {
        font-size: 12px;
        color: #777;
        margin-top: 2px;
    }

    .subtotal {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-primary);
        margin-top: 2px;
    }
}

/* Total */
.cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    border-top: 2px solid #eaeaea;
    background: #fafafa;
    padding: 14px 0 0;
    font-size: 15px;
    font-weight: 700;
    flex-shrink: 0;

    .amount,
    .total {
        font-size: 16px;
        color: var(--color-primary);
    }

}

/* Button */
.go {
    margin-top: 12px;
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: var(--color-primary);
    color: white;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s ease;
    flex-shrink: 0;

    &:hover {
        background: var(--color-primary-hover);
    }
}

.empty {
    text-align: center;
    padding: 12px 0;
    color: #777;
    font-size: 14px;
}
</style>