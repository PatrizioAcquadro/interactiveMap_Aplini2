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
      // --- Add the custom colors here ---
      colors: {
        "brand-light-green": "#D0D4C8", // Background from image
        "brand-dark-green": "#334C3F", // Text/Dot from image
        "brand-olive": "#8A8D7B", // Dot from image
        "brand-red": "#B42025", // Dot from image
        "brand-white": "#FFFFFF", // Pure white
      },
      // --- End of custom colors ---

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
  plugins: [],
};
export default config;
