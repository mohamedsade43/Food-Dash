// tailwind.config.js
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#f13a01",
          background: '#1a1a1a', // dark 
          text: '#ffffff',
        }
      },
  },
  plugins: [require("daisyui")],
};
