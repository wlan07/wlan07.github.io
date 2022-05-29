const path = require('path')


module.exports = {
  mode: 'development',
  entry: "./src/data.js",
  output: {
    path: path.join(__dirname, "/src/dist/"),
    filename: "data_bundle.js"
  },
  experiments: {
    topLevelAwait: true,
  },
};