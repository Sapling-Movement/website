const htmlmin = require('html-minifier');

const isProd = process.env.ENVIRONMENT === 'production';

module.exports = function(content) {
  if (isProd && this.outputPath && this.outputPath.endsWith('.html')) {
    let path = this.outputPath.split('/');
    if (!(path[path.length-1].startsWith('shell-'))) {
      let minified = htmlmin.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true,
      });
      return minified;
    }
  }
  return content;
}
