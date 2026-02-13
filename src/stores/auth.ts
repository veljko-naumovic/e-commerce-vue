import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface User {
	email: string;
}

export const useAuthStore = defineStore("auth", () => {
	const user = ref<User | null>(null);

	const isAuthenticated = computed(() => !!user.value);

	function login(email: string, password: string) {
		// Fake auth logic
		if (email === "admin@test.com" && password === "1234") {
			user.value = { email };
			persist();
			return true;
		}

		return false;
	}

	function logout() {
		user.value = null;
		localStorage.removeItem("auth_user");
	}

	function persist() {
		if (user.value) {
			localStorage.setItem("auth_user", JSON.stringify(user.value));
		}
	}

	function hydrate() {
		const stored = localStorage.getItem("auth_user");
		if (stored) {
			user.value = JSON.parse(stored);
		}
	}

	return {
		user,
		isAuthenticated,
		login,
		logout,
		hydrate,
	};
});
