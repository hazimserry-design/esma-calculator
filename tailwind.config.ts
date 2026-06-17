import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // HOMUS palette
        cream: "#FAF7F0",
        card: "#FFFFFF",
        night: "#2F2F2F",
        stone: "#6F6A60",
        line: "#E8E0D2",
        gold: {
          DEFAULT: "#E3AA2F",
          soft: "#E8C89A",
          deep: "#C98F1E",
        },
        goldDark: "#C98F1E",
        beige: "#E8C89A",
        // dark-section greys (premium contrast panels)
        ink: {
          950: "#262626",
          900: "#2F2F2F",
          800: "#3A3A3A",
          700: "#454545",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(47,47,47,0.04), 0 14px 36px -16px rgba(47,47,47,0.16)",
        card: "0 1px 2px rgba(47,47,47,0.04), 0 18px 44px -20px rgba(47,47,47,0.18)",
        gold: "0 10px 30px -10px rgba(227,170,47,0.45)",
        soft2: "0 2px 8px rgba(47,47,47,0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.5s ease both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.22,1,0.36,1) both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
