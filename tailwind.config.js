/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['src/**/*.{js,jsx}'],
  theme: {
    borderRadius: {
      DEFAULT: '10px',
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        white: '#FAFAFA',
        gray: '#BCC1BA',
        background: '#F4F4F5',
        foreground: '#FAFAFA',
        black: '#0A0A0A',
        primary: {
          DEFAULT: '#0C4C73',
          foreground: '#FAFAFA',
        },
        secondary: {
          DEFAULT: '#84C0C6',
          foreground: '#FAFAFA',
        },
        tertiary: {
          DEFAULT: '#9FB7B9',
          foreground: '#FAFAFA',
        },
        other: {
          DEFAULT: '#F2E2D2',
          foreground: '#FAFAFA',
        },
        red: {
          DEFAULT: '#900B09',
          foreground: '#FAFAFA',
        },
        card: {
          DEFAULT: '#FAFAFA',
          foreground: '#0A0A0A',
        },
      },
    },
  },
  plugins: [],
}
