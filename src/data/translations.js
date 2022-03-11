const fetchFromSanity = require('../utils/fetchFromSanity');
const arrayToObject = require('../utils/arrayToObject');

module.exports = async function() {
  const query = `*[_type == "uiTranslations" && !(_id in path("drafts.**"))][0]`;
  const params = '';

  const response = await fetchFromSanity('translations', query, params);

  return arrayToObject(response.translations, 'key');
}
