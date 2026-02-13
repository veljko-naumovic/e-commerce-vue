<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
// cart store ćemo dodati kasnije

const router = useRouter();
const auth = useAuthStore();

// privremeni fake broj
const cartCount = computed(() => 0);

const logout = () => {
    auth.logout();
    router.push("/");
}
</script>

<template>
    <header class="header">
        <div class="logo" @click="$router.push('/')">
            VueCommerce
        </div>

        <nav>
            <RouterLink to="/">Shop</RouterLink>
            <RouterLink to="/cart">
                Cart ({{ cartCount }})
            </RouterLink>

            <RouterLink v-if="auth.isAuthenticated" to="/admin">
                Admin
            </RouterLink>
        </nav>

        <div>
            <RouterLink v-if="!auth.isAuthenticated" to="/login">
                Login
            </RouterLink>

            <button v-else @click="logout">
                Logout
            </button>
        </div>
    </header>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: #111;
    color: white;

    nav {
        display: flex;
        gap: 20px;
    }

    a {
        color: white;
        text-decoration: none;
    }

    button {
        background: crimson;
        border: none;
        padding: 6px 12px;
        color: white;
        cursor: pointer;
    }
}
</style>
