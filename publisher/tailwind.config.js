module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["STIX Two Text", "serif"],
      mono: ["Roboto Mono", "Inconsolata", "Courier", "monospace"],
    },
    screens: {
      tablet: "640px",
      laptop: "1024px",
    },
  },
};
