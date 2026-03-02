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
    const existingQty = cartStore.getProductQuantity(props.product.id);
    const total = existingQty + quantity.value;

    if (total >= props.product.stock) {
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

const handleAdd = () => {
    const existingQty = cartStore.getProductQuantity(props.product.id);

    if (existingQty >= props.product.stock) {
        toast.show("No more items available in stock", "error");
        return;
    }

    const total = existingQty + quantity.value;

    if (total > props.product.stock) {
        toast.show("No more items available in stock", "error");
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
            <!-- Discount badge -->
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
            <!-- Loe stock badge -->
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
            <template v-if="product.discount">
                <span class="old-price">
                    ${{ product.price.toFixed(2) }}
                </span>

                <span class="price discounted">
                    ${{ (product.price * (1 - product.discount / 100)).toFixed(2) }}
                </span>
            </template>
            <template v-else>
                <span class="price">
                    ${{ product.price.toFixed(2) }}
                </span>
            </template>
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

    background: var(--color-surface);
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
    }

    .image-wrapper {
        position: relative;
        overflow: hidden;

        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.3s ease;
            z-index: 1;

            &:hover {
                transform: scale(1.05);
            }
        }

        .badge {
            position: absolute;
            top: 12px;
            right: 12px;
            padding: 6px 12px;
            font-size: 11px;
            font-weight: 600;
            border-radius: 999px;
            color: white;
            letter-spacing: 0.4px;
            overflow: hidden;
            z-index: 2;

            &.discount {
                background: var(--color-danger);
            }

            &.low {
                background: var(--color-warning);
            }

            &.out {
                background: var(--color-danger);
            }
        }

        .wishlist {
            position: absolute;
            top: 12px;
            left: 12px;
            background: white;
            border: 1px solid var(--border-color);
            border-radius: 50%;
            width: 36px;
            height: 36px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 2;

            &:hover {
                background: #f9fafb;
                transform: scale(1.05);
            }

            .heart {
                font-size: 16px;
                color: #bbb;
                transition: color 0.2s ease;

                &.active {
                    color: var(--color-danger);
                }
            }
        }
    }

    h3 {
        margin: 18px 16px 8px;
        font-size: 17px;
        font-weight: 600;
        color: var(--color-text);
        cursor: pointer;
    }

    p {
        margin: 0 16px 16px;
        font-size: 14px;
        color: var(--color-text-light);

        display: -webkit-box;
        line-clamp: 2;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .price-wrapper {
        margin: 0 16px 16px;
        display: flex;
        align-items: center;
        gap: 8px;

        .old-price {
            font-size: 13px;
            text-decoration: line-through;
            color: #9ca3af;
        }

        .price {
            font-weight: 700;
            font-size: 20px;
            color: var(--color-primary);

            &.discounted {
                color: var(--color-danger);
            }
        }
    }

    .bottom {
        margin-top: auto;
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;

        button {
            padding: 8px 16px;
            border: none;
            border-radius: 8px;
            background: var(--color-primary);
            color: white;
            cursor: pointer;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.2s ease;

            &:hover {
                background: var(--color-primary-hover);
                transform: translateY(-1px);
            }

            &:disabled {
                background: #d1d5db;
                cursor: not-allowed;
            }
        }
    }

    .quantity {
        display: inline-flex;
        align-items: center;
        background: #f3f4f6;
        border-radius: 999px;
        padding: 4px;

        button {
            width: 30px;
            height: 30px;
            border: none;
            background: white;
            border-radius: 50%;
            font-size: 16px;
            font-weight: 600;
            color: var(--color-primary);
            cursor: pointer;
            transition: background 0.2s ease;

            &:hover {
                background: #e5e7eb;
            }
        }

        span {
            min-width: 22px;
            text-align: center;
            font-weight: 600;
            font-size: 14px;
            color: var(--color-text);
        }
    }
}
</style>
