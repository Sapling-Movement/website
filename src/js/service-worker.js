const precache = require('workbox-precaching');

precache([
  // todo: dynamically consume localised shell partials
  {url: '/shell-start-de.html', revision: SHELL_START_REV_DE},
  {url: '/shell-start-en.html', revision: SHELL_START_REV_EN},
  {url: '/shell-end-de.html', revision: SHELL_END_REV_DE},
  {url: '/shell-end-en.html', revision: SHELL_END_REV_EN},
]);


