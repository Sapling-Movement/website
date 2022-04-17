const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "category" __EXCLUDE_DRAFTS__]`;
  const params = {};
  return fetchFromSanity('category', query, params);
}
