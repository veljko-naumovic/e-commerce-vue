<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <div class="success-page">
        <h1>🎉 Order Successful!</h1>
        <p>Your order has been placed successfully.</p>

        <button @click="router.push('/')">
            Back to Shop
        </button>
    </div>
</template>

<style scoped>
.success-page {
    text-align: center;
    padding: 100px 20px;
}

button {
    margin-top: 20px;
    padding: 10px 20px;
    background: #111;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}
</style>