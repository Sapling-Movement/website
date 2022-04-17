const fetchFromSanity = require('../utils/fetchFromSanity');
let languages = require('./languages.json');

// it works, but it's ugly..

module.exports = async function() {

  const query = `*[_type in ['modularPage','blogPost','category']]{_id}`;
  const params = {};
  let docs = await fetchFromSanity('language-maps', query, params);

  // 'flatten' array and remove drafts
  docs = docs.map(doc => doc._id).filter(doc => !doc.startsWith('drafts.'));

  let base = {};

  Object.entries(languages).map(([lang_key, data]) => {

    // get native documents
    let native_docs = docs.filter(doc => {
      if (data.primary) {
        return !doc.startsWith('i18n.');
      } else {
        return doc.endsWith(`.${lang_key}`);
      }
    });

    // prepare for matching (stripped ID)
    native_docs = native_docs.map(doc => {
      return {
        full_id: doc,
        stripped_id: data.primary ? doc : doc.split('.')[1]
      }
    });

    base[lang_key] = native_docs;
  });

  let map = {};

  Object.entries(base).map(([lang_key]) => {
    // ==> lang_key = 'de'

    const foreign_languages = Object.keys(languages).filter(lang => lang !== lang_key);
    // ==> ['en']

    let mapped_docs = {};

    base[lang_key].map(base_doc => {
      // base_doc ==> 'id-1'

      let foreign_docs = {};

      foreign_languages.map(lang => {
        // ==> lang = 'en'

        // return {
        //   [lang]: (base[lang_key].filter(doc => doc.stripped_id === base_doc.strpped_id)).full_id
        // }

        foreign_docs[lang] = (base[lang].filter(doc => doc.stripped_id === base_doc.stripped_id))[0].full_id
      });

      mapped_docs[base_doc.full_id] = foreign_docs
    });

    map[lang_key] = mapped_docs
  });

  return map

}
