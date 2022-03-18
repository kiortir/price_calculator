module.exports = {
  content: ["../templates/stonepricelist/quartz.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        unirock: '#ff1c2e',
        unirock_dark: '#323338',
        unirock_bg: 'rgb(249 250 251)',
        table_green: '#ddf2f0'
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