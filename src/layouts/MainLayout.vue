<script setup lang="ts">
import Header from "@/components/layout/Header.vue";
</script>

<template>
    <div class="layout">
        <Header />
        <main class="container">
            <router-view />
        </main>
    </div>
</template>
