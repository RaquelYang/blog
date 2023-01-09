# webpack4 前端環境建置 part5

### 用 babel 來編譯 js

先來安裝 babel

```sh
npm install babel-loader@8 @babel/core @babel/preset-env -D
```

babel-loader: 轉譯 js

@babel/core: 轉譯時需要呼叫 babel/core (一定要裝)

@babel/preset-env: 可直接用最新版本的 js 去編譯

webpack.config.js setting
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ],
  },
}
```

在資料夾最外層(同 webpack.config.js) 新增一個 babel 設定檔 .babelrc

在設定檔內加入

```
{
  "presets": ["@babel/preset-env"]
}
```

當 webpack 呼叫 loader 時，babel loader 調用 preset-env 編譯器去編譯 js

此時就可以寫 ES6 語法

### 模組化 js

Node 採用 CommonJS 模組化規範

export, required

在 js 中新增一個 obj.js，export 一個 obj

```js
module.exports = {
  name: "Mike"
}
```

在 index.js 中引入

```js
var obj = require('./obj.js');

console.log(obj);
```

在終端機中打

```sh
npm run dev
```

可以發現在 console 面板有印出

```
{
  name: "Mike"
}
```

代表 js 有成功引入

在改寫一下 obj.js

```js
module.exports = function(){
  console.log('module');
}
```

此時 console 會出現一個 function

```
ƒ () {
  console.log('module');
}
```

ES6 模組化寫法

先新增另一個 js, item.js
```js
export default {
  name: "Mike"
}
```
在 index.js 中 import 進來

```js
import item from './item'
console.log('item', item);
```
此時 console 會出現 item 內容
```
item {name: 'Mike'}
```

兩者可以共用，但可能會有 bug 盡可能不要混用，建議使用 import 規範來寫 js 模組

webpack.config.js 無法使用 ES6 來寫，只能使用var required

### Proposal class properties 

到 index.js 裡面建立一個 class

```js
class Main {
  constructor(){
    this.name = 'mike';
    document.querySelector('#link').addEventListener('click', this.logState)
  }

  logState() {
    console.log(this.name);
  }
}

new Main();
```

到 html 加入一個 a link

```html
<a id="link" href="#">link</a>
```
當 click a tag 時會發現並不會如預期印出 this.name，因爲 js 的 this 會指向自己本身，如果只 console this 就會是 a tag 自己

解法之一

```js
class Main {
  constructor(){
    this.name = 'mike';
    document.querySelector('#link').addEventListener('click', this.logState.bind(this))
  }

  logState() {
    console.log(this.name);
  }
}

new Main();
```

雖然可以成功取到值，但此方法會造成效能較差的問題 (bind(this))

解法之二

使用 Proposal class properties 

```sh
npm i @babel/plugin-proposal-class-properties -D
```

到 babel 設定檔加入 plugins (.babelrc)

```
"plugins": ["@babel/plugin-proposal-class-properties"]
```

改寫 class
```js
class Main {
  state = {
    name: "mike"
  }

  constructor(){
    document.querySelector('#link').addEventListener('click', this.logState)
  }

  logState = () => {
    console.log(this.state);
  }
}

new Main();
```
