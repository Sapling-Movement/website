const client = require('../sanity.js');
const imageUrlBuilder = require('@sanity/image-url');

const builder = imageUrlBuilder(client);

module.exports = function sanityImage({ source, alt, aspect_ratio, sizes = '100w', loading = 'lazy', decoding = 'async' }) {

  if (alt === undefined) throw new Error('Alt has to be specified')

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
      let url, h;
      if (aspect_ratio !== undefined) {
        const [aspect_w, aspect_h] = aspect_ratio.split('x');
        const dec_aspect_ratio = aspect_w / aspect_h;
        h = Math.round(w / dec_aspect_ratio);
        url = builder.image(source).width(w).height(h).format(f).url();
      } else {
        h = Math.round(w / _aspect)
        url = builder.image(source).width(w).format(f).url();
      }
      return {
        url,
        w,
        h
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

  return html;
}
