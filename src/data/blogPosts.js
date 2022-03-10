const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "blogPost" && !(_id in path("drafts.i18n.*") && _id in path("i18n.**"))]`;
  const params = '';
  return fetchFromSanity('blog-post', query, params);
}
