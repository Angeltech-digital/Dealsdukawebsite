/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        "deals-orange": "#F85301", // main orange from brand
        "deals-purple": "#7939E8", // main purple from brand

        // Secondary / support colors
        "deals-black": "#000000",
        "deals-green": "#37E200", // neon green accent
        "deals-yellow": "#FACD29", // warm yellow accent
        "deals-cyan": "#4DD7FF", // bright cyan accent (visual match)

        // Optional semantic aliases (useful in UI)
        "brand-primary": "#F85301",
        "brand-accent": "#7939E8",
        "brand-muted": "#FACD29",
        "brand-success": "#37E200",
        "brand-info": "#4DD7FF",
        "brand-ink": "#000000",
      }
    }
  },
  plugins: [],
}
