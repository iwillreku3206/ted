/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,ts,js}'],
  theme: {
    extend: {
      minWidth: {
        menu: '12rem'
      },
      borderWidth: {
        '1/2': '0.5px',
        '1': '1px',
      },
      backgroundImage: {
        'transparent-checkerboard': 'url("/assets/checkerboard.svg")'
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
}

