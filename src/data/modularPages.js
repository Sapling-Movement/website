const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = function() {
  const query = `*[_type == "modularPage"]`;
  const params = '';
  return fetchFromSanity('modular-page', query, params);
}
