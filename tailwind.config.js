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
    colors: {
      black_1: '#111111',
      blue_1: '#007fff',
      gray_1: '#767676',
      gray_2: '#eeeeee',
    },
    extend: {},
  },
  plugins: [],
};
