
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Helper function for combining class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Theme constants for consistent styling across the application
export const theme = {
  colors: {
    primary: {
      50: 'hsl(var(--primary-50))',
      100: 'hsl(var(--primary-100))',
      200: 'hsl(var(--primary-200))',
      300: 'hsl(var(--primary-300))',
      400: 'hsl(var(--primary-400))',
      500: 'hsl(var(--primary-500))',
      600: 'hsl(var(--primary-600))',
      700: 'hsl(var(--primary-700))',
      800: 'hsl(var(--primary-800))',
      900: 'hsl(var(--primary-900))',
      950: 'hsl(var(--primary-950))',
    },
    gray: {
      50: 'hsl(var(--gray-50))',
      100: 'hsl(var(--gray-100))',
      200: 'hsl(var(--gray-200))',
      300: 'hsl(var(--gray-300))',
      400: 'hsl(var(--gray-400))',
      500: 'hsl(var(--gray-500))',
      600: 'hsl(var(--gray-600))',
      700: 'hsl(var(--gray-700))',
      800: 'hsl(var(--gray-800))',
      900: 'hsl(var(--gray-900))',
      950: 'hsl(var(--gray-950))',
    }
  },
  transitions: {
    DEFAULT: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  radii: {
    sm: '0.125rem',
    DEFAULT: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  }
};

// Animation variants for consistent motion effects
export const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
  slideInFromRight: {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } },
  },
  scaleUp: {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  },
};

// Media query breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Common component styles
export const componentStyles = {
  card: "bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all",
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  heading: {
    h1: "text-4xl font-bold tracking-tight",
    h2: "text-3xl font-bold tracking-tight",
    h3: "text-2xl font-bold",
    h4: "text-xl font-semibold",
  },
  badge: {
    primary: "bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded",
    secondary: "bg-gray-100 text-gray-800 text-xs px-2.5 py-0.5 rounded",
    success: "bg-green-100 text-green-800 text-xs px-2.5 py-0.5 rounded",
    danger: "bg-red-100 text-red-800 text-xs px-2.5 py-0.5 rounded",
    warning: "bg-yellow-100 text-yellow-800 text-xs px-2.5 py-0.5 rounded",
    info: "bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded",
  },
};
