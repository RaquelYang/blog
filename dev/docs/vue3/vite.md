# Vue3 + Vite + Tailwind

之前有聽老師稍微介紹 vite，現在來玩一下 vite(其實是要玩 tailwind，但 vue3 直接安裝但 vue add tailwind 有點問題，打不開 tailwind 啊！！！只好上網找可以使用的方式了，官方網站是用 vite + vue3 + tailwind 廢話不多說，來 trytry)

## 安裝

先建立一個 vite ，打開 vscode 在終端機輸入

```sh
npm init vite@latest .
```

下面會出現一些問題

```sh
# 一定要 y 啊(等等等等等)，不然不讓你跑
# 誒都資料夾的東西都不見了，我...還好都傳到 github 上面了，不然就先哭了
# 這邊！要開空的資料夾，不然會跟我一樣蠢
? Current directory is not empty. Remove existing files and continue? y
# 名字看自己需求
? Package name: › test
# 框架選擇 vue (vue3)
? Select a framework: vue
# vue 與 vue-ts 可以選擇，因為我 ts 剛起步除錯能力有限， ts 先不要ＸＤ)
? Select a variant: vue
```

選擇完畢後就會開始安裝，安裝完畢後他會請你輸入下面指令，照打就好

```sh
npm install
npm run dev
```

這樣就可以打開 vite 專案了！！！讚讚
再來要引入 tailwind
先到官網然後看步驟
先安裝 tailwindcss postcss autoprefixer 在初始化 tailwindcss

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

打完上面程式碼後會新增一些設定檔
找到 tailwind.config.js
把 content 內容設定一下

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

接下來到 src/assets 建立一個 css 資料夾再資料夾內再新增 index.css
src/assets/css/index.css
加入以下程式碼

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

接下來在 main.js 引入 css 檔案

```js
import { createApp } from "vue";
import App from "./App.vue";
import "./css/index.css";
createApp(App).mount("#app");
```

接再來來試看看 tailwind 可不可以使用
在 App.vue 的 template 裡面加入一段 tailwind 的標籤並確認樣式有沒有改變

```vue
<div class="bg-red-100">app appa app</div>
```

背景變成淡紅色了！！！代表安裝成功拉～～ yeah !!!!
可以好好玩一下 Tailwind 了～

## 部署

目前都是部署到 github 上面，接下來我們來看看自己完成的程式碼如何部署到 github

下面是 package.json 的 scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
},
```

先打包 build 在輸入第二行確認本地打包有沒有問題

```sh
npm run build
npm run preview
```

沒問題後就要推到 github 拉
跟 vue2 打包相似
先在根目錄建立 .github/workflows/depoly.yml
第二步驟 Install and Build 那邊需要稍微修改一下內容就行拉

```yml
# Action 名稱
name: Deploy
# 觸發時機，當推送到分支 master 時
on:
  push:
    branches: [master]
# 執行的工作
jobs:
  # 工作名稱
  deploy:
    # 執行工作的虛擬機作業系統
    runs-on: ubuntu-latest
    # 工作步驟
    steps:
      # 步驟一：複製程式碼
      - name: checkout
        # 使用的 actions/checkout 複製程式碼
        uses: actions/checkout@v2.3.1
      # 步驟1.5: 設定 nodejs 版本為 17
      - name: setup node
        uses: actions/setup-node@v2
        with:
          node-version: "17.0.0"
      # 步驟二：編譯
      - name: Install and Build
        run: |
          npm install
          npm run build
      # 步驟三：部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          branch: gh-pages
          folder: dist
```

推上去成功以後，去 settings > pages > Source 改成 gh-pages 等待部署完畢就可以打開拉～
完～
