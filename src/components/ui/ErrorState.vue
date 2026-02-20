<script setup lang="ts">
defineProps<{
    message: string;
    onRetry?: () => void;
}>();
</script>

<template>
    <div class="error-container">
        <div class="icon">⚠️</div>

        <h2>Something went wrong</h2>

        <p>{{ message }}</p>

        <button v-if="onRetry" @click="onRetry">
            Retry
        </button>
    </div>
</template>

<style scoped lang="scss">
.error-container {
    text-align: center;
    padding: 60px 20px;
    max-width: 500px;
    margin: 0 auto;
}

.icon {
    font-size: 42px;
    margin-bottom: 16px;
}

h2 {
    margin-bottom: 12px;
}

p {
    color: #666;
    margin-bottom: 20px;
}

button {
    padding: 10px 18px;
    border: none;
    border-radius: 8px;
    background: #111;
    color: white;
    cursor: pointer;

    &:hover {
        background: #333;
    }
}
</style>