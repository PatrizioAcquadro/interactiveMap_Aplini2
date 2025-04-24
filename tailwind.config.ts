import type { Config } from 'tailwindcss'
const { fontFamily } = require('tailwindcss/defaultTheme') // Import default theme

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    // Or if using `src` directory:
    // "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Set Inter (via CSS variable from next/font) as the default sans-serif font
        sans: ['var(--font-inter)', ...fontFamily.sans],
      },
      // Keyframes for modal animation (can also be in globals.css @layer utilities)
      keyframes: {
        'fade-scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        }
      },
      // Animation definition using the keyframes
      animation: {
        'fade-scale-in': 'fade-scale-in 0.3s ease-out forwards', // Added 'forwards'
      }
    },
  },
  plugins: [],
}
export default config