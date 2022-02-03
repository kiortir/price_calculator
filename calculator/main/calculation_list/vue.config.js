const path = require('path');

module.exports = {
  publicPath: '/static/src/calc_list/dist/', // Should be STATIC_URL + path/to/build
  outputDir: path.resolve(__dirname, '../static/src/calc_list/dist/'), // Output to a directory in STATICFILES_DIRS
  indexPath: '../../../../templates/main/calulationList.html',
  filenameHashing: false, // Django will hash file names, not webpack
  runtimeCompiler: true, // See: https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
};
