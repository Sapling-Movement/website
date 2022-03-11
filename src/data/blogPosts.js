const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "blogPost" && !(_id in path("drafts.**"))]{
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
  const params = '';
  return fetchFromSanity('blog-post', query, params);
}
