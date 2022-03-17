const renderHTML = require('./src/utils/shortcodes/renderHTML');
const image = require('./src/utils/shortcodes/image');
const sanityImage = require('./src/utils/shortcodes/sanityImage');

module.exports = function(config) {
  require('dotenv').config();

  config.addPassthroughCopy('src/css');
  config.addPassthroughCopy({ 'src/public': './'});
  config.addNunjucksShortcode('image', image);
  config.addNunjucksShortcode('renderHTML', renderHTML);
  config.addNunjucksShortcode('sanityImage', sanityImage);

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
