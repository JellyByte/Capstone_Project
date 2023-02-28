/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily:{
      'mono': 'font-mono tracking-normal'


    },
    extend: {
      height: {
        '192': '48rem',
        '256': '64rem'
      },
      width: {
        '192': '48rem',
        '256': '64rem'
      },
      maxWidth: {
        '4/5': '80%',
      }

    },
  },
  plugins: [require('@tailwindcss/forms')]
}
