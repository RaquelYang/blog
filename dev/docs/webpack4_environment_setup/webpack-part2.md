# webpack4 前端環境建置 part2

webpack 去讀取其他副檔名的檔案

css : css-loader

** loader 代表 webpack 去解析除了 js 以外的檔案所需要的套件

先到 npm 看一下

```sh
# npm install --save-dev css-loader@1.0.1
npm install --save-dev css-loader
```

直接先安裝 css-loader

在 webpack.config.js 加入 module

```js
module.exports = {
  module: {
    // 規則
    rules: [
      // 每個 ob 中的規則
      {
        // 使用正則表達式來判斷副檔名
        test: /\.css$/,
        // loader 順序由後面向前執行
        // "css-loader" => "style-loader"
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
```

調整一下 js,css 資料夾架構並新增index.css, index.html

```
init
├─index.html
├─package-lock.json
├─package.json
├─webpack.config.js
├─src
|  ├─js
|  | ├─about.js
|  | └index.js
|  ├─css
|  |  └index.css
├─dist
|  ├─about.js
|  └index.js 
```

調整 webpack.config.js js entry 路徑
```js
module.exports = {
  entry: {
    index: './js/index.js',
    about: './js/about.js'
  },
}
```

在 index.html 建立 html template 引入 dist/index.js

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
  
  <script src="./dist/index.js"></script>
</body>
</html>

```
在 css 新增樣式
```css
h1 {
  font-size: 50px;
  color: red;
}

``` 

然後在 entry js (index.js) 引入 css 

```js
import "../css/index.css";
```

引用完後 npm run deploy 會發現 deploy 時會跳 error

```
Module not found: Error: Can't resolve 'style-loader' in '/Users/raquel/Desktop/F2E-4th/init/src'
resolve 'style-loader' in ......
```

他說 module 無法 resolve 'style-loader' 這個東西（因爲還沒安裝）

```sh
# npm i style-loader@0.23.1 -D
npm i style-loader -D
npm run watch
```

這樣 webpack 就可以編譯成功

在 html 加入 h1 tag 打入文字然後再打開 live server 確認 css 有沒有被載入

在 html 只要 import js 就可以吃到 css 樣式 (cool)

### 拆分 css 檔案

```sh
npm i -D extract-text-webpack-plugin@next
```

webpack.config.js

把 css 獨立出來，改完以後 style-loader 就不需要放到 js 裡面了，可以拿掉

```js
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('css/[name].css');

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ "css-loader"]),
      },
    ],
  },
  plugins: [
    extractCSS
  ]
}
```

刪掉 dist folder 再重新 deploy 後會發現多了一個 css 檔案，成功分離～

```sh
npm run deploy
```

### 是否需要獨立 css?

各優點如下

獨立：

減少 style 標籤(html tag)、減少runTime 優先讀取 CSS 、 CSS 單獨暫存、 CSS 單獨載入並行

不獨立：

減少額外 HTTP 請求、JS, CSS 同時載入、減少多餘的 CSS 檔案、組件化更乾淨的架構

## PostCSS + autoprefixer 來幫瀏覽器加入前綴字

```sh
# npm i postcss-loader@3 autoprefixer@9.3.1 -D
npm i postcss-loader autoprefixer -D
```

建立一個 postcss.config.js 檔案

```js
module.exports = {
  plugin: [
    require('autoprefixer')({
      browsers: [
        '> 1%',
        'last 5 versions',
        'Firefox >= 45',
        'iOS >= 8',
        "Safari >= 8",
        "ie >= 10"
      ]
    })
  ]
}
```

到 webpack.config.js 加入 postcss-loader
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ "css-loader", "postcss-loader"]),
      },
    ],
  },
}
```

```sh
npm run start
```

ok 又報錯～

```sh
 Replace Autoprefixer browsers option to Browserslist config.
  Use browserslist key in package.json or .browserslistrc file.

  Using browsers option can cause errors. Browserslist config can
  be used for Babel, Autoprefixer, postcss-normalize and other tools.

  If you really need to use option, rename it to overrideBrowserslist.

  Learn more at:
  https://github.com/browserslist/browserslist#readme
  https://twitter.com/browserslist
```

把 postcss.config.js 改寫

```js
module.exports = {
  plugin: [
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 5 versions',
        'Firefox >= 45',
        'iOS >= 8',
        "Safari >= 8",
        "ie >= 10"
      ]
    })
  ]
}
```

```sh
npm run start
```

可以 start 但沒前綴ＱＱ
