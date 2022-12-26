# webpack 前端環境建置 part7

### Images webpack loader

```sh
npm i -D images-webpack-loader
```

直接在 asset 下面加個 use，會先判斷是否要壓縮再進行 base64 轉換

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset',
        // 與可以自定義大小
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024 // 4kb
          }
        },
        generator: {
          // 自定義名稱，加入 hash 紀錄路徑來做快取，只要 hash 不一樣就會重新載入圖片 hash
          filename: '[path][name].[ext]?[hash:8]',
        },
        use: {
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
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
        },
      }
    ]
  }
}
```

又報錯 ＱＡＱ 到 webpack 官網看好像要用另外一個

[ImageMinimizerWebpackPlugin](https://webpack.js.org/plugins/image-minimizer-webpack-plugin/#root)

```sh
npm install image-minimizer-webpack-plugin imagemin --save-dev
# imagemin plugin 用到就需要安裝
npm install image-minimizer-webpack-plugin @squoosh/lib --save-dev
npm install image-minimizer-webpack-plugin sharp --save-dev
npm install image-minimizer-webpack-plugin svgo --save-dev
# 優化 imagemin
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng 
imagemin-svgo --save-dev
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
# 反正官網有什麼就裝上去
npm install @squoosh/lib --save-dev
npm install sharp --save-dev
npm install svgo --save-dev
```

```js
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");


```

一直引入失敗ＱＡＱ，下次再弄ㄅ 

--- 


### copy-webpack-plugin

當檔案不需用到 loader 編譯時，只需要從起始資料夾搬到 dist 資料夾內

```sh
npm i copy-webpack-plugin -D
```

webpack.config.js

```js
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({filename: "css/[name].css"}),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" },
      ],
    }),
],
}
```

新增 assets folder 新增一個 1.txt (內容隨便打)

```sh
npm run deploy
```

部署完畢後可以發現 1.txt 被搬到 assets 裡面

裡面可以放：zip, mp3, 字型檔...等等

但如果在 assets 放入字型檔，在 scss 引入的話會報錯，需在 webpack 內加入規則，放在 scss, css 上面
```js
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

### html-webpack-plugin

用 webpack 管理 html, js

```sh
npm i html-webpack-plugin -D
```

新增一個 html folder 把 index.html 放到資料夾內，把裡面的東西全部刪除
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
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Html 的 title',
      // 輸出後的名字
      filename: 'index.html',
      template: './src/html/index.html',
      viewport: 'width=device-width, initial-scale=1.0',
      // entry 的 js
      chunks: ['index'],
      // 在 body 注入，不使用這個會注入在 head
      inject: 'body',
    })
  ]
}
```
在 index.js 把 import index.html 刪除

在 webpack.config.js rules 將 html 拿掉
```js
{
  test: /\.html$/i,
  use:[
    {
      loader: "file-loader",
      options: {
        name: '[path][name].[ext]'
      }
    }
  ]
},
```

```sh
npm run dev
```

打開環境後將開發者工具打開，會發現會自動引入 index.js 檔案，但沒有 meta 設定檔，感覺像是 devServer 在邊的 error 先暫停下ＱＡＱ
