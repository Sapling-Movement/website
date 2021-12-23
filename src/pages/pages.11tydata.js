const languages = require('../_data/languages.js');

const get_lang_key = input => {
  // get the individual parts of the filename
  const parts = input.split('.');
  // return the second part of the filename (which is the lang_key)
  return parts[1];
}

const get_translation_key = input => {
  // get the individual parts of the filename
  const parts = input.split('.');
  // return the first part of the filename (which is the filename)
  return parts[0];
}

module.exports = {
  layout: "base.njk",
  site_title: 'Sapling Movement',
  production_url: 'https://www.sapling-movement.com',
  eleventyComputed: {
    lang: data => get_lang_key(data.page.fileSlug),
    key: data => get_translation_key(data.page.fileSlug),
    permalink: data => {
      const lang = data.lang;
      return `${languages[lang]?.prefix}${data.slug}/index.html`
    }
  }
}