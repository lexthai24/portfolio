import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0b0f",
          soft: "#0f1117",
          card: "#12141c",
        },
        line: "#1e2130",
        ink: {
          DEFAULT: "#e6e8ee",
          soft: "#9aa0b4",
          dim: "#6b7286",
        },
        accent: {
          DEFAULT: "#38e8b8",
          soft: "#2bc79c",
          glow: "#38e8b8",
        },
        accent2: "#6d8bff",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "grid-pan": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "40px 40px" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        blink: "blink 1.1s step-end infinite",
        "grid-pan": "grid-pan 20s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
