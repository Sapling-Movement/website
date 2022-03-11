const { toHTML } = require('@portabletext/to-html');
const generateImage = require('./image');

const blocks = {
  types: {
    imageWithCaption: ({ value: { image } }) => {
      // console.log(await image({ src: image.asset.url, alt: image.alt }))
      const {
        width,
        height
      } = image.asset.metadata.dimensions;
      const response = generateImage({
        src: image.asset.url,
        alt: image.alt,
        sizes: "(min-width: 732px) 80ch, 100vw",
        width,
        height
      });
      return response;
    }
  }
}

module.exports = function renderHTML(input) {
  return toHTML(input, { components: blocks });
}
