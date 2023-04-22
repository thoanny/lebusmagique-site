/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lebusmagique: {
          "primary": "#446197",
          "secondary": "#3B82F6",
          "accent": "#09BC8A",
          "neutral": "#191D24",
          "base-100": "#2b3d5f",
          "info": "#3498db",
          "success": "#2ecc71",
          "warning": "#f1c40f",
          "error": "#e74c3c",
        },
      }
    ],
  },
}

