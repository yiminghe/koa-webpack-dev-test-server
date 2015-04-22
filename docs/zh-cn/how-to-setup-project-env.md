# 建立项目开发测试环境

本文将介绍基于 koa, webpack 建立项目开发测试环境


## 依赖项

需要安装以下依赖

```js
{
  devDependencies:{
    "css-loader": "^0.9.1",
    "extract-text-webpack-plugin": "^0.3.8",
    "file-loader": "^0.8.1",
    "jsx-loader": "^0.12.2",
    "koa": "^0.18.1",
    "less-loader": "^2.2.0",
    "url-loader": "^0.5.5",
    "webpack": "^1.7.3",
    "expect.js": "^0.3.1",
    "koa-webpack-dev-test-server": "^1.0.0", // 开发服务器
    "mocha": "~2.2.4",
    "node-jscover": "~0.6.10",  // 覆盖率
    "node-jscover-webpack-loader": "^1.0.0", // webpack 覆盖率工具
  }
}
```

## 建立 webpack 配置文件

必须有 webpack.config.js webpack.dev.config.js webpack.test.config.js，推荐建立 webpack.common.config.js 提取以上三个文件的重复内容

这里特别指出 webpack.test.js，需要配置 node-jscover-webpack-loader 做为 postLoaders:

```js
var assign = require('object-assign');
var common = require('./webpack.common.config');
common.module.postLoaders = [{ // << add subject as webpack's postloader
  test: /\.js$/,
  exclude: /(test|node_modules)\//,
  loader: 'node-jscover-webpack'
}];

common.entry['test/react-router/index-spec'] = ['./test/react-router/index-spec.js'];

module.exports = assign({}, common,{ ... });
```

## 启动 server

两种方式:

### 直接启动

配置 package.json

```js
{
  "scripts":{
    "start":"node --harmony ./node_modules/bin/start"
  }
}
```

默认端口为 8000

### 自己使用 middleware

可以自己建立 koa 的 server 使用开发服务器提供的中间件

```js
var app=require('koa')();
app.use(require('koa-webpack-dev-test-server').middleware());
app.listen(8000);
```

## 源码和测试

### 源码

```
- package.json
- src
   - index.html
   - index-build.html
   - index.js
   - index.css
```

 例如 index.js 的内容为

 ```js
 require('./index.css');
 module.exports={};
 ```

 index.html 内容为

 ```html
 <link href='./index.css' rel='stylesheet'/>
 <script src='./index.js'></script>
 ```

 index-build 推荐为自动生成，里面的地址需要改成 cdn 地址


 ### 测试

```
 - package.json
 - src
 - test
    - runner.html
    - index-spec.js
```

runner.html:

```html
<link rel="stylesheet" href="/node_modules/mocha/mocha.css">
<script src="/node_modules/mocha/mocha.js"></script>
<script src="/node_modules/node-jscover/lib/front-end/header.js"></script>
<script src="/node_modules/node-jscover/lib/front-end/jscoverage-branch.js"></script>
<script src='/node_modules/node-jscover/lib/reporters/mocha/console.js'></script>
<div id="mocha"></div>
<div id="__react-content"></div>
<script>
    mocha.setup('bdd');
</script>
<script src="./index-spec.js"></script>
<script>
    mocha.run();
</script>
```

index-spec.js:

```js
var expect = require('expect.js');

describe('src',function(){
  var instance = require('../src/index.js');

  it('works',function(){
    expect(instance).to.be.ok();
  });
});
```

测试启动时需要设置环境变量 NODE_ENV 为 test

```
NODE_ENV=test npm start
```

#### 覆盖率查看

##### 简单查看控制台

打开 http://localhost:8000/test/runner.html 查看控制台

<img src="http://gtms02.alicdn.com/tps/i2/TB1a9qtHFXXXXcnXFXXhHda2VXX-959-396.png" />

##### 详细信息

打开 http://localhost:8000/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/test/runner.html


<img src="http://gtms03.alicdn.com/tps/i3/TB1nf9uHFXXXXcvXFXXFt3rJFXX-887-362.png" />
<img src="http://gtms04.alicdn.com/tps/i4/TB1oKmvHFXXXXbuXFXXVOnfMXXX-894-538.png" />


## 实例

https://github.com/yiminghe/learning-react
