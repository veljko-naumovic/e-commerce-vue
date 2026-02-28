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
    bottom: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 9999;
}

.toast {
    min-width: 240px;
    padding: 14px 18px;
    border-radius: 10px;
    color: white;
    font-size: 14px;
    backdrop-filter: blur(4px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.18);
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

@media (max-width: 480px) {
    .toast-container {
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        bottom: 20px;
        align-items: center;
    }

    .toast {
        width: 90vw;
        max-width: 340px;
    }
}
</style>
