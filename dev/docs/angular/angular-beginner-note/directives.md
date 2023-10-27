# 三種 Angular 指令 (Directives)

+ 元件型指令
  
  `component`

+ 屬性型指令

  修改元素的外觀或行為 `NgStyle`, `NgClass`

  常使用 NgClass

+ 結構型指令 (Structure Directives)

  新增或刪除 DOM 改變 DOM 結構
  
  `NgIf`, `NgFor`, `NgSwitch` 來控制 `DOM` 結構

  + ngSwitch 前不加星號
  + ngIf, ngFor, ngSwitchDefault, ngSwitchCase 前加星號

## 元件型指令

先打開終端機並建立一個 footer 的 component

```sh
ng g c footer
```

然後把 `app.component.html` 裡面的 footer 搬到 `footer.component.html` 裡面

`footer.component.html`

```html
<footer class="footer">...</footer>
```

再到 `app.component.html` 引入 footer

```html
...
<!-- 元件型指令(directive) -->
<app-footer></app-footer>
```

`footer.component.ts`

```ts
import { Component, OnInit } from "@angular/core";

// @ decorator 宣告一個元件
@Component({
  // 在 html 的 tag
  selector: "app-footer",
  // template 路徑
  templateUrl: "./footer.component.html",
  // template 另外一種寫法(不建議)
  /* template:`
  <div>
    <span>Footer</span>
  </div>
  `  */

  // scss 路徑
  // 這邊的樣式只會套用在自己的元件，因為 Angular 會給一個 attr 綁定在樣式裡面
  /* 如.footer[_ngcontent-kwl-c49] p[_ngcontent-kwl-c49] {
    color: yellow;}
  */
  styleUrls: ["./footer.component.scss"],
  // 若不想加 attr 在樣式表內
  // encapsulation:ViewEncapsulation.Emulated > 預設值
  // .footer p { color: yellow; }
  encapsulation: ViewEncapsulation.None,
})
export class FooterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
```

## 屬性型指令 NgStyle, NgClass

### NgStyle

`範例一`

首先在 header.component.ts 建立變數 counter 並在 changeTitle() 觸發時讓 counter++

```ts
export class HeaderComponent implements OnInit {
  title = "demo";
  url = "http://blog.miniasp.com/";
  counter = 0;
  constructor() {}
  changeTitle(altKey: boolean) {
    if (altKey) {
      this.title = "change title click";
    }
    this.counter++;
  }

  ngOnInit(): void {}
}
```

在 subtitle 上加入 {{ counter }} 以便觀測資料變更，h3 tag 裡面加入 ngStyle

所以每當 click img 時會觸發 changeTitle() 讓 counter++ 連動 h3 字型大小

`header.component.html`

```html
...
<img
  (click)="changeTitle($event.altKey)"
  [attr.data-title]="title"
  [title]="title"
  src="/assets/images/logo.png"
  class="pull-left logo"
  alt="The Will Will Web"
/>
...
<h3 [ngStyle]="{'font-size': 12 + counter + 'px'}">
  技術分享 {{ counter }}
</h3>
```

`範例二`

寫入一個 return function

`header.component.html`

```html
...
<img
  (click)="changeTitle($event.altKey)"
  [attr.data-title]="title"
  [title]="title"
  src="/assets/images/logo.png"
  class="pull-left logo"
  alt="The Will Will Web"
/>
...
<h3 [ngStyle]="getStyle()">
  技術分享 {{ counter }}
</h3>
```

`header.component.ts`

```ts
export class HeaderComponent implements OnInit {
  title = "demo";
  url = "http://blog.miniasp.com/";
  counter = 0;
  constructor() {}
  changeTitle(altKey: boolean) {
    if (altKey) {
      this.title = "change title click";
    }
    this.counter++;
  }

  ngOnInit(): void {}

  getStyle() {
    return { "font-size": 12 + this.counter + "px" };
  }
}
```

`範例三`

`header.component.html`

```html
...
<img
  (click)="changeTitle($event.altKey)"
  [attr.data-title]="title"
  [title]="title"
  src="/assets/images/logo.png"
  class="pull-left logo"
  alt="The Will Will Web"
/>
...
<h3 [style.font-size]="(12 + counter) + 'px'" [style.color]="'red'">
  技術分享 {{ counter }}
</h3>
```

### NgClass

`範例一`

`ngClass` 後面綁定的值為 boolean，當 counter 餘數等於零時會加入 .highlight class

`header.component.html`

```html
<h3 [ngClass]="{'highlight': counter % 2 == 0}">
  技術分享 {{ counter }}
</h3>
```

`header.component.scss`

```scss
.highlight {
  background-color: coral;
}
```

`範例二`

```html
<h3 [class.highlight]="counter % 2 == 0">
  技術分享 {{ counter }}
</h3>
```

## 結構型指令

### ngIf

當 2 餘數等於 0 時整個 DOM 會不見，餘數不等於 0 時就會出現，若 \*ngIf 裡面放入 component directive 當消失在出現時資料會重新 Init (特別注意)

```html
<div id="social-icons" class="pull-right social-icon" *ngIf="counter % 2 == 0 ">
  ...
</div>
```

### ngSwitch

基本語法如下

```html
[ngSwitch]="conditionExpression"
```

conditionExpression > 判斷式
*ngSwitchCase="expression"
expression > 判斷式的值
*ngSwitchDefault > 預設的值

```html
<div [ngSwitch]="conditionExpression">
  <div *ngSwitchCase="expression">output</div>
  <div *ngSwitchDefault>output2</div>
</div>
```

改一下 html 結構

判斷 counter % 2 若值等於 0, 1 顯示不同的 DOM，Default 顯示 NA

```html
<div id="social-icons" class="pull-right social-icon">
  <div [ngSwitch]="counter % 2">
    <div *ngSwitchCase="0">
      <a
        href="https://plus.google.com/+WillHuang"
        title="Will Huang (保哥) on Google+"
        target="_blank"
      >
        <img src="/assets/images/googleplus.png" />
      </a>
    </div>
    <div *ngSwitchCase="1">
      <a
        href="http://blog.miniasp.com/syndication.axd"
        title="RSS 訂閱"
        target="_blank"
      >
        <img src="/assets/images/rss.png" />
      </a>
    </div>
    <div *ngSwitchDefault>NA</div>
  </div>
</div>
```

但若 ngSwitch 使用 div 可能造成跑版問題，可以把 div 改成 ng-container ，在檢查時不會找到 div 這個 tag

```html
<div id="social-icons" class="pull-right social-icon">
  <ng-container [ngSwitch]="counter % 2">
    <ng-container *ngSwitchCase="0">
      <a
        href="https://plus.google.com/+WillHuang"
        title="Will Huang (保哥) on Google+"
        target="_blank"
      >
        <img src="/assets/images/googleplus.png" />
      </a>
    </ng-container>
    <ng-container *ngSwitchCase="1">
      <a
        href="http://blog.miniasp.com/syndication.axd"
        title="RSS 訂閱"
        target="_blank"
      >
        <img src="/assets/images/rss.png" />
      </a>
    </ng-container>
    <ng-container *ngSwitchDefault>NA</ng-container>
  </ng-container>
</div>
```

### ngFor

使用 ngFor 跑文章的內容

先到 api 的資料夾複製 article.json 到 app.component.ts 裡面

app.component.ts

```ts
export class AppComponent {
  keyword = "";
  keywordReset() {
    this.keyword = "";
  }
  data = [
    {
      id: 1,
      href: "...",
      title:
        "...",
      date: "2016/04/30 18:05",
      author: "...",
      category: "Visual Studio",
      summary:
        "<p>由於我只要用 <strong><font color='#ff0000' face='Consolas'>code .</font></strong>就可以快速啟動 Visual Studio Code 並自辦法。</p><p>... <a class='more' href='http://blog.miniasp.com/post/2016/04/30/Visual-Studio-Code-from-Command-Prompt-notes.aspx#continue'>繼續閱讀</a>...</p>",
    },
    ...
  ];
}
```

把 article html 只留下一個其他的刪除，在 article tag 跑 ngFor 迴圈，再把資料帶進 html 裡面

`app.component.html`

```html
<article
  class="post"
  id="post{{idx}}"
  *ngFor="let item of data;let idx = index"
>
  <header class="post-header">
    <h2 class="post-title">
      <!-- 一般用法 -->
      <a [href]="item.href">{{ item.title }}</a>
    </h2>
    <div class="post-info clearfix">
      <span class="post-date">
        <i class="glyphicon glyphicon-calendar"></i>
        {{ item.date }}
      </span>
      <span class="post-author">
        <i class="glyphicon glyphicon-user"></i>
        <a href="http://blog.miniasp.com/author/will.aspx">
          {{ item.author }}
        </a>
      </span>
      <span class="post-category">
        <i class="glyphicon glyphicon-folder-close"></i>
        <!-- 當變數有 '-' (category-link) 時需綁定 item['category-link'] -->
        <a [href]="item['category-link']"> {{ item.category }} </a>
      </span>
    </div>
  </header>
  <!-- 當文章有 html tag 可以使用 innerHtml -->
  <section class="post-body text" [innerHtml]="item.summary"></section>
</article>
```

innerHtml 就算內容加入 script 標籤也不用怕，Angular 會將 innerHtml 轉成字串以免受到 XSS 攻擊
