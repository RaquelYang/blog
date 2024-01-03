# Angular Route

> 以下 Udemy Angular Router In Depth (Angular 17) 課程筆記

## 什麼是 SPA (single page applications)

SPA 是一種網頁應用的架構，在 SPA 中，整個應用程式的所有內容都在一個頁面中呈現。

操作不需要刷新頁面，當使用者在點擊時，動態載入和顯示所需要的新數據。

### 優點

1. 更好的用戶體驗 -> 不需要為每個請求重新加載整個頁面（回應快）
2. 前後端分離 -> 前端主要負責頁面渲染和互動，後端負責提供數據和 API（維護性佳）

### 缺點

1. SEO 較差 -> 資料都是透過 JavaScript 動態渲染，因此搜索引擎的爬蟲無法正確的索引頁面內容
2. JavaScript 檔案過大 -> 隨著 SPA 應用程式變得越來越複雜，其所需的 JavaScript 檔案也會隨之增大

### 缺點解決方式

1. SEO 較差 -> SSR (Server-side Rendering) + CSR (Client-side Rendering)
2. JavaScript 檔案過大 -> 使用 router 技術將 js 切分成更小塊的程式碼

## 環境配置

node version: node 18

source code: [angular-router-course]

branch: 1-start

下載完專案後就開始 coding 吧～

[angular-router-course]: https://github.com/angular-university/angular-router-course
