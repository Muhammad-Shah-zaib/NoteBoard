/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.zinc,
          DEFAULT: colors.zinc[800],
        },
        seccondary: {
          ...colors.blue,
          DEFAULT: colors.blue[800],
        }
      }
  },
  },
  plugins: [],
}