
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "light" | "dark" | "system";
type PrimaryColorType = "blue" | "green" | "purple" | "orange" | "pink" | "red" | "teal" | "indigo" | "amber" | "cyan";
type AccentColorType = "blue" | "green" | "purple" | "orange" | "pink" | "red" | "teal" | "indigo" | "amber" | "cyan";
type RadiusType = "none" | "small" | "medium" | "large" | "full";

interface ThemeState {
  theme: ThemeType;
  primaryColor: PrimaryColorType;
  accentColor: AccentColorType;
  radius: RadiusType;
  animations: boolean;
  reducedMotion: boolean;
  
  // Actions
  setTheme: (theme: ThemeType) => void;
  setPrimaryColor: (color: PrimaryColorType) => void;
  setAccentColor: (color: AccentColorType) => void;
  setRadius: (radius: RadiusType) => void;
  setAnimations: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  
  // Helper
  getSystemTheme: () => "light" | "dark";
  getEffectiveTheme: () => "light" | "dark";
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      primaryColor: "blue",
      accentColor: "purple",
      radius: "medium",
      animations: true,
      reducedMotion: false,
      
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setRadius: (radius) => set({ radius }),
      setAnimations: (animations) => set({ animations }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      
      getSystemTheme: () => {
        if (typeof window === "undefined") return "light";
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      },
      
      getEffectiveTheme: () => {
        const { theme } = get();
        if (theme === "system") {
          return get().getSystemTheme();
        }
        return theme;
      }
    }),
    {
      name: "theme-storage",
    }
  )
);
