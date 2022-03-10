module.exports = function(config) {
  require('dotenv').config();

  config.addPassthroughCopy('src/css');

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
