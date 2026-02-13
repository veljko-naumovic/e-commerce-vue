<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const auth = useAuthStore();

const handleLogin = () => {
    const success = auth.login(email.value, password.value);

    if (!success) {
        error.value = "Invalid credentials";
        return;
    }

    router.push("/admin");
}
</script>

<template>
    <div class="login">
        <h1>Admin Login</h1>

        <input v-model="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />

        <button @click="handleLogin">Login</button>

        <p v-if="error">{{ error }}</p>
    </div>
</template>
