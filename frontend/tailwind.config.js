// tailwind.config.js
module.exports = {
  darkMode: 'className', // Enable dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f13a01",
        background: '#ffffff',
        text: '#000000',
        'background-dark': '#181818',
        'text-dark': '#ffffff',
        'primary-dark': '#ffa07a',
      },
    },
  },
  plugins: [],
};
