const client = require('../sanity.js');
const imageUrlBuilder = require('@sanity/image-url');

const builder = imageUrlBuilder(client);

/**
 * 
 * @param {object} param
 * @param {string} param.source - Required: Sanity image object
 * @param {number} param.aspect_ratio - Optional: An aspect ratio in the format 16x9
 * @param {string} alt - The alt tag, has to be defined, at least an empty string
 * @param {string} sizes - Media query to define, which src to load
 * @param {string} loading - Either `lazy` or `eager`
 * @param {string} decoding - Either `sync` or `async`
 */

module.exports = function sanityImage({ source, aspect_ratio, alt = '', sizes = '100w', loading = 'lazy', decoding = 'async' }) {

  // get essential data from asset
  const {
    metadata: {
      dimensions: {
        width: _w,
        aspectRatio: _aspect
      }
    }
  } = source.asset;

  // define widths for output
  let widths = [320, 400, 700, 1200, 2000];

  // filter out widths that are smaller than the actual image
  widths = widths.filter(w => w <= _w);

  const formats = {
    webp:'image/webp',
    jpg: 'image/jpeg'
  };

  // generate sources
  const sources = Object.keys(formats).map(f => {
    const _sources = widths.map(w => {
      const url = builder.image(source).width(w).format(f).url();
      return {
        url,
        w,
        h: Math.round(w / _aspect)
      }
    });
    return {
      format: f,
      mimetype: formats[f],
      srcsets: _sources.map(_s => `${_s.url} ${_s.w}w`).join(', '),
      srcs: _sources
    }
  });

  const img = sources[sources.length - 1].srcs[0];

  const html = `
  <picture>
    ${sources.map(_s => {
      return `
        <source
          type="${_s.mimetype}"
          srcset="${_s.srcsets}"
          sizes="${sizes}"
        />
      `
    }).join('')}
    <img
      alt="${alt}"
      loading="${loading}"
      decoding="${decoding}"
      src="${img.url}"
      width="${img.w}"
      height="${img.h}"
    />
  </picture>`;

  console.log(html);

  return html;
}
