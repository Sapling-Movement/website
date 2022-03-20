const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "modularPage" __EXCLUDE_DRAFTS__]{
    ...,
    body[]{
      ...,
      _type == "heroSection" => @{
        ...,
        backgroundImage {
          ...,
          asset->
        },
        overlay {
          ...,
          asset->
        }
      },
      _type == "portableText" => @{
        text[] {
          ...,
          _type == "imageWithCaption" => @{
            image {
              ...,
              asset->
            }
          } 
        }
      }
    }
  }`;
  const params = {};
  return fetchFromSanity('modular-page', query, params);
}
