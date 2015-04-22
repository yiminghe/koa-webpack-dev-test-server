var cwd = process.cwd();
var path = require('path');
var packageJson = require(path.join(cwd, 'package.json'));
var port = packageJson.config && packageJson.config.port || 8000;
var app = require('koa')();
require('../')(app);
app.listen(port);
console.log('koa-webpack-dev-test-server start at ' + port);
