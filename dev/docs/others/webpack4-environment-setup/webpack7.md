# webpack4 環境建置-7

## Images webpack loader

```sh
npm i -D images-webpack-loader
```

直接在 asset 下面加個 use，會先判斷 image 是否要壓縮再進行 base64 轉換

`webpack.config.js`
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // 圖片小於 8192 KB 則會轉換成 base64
              limit: 8192,
              // hash -> 圖片快取更新的部分
              name: '[path][name].[ext]?[hash:8]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                options: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              }
            }
          }
        ]
      }
    ]
  }
}
```

## copy-webpack-plugin

當檔案不需用到 loader 編譯時，只需要從起始資料夾搬到 dist 資料夾內

```sh
# terminal
# npm i copy-webpack-plugin@4.5.4 -D
npm i copy-webpack-plugin -D
```

`webpack.config.js`

```js
// webpack.config.js
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    extractCSS,
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
],
}
```

新增 assets folder 新增一個 1.txt

```sh
# terminal
npm run deploy
```

部署完畢後可以發現 1.txt 被搬到 assets 裡面

裡面可以放：zip, mp3, 字型檔...等等

但如果在 assets 放入字型檔，在 scss 引入的話會報錯，需在 webpack 內加入規則，放在 scss, css 上面

`webpack.config.js`
```js
// webpack.config.js
module.exports = {
  resolve: {
    modules: [
      // resolve 加入 assets 資料夾
      path.resolve('src/assets'),
    ]
  },
  module: {
    rules: [
      {
        test: /\ (woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]?[hash:8]'
        }
      },
      // ...css
    ]
  }
}
```

`index.scss`

```scss
// index.scss
@font-face {
  font-family: "AAA";
  src: url(~assets/xxx.ttf)
}
```

如果想用 scss 或 js 去讀取其他副檔名的東西時需要寫在 rules 裡面
