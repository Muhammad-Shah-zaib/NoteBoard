/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        screens: {
            xs: '400px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1536px',
        },
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
