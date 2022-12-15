/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
  ],
  theme: {
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        red: '#D70040',
        primary: {
          100: '#264170',
          200: '#071328'
        },
        gray: {
          100: '#F6F3F3',
          200: '#DBDBDB',
          300: '#CCCCCC',
          400: '#8B9396',
        },
        blue: {
          100: '#3BC9FB',
          200: '#82B1FE',
          300: '#3C68FF',
          400: '#3454CC'
        },
      }
    }
  },
  plugins: [],
}