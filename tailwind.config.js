/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background: '#262626',
        secondaryBackground: '#171717',
        headerColor: '#737373',
        textColor: '#737373',
      }
    },
  },
  plugins: [],
}

