
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeType = "light" | "dark" | "system";
type PrimaryColorType = "blue" | "green" | "purple" | "orange" | "pink" | "red" | "teal" | "indigo" | "amber" | "cyan";
type AccentColorType = "blue" | "green" | "purple" | "orange" | "pink" | "red" | "teal" | "indigo" | "amber" | "cyan";
type RadiusType = "none" | "small" | "medium" | "large" | "full";

interface CustomColor {
  r: number;
  g: number;
  b: number;
}

interface ThemeState {
  theme: ThemeType;
  primaryColor: PrimaryColorType;
  accentColor: AccentColorType;
  radius: RadiusType;
  animations: boolean;
  reducedMotion: boolean;
  customButtonColor: CustomColor;
  customTextColor: CustomColor;
  customAccentColor: CustomColor;
  useCustomColors: boolean;
  
  // Actions
  setTheme: (theme: ThemeType) => void;
  setPrimaryColor: (color: PrimaryColorType) => void;
  setAccentColor: (color: AccentColorType) => void;
  setRadius: (radius: RadiusType) => void;
  setAnimations: (enabled: boolean) => void;
  setReducedMotion: (enabled: boolean) => void;
  setCustomButtonColor: (color: CustomColor) => void;
  setCustomTextColor: (color: CustomColor) => void;
  setCustomAccentColor: (color: CustomColor) => void;
  setUseCustomColors: (enabled: boolean) => void;
  
  // Helper
  getSystemTheme: () => "light" | "dark";
  getEffectiveTheme: () => "light" | "dark";
  getRgbString: (color: CustomColor) => string;
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
      customButtonColor: { r: 37, g: 99, b: 235 }, // Blue
      customTextColor: { r: 17, g: 24, b: 39 }, // Dark gray
      customAccentColor: { r: 139, g: 92, b: 246 }, // Purple
      useCustomColors: false,
      
      setTheme: (theme) => set({ theme }),
      setPrimaryColor: (primaryColor) => set({ primaryColor }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setRadius: (radius) => set({ radius }),
      setAnimations: (animations) => set({ animations }),
      setReducedMotion: (reducedMotion) => set({ reducedMotion }),
      setCustomButtonColor: (customButtonColor) => set({ customButtonColor }),
      setCustomTextColor: (customTextColor) => set({ customTextColor }),
      setCustomAccentColor: (customAccentColor) => set({ customAccentColor }),
      setUseCustomColors: (useCustomColors) => set({ useCustomColors }),
      
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
      },
      
      getRgbString: (color: CustomColor) => {
        return `rgb(${color.r}, ${color.g}, ${color.b})`;
      }
    }),
    {
      name: "theme-storage",
    }
  )
);
