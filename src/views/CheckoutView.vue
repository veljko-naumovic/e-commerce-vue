<script setup lang="ts">
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import { useToastStore } from "@/stores/toast";

const cartStore = useCartStore();
const router = useRouter();
const toast = useToastStore();

const name = ref("");
const email = ref("");
const address = ref("");
const city = ref("");
const postal = ref("");

const isSubmitting = ref(false);

const isValid = computed(() =>
    name.value &&
    email.value &&
    address.value &&
    city.value &&
    postal.value &&
    cartStore.items.length > 0
);

const submitOrder = async () => {
    if (!isValid.value) return;

    isSubmitting.value = true;

    await new Promise(res => setTimeout(res, 1200));

    cartStore.items = [];
    localStorage.removeItem("cart");
    toast.show("Order placed successfully!", "success");
    router.push("/success");
};
</script>

<template>
    <div class="checkout-page">

        <h1>Checkout</h1>

        <div class="checkout-layout">
            <div class="checkout-form">
                <h2>Billing Information</h2>
                <input v-model="name" placeholder="Full Name" />
                <input v-model="email" placeholder="Email" />
                <input v-model="address" placeholder="Address" />
                <input v-model="city" placeholder="City" />
                <input v-model="postal" placeholder="Postal Code" />
                <button :disabled="!isValid || isSubmitting" @click="submitOrder">
                    {{ isSubmitting ? "Processing..." : "Place Order" }}
                </button>
            </div>
            <div class="checkout-summary">
                <h2>Order Summary</h2>
                <div v-for="item in cartStore.items" :key="item.product.id" class="summary-item">
                    <span>{{ item.product.title }}</span>
                    <span>x{{ item.quantity }}</span>
                </div>
                <div class="summary-total">
                    Total: ${{ cartStore.totalPrice.toFixed(2) }}
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.checkout-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
    width: 100%;

    h1 {
        margin-bottom: 30px;
    }
}

.checkout-layout {
    display: flex;
    gap: 40px;
    align-items: flex-start;
    width: 100%;
}

.checkout-form,
.checkout-summary {
    min-width: 0;
}

.checkout-form {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 14px;
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    h2 {
        margin-bottom: 10px;
    }

    input {
        width: 100%;
        padding: 12px;
        border-radius: 6px;
        border: 1px solid #ddd;
        font-size: 14px;
        transition: border 0.2s ease;

        &:focus {
            outline: none;
            border-color: #111;
        }
    }

    button {
        width: 100%;
        margin-top: 10px;
        padding: 14px;
        border: none;
        border-radius: 6px;
        background: #111;
        color: white;
        cursor: pointer;
        font-weight: 600;
        transition: background 0.2s ease;

        &:hover {
            background: #333;
        }

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}

.checkout-summary {
    flex: 1;
    background: white;
    padding: 24px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
    position: sticky;
    top: 100px;

    h2 {
        margin-bottom: 16px;
    }

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-size: 14px;
    }

    .summary-total {
        margin-top: 20px;
        font-weight: 700;
        font-size: 16px;
        border-top: 1px solid #eee;
        padding-top: 12px;
    }
}

@media (max-width: 992px) {
    .checkout-layout {
        gap: 24px;
    }

    .checkout-page {
        padding: 30px 20px;
    }
}

@media (max-width: 768px) {

    .checkout-page {
        padding: 20px 16px;
    }

    .checkout-layout {
        flex-direction: column;
        gap: 20px;
    }

    .checkout-form,
    .checkout-summary {
        width: 100%;
        max-width: 100%;
    }

    .checkout-summary {
        position: static;
    }
}

@media (max-width: 480px) {

    .checkout-page {
        padding: 16px 12px;
    }

    h1 {
        font-size: 22px;
    }

    .checkout-form,
    .checkout-summary {
        padding: 18px;
    }
}
</style>