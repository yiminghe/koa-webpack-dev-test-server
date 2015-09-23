# koa-webpack-dev-test-server

server for dev, test and coverage for koa and webpack

### usage

#### use bin

```
npm install koa-webpack-dev-test-server
```

package.json

```js
{
  config:{
    port: 8000
  }
}
```

webpack.test.config.js

```js
{
  ...
  postLoaders: [{ // << add subject as webpack's postloader
    test: /\.js$/,
    exclude: /(tests|node_modules)\//,
    loader: 'node-jscover-webpack'
  }]
}
```
webpack.dev.config.js

```js
```

#### using api

```js
var app = require('koa')()
app.use(require('koa-webpack-dev-test-server').middleware());
app.listen(9000);
```

for details to see:

https://github.com/yiminghe/koa-webpack-dev-test-server/tree/master/docs

https://github.com/yiminghe/learning-react

### examples

#### coverage

```
npm start
```

open  http://localhost:9000/examples/test.html
