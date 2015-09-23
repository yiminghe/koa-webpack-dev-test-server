var app = require('koa')();
app.use(require('../').middleware({
  webpackConfigFile: require('path').join(__dirname, './webpack.config.js'),
}));
var port = 9000;
app.listen(port);
