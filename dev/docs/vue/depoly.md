# 部署 vue 至 github

久久沒用怕忘記，記錄一下

首先在根目錄新增一個 vue.config.js 設定以下的程式碼

```js
module.exports = {
  publicPath: "./",
  chainWebpack(config) {
    config.plugin("html").tap((args) => {
      args[0].title = "網站名稱";
      return args;
    });
  },
};
```

然後再新增 .github/workflows/deploy.yml 的資料夾與檔案（給 github 自動部署用）

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
          npm run build-linux
        env:
          VUE_APP_API: ${{ secrets.VUE_APP_API }}
      # 步驟三：部署
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          branch: gh-pages
          folder: dist
```

記得 package.json scripts 需更改，要有 “build-linux” 不然部署會報錯

```json
"scripts": {
  "serve": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve",
  "build": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service build",
  "lint": "SET NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service lint",
  "serve-linux": "export SET NODE_OPTIONS=--openssl-legacy-provider; vue-cli-service serve",
  "build-linux": "export SET NODE_OPTIONS=--openssl-legacy-provider; vue-cli-service build",
  "lint-linux": "export SET NODE_OPTIONS=--openssl-legacy-provider; vue-cli-service lint"
},
```

--- end ---
