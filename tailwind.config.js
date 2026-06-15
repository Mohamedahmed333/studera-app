/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: { DEFAULT: '#534AB7', light: '#EEEDFE', mid: '#7F77DD' },
        teal:   { DEFAULT: '#1D9E75', light: '#E1F5EE' },
        amber:  { DEFAULT: '#BA7517', light: '#FAEEDA' },
        coral:  { DEFAULT: '#D85A30', light: '#FAECE7' },
        green:  { DEFAULT: '#3B6D11', light: '#EAF3DE' },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
