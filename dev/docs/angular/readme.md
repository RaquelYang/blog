# Angular 介紹

### 安裝 Angular

安裝 @angular/cli

```sh
npm i -g @angular/cli
```

查看 angular 版本

```sh
ng version
# Angular CLI: 13.3.2
```

安裝 vs code angular 套件
套件：Angular Extension Pack

### 建立 AngularCli

建立一個 AngularCli 專案

```sh
ng new demo
```

會詢問你幾個問題

```sh
# 是不是要加入 routing
? Would you like to add Angular routing? Yes
# css 預處理器選擇
? Which stylesheet format would you like to use? SCSS [https://sass-lang.com/documentation/syntax#scss]
```

再用 vscode 打開專案資料夾 (demo) 輸入開啟專案

```sh
npm start
```

### Angular 目錄結構用途

src > app > 主要寫程式的地方
assets > 靜態檔案(css, js, icon, images)

## Angular 基本語法

app.module.ts

```ts
// angular module
@NgModule({
  // view component
  declarations: [AppComponent],
  // import Module
  imports: [BrowserModule, AppRoutingModule],
  // import service
  providers: [],
  // 啟動根元件
  bootstrap: [AppComponent],
})
// dircrator
export class AppModule {}
```

app.component.ts

```ts
// 元件 dircrator
@Component({
  // tag 名字 <app-root></app-root>
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

#### 加入一個 component 到 app

```sh
# 加入 component 到 app 下面
ng generate component page1
# 簡寫
ng g c page1
```

會一個 component 資料夾裡面會有四個檔案

- page1.component.css
- page1.component.html
- page1.component.spce.ts
- page1.component.ts

另外會註冊 page1 檔案到 app.modules.ts

若要使用在 app 使用 page1 元件
在 app.component.html 加入以下 tag 即可使用 page1 元件

```html
...
<app-page1></app-page1>
...
```

查詢建立不同類型的 component

```sh
ng generate -h
# 可以使用以下的 component
# app-shell
# application
# class
# component
# directive
# enum
# guard
# interceptor
# interface
# library
# module
# pipe
# resolver
# service
# service-worker
# web-worker
```

#### 加入靜態資料到 Angular

加入 api folder, assets folder, blog-index.html 靜態檔案複製到 src 資料夾內，並且重新啟動網站

[source code](https://github.com/doggy8088/angular-zero/)

如果直接在網址上面打 http://localhost:4200/blog-index.html 並不會看到頁面，需在 angular.json 檔案設定 assets 資料才可以使用，在 projects > demo > architect > build > options > assets 內新增

angular.json

```json
"assets": [
  "src/blog-index.html",
  "src/api",
  "src/favicon.ico",
  "src/assets"
]
```

新增完後再重啟網站(npm start)，在網址列輸入 http://localhost:4200/blog-index.html, http://localhost:4200/api/db.json 看網頁是否可以正常顯示，若可以顯示代表設定沒問題，如果無法顯示需確認是不是哪裡有打錯。

接下來將靜態網頁 blog-index.html 合併到 Angular 專案下，head 的內容不會包含在 component 裡面，所以 head 裏面的設定需放入 index.html 檔案內

將 index.html 內的 head 留下 base tag 其餘的資料刪除，且貼上位置需在 base 之後。base 為整份網頁所有的超連結預設的基礎。如果貼在 base 之前有可能找不到 js, css 的檔案導致網站壞掉

```html
<base href="/" />
<!-- head 程式碼貼在這邊 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
<link href="/assets/styles/mainapp.css" rel="stylesheet" />
```

接下來複製 blog-index.html body 到 app.component.html 裡面貼上 (tip: 使用 mac 電腦在 vscode 可以使用快速鍵 commamd + p 打開搜尋資料面板，輸入 appcom 搜尋檔案) 貼完後回到首頁看一下有沒有問題

ok 有報錯打開 fn + F12 看一下 console 錯誤碼，將 hgroup tag 改成 div 即可，因為 Angular 只能接受 html5 的 tag。

#### 部署 Angular

在終端機輸入

```sh
ng build
```

在資料夾裡面會新增一個 dist 資料夾，打開 index.html 此時檔案是以壓縮過的檔案，按下 option + shift + F 讓檔案重新排版

在 dist 資料夾發現 blog-index.html 但這個並非開發用，只是為了貼上版型，這樣需回到 angular.json 把
blog-index.html 刪除

```json
"assets": [
  "src/api",
  "src/favicon.ico",
  "src/assets"
]
```

#### Angular 版本升級

使用終端機輸入以下指令，查看 angular 版本，如果版本叫就終端機會顯示警告黃字

```sh
ng version
```

使用終端機輸入以下指令，則可以自動更新 angular 版本，主要是更新 angular.json 再重新下載新版本的檔案

```sh
ng update
```

更新 angular cli
使用 npm 查看 global 第一層安裝的檔案

```sh
npm list -g --depth=0
# @angular/cli@13.3.2

# 查看目前所安裝在本機 global 套件版本與最新版本
npm outdated -g

# 更新 global 套件
npm install -g @vue/cli @angular/cli
```

#### 範本參考變數 (Template reference variables)

> DOM

- 範本參考變數可以用在任意的 HTML tag 上面，語法為 #name = ref-name
- 會在範本內建立一個名為 name 的區域變數
- name 的區域變數會儲存該標籤的 DOM 物件
- 可以透過 「事件繫結」 將 DOM 物件中屬性回傳元件的類別中
  > 因為 DOM 物件會回傳到元件類別中，所以取名時需注意不可以一樣，以免抓錯值

```html
<!-- #tKeyword 以免元件屬性相同，可以加入前綴字 -->
<input
  type="text"
  #tKeyword
  [(ngModel)]="keyword"
  (keyup.escape)="keywordReset()"
  placeholder="請輸入搜尋關鍵字"
  accesskey="s"
/>
<!-- 可以把 keyword.length 改成 tKeyword.value.length -->
<span>字串長度：{{ keyword.length }} 個字</span>
<span>字串長度：{{ tKeyword.value.length }} 個字</span>
```

> directive (component)

- 如果寫在 directive 上的話，就可以使用該元件的屬性與方法

首先先建立一個 header 的 component

```sh
  ng g c header
```

然後把 app.component.html 裡面的 header 搬到 header.component.html 裡面

header.component.html

```html
<header class="header">...</header>
```

app.component.html

```html
...
<!-- #tKeyword 以免元件屬性相同，可以加入前綴字 -->
<app-header #tHeader></app-header>
<section class="container" (click)="tHeader.title = 'Title Change'">
  ...
</section>
```

這樣寫以後在 section click 的時候就會改變 header.component.html 裡的 title 屬性

範本參考數變數只能在範本使用，在預設情況下無法在元件讀取

## 安全導覽運算子 safe navigation operator(?.)

從 Sever (後端)拿資料時有可能該欄位沒有值 (Linebot) 導致版面顯示有問題，若使用安全導覽運算子(?.) 代表該資料可有可無，不會讓頁面版面壞掉

```html
<a [href]="item.href">{{ item?.title | lowercase | slice:0:20 }}</a>
```

Angular 安全導覽運算子只能使用在 html 的 template 裡

## Template 型別錯誤

```html
<!-- 可能會報錯 Angular service language  -->
<a [href]="item.href">{{ item.subject?.title }}</a>
<!-- 改寫成下面這樣 -->
<a [href]="item.href">{{ item['subject']?.title }}</a>
```
