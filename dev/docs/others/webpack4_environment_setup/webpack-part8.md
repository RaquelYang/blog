# webpack4 環境建置-8

## ProvidePlugin

使用 webpack 內建的方法把套件換成全域變數，以下使用 jquery 當作範例

這邊不加 -D 是因為打包完後還是需要使用 jquery (非只 for 開發)

```sh
npm i jquery
```

webpack.config.js

```js
var webpack = require('webpack');
module.exports = {
  plugins: [
    extractCSS,
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new webpack.ProvidePlugin({
      // 別名 = jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      axios: 'axios'
    })
  ],
}
```

index.js
```js
console.log($("#box1"));
```

index.html
```html
<div id="box1">123</div>
```

```sh
npm run dev
```

確認 #box1 有被 console 出來，作者不推薦使用這個方式引入全域套件，因為這樣會不知道引入了哪些模組增加 debug 難度，需要在 webpack 設定看(麻煩)

非必要不要使用 ProvidePlugin !!!

### Html Webpack Plugin template

透過 webpack 來自動生成 html

```sh
npm install -D html-webpack-plugin@4
```

在 src 資料夾建立 html 資料夾，把 index.html 放到 html 資料夾內

```
src
├── assets
├── css
├── html
├── images
├── js
└── scss
```

index.html 把內文清乾淨
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>

</body>
</html>
```


webpack.config.js

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    extractCSS,
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new webpack.ProvidePlugin({
      // 別名 = jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      axios: 'axios'
    }),
    new HtmlWebpackPlugin({
      // 模板的標題
      title: "webpack 練習",
      // 模板輸出後的名字
      filename: 'index.html',
      // 模板的路徑
      template: 'html/index.html',
      // viewport -> html viewport
      viewport: 'width=device-width, initial-scale=1.0',
      // 對這個模板載入 index.js
      chunks: ['index']
    }) 
  ],
}
```

把原本 import 的 html 刪掉

index.js

```js
import '../scss/index.scss';

console.log($("#box1"));
```

然後把 rules html file-loader 拿掉，打開 F12 elements 可以發現你面有載入 index.js script 代表 entry js 有引入進去，但可以發現瀏覽器的 title 並沒有改變，需把模板改成以下字串


index.html 
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="<%= htmlWebpackPlugin.options.viewport %>">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>

</body>
</html>
```
若是多個 html 則需在 plugin 下面引入多個 HtmlWebpackPlugin

webpack.config.js

```js
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    extractCSS,
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
    new webpack.ProvidePlugin({
      // 別名 = jquery
      $: 'jquery',
      jQuery: 'jquery',
      'window.jquery': 'jquery',
      axios: 'axios'
    }),
    new HtmlWebpackPlugin({
      // 模板的標題
      title: "webpack 練習",
      // 模板輸出後的名字
      filename: 'index.html',
      // 模板的路徑
      template: 'html/index.html',
      // viewport -> html viewport
      viewport: 'width=device-width, initial-scale=1.0',
      // 對這個模板載入 index.js
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      // 模板的標題
      title: "webpack 練習",
      // 模板輸出後的名字
      filename: 'about.html',
      // 模板的路徑
      template: 'html/about.html',
      // viewport -> html viewport
      viewport: 'width=device-width, initial-scale=1.0',
      // 對這個模板載入 index.js
      chunks: ['about']
    }) 
  ],
}
```
