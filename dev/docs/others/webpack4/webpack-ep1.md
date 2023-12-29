# webpack4 環境建置 - Ep1

## Init project

需先安裝 node.js, nvm, vscode

用 vscode 打開一個新的專案資料夾

在終端機打入下面指令

```sh
# terminal
# 使用 node v.10
nvm use 10
npm init -y
# 安裝指定版本
# npm i webpack@4.26.0 webpack-cli@3.1.2 --save-dev
npm i webpack webpack-cli --save-dev
```

新增一個檔案 `webpack.config.js`

```js
// webpack.config.js
module.exports = {
  // 進入點
  entry: './index.js',
  output: {
    // 輸出後的名稱
    filename: 'index-bundle.js'
  }
}
```

再新增一個 `index.js` 檔案（進入點）

修改 `package.json` scripts

```json
// package.json
"scripts": {
  // mode development => 快速給開發者，快
  // mode production => code 壓縮，慢
  // 開發環境
  "start": "webpack --mode development",
  "deploy": "webpack --mode production",

},
```

在終端機輸入 npm start

執行後會在資料夾中多一個資料夾 dist/index-bundle.js (此為 webpack 打包後的程式碼)

新增一個 `src` 資料夾，把 `index.js` 丟到此資料夾內

webpack.config.js 新增 path 方法

```js
// webpack.config.js
// 調用 path 方法
var path = require('path');

module.exports = {
  // __dirname 該資料夾的絕對路徑
  // path.resolve() => 將相對路徑或路徑片段解析成絕對路徑
  // index.js 放置的路徑
  context: path.resolve(__dirname, "./src"),
  entry: './index.js',
  output: {
    // output 後的資料夾路徑
    path: path.resolve(__dirname, "./dist"),
    filename: 'index-bundle.js'
  }
}
```

### 使用環境變數 NODE_ENV

+ mac 不需要安裝可以直接讀到值
+ windows 需安裝且 package.json script 前面需加入 cross-env

```sh
# npm i cross-env@5.2.0 --save-dev
npm i cross-env --save-dev
```

安裝好 cross-env 後把 `package.json` script 改寫成以下

```json
// package.json
"scripts": {
  "start": " NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production"
}
```

到 webpack 拿到環境變數 `webpack.config.js` 加入下列程式碼，以便確認有讀到 process.env
```js
// webpack.config.js
console.log(process.env.NODE_ENV);
```

+  mac 可以直接 run
+  windows 需要在 `package.json` script 前面加入 cross-env

```json
// package.json
"scripts": {
  "start": "cross-env NODE_ENV=development webpack",
  "deploy": "cross-env NODE_ENV=production webpack"
}
```

```sh
npm start
```

最後在 `webpack.config.js` 中 mode 改寫成環境變數

```js
// webpack.config.js
module.exports = {
  mode: process.env.NODE_ENV,
  context: path.resolve(__dirname, "./src"),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: 'index-bundle.js'
  }
}
```

這樣就可以在開發環境或正式環境中使用不同的資料

但作者不建議使用 mode 方式拿到環境變數，較推薦使用以下方式直接寫在 scripts

`package.json` scripts

```json
// package.json
"scripts": {
  "start": " NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production"
}
```

webpack 存擋自動編譯(watch) - Hot-reload

把 `package.json` scripts 多加入一個 watch

```json
"scripts": {
  "watch": " NODE_ENV=development webpack --mode development --watch",
  "start": " NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production"
}
```

在終端機執行以下程式碼 

```sh
# terminal
npm run watch
```

即可存擋時及時編譯

webpack 也可以加入多個進入點

`webpack.config.js`

```js
// webpack.config.js
module.exports = {
  context: path.resolve(__dirname, "./src"),
  entry: {
    // entry key 值須跟檔名一樣
    index: './index.js',
    about: './about.js'
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    // 輸出的檔案
    filename: '[name].js'
  }
}
```

```sh
# terminal
npm run deploy
```

在執行打包時，在 dist 就會發現有兩個檔案~~
