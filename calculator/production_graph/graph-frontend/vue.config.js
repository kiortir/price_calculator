const path = require('path');

module.exports = {
  productionSourceMap: false,
  publicPath: '/static/src/graph/dist/', // Should be STATIC_URL + path/to/build
  outputDir: path.resolve(__dirname, '../static/src/graph/dist/'), // Output to a directory in STATICFILES_DIRS
  indexPath: '../../../../templates/production_graph/index.html',
  filenameHashing: false, // Django will hash file names, not webpack
  runtimeCompiler: true, // See: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  devServer: {
    proxy: 'https://uvicorn-unirock-api.herokuapp.com',
  },
  // chainWebpack: (config) => config.optimization.minimize(false),
};
