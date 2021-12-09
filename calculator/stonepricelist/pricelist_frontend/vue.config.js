const path = require('path');

module.exports = {
  productionSourceMap: true,
  publicPath: '/static/src/pricelist/dist/', // Should be STATIC_URL + path/to/build
  outputDir: path.resolve(__dirname, '../static/src/pricelist/dist/'), // Output to a directory in STATICFILES_DIRS
  indexPath: '../../../../templates/stonepricelist/index.html',
  filenameHashing: false, // Django will hash file names, not webpack
  runtimeCompiler: true, // See: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // chainWebpack: (config) => config.optimization.minimize(false),
};
