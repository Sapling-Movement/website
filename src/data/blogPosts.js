const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "blogPost" __EXCLUDE_DRAFTS__]{
    ...,
    portableText {
      text[] {
        ...,
        _type == "imageWithCaption" => @{
          image {
            ...,
            asset->
          }
        },
        markDefs[]{
          ...,
          _type == "internalLink" => {
            "slug": @.reference->pageBase.fullSlug
          }
        }
      }
    }
  }`;
  const params = {};
  return fetchFromSanity('blog-post', query, params);
}
