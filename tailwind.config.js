/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        sans:['Poppins', 'sans-serif']
      },
      gridTemplateColumns:{
        '70/30':'70% 28%',
      },
    },
    variants:{
      extend:{},
    },

    screens: {
      "sm":"0px",
      '2xl': '1280px', // You can change 'lg' to whatever name you prefer
      "md":"500px"
    },
  },
  plugins: [],
}

