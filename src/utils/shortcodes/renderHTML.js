const { toHTML } = require('@portabletext/to-html');
const generateImage = require('./image');
const sanityImage = require('./sanityImage');

const serializers = {
}

const blocks = {
  types: {
    imageWithCaption: ({ value: { image,  } }) => {
      // const {
      //   width,
      //   height
      // } = image.asset.metadata.dimensions;
      // const imageHTML = generateImage({
      //   src: image.asset.url,
      //   alt: image.alt,
      //   sizes: "(min-width: 732px) 80ch, 100vw",
      //   width,
      //   height
      // });
      // return imageHTML;
      return sanityImage({
        source: image,
        alt: image.alt,
        aspect_ratio: image.aspectRatio,
        cssClass: 'full-width rounded-corners'
      });
    }
  },
  marks: {
    internalLink: ({ value, children }) => `
      <a href="${value.slug}">${children}</a>
    `,
    externalLink: ({ value, children }) => `
      <a href="${value.href}" target="_blank" rel="noreferrer,noopener,nofollow">${children}</a>
    `
  }
}

module.exports = function renderHTML(input) {
  return toHTML(input, { components: blocks });
}
