module.exports = function(config) {

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
