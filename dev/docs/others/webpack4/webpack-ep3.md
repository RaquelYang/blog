# webpack4 環境建置 - Ep3

## 資料夾結構

目前較主流的開發方式為 src 下為開發資料夾、 dist 編譯後檔案資料夾

所以我們先把 index.html 放到 src 資料夾內

新增 `.gitignore` 裡面加入要忽略的資料夾

```sh
node_modules
```

```sh
# terminal
tree gitignore
```

出現目前資料夾結構如下

```sh
.
├── dist
│   ├── about.js
│   ├── css
│   │   └── index.css
│   └── index.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── css
│   │   └── index.css
│   ├── index.html
│   └── js
│       ├── about.js
│       └── index.js
└── webpack.config.js
```

在 `index.js` 裡面 import index.html

```js
// index.js
import "../index.html";
```

因爲 html 不需被瀏覽器編譯，所以不需要安裝 html loader

我們只需要把 index.html 搬檔案從 src 搬到 dist 裡面去 (使用 file-loader)

```sh
# terminal
# npm i -D file-loader@2.0.0
npm i -D file-loader
```

`webpack.config.js` 裡面加入 html rules

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/i,
        use:[
          {
            // 所有的檔案都可以用 file-loader 只要規則寫好就行了
            loader: "file-loader",
            options: {
              // path -> 路徑, name -> 檔名, ext -> 副檔名
              name: '[path][name].[ext]'
            }
          }
        ]
      },
    ],
  },
}
```

用 webpack 打包後看一下結果

```sh
# terminal
npm run deploy

```

`dist` 資料夾結構，可以看到 index.html 成功被打包

```sh
.
├── dist
│   ├── about.js
│   ├── css
│   │   └── index.css
│   ├── index.html
│   └── index.js
```

調整一下`webpack.config.js` js 輸出的路徑

```js
// webpack.config.js
module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: './js/[name].js'
  }
}
```

刪除原本 dist 資料夾後再打包

`dist` 資料夾結構 js 包在資料夾內

```sh
.
├── dist
│   ├── css
│   │   └── index.css
│   ├── index.html
│   └── js
│       ├── about.js
│       └── index.js
```

在html src index.js 路徑也可以調整一下，再引入 CSS 進來

`index.html`

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- 引入 css -->
  <link rel="stylesheet" href="./css/index.css">
</head>
<body>
  <h1>變顏色</h1>
  <!-- 調整 js 引入的位置 -->
  <script src="./js/index.js"></script>
</body>
</html>

```

## sass-loader

```sh
# terminal
# npm i -D sass-loader@7.1.0 node-sass@4.10.0
npm i -D sass-loader node-sass
```

在 `webpack.config.js` 加入編譯 scss rules

```js
// webpack.config.js
module.exports = {
  module : {
    rules: {
      test: /\.(sass|scss)/i,
      use: [
        "style-loader",
        "css-loader", 
        "postcss-loader",
        "sass-loader"
      ]
    }
  }
}
```

在 src 建立 scss 資料夾並新增一個 `index.scss` 檔案

寫一些樣式基本樣式

到 `index.js` 中先刪除 css 再引入 `index.scss`

```js
// index.js
import "../scss/index.scss";
import "../index.html";
```

刪除 dist 資料夾後 deploy 會發現沒有獨立的 scss，因為這邊用 "style-loader" 所以 scss 會包在 index.js 裡面

接下來把 scss 分檔

`webpack.config.js`

```js
// webpack.config.js
module.exports = {
  module : {
    rules: {
      test: /\.(sass|scss)$/i,
      use: extractCSS.extract([
        "css-loader", 
        "postcss-loader",
        "sass-loader"
      ])
    }
  }
}
```

部署以後會發現有個 css 的檔案，那就是 scss 經由 webpack 編譯後輸出的 css
