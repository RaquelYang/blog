# webpack 前端環境建置 part6

### Resolve 

在 webpack 加入 resolve modules 的設定在引入模組時可以省略路徑

webpack.config.js

```js
module.exports = {
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

把 index.js 整理一下，先整理成下面的程式碼

```js
import "../scss/index.scss";
import "../index.html";
```

使用 resolve 可以把路徑改成以下

```js
import "index.scss";
import "index.html";
```

加入 extensions 就不需要加入副檔名


```js
import "index.scss";
import "index.html";

import item from "item";
console.log(item);
```

extensions 可以設定多個，但檔名不能一樣，如果一樣 webpack 會無法分辨出是哪個副檔名的檔案，一般 extensions 只會設定 .js 

使用 resolve 簡化(only 開發) webpack.config.js

output 不能拿掉

原本
```js
module.exports = {
  entry: {
    index: './js/index.js',
    about: './js/about.js'
  }
}
```

簡化後
```js
module.exports = {
  entry: {
    index: 'index',
    about: 'about'
  }
}
```

### Url loader

將過小的圖片轉換成 base64 來減少載入負擔

安裝 url-loader 套件
```sh
npm i url-loader -D
```

在 webpack.config.js 加入設定

```js
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
scss/ sass 那邊規則需要改一下，先把 css 放到 js 裡面再透過 loader 轉換後放到 css 裡面
```js
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
```js
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

隨便找幾張圖片放入 images 資料夾內，然後又出不來了ＱＡＱ

下面留言區作者有找到資源，因爲 webpack5 直接把 url-loader 包在裡面，故不需使用 url-loader，直接使用內建的 asset/inline

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
      }
    ]
  }
}
```

[Webpack5 Asset Module 使用小结](https://juejin.cn/post/7116432242875826190)

這篇文章有提到

- asset/resource：将资源文件输出到指定的输出目录，作用等同于 file—loader；

- asset/inline：将资源文件内容以指定的格式进行编码（一般为 base64），然后以 data URI 的形式嵌入到生成的 bundle 中，作用等同于 url-loader；

- asset/source：将资源文件的内容以字符串的形式嵌入到生成的 bundle 中，作用相当于 raw-loader；

- asset：作用等同于设置了 limit 属性的 url-loader，即资源文件的大小如果小于 limit 的值（默认值为 8kb），则采用 asset/inline 模式，否则采用 asset/resource 模式。

再來實做一下，目前圖片大小為 8.4KB，並無被轉碼成 base64，那在找小一點的圖檔，找了一個 3KB 的圖片確認有轉成 base64

```sh
npm run dev
```

所以 3KB 在 deploy 時在 dist 資料夾裡面不會有圖片輸出，8.4 KB 則會輸出，但目前輸出在外層，並不是在 images 資料夾內

需在 output 加入 assetModuleFilename，這樣輸出就可以在指定資料夾內

```js
module.exports = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: './js/[name].js',
    assetModuleFilename: './images/[hash][ext][query]',
  }
}
```

在 html, scss 加入

```html
<div id="box"></div>
```

```scss
#box {
  width: 300px;
  height: 300px;
  background: url('1.jpeg');
}
```

此時因爲 webpack5 已經 resolve 編譯過，scss background 故不需再寫前面的網址
