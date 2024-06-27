/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    ...colors.zinc,
                    DEFAULT: colors.zinc[800],
                },
                secondary: {
                    ...colors.neutral,
                    DEFAULT: colors.neutral[900],
                },
            },
        },
    },
    plugins: [],
};
