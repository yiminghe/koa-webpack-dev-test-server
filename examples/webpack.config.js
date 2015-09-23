var webpack = require("webpack");
var path = require('path');

module.exports = {
  devtool: "#source-map",

  entry: {
    'examples/tests/index.spec': [path.join(__dirname, './tests/index.spec.js')]
  },
  module: {
    postLoaders: [{ // << add subject as webpack's postloader
      test: /\.js$/,
      exclude: /(tests|node_modules)\//,
      loader: 'node-jscover-webpack'
    }],
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: "[name].js",
    chunkFilename: "[name].js"
  }
};
