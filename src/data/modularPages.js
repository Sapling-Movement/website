const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "modularPage" && !(_id in path("drafts.**"))]`;
  const params = '';
  return fetchFromSanity('modular-page', query, params);
}
