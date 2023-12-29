# webpack4 環境建置 - Ep6

## babel/polyfill

```sh
npm i @babel/polyfill
```

在 `index.js` 引入 babel/polyfill

編譯跟打包後就會載入到你打包的 js 裏面

```js
// index.js
import 'babel/polyfill';
```

import 後可以使用 async, await 與其他的東西(...)

## Resolve 

在 webpack 加入 resolve modules 的設定在引入模組時可以省略路徑

`webpack.config.js`

```js
// webpack.config.js
module.exports = {
  output: {...},
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/scss'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js']
  }
}
```

把 `index.js` 整理一下，先整理成下面的程式碼

```js
// index.js
import "../scss/index.scss";
import "../index.html";
```

使用 resolve 可以把路徑改成以下

```js
// index.js
import "index.scss";
import "index.html";
```

加入 extensions 就不需要加入副檔名

```js
// index.js
import "index.scss";
import "index.html";

import item from "item";
console.log(item);
```

extensions 可以設定多個，但檔名不能一樣，如果一樣 webpack 會無法分辨出是哪個副檔名的檔案

一般 extensions 只會設定 .js 

使用 resolve 簡化(only 開發) `webpack.config.js`

output 不能使用 resolve

原本 entry `webpack.config.js`
```js
// webpack.config.js
module.exports = {
  entry: {
    index: './js/index.js',
    about: './js/about.js'
  }
}
```

簡化後 `webpack.config.js`
```js
// webpack.config.js
module.exports = {
  entry: {
    index: 'index',
    about: 'about'
  }
}
```

## Url loader

將過小的圖片轉換成 base64 來減少載入負擔

安裝 url-loader 套件

```sh
# terminal
npm i url-loader -D
```

在 `webpack.config.js` 加入設定

一般 limit 設定 8192 KB (官方建議)

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // 圖片小於 8192 KB 則會轉換成 base64
            limit: 8192,
            // hash -> 圖片快取更新的部分
            name: '[path][name].[ext]?[hash:8]'
          }
        }]
      }
    ]
  }
}
```

scss/ sass 那邊規則需要改一下

透過 style-loader 先把 css base64 放到 js 裡面再透過 loader 轉換後放到 css 裡面

`webpack.config.js`
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/i,
        use: [
          "style-loader",
          "css-loader", 
          "postcss-loader",
          "sass-loader"
        ]
      },
    ]
  }
}
```

再到 resolve 新增一個 module，並新增一個 images 的資料夾
`webpack.config.js`
```js
// webpack.config.js
module.exports = {
  resolve: {
    modules: [
      path.resolve('src'),
      path.resolve('src/js'),
      path.resolve('src/scss'),
      path.resolve('src/images'),
      path.resolve('node_modules'),
    ],
    extensions: ['.js']
  },
}
```

隨便找幾張圖片放入 images 資料夾內看有沒有轉成 base64

在 `index.html`, `index.scss` 加入

```html
<!-- index.html -->
<div id="box"></div>
```

```scss
// index.scss
#box {
  width: 300px;
  height: 300px;
  background: url('1.jpeg');
}
```

此時會報錯，因為 webpack 只有對 js 有用，若要在 scss 上寫上縮寫路徑需改成以下

```scss
#box {
  width: 300px;
  height: 300px;
  background: url('~1.jpeg');
}
```


