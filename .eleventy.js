const renderHTML = require('./src/utils/shortcodes/renderHTML');
const image = require('./src/utils/shortcodes/image');

module.exports = function(config) {
  require('dotenv').config();

  config.addPassthroughCopy('src/css');
  config.addNunjucksShortcode('image', image);
  config.addNunjucksShortcode('renderHTML', renderHTML);

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      data: 'data',
      input: 'src',
      includes: 'includes',
      layouts: 'layouts',
      output: 'dist',
    }
  }
}
