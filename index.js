var cwd = process.cwd();
var path = require('path');
var NODE_ENV = process.env.NODE_ENV;
var webpackConfig = NODE_ENV === 'test' ? path.join(cwd, 'webpack.test.config') : path.join(cwd, 'webpack.dev.config');
var compose = require('koa-compose');
var webpack = require('webpack');
var assign = require('object-assign');

function extendApp(app, option) {
  app.use(middleware(option));
  return app;
}

function middleware(option) {
  option = option || {};
  return compose([
    require('koa-webpack-dev-middleware')(webpack(require(option.webpackConfigFile ? option.webpackConfigFile : webpackConfig)), option.webpack),
    require('koa-node-jscover')(assign({
      onlyLoad: function () {
        return 1
      }
    }, option.nodeJscover || {})),
    require('koa-serve-index')(cwd),
    require('koa-static')(cwd)
  ]);
}

extendApp.middleware = middleware;

module.exports = extendApp;
