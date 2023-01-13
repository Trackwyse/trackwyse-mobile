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
          200: '#111215'
        },
        aqua: {
          100: '#B0F0EA',
          200: '#6ED0C6',
          300: '#07D2C3'
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
        purple: {
          100: '#C5C2F9',
          200: '#B5B0FF'
        }
      },
      fontFamily: {
        'regular': 'Poppins_400Regular',
        'medium': 'Poppins_500Medium',
        'semibold': 'Poppins_600SemiBold',
        'bold': 'Poppins_700Bold',
        'extrabold': 'Poppins_800ExtraBold',
      },


    }
  },
  plugins: [],
}