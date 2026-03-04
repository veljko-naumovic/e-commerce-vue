<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useRoute } from "vue-router";
import { useWishlistStore } from "@/stores/wishlist";
import MiniCart from "@/components/cart/MiniCart.vue";

const router = useRouter();
const auth = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const isMenuOpen = ref(false);

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
    isMenuOpen.value = false;
};

/* Close on route change */
watch(() => router.currentRoute.value.fullPath, () => {
    closeMenu();
});

const showMiniCart = ref(false);

const handleEnter = () => {
    if (isCartPage.value) return;

    if (window.innerWidth > 768) {
        showMiniCart.value = true;
    }
};

const handleLeave = () => {
    showMiniCart.value = false;
};

const logout = () => {
    auth.logout();
    router.push("/");
};

const route = useRoute();

const isCartPage = computed(() => route.path === "/cart");

</script>

<template>
    <header class="header">
        <!-- Left -->
        <div class="left">
            <div class="logo" @click="$router.push('/')">
                E-Commerce
            </div>
        </div>

        <!-- Desktop nav -->
        <nav class="desktop-nav">
            <RouterLink to="/">Shop</RouterLink>

            <div class="cart-wrapper" @mouseenter="handleEnter" @mouseleave="handleLeave">
                <RouterLink to="/cart">
                    Cart ({{ cartStore.totalItems }})
                </RouterLink>

                <Transition name="dropdown">
                    <MiniCart v-if="showMiniCart && !isCartPage" />
                </Transition>
            </div>

            <RouterLink to="/wishlist">
                ❤️ {{ wishlistStore.items.length }}
            </RouterLink>

            <RouterLink v-if="auth.isAuthenticated" to="/admin">
                Admin
            </RouterLink>

            <RouterLink v-if="!auth.isAuthenticated" to="/login">
                Login
            </RouterLink>

            <button v-else @click="logout">
                Logout
            </button>
        </nav>
        <!-- Right (mobile icons) -->
        <div class="mobile-icons">

            <RouterLink to="/wishlist" class="icon">
                ❤️ {{ wishlistStore.items.length }}
            </RouterLink>

            <RouterLink to="/cart" class="icon">
                🛒 {{ cartStore.totalItems }}
            </RouterLink>

            <div class="burger" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <!-- Overlay -->
    <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>

    <!-- Drawer -->
    <Transition name="slide">
        <div v-if="isMenuOpen" class="drawer">
            <RouterLink to="/" @click="closeMenu">Shop</RouterLink>
            <RouterLink v-if="auth.isAuthenticated" to="/admin" @click="closeMenu">
                Admin
            </RouterLink>
            <RouterLink v-if="!auth.isAuthenticated" to="/login" @click="closeMenu">
                Login
            </RouterLink>
            <button v-else @click="logout">
                Logout
            </button>
        </div>
    </Transition>
</template>

<style scoped lang="scss">
* {
    box-sizing: border-box;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 24px;
    background: var(--color-primary);
    color: white;
    position: relative;

    .logo {
        font-weight: 700;
        font-size: 18px;
        cursor: pointer;
        letter-spacing: 0.5px;
    }
}

.desktop-nav {
    display: flex;
    align-items: center;
    gap: 24px;

    a {
        color: white;
        text-decoration: none;
        font-size: 14px;
        position: relative;
        transition: opacity 0.2s ease;

        &:hover {
            opacity: 0.7;
        }

        &.router-link-active {
            font-weight: 600;
        }
    }

    button {
        background: var(--color-danger);
        border: none;
        padding: 6px 12px;
        color: white;
        cursor: pointer;
        border-radius: 6px;
        transition: background 0.2s ease;

        &:hover {
            background: #b40028;
        }
    }
}

// Mini Cart

.cart-wrapper {
    position: relative;
}

// Moblie icons

.mobile-icons {
    display: none;
    align-items: center;
    gap: 16px;

    .icon {
        color: white;
        text-decoration: none;
        font-size: 14px;
    }
}

// Burger

.burger {
    display: flex;
    flex-direction: column;
    gap: 4px;
    cursor: pointer;

    span {
        width: 22px;
        height: 2px;
        background: white;
        transition: all 0.2s ease;
    }
}

// Drawer

.drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 260px;
    height: 100%;
    background: white;
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 2000;
    box-shadow: -6px 0 20px rgba(0, 0, 0, 0.15);

    a {
        color: var(--color-primary);
        text-decoration: none;
        font-size: 16px;
    }

    button {
        padding: 10px;
        background: crimson;
        border: none;
        color: white;
        border-radius: 6px;
        cursor: pointer;
    }
}

// Overlay

.overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1500;
}


.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
    transform: translateX(0);
}

@media (max-width: 768px) {
    .desktop-nav {
        display: none;
    }

    .mobile-icons {
        display: flex;
    }
}
</style>