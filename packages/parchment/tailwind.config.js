module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@polemic/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@polemic/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Helvetica Neue", "Arial", "sans"],
      serif: ["STIX Two Text", "serif"],
      mono: ["Roboto Mono", "Inconsolata", "Courier", "monospace"],
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
    },
  },
};
