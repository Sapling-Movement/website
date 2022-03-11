const { toHTML: renderHTML } = require('@portabletext/to-html');
const generateImage = require('../shortcodes/image');

const blocks = {
  types: {
    imageWithCaption: ({ value: { image } }) => {
      // console.log(await image({ src: image.asset.url, alt: image.alt }))
      return generateImage({ src: image.asset.url, alt: image.alt })
    }
  }
}

module.exports = async function toHTML(input) {
  return renderHTML(input, { components: blocks });
}
