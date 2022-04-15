const fetchFromSanity = require('../utils/fetchFromSanity');
const arrayToObject = require('../utils/arrayToObject');

module.exports = async function() {
  const query = `*[_type == "navigation" __EXCLUDE_DRAFTS__]{
    'lang': __lang,
    items[]->{
      'fullSlug': pageBase.fullSlug,
      'title': pageBase.title
    }
  }`;

  const navigation = await fetchFromSanity('navigation', query);

  return arrayToObject(navigation, 'lang');
}
