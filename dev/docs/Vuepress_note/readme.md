# 使用 yarn 安裝 vuepress 與 github 部署

[vuepress 教學連結]

使用 `yarn` 來安裝 `vuepress` 並部署到 github 當作技術文件

先到 github 開一個新專案名稱為 `vuepress` 再使用 gitkraken clone 到自己的電腦，完成以後將 repo initial

然後使用 vscode 打開專案資料夾 `vuepress`

若沒安裝 yarn 可以先安裝

```sh
npm install -g yarn
```

接下來建立兩個資料夾 `dev` 與 `docs`

```sh
# 資料夾結構
.
├── dev
└── docs
```

進入到 dev 資料夾

在 dev 資料夾 init yarn 專案

```sh
cd dev
yarn init
```

初始化時會問你一些問題，看個人怎麼修改

dev 資料夾就會產生 `package.json` 把裡面的 "name": "vuepress(你的專案名稱)"

```json
{
  "name": "vuepress",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

加入 `vuepress`

```sh
yarn add -D vuepress
```

新增 `.gitignore` 裡面打入下列程式碼

```
node_modules
```

意思是推到 github 的時候忽略 node_modules 資料夾

此時資料夾結構會長這樣

```sh
# 資料夾結構
.
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

在 `package.json` 加入 scripts

```json
 "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
```

`package.json` 內容如下

```json
{
  "name": "vuepress",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "vuepress": "^1.9.7"
  },
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

如果你懶惰的話可以把 script 指令縮短 - 我就懶 :laughing:

```js
 "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
```

再新增一個資料夾 `docs`

```sh
# 資料夾結構
.
├── docs
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

進入 `docs` 資料夾內，主要攥寫文章都在這邊

裡面新增 readme.md - vuepress 的首頁

可以隨便打個文字

```sh
# 資料夾結構
.
├── docs
│   └── readme.md
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

啟動 vuepress

```sh
yarn dev
```

如果成功會顯示 readme.md 的資料

再 `docs` 新增一個 `.vuepress`

在 `.vuepress` 新增一個設定檔 `config.js`

```sh
# 資料夾結構
.
├── docs
│   ├── readme.md
│   └── .vuepress
│       └── config.js
├── package.json
└── yarn.lock
```

先貼上官網的預設值，在新增個 base ， base 後面的名稱需要為 github 儲存庫的名稱

`config.js`

```js
// config.js
module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  base: "/vuepress/",
};
```

前置作業終於做完了，接下就可以打包推上 github

先停止終端機並打包

```sh
yarn build
```

build 完以後 `.vuepress` 內會多一個 `dist` 資料夾

把 `dist` 檔案複製到最上層的 `docs` (vuepress 進入點) 再 push 到 github

會後再去設定 github pages 使用 docs 為進入點，最後就完成了！！！

[vuepress 教學連結]: https://www.youtube.com/watch?v=G7sAfqDqH3s
