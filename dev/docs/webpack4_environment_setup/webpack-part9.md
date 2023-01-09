# webpack4 前端環境建置 part9

### entry.js, vendor.js

目前情況是 node_modules 跟自己的 js 放在同一包裡面，當修正檔案時需要在重新打包 node_modules + js，後面做法是將 

node_modules => Vendor.js

js => Entry.js

這樣可以增加打包效率

webpack.config.js

```js
var webpack = require('webpack');
module.exports = {
  resolve: {
    ...
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          enforce: true
        }
      }
    }
  },
  plugins: [
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
      chunks: ['vendor', 'index']
    }),
  ]
}
```

### include, exclude

webpack.config.js

```js
module.exports = {
   module: {
    rules: [
      {
        test: /\.(sass|scss)/,
        use: [
          "style-loader",
          "css-loader", 
          "postcss-loader",
          "sass-loader"
        ],
        include: path.resolve('src/scss'),
        exclude: path.resolve('./node_modules')
      },
    ]
  }
}
```

在 rules 裡面新增 include, exclude webpack 就（不）會在指定的資料夾搜尋，這樣可以在打包的時候速度變快

