const toHtml = require('./src/utils/filters/toHtml');

module.exports = function(config) {
  require('dotenv').config();

  config.addPassthroughCopy('src/css');
  config.addFilter('toHTML', toHtml);

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      data: 'data',
      input: 'src',
      includes: 'components',
      layouts: 'layouts',
      output: 'dist',
    }
  }
}
