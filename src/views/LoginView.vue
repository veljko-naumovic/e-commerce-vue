<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useToastStore } from "@/stores/toast";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const auth = useAuthStore();
const toast = useToastStore();

const handleLogin = () => {
    const success = auth.login(email.value, password.value);

    if (!success) {
        error.value = "Invalid credentials";
        toast.show("Invalid credentials", "error");
        return;
    }

    toast.show("Login successful", "success");
    router.push("/admin");
};
</script>

<template>
    <div class="login-page">
        <div class="login-card">

            <h1>Admin Login</h1>
            <p class="subtitle">
                Access the admin dashboard
            </p>

            <input v-model="email" type="email" placeholder="Email" />

            <input v-model="password" type="password" placeholder="Password" />

            <button @click="handleLogin">
                Login
            </button>

            <p v-if="error" class="error">
                {{ error }}
            </p>

            <div class="hint">
                <small>
                    Demo credentials: admin@test.com / 1234
                </small>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #111, #2c2c2c);
    padding: 20px;
}

.login-card {
    width: 100%;
    max-width: 400px;
    background: white;
    padding: 40px;
    border-radius: 14px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    gap: 16px;
    text-align: center;

    h1 {
        margin-bottom: 5px;
    }

    .subtitle {
        font-size: 14px;
        color: #777;
        margin-bottom: 20px;
    }

    input {
        padding: 12px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 14px;
        transition: all 0.2s ease;

        &:focus {
            outline: none;
            border-color: #111;
        }
    }

    button {
        margin-top: 10px;
        padding: 12px;
        border-radius: 8px;
        border: none;
        background: #111;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.2s ease;

        &:hover {
            background: #333;
        }
    }

    .error {
        color: crimson;
        font-size: 13px;
        margin-top: 5px;
    }

    .hint {
        margin-top: 15px;
        font-size: 12px;
        color: #999;
    }
}
</style>