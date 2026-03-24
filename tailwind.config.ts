import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vault: {
          bg: "#020810",
          card: "rgba(255,255,255,0.05)",
          border: "rgba(255,255,255,0.08)",
          accent: "#0066FF",
          "accent-light": "#3385FF",
          "accent-dim": "rgba(0,102,255,0.12)",
          green: "#10B981",
          "green-dim": "#059669",
          muted: "#6B7280",
          text: "#FFFFFF",
          "text-dim": "#9CA3AF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      backgroundImage: {
        "vault-hero": "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,102,255,0.10) 0%, transparent 65%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 40px -12px rgba(0,102,255,0.4)" },
          "50%": { boxShadow: "0 0 60px -8px rgba(0,102,255,0.5)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
