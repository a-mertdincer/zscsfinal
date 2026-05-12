import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(52, 211, 153, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(52, 211, 153, 0.6)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
