# 使用 yarn 安裝 vuepress 與 github 部署

[youtube 教學連結](https://www.youtube.com/watch?v=G7sAfqDqH3s)

這次使用 yarn 來安裝 vuepress 並部署到 github 當作技術文件

先到 github 開一個新專案名稱為 **vuepress** 再使用 gitkraken clone 到自己的電腦，完成以後將 repo initial

然後使用 vscode 打開專案資料夾 **vuepress**

(如果沒安裝 yarn 可以先安裝一下)

```bash
npm install -g yarn
```

接下來建立兩個資料夾

一個 dev 另外一個 docs

```bash
# 資料夾結構
.
├── dev
└── docs
```

進入到 dev 資料夾

```bash
cd dev
```

---

以下為 dev 資料夾

```bash
yarn init
```

初始化時會問你一些問題，看個人怎麼修改，我直接 enter 到底

dev 資料夾就會產生 package.json 把裡面的 "name":"vuepress(你的專案名稱)"

```js
{
  "name": "vuepress",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}
```

輸入下面指令把加入 vuepress

```bash
yarn add -D vuepress
```

再新增一個檔案 .gitignore (輸入 node_modules ) 意思是推到 github 的時候忽略指定資料夾

此時資料夾結構會長這樣

```bash
# 資料夾結構
.
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

接下來在 package.json 加入 scripts 腳本，目的為簡化

```js
 "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
```

package.json 檔案會長這樣

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

如果你懶惰的話可以把 script 指令縮短 (我就懶 :laughing: )

```js
 "scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs"
  }
```

再新增一個資料夾 docs

```bash
# 資料夾結構
.
├── docs
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

進入 docs 資料夾內 (主要攥寫文章都在這邊)

裡面新增 readme.md ( vuepess 的首頁 )

可以隨便打個文字 ( Hello world )

(現在長這樣)

```bash
# 資料夾結構
.
├── docs
│   └── readme.md
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

終端機打入啟動 vuepress

```bash
yarn dev
```

如果成功會顯示 readme.md 的資料

再新增一個 .vuepress

```bash
# 資料夾結構
.
├── docs
│   ├── .vuepress
│   └── readme.md
├── node_modules
├── .gitignore
├── package.json
└── yarn.lock
```

```bash
# 資料夾結構
.
├── docs
│   ├── readme.md
│   └── .vuepress
│       └── config.js
├── package.json
└── yarn.lock
```

在 .vuepress 新增一個設定檔 config.js 裡面要設定一些資訊

```js
module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
};
```

先貼上官網的預設值，在新增個 base ， base 後面的名稱需要為 github 儲存庫的名稱

```js
module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  base: "/vuepress/",
};
```

前置作業終於做完了，接下就可以打包推上 github

先停止終端機並打包

```bash
yarn build
```

build 完以後 .vuepress 會多一個 dist 資料夾

把 dist 檔案複製到最上層的 docs (vuepress 進入點) 再 push 到 github

會後再去設定 github pages 使用 docs 為進入點，最後就完成了！！！
