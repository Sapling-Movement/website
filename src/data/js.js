const { rollupCompile } = require("../utils/rollupCompile");

const targets = {
  "service-worker": "src/js/service-worker.js",
};

// Create an object with the compiled files from each entry defined in targets
module.exports = rollupCompile(targets);
