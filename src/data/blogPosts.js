const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "blogPost" && $includeDrafts]{
    ...,
    text[] {
      ...,
      _type == "imageWithCaption" => @{
        image {
          ...,
          asset->
        }
      }
    }
  }`;
  const params = {};
  return fetchFromSanity('blog-post', query, params);
}
