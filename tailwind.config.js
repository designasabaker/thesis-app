/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: 'var(--font-dm-sans)',
        heading: 'var(--font-dm-serif)',
      },
    },
  },
  plugins: [],
}