/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'lato': ['Lato', 'Helvetica', 'Arial', 'sans-serif'],
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1200px",
      // => @media (min-width: 1200px) { ... }

      "2xl": "1440px",
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        "disney-blue": {
          100: "#F1F2F3",
          500: "#054553",
        },
        "base-copy": "#222222",
      },
      width: {
        '62': '15.5rem'
      },
      height: {
        '62': '15.5rem'
      },
      size: {
        '62': '15.5rem'
      }
    },
    plugins: [],
  },
};
