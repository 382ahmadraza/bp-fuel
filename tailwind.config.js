/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2196F3',
        accent: '#FF9800',
        danger: '#F44336',
        warning: '#FFC107',
        success: '#2E7D32',
        background: '#FAFAFA',
        surface: '#F1F1F1',
        heading: '#212121',
        bodyText: '#424242',
        mutedText: '#9E9E9E',
        borders: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};