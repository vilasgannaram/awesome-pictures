/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '1024px',
      xl: '1535px',
    },
    fontFamily: {
      arial: ['Arial', 'Helvetica', 'sans-serif'],
      seoge: ['Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
};
