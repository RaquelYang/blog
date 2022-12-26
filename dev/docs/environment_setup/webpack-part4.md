# webpack 前端環境建置 part4

使用 webpack 來建立 server

```sh
npm i -D webpack-dev-server
```

在 webpack.config.js 加入 devServer 設定，在 output 的下面加入 devServer 設定，此設定為作者的設定，若需要其他設定頁可以到官方網站去詳細設定

```js
module.exports = {
  output: {
    ...
  },
  devServer: {
    compress: true,
    port: 300,
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

到 package.json 的 script 加入 dev 指令

```json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development --mode development webpack-dev-server"
}
```

```sh
npm run dev
```

在 run dev 時會報錯，因爲讀取由前面讀取到後面，當 --mode development 因為還沒讀到 webpack.config.js 檔案，所以報錯

```sh
--mode: command not found
```

稍微移動一下 --mode development 位置

```json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development webpack-dev-server --mode development"
}
```

又報錯 ＝） 作者 webpack-dev-server 版本為 3.1.10，目前安裝的版本為 4.11.1 所以已能靠自己來 debug 了，看起來像是 config 的設定寫錯

```sh
[webpack-cli] Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
 - options has an unknown property 'stats'. These properties are valid:
```

決定先將 stats 註解掉，hot 打開 (編譯時重新打包)

```js
module.exports = {
  output: {
    ...
  },
  devServer: {
    compress: true,
    port: 300,
    hot: true,
    // stats: {
    //   asserts: true,
    //   cached: false,
    //   chunkModules: false,
    //   chunkOrigins: false,
    //   chunks: false,
    //   colors: true,
    //   hash: false,
    //   modules: false,
    //   reasons: false,
    //   source: false,
    //   version: false,
    //   warnings: false
    // }
  }
}
```

可以 run 了那就先這樣，有空再來研究一下

應該是 webpack 3 跟 webpack 4 的寫法不同，目前這個無法 hot reloading，後續再看看要怎麼解，先往下走

```
TODO: webpack4 reloading
```

```sh
npm run dev
```

可以成功 run 起來 server 但沒 hot reloading

webpack devServer 並不會編譯產生 dist 資料夾，他是把 src 資料夾裡面的內容做預處理存到記憶體內，再從記憶體拉出來，


在 package.json script dev 那邊後面加 --open 時就可以在 run devServer 時可以自動打開 server 瀏覽器

```json
"scripts": {
  "watch": "NODE_ENV=development webpack --mode development --watch",
  "start": "NODE_ENV=development webpack --mode development",
  "deploy": "NODE_ENV=production webpack --mode production",
  "dev": "NODE_ENV=development webpack-dev-server --mode development --open"
}
```
