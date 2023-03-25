/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.{html,js}'],
  theme: {
    extend: {
      colors: {
        sand: {
          100: '#cca65b',
        },
        vitality: {
          100: '#8C9D58',
        },
        whitecap: {
          100: '#fffefc',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), ('daisyui')],
}
