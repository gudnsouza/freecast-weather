import { create } from "zustand";
import { persist } from "zustand/middleware";

export const lightTheme = {
  background: "#FFF",
  text: "#000",
  accent: "#0A84FF",
};

export const darkTheme = {
  background: "#000",
  text: "#FFF",
  accent: "#0A84FF",
};

interface ThemeState {
  theme: typeof lightTheme | typeof darkTheme;
  toggleTheme: () => void;
}

const getInitialTheme = (): typeof lightTheme | typeof darkTheme => {
  const storedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  if (storedTheme === "dark") {
    return darkTheme;
  } else if (storedTheme === "light") {
    return lightTheme;
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? darkTheme : lightTheme;
  }
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
      getStorage: () => localStorage,
    }
  )
);

export default useThemeStore;
