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
* {
    box-sizing: border-box;
}

.success-page {
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px 20px;
    text-align: center;
}

.success-card {
    background: white;
    padding: 40px 50px;
    border-radius: 12px;
    box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
    max-width: 500px;
    width: 100%;
}

.success-page h1 {
    margin-bottom: 16px;
}

.success-page p {
    color: #666;
    margin-bottom: 24px;
}

button {
    padding: 12px 24px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background 0.2s ease;
}

button:hover {
    background: var(--color-primary-hover);
}

@media (max-width: 768px) {
    .success-page {
        padding: 60px 16px;
    }

    .success-page h1 {
        font-size: 22px;
    }

    button {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .success-page {
        padding: 40px 12px;
    }

    .success-page h1 {
        font-size: 20px;
    }
}
</style>