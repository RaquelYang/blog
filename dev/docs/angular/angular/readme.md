# Angular 介紹

## 安裝 @angular/cli

```sh
npm i -g @angular/cli
```

查看 angular 版本

```sh
ng version
# Angular CLI: 13.3.2
```

安裝 vscode angular 套件  
套件：Angular Extension Pack

## 建立 AngularCli

```sh
ng new demo
```

```sh
# 是不是要加入 routing
? Would you like to add Angular routing? 
Yes
# css 預處理器選擇
? Which stylesheet format would you like to use? 
SCSS [https://sass-lang.com/documentation/syntax#scss]
```

用 vscode 打開專案資料夾 `demo`

開啟專案

```sh
npm start
```

## Angular 目錄結構用途

src > app > 主要寫程式的地方  
assets > 靜態檔案 css, js, icon, images

## Angular 基本語法

`app.module.ts`

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

// decorator
export class AppModule {}
```

`app.component.ts`

```ts
// 元件 decorator
@Component({
  // tag 名字 <app-root></app-root>
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
```

加入一個 component 到 app

```sh
# 加入 component 到 app 下面
ng generate component page1
# 簡寫
ng g c page1
```

建立完 component 後資料夾內會有四個檔案

+ page1.component.css
+ page1.component.html
+ page1.component.spec.ts
+ page1.component.ts

另外會 import page1 component 檔案到 `app.modules.ts`

若未指定 module 會找一個離自己最近的 module 來 import

如果最近的 module 有兩個的話則需在後面指定 import 的 module

```sh
ng g component page1 --module=layout.module.ts
```

若要使用在 app 使用 page1 元件

在 `app.component.html` 加入以下 tag 即可使用 page1 元件

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

## 加入靜態資料到 Angular

加入 api folder, assets folder, blog-index.html 靜態檔案複製到 `src` 資料夾內，並且重新啟動網站 [source code]

如果直接在網址上面打 http://localhost:4200/blog-index.html 並不會看到頁面，需在 `angular.json` 檔案內設定 `assets` 路徑，在打包時才會看到搬移的檔案

projects > demo > architect > build > options > assets 內新增

`angular.json`

```json
"assets": [
  "src/blog-index.html",
  "src/api",
  "src/favicon.ico",
  "src/assets"
]
```

新增完後再重啟網站 npm start

在網址列輸入 

http://localhost:4200/blog-index.html

http://localhost:4200/api/db.json 

看網頁即可正常顯示

將靜態網頁 `blog-index.html` 合併到 Angular 專案下

head 的內容不會包含 component

head 的設定需放入 `index.html` 檔案內

將 `index.html` 內的 head 留下 base tag 其餘的資料刪除

貼上位置需在 base 之後

base 為整份網頁所有的超連結預設的基礎

如果貼在 base 之前有可能找不到 js, css 的檔案導致網站壞掉

```html
<base href="/" />
<!-- head 程式碼貼在這邊 -->
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
<link href="/assets/styles/mainapp.css" rel="stylesheet" />
```

複製 `blog-index.html` body 到 `app.component.html` 裡面貼上 

    mac 使用快速鍵 command + p 打開搜尋資料面板，輸入 appcom 快速搜尋檔案

貼完後回到首頁看一下有沒有問題

有報錯打開 fn + F12 看一下 console 錯誤碼

將 hgroup tag 改成 div 即可，因為 Angular 只能接受 html5 的 tag。

## 部署 Angular

```sh
ng build
```

打包完成後會新增 `dist` 資料夾

打開 `index.html` 此時檔案是以壓縮過的檔案

按下 `option + shift + F` 讓檔案重新排版

在 dist 資料夾發現 blog-index.html 但這個並非開發用

只是為了貼上版型，這樣需回到 `angular.json`

在 `assets` 內 `blog-index.html` 刪除

```json
"assets": [
  "src/api",
  "src/favicon.ico",
  "src/assets"
]
```

## Angular 版本升級

使用終端機輸入以下指令，查看 angular 版本

如果版本較舊就終端機會顯示警告黃字

```sh
ng version
```

使用終端機輸入以下指令，則可以自動更新 angular 版本

主要是更新 angular.json 再重新下載新版本的檔案

```sh
ng update
```

`update angular cli`

使用 npm 查看 global 第一層安裝的檔案

```sh
npm list -g --depth=0
# @angular/cli@13.3.2

# 查看目前所安裝在本機 global 套件版本與最新版本
npm outdated -g

# 更新 global 套件
npm install -g @vue/cli @angular/cli
```

## 範本參考變數 (Template reference variables)

### DOM

+ 範本參考變數可以用在任意的 HTML tag 上面，語法為 `#name` = ref + name
+ 在範本內建立一個 name 的區域變數
+ name 的區域變數會儲存該標籤的 DOM 物件
+ 可以透過 「事件繫結」 將 DOM 物件中屬性回傳元件的類別中

`因為 DOM 物件會回傳到元件類別中，所以取名時需注意不可以一樣，以免抓錯值`

```html
<!-- #tKeyword 以免元件屬性相同，可以加入前綴字 (t) -->
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

### directive

+ 如果寫在 directive 上的話，就可以使用該元件的屬性與方法

首先先建立一個 header 的 component

```sh
ng g c header
```

把 `app.component.html` 裡面的 header 搬到 `header.component.html` 裡面

`header.component.html`

```html
<header class="header">...</header>
```

`app.component.html`

```html
...
<app-header #tHeader></app-header>
<section class="container" (click)="tHeader.title = 'Title Change'">
  ...
</section>
```

在 section click 的時候就會改變 header.component.html 裡的 title 屬性

範本參考數變數只能在範本使用，在預設情況下無法在元件讀取

## 安全導覽運算子 safe navigation operator(?.)

從 Sever 拿資料時有可能該欄位沒有值導致版面顯示有問題

若使用安全導覽運算子(?.) 代表該資料可有可無，不會讓頁面版面壞掉

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

## Angular 元件架構

angular 是由各種 component 組成

父子元件可以使用使用屬性繫結、事件繫結來傳遞資料

service 透過相依注入(DI) 注入到特定 component 裡面

當專案越大時就會把相關的元件(component, service)分割成 module(功能模組, Feature Module)

## 模組化架構

終端機輸入以下指令，Angular CLI 會自動幫我們建立 module

```sh
ng g m article
```

建立完 module 後須引入到 app.module.ts 裡才能使用

`app.module.ts`

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
// import ArticleModule
import { ArticleModule } from "./article/article.module";

@NgModule({
  declarations: [AppComponent],
  // import ArticleModule
  imports: [BrowserModule, AppRoutingModule, FormsModule, ArticleModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

另外一種建立方式

建立 module 並自動引入到 app module 裡

```sh
ng g m article -m app
```

將 article.component 中的 articleList 拆成 articleHeader, articleBody 

引入到 articleModule 裡面



要在 article 資料夾建立 articleList 元件，直接在 vscode folder 按下右鍵選擇 `在整合式終端機開啟`

此時開啟終端機的位置就會在 article 資料夾下，打以下指令即可建立 article-list 元件

```sh
ng g c article-list
```

建立完之後需在 articleModule exports articleListComponent

```ts
@NgModule({
  declarations: [
    ArticleListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ArticleListComponent
  ]
})
```

接下來把 `app.component.html` 的 article 搬入 article-list 裡，並在 app.component.html 加入 app-article-list tag

`app.component.ts` data 搬入 article-list.component.ts 裡

在 article-list 下建立 article-header, article-body 

    需注意終端機的位置，在 article 資料夾下

```sh
ng g c article-header
ng g c article-body
```

注意這裡的 article-header, article-body 不需在 articleModule exports 出來，因為它們隸屬於 article-list 內
  
只需 exports article-list

一樣把 header, body 放入該放的 template 裡，並將 tag 寫入 article-list 即可

此時因為元件化導致資料找不到報錯，後續使用 @Input 來處理

在 article-header, article-body 的 ts 內加入 @Input 讓資料傳入子層，記得要 import Input 進來才能用

```ts
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-article-body",
  templateUrl: "./article-body.component.html",
  styleUrls: ["./article-body.component.scss"],
})
export class ArticleBodyComponent implements OnInit {
  @Input() item;

  constructor() {}

  ngOnInit(): void {}
}
```

在 article-list 裡使用屬性繫結綁定父層資料到子層

```html
<article
  class="post"
  id="post{{idx}}"
  *ngFor="let item of data;let idx = index"
>
  <!-- [父層變數]="子層變數" -->
  <app-article-header [item]="item"></app-article-header>
  <app-article-body [item]="item"></app-article-body>
</article>
```

## 生命週期

```ts
export class ArticleHeaderComponent implements OnInit {
  @Input() item;

  // 建構式 > class 被建立時執行 > 基本上不會寫程式在裡面
  // 元件上未初始化，故無法使用屬性，但會使用相依注入 DI
  constructor() {}

  // 元件 property binding 已完成，可以對一些屬性給初始值或發出 ajax 跟後端拿取資料
  ngOnInit(): void {}

  // 銷毀前的 hook, only 1% 使用到,rxjs subscribe() 可能會使用到
  ngOnDestroy() {}
}
```

改一下 `article-list.component.ts` 的資料，先定義一個變數 data 在 ngOnInit() 給這個 data 一個初始值

```ts
export class ArticleListComponent implements OnInit {

  // 定義變數
  data;

  constructor() { }

  ngOnInit(): void {
    // 給初始值
    this.data = [
     ...
    ]
  }
}
```

## @Output

在 article-header 裡面新增一個刪除按鈕

```html
<header>
  ...
  <span>
    <button (click)="deleteList">刪除文章</button>
  </span>
  ...
</header>
```

因為資料由父層傳送到子層，無法直接由子層刪除資料

處理的方式為按下子層的按鈕後通知父層刪除資料

所以子層按鈕只有通知的功能，並無刪除的功能，刪除需由父層來操作

在子層定義一個 `@Output` 送出一個 `EventEmitter` 事件發射器出來

`EventEmitter` import 時要注意從 `@angular/core` import 進來

在 button click 時觸發 deleteList() 的方法

```ts
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

export class ArticleHeaderComponent implements OnInit {
  @Input()
  item: any;
  // 子層定義一個 EventEmitter
  @Output()
  delete = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
  deleteList() {
    // 使用 EventEmitter 裡的 emit 傳 this.item 出去
    this.delete.emit(this.item);
  }
}
```

在 article-list 裡新增事件 `(delete)` 

當子層 click button 時會觸發 (delete) 通知父層

父層則會執行 doDelete($event), $event 為子層傳出來的值

`article-list.component.html`

```html
<article
  class="post"
  id="post{{idx}}"
  *ngFor="let item of data;let idx = index"
>
  <app-article-header
    [item]="item"
    (delete)="doDelete($event)"
  ></app-article-header>
  <app-article-body [item]="item"></app-article-body>
</article>
```

`article-list.component.ts`

```ts
doDelete(item: any) {
  console.log(item);
}
```

點擊按鈕後就會觸發父層 doDelete($event)

\$event 回傳的是要跑回圈的 item

改寫一下 doDelete()

在寫改寫 data.filter 時後面沒有提示訊息，將 data 定義成 array 當 data. 就可以使用陣列的方法

```ts
export class ArticleListComponent implements OnInit {
  data: Array<any> = [];

  doDelete(item: any) {
    this.data = this.data.filter((data: any) => {
      return item !== data;
    });
  }
}
```

接下來嘗試看看可不可以刪除資料，可以刪除代表就成功了

[source code]: https://github.com/doggy8088/angular-zero/
