const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.jsx",
    "./resources/**/**/*.jsx",
    "./resources/**/**/**/*.jsx",
    // "./resources/**/**/**/**/*.jsx",
  ],
  theme: {
    screens: {
        sm: '640px',
        // => @media (min-width: 640px) { ... }
        star: '668px',
        // => @media (min-width: 640px) { ... }

        md: '768px',
        // => @media (min-width: 768px) { ... }

        lg: '1024px',
        // => @media (min-width: 1024px) { ... }

        xl: '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
      },
  },
  plugins: [],
}
