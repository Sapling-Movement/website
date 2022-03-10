const { toHTML: renderHTML } = require('@portabletext/to-html');

module.exports = function toHTML(input) {
  return renderHTML(input);
}
