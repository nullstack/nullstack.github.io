module.exports = {
  purge: ["./src/**/*.njs"],
  darkMode: "class",
  theme: {
    backgroundSize: {
      'auto': 'auto',
      'cover': 'cover',
      'contain': 'contain',
      '0': '0%',
      '70': '70%',
      '100': '100%',
    }
  },
  variants: {
    extend: {
      backgroundSize: ['hover'],
      opacity: ['dark'],
      typography: ['dark'],
      borderColor: ['dark'],
    },
  },
  plugins: [
    require('autoprefixer'),
    require('@tailwindcss/typography'),
  ],
};
