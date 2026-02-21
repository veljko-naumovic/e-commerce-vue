<script setup lang="ts">
import { useUiStore } from "@/stores/ui";
const uiStore = useUiStore();
</script>

<template>
    <Transition name="overlay">
        <div v-if="uiStore.isGlobalLoading" class="overlay">
            <div class="spinner"></div>
        </div>
    </Transition>
</template>

<style scoped>
.overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #ddd;
    border-top: 4px solid #111;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>