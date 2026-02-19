<script setup lang="ts">
import { useToastStore } from "@/stores/toast";

const toastStore = useToastStore();
</script>

<template>
    <div class="toast-container">
        <div v-for="toast in toastStore.toasts" :key="toast.id" :class="['toast', toast.type]">
            {{ toast.message }}
        </div>
    </div>
</template>

<style scoped lang="scss">
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 9999;
}

.toast {
    min-width: 220px;
    padding: 12px 16px;
    border-radius: 8px;
    color: white;
    font-size: 14px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
    animation: slideIn 0.25s ease;
}

.toast.success {
    background: #2ecc71;
}

.toast.error {
    background: #e74c3c;
}

.toast.info {
    background: #3498db;
}

@keyframes slideIn {
    from {
        transform: translateX(20px);
        opacity: 0;
    }

    to {
        transform: translateX(0);
        opacity: 1;
    }
}
</style>
