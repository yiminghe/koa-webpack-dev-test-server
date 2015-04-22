var cwd = process.cwd();
var path = require('path');
var NODE_ENV = process.env.NODE_ENV;
var webpackConfig = NODE_ENV === 'test' ? path.join(cwd, 'webpack.test.config') : path.join(cwd, 'webpack.dev.config');
var compose = require('koa-compose');
var webpack = require('webpack');

function extendApp(app, option) {
  app.use(middleware(option));
  return app;
}

function middleware(option) {
  return compose([
    require('koa-webpack-dev-middleware')(webpack(require(webpackConfig)), option.webpack),
    require('koa-node-jscover')({
      onlyLoad: function () {
        return 1
      }
    }),
    require('koa-serve-index')(cwd),
    require('koa-static')(cwd)
  ]);
}

extendApp.middleware = middleware;

module.exports = extendApp;
