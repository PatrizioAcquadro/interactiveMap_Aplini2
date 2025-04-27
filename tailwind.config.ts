// tailwind.config.ts
import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme"); // Import default theme

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Keep extending the theme
      fontFamily: {
        // Keep your existing font family configuration
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      // --- Custom colors ---
      colors: {
        "brand-light-green": "#D0D4C8", // Background from image
        "brand-dark-green": "#334C3F", // Text/Dot from image
        "brand-olive": "#8A8D7B", // Dot from image
        "brand-red": "#B42025", // Dot from image
        "brand-white": "#FFFFFF", // Pure white
        "poi-camper": "#3B82F6", // Blue
        "poi-taxi": "#F59E0B", // Amber/Yellow
        "poi-restaurant": "#F97316", // Orange
        "poi-bar": "#A855F7", // Purple
        "poi-hotel": "#14B8A6", // Teal
        "poi-private_accommodation": "#EC4899", // Pink
        "poi-clothing": "#8B5CF6", // Violet/Indigo
        "poi-default": "#6B7280", // Gray (Fallback)
      },

      // Keep your existing keyframes configuration
      keyframes: {
        "fade-scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      // Keep your existing animation configuration
      animation: {
        "fade-scale-in": "fade-scale-in 0.3s ease-out forwards", // Added 'forwards'
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }), // Add plugin
  ],
};
export default config;
