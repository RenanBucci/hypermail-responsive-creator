
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "light" | "dark";
  primaryColor: "blue" | "green" | "purple" | "orange" | "pink" | "red";
  setTheme: (theme: "light" | "dark") => void;
  setPrimaryColor: (color: "blue" | "green" | "purple" | "orange" | "pink" | "red") => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light",
      primaryColor: "blue",
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
    }),
    {
      name: "theme-storage",
    }
  )
);
