<script setup lang="ts">
import ToastContainer from "@/components/ui/ToastContainer.vue";
import GlobalLoading from "./components/ui/GlobalLoading.vue";
</script>

<template>
  <RouterView />
  <ToastContainer />
  <GlobalLoading />
</template>
