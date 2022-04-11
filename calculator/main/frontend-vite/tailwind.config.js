module.exports = {
  content: ["../templates/main/vite.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        unirock: '#ff1c2e',
        unirock_dark: '#323338'
      }
    },
  },
  plugins: [],
  variants: {
    // The 'active' variant will be generated in addition to the defaults
    extend: {
      backgroundColor: ['active']
    }
  },
}