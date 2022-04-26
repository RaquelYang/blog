# RxJS

教學影片

- [RxJS 6 新手入門](https://www.youtube.com/watch?v=BA1vSZwzkK8)
- [一小時帶你掌握 RxJS 關鍵知識](https://www.youtube.com/watch?v=uEL0Fl-uWpc)

### RxJS 是什麼

RxJS 是一套藉由 Observable sequences 來組合非同步行為和事件基礎程序的 Library！

### RxJS 重要的五個基本東西

• Observable 可觀察的物件 – 代表一個觀察者，他可以去幫助我們持續監聽某一個事件或是做一件事情

• Observer 觀察者物件 – 代表一個接收觀察者情報的人，他可以得到觀察者所觀察的內容。其中有 next,error,complete 三個參數來幫助你在監聽到事件的時候可以做的事情

• Subscription 訂閱物件 – 代表發布命令請觀察者開始監聽

• Operators 運算子 – 在 RxJS 當中，有一百多個 Operators 可以使用，其中像是 filter 他可以幫我們去過濾資料

• Subject 主體物件 – 主要用來廣播收到的事件資料給多個 Observer (觀察者) 讓我們不需要一直執行 Subscribe

[參考資料](https://dotblogs.com.tw/leo_codespace/2017/05/12/133807)

### 解決的問題

處理複雜的非同步問題
