require('dotenv').config();
const { EleventyServerlessBundlerPlugin } = require("@11ty/eleventy");
const renderHTML = require('./src/utils/shortcodes/renderHTML');
const image = require('./src/utils/shortcodes/image');
const sanityImage = require('./src/utils/shortcodes/sanityImage');

module.exports = function(config) {

  config.addPassthroughCopy({ 'src/public': './'});
  config.addNunjucksShortcode('image', image);
  config.addNunjucksShortcode('renderHTML', renderHTML);
  config.addNunjucksShortcode('sanityImage', sanityImage);
  config.addWatchTarget("src/css");
  config.addPlugin(EleventyServerlessBundlerPlugin, {
    name: 'dynamic',
    functionsDir: './netlify/functions',
    copy: [
      './src/utils'
    ]
  });

  return {
    markdownTemplateEngine: 'njk',
    templateFormats: ['njk', '11ty.js'],
    dir: {
      data: 'data',
      input: 'src',
      includes: 'includes',
      layouts: 'layouts',
      output: 'dist',
    }
  }
}
