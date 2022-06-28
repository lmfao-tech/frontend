module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        trispace: ["Trispace", "sans-serif"],
      }
    },
  },
  plugins: [require("flowbite/plugin")],
};
