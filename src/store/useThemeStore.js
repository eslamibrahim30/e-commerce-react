import { create } from "zustand";

const useThemeStore = create((set) => ({
	theme: "light",
	toggleTheme: () =>
		set((state) => {
			const newTheme = state.theme === "light" ? "dark" : "light";
			document.documentElement.classList.toggle("dark", newTheme === "dark");
			return { theme: newTheme };
		}),
}));

export default useThemeStore;
