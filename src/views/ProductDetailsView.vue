<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { useCartStore } from "@/stores/cart";
import { useToastStore } from "@/stores/toast";
import type { Product } from "@/types/product";
import SkeletonDetails from "@/components/ui/SkeletonDetails.vue";

const route = useRoute();
const productsStore = useProductsStore();
const cartStore = useCartStore();
const toast = useToastStore();

const product = ref<Product | null>(null);
const quantity = ref(1);

const existingQuantity = computed(() => {
    if (!product.value) return 0;
    return cartStore.getProductQuantity(product.value.id);
});

watch(
    () => product.value,
    (newProduct) => {
        if (!newProduct) return;

        const existingQty = cartStore.getProductQuantity(newProduct.id);
        quantity.value = existingQty > 0 ? existingQty : 1;
    },
    { immediate: true }
);

// Quantity

const increase = () => {
    if (!product.value) return;

    const existingQty = cartStore.getProductQuantity(product.value.id);
    const total = existingQty + quantity.value;

    if (total >= product.value.stock) {
        toast.show("Maximum stock reached", "error");
        return;
    }

    quantity.value++;
};
const decrease = () => {
    if (quantity.value > 1) {
        quantity.value--;
    }
};

// Add to chart

const handleAdd = () => {
    if (!product.value) return;

    const existingQty = cartStore.getProductQuantity(product.value.id);

    if (existingQty >= product.value.stock) {
        toast.show("No more items available in stock", "error");
        return;
    }

    const total = existingQty + quantity.value;

    if (total > product.value.stock) {
        toast.show("No more items available in stock", "error");
        return;
    }

    cartStore.addToCart(product.value, quantity.value);
    toast.show(
        `${quantity.value} x ${product.value.title} added to cart`,
        "success"
    );
    quantity.value = 1;
};

const loadProduct = async (id: string) => {
    product.value = await productsStore.fetchProductById(id);
};

watch(
    () => route.params.id,
    (newId) => {
        if (typeof newId === "string") {
            loadProduct(newId);
        }
    },
    { immediate: true }
);
</script>

<template>
    <Transition name="fade" mode="out-in">
        <div :key="productsStore.isDetailsLoading ? 'loading' : 'content'">
            <SkeletonDetails v-if="productsStore.isDetailsLoading" />
            <div v-else-if="product" class="details">
                <img :src="product.image" :alt="product.title" />
                <div class="info">
                    <h1>{{ product.title }}</h1>
                    <div class="price-wrapper">
                        <template v-if="product.discount">
                            <span class="discount-badge">
                                -{{ product.discount }}%
                            </span>
                            <span class="old-price">
                                ${{ product.price.toFixed(2) }}
                            </span>
                            <span class="price discounted">
                                ${{ (product.price * (1 - product.discount / 100)).toFixed(2) }}
                            </span>
                            <span class="save">
                                You save $
                                {{
                                    (product.price * (product.discount / 100)).toFixed(2)
                                }}
                            </span>
                        </template>
                        <template v-else>
                            <span class="price">
                                ${{ product.price.toFixed(2) }}
                            </span>
                        </template>
                    </div>
                    <p v-if="existingQuantity > 0">
                        Already in cart: {{ existingQuantity }}
                    </p>
                    <p class="description">
                        {{ product.description }}
                    </p>
                    <p v-if="product.stock > 0 && product.stock < 5" class="low-stock">
                        Only {{ product.stock }} left in stock!
                    </p>
                    <p v-if="product.stock === 0" class="out">
                        Out of stock
                    </p>
                    <div class="quantity">
                        <button @click="decrease">-</button>
                        <span>{{ quantity }}</span>
                        <button @click="increase">+</button>
                    </div>
                    <button class="add" :disabled="product.stock === 0" @click="handleAdd">
                        Add to Cart
                    </button>
                </div>
            </div>
            <div v-else class="not-found">
                <p>Product not found.</p>
            </div>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.details {
    display: flex;
    gap: 40px;
    padding: 40px 20px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;

    img {
        width: 400px;
        height: 400px;
        object-fit: cover;
        border-radius: 12px;
        flex-shrink: 0;
    }

    .info {
        flex: 1;
        min-width: 0;
    }

    h1 {
        margin-bottom: 16px;
    }

    .price-wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 12px;
        margin-bottom: 20px;

        .discount-badge {
            background: #e74c3c;
            color: white;
            font-size: 13px;
            font-weight: 600;
            padding: 4px 8px;
            border-radius: 6px;
        }

        .old-price {
            font-size: 18px;
            text-decoration: line-through;
            color: #999;
        }

        .price {
            font-size: 28px;
            font-weight: 700;
            color: #111;

            &.discounted {
                color: #e74c3c;
            }
        }

        .save {
            width: 100%;
            font-size: 14px;
            color: #2ecc71;
            font-weight: 500;
        }
    }

    .description {
        margin-bottom: 20px;
        color: #666;
        line-height: 1.6;
    }

    .low-stock {
        color: #f39c12;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .out {
        color: crimson;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .quantity {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 20px;

        button {
            width: 34px;
            height: 34px;
            border: none;
            background: #eee;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
        }

        span {
            min-width: 24px;
            text-align: center;
            font-weight: 600;
        }
    }

    .add {
        padding: 12px 24px;
        border: none;
        border-radius: 8px;
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

@media (max-width: 992px) {
    .details {
        gap: 24px;

        img {
            width: 320px;
            height: 320px;
        }
    }
}

@media (max-width: 768px) {

    .details {
        flex-direction: column;
        padding: 20px 16px;
    }

    .details img {
        width: 100%;
        height: auto;
        max-height: 400px;
    }

    .details .quantity {
        gap: 16px;
    }

    .details .add {
        width: 100%;
    }
}

@media (max-width: 480px) {

    .details {
        padding: 16px 12px;
    }

    h1 {
        font-size: 22px;
    }

    .price {
        font-size: 20px;
    }

    .details img {
        max-height: 300px;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}
</style>