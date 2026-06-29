import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand accent — electric cyan from the reference, exposed as a token.
        accent: {
          DEFAULT: "#5FD3E6",
          soft: "#8FE4F0",
          deep: "#34C5DA",
          glow: "#B5F0F8",
        },
        teal: {
          bar: "#1E555F", // dark-teal announcement bar
        },
        ink: {
          DEFAULT: "#10171D", // near-black headings
          soft: "#1A2228",
        },
        muted: {
          DEFAULT: "#5B6770", // body gray
          light: "#8A949C", // small labels / eyebrows
        },
        surface: {
          card: "#F1F3F2", // light card fill
          mint: "#E8F4ED", // pastel green feature card
          sky: "#E5F0F7", // pastel blue feature card
          rose: "#FBE9EE", // "old way" tint
          green: "#E4F6E9", // "new way" tint
        },
        line: "#E7EAE9",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        pill: "9999px",
        card: "24px",
        xl2: "28px",
      },
      boxShadow: {
        nav: "0 8px 30px -8px rgba(16, 23, 29, 0.12), 0 2px 8px -2px rgba(16, 23, 29, 0.06)",
        card: "0 18px 50px -20px rgba(16, 23, 29, 0.18)",
        soft: "0 10px 40px -15px rgba(16, 23, 29, 0.12)",
        glow: "0 8px 30px -6px rgba(95, 211, 230, 0.5)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(3%, -4%) scale(1.08)" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration, 40s) linear infinite",
        float: "float 6s ease-in-out infinite",
        "gradient-drift": "gradient-drift 18s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
