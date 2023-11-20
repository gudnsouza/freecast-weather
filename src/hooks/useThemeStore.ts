import { create } from "zustand";
import { persist } from "zustand/middleware";

export const lightTheme = {
  background: "#FFF",
  text: "#000",
  accent: "#0A84FF",
  yellow: "#ffd60a",
  purple: "#BF5AF2",
};

export const darkTheme = {
  background: "#000",
  text: "#FFF",
  accent: "#0A84FF",
  yellow: "#ffd60a",
  purple: "#BF5AF2",
};

interface ThemeState {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const getInitialTheme = (): typeof lightTheme | typeof darkTheme => {
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  return storedTheme === "dark" ? lightTheme : darkTheme;
};

const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme.background === "#FFF" ? darkTheme : lightTheme,
        })),
    }),
    {
      name: "theme-preference",
    }
  )
);

export default useThemeStore;
