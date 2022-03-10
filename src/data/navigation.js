const fetchFromSanity = require('../utils/fetchFromSanity');

module.exports = async function() {
  const query = `*[
      _type == "navigation"
      && __lang == $lang
      && !(_id in path("drafts.i18n.*")
      && _id in path("i18n.**"))
    ]{
      items[]->{
        __lang,
        pageBase
      }
  }[0]`;
  const navDE = await fetchFromSanity('navigationDE', query, {lang: 'de'});
  const navEN = await fetchFromSanity('navigationDE', query, {lang: 'en'});
  return {
    de: navDE,
    en: navEN
  }
}
