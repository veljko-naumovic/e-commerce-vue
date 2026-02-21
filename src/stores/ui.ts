import { defineStore } from "pinia";
import { ref } from "vue";

export const useUiStore = defineStore("ui", () => {
	const isGlobalLoading = ref(false);

	const startLoading = () => {
		isGlobalLoading.value = true;
	};

	const stopLoading = () => {
		isGlobalLoading.value = false;
	};

	return {
		isGlobalLoading,
		startLoading,
		stopLoading,
	};
});
