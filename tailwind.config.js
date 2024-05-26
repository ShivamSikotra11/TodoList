/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#af7eeb',
        'secondary': '#cbaaff',
        'gray': '#b3b5c1',
      },
      fontFamily: {
        'poppin': ['Poppins', 'sans-serif'],
        'sora': ['Sora', 'sans-serif'],
        'outfit': ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
