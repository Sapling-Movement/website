const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "modularPage" && !(_id in path("drafts.**"))]{
    ...,
    body[]{
      ...,
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
  const params = '';
  return fetchFromSanity('modular-page', query, params);
}
