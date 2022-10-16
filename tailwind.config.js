module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        // epilogue: ["Epilogue", "sans-serif"],
        // inter: ["Inter", "sans-serif"],
        // poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#0073f5",
      },
    },
  },
  plugins: [],
};
