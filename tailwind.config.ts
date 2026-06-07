import type { Config } from "tailwindcss";

/**
 * Configuración de Tailwind v3 para el Technical Binder.
 *
 * Los colores NO se hardcodean aquí: se leen de variables CSS (definidas en
 * globals.css y sobreescritas desde content/config.ts en el layout). Esto permite
 * que el equipo cambie su identidad visual editando un solo archivo.
 *
 * Formato "rgb(var(--x) / <alpha-value>)" habilita modificadores de opacidad de
 * Tailwind (ej. bg-primary/20) sobre variables CSS.
 */
const config: Config = {
  // Dark mode controlado por clase en <html> (dark-first: la clase está siempre puesta).
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,mdx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          foreground: "rgb(var(--accent-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Space Grotesk para títulos, Inter para cuerpo (definidos en layout.tsx).
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderColor: {
        DEFAULT: "rgb(var(--border) / <alpha-value>)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      maxWidth: {
        // Ancho máximo del binder en desktop (criterio del prompt: ~1400px).
        binder: "1400px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgb(var(--accent) / 0.45)",
        "glow-sm": "0 0 20px -6px rgb(var(--accent) / 0.35)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dash": {
          to: { strokeDashoffset: "0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "dash": "dash 2s ease-out forwards",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
