module.exports = function(config) {

  config.addPassthroughCopy("src/css");

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "dist"
    }
  }
}
