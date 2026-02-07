/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E293B",
        accent: "#22D3EE",
        success: "#10B981",
        alert: "#F43F5E",
      },
      backgroundColor: {
        'dark-bg': '#0F172A',
      }
    },
  },
  plugins: [],
}
