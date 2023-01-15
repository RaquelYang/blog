# webpack4 環境建置-4

## dev-server

```sh
npm i -D webpack-dev-server@3.1.10
```

在 `webpack.config.js` 加入 devServer 設定

在 output 的下面加入 devServer 設定，此設定為作者的設定，若需要其他設定頁可以到官方網站去詳細設定

```js
// webpack.config.js
module.exports = {
  output: {
    ...
  },
  devServer: {
    compress: true,
    port: 3000,
    stats: {
      asserts: true,
      cached: false,
      chunkModules: false,
      chunkOrigins: false,
      chunks: false,
      colors: true,
      hash: false,
      modules: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false
    }
  }
}
```

到 `package.json` 的 script 加入 dev 指令

```json
// package.json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development --mode development webpack-dev-server"
}
```

```sh
# terminal
npm run dev
```

在 run dev 時會報錯，因爲讀取由前面讀取到後面，當 --mode development 因為還沒讀到 `webpack.config.js` 檔案，所以報錯

```sh
--mode: command not found
```

到 `package.json` 移動一下 --mode development 位置如下

```json
// package.json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development webpack-dev-server --mode development"
}
```

```sh
npm run dev
```

webpack devServer 並不會編譯產生 dist 資料夾

它是把 src 資料夾裡面的內容做預處理存到記憶體內再從記憶體拉出來

在 `package.json` script dev 那邊後面加 --open 時就可以在 run devServer 時可以自動打開 server 瀏覽器

```json
// package.json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development webpack-dev-server --mode development --open"
}
```
