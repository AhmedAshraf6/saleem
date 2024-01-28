/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: 'TheSans',
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#6843EE',
          secondary: '#F6F6F6',
          // accent: '#ffffff',
          neutral: '#1E293B',
          'base-100': '#ffffff',
          // info: '#ffffff',
          // success: '#00ffff',
          // warning: '#ffffff',
          error: '#E80000',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
