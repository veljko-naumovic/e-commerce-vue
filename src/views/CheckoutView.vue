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

    // fake delay
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

            <!-- LEFT: FORM -->
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

            <!-- RIGHT: SUMMARY -->
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
.checkout-page {
    max-width: 1100px;
    margin: 0 auto;
    padding: 40px 20px;
}

.checkout-layout {
    display: flex;
    gap: 40px;
}

.checkout-form {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 14px;

    input {
        padding: 10px;
        border-radius: 6px;
        border: 1px solid #ddd;
    }

    button {
        margin-top: 10px;
        padding: 12px;
        border: none;
        border-radius: 6px;
        background: #111;
        color: white;
        cursor: pointer;

        &:disabled {
            background: #aaa;
            cursor: not-allowed;
        }
    }
}

.checkout-summary {
    flex: 1;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.06);

    .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .summary-total {
        margin-top: 20px;
        font-weight: 700;
    }
}
</style>