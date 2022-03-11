const Image = require('@11ty/eleventy-img');

module.exports = function imageSyncShortcode(props) {

  const {
    src,
    width,
    height,
    alt,
    sizes,
    loading,
    decoding
  } = props;

  const image_attributes = {
    alt,
    sizes,
    loading: loading ?? 'lazy',
    decoding: decoding ?? 'async',
  }

  const options = {
    widths: [320, 400, 700, 1200, 2000],
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/images/',
    outputDir: './dist/images/'
  }

  Image(src, options);

  let metadata = Image.statsByDimensionsSync(src, width, height, options);

  return Image.generateHTML(metadata, image_attributes);
}
