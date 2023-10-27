# 資料繫結的四種方法

+ 內嵌繫結 (Interpolation)
  
  ```html
  {{ xproperty }}
  ```

+ 屬性繫結 (Property Binding)
  
  ```html
  [property] = 'statement'
  ```

+ 事件繫結 (Event Binding)

  ```html
  (event) = someMethod($event)
  ```

+ 雙向繫結 (Two-way Binding)
  
  ```html
  [(ngModel)] = property
  ```

## 內嵌繫結

將資料使用內嵌繫結加入到 html，首先看到 `app.component.ts` 元件內有筆資料 title

```ts
export class AppComponent {
  title = 'demo';
  url = 'http://blog.miniasp.com/';
}
```

進入到 `app.component.html` 約 30 行把 h1 資料取代成為 title 把 href 取代為 url ，並進入到網頁中確認資料是否有傳入

```html
<div class="pull-left">
  <h1><a href="{{ url }}">{{ title }}</a></h1>
  <h3>技術分享</h3>
</div>
```

使用 setTimeout 來更改值，代表我從遠端拿到資料我可以很容易改變網頁上面的數值。

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  constructor() {
    setTimeout(() => {
      this.title = "Raquel web";
    }, 2000);
  }
}
```

發現在 app 裡面有發生錯誤

打開 vscode 終端機跳到問題那邊有顯示第幾行的問題，將他修改成正確語法即可

`修改前`

```html
<table class="calendar" summary="" style=";border-collapse:collapse;"></table>
```

`修改後`

```html
<table class="calendar" summary="" style="border-collapse:collapse"></table>
```

## 屬性繫結

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
}
```

`範例 1`

`app.component.html` 的 href 改成以下程式碼，則為屬性繫結

```html
<div class="pull-left">
  <!-- [href]="url" -->
  <h1><a [href]="url">{{ title }}</a></h1>
  <h3>技術分享</h3>
</div>
```

圖片的 title 則會綁定 title 資料，圖片的 src 綁定 imgUrl

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  imgUrl = "/assets/images/logo.png";
}
```

`範例 2`

`app.component.html`

```html
<img
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

但 data-attribute 無法使用屬性繫結，使用 `[data-title]="title"` 則會報錯

因為 Angular 找不到 img DOM 裡面的 property

如何查看 DOM 的 property > 選到指定的 DOM 右鍵檢查 > 選擇 elements > 下面面板選擇 properties > 即可找到該 DOM 的 property

以 img 為例在 filter 裡面尋找 title, src, class 皆可以找到 property

`app.component.html`

```html
<!-- 範例二 -->
<img
  [data-title]="wrong"
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

但如果想要動態綁定 data-attribute 則要改成以下程式碼，這樣就能動態綁定 attribute

`app.component.html`

```html
<img
  [attr.data-title]="title"
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

## 事件繫結

在 DOM 元件上觸發事件，以下例子為點擊圖片後更換圖片的 title

`app.component.html`

```html
<img
  (click)="changeTitle()"
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

app.component.ts

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  changeTitle() {
    this.title = "change title click";
  }
}
```

### 事件繫結傳入參數 $event

`app.component.html`

```html
<img
  (click)="changeTitle($event)"
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  changeTitle($event: MouseEvent) {
    this.title = "change title click";
    console.log($event);
  }
}
```

此時 changeTitle 傳入的 $event 為 PointerEvent(以前叫 MouseEvent ?)

但在型別定義 PointerEvent 會報錯，maybe ask jane.?

PointerEvent 裡面有許多參數可以使用

+ altKey > 點擊時是否有按 Alt (option)
+ ctrlKey > 點擊時是否有按 Ctrl

### `範例一`

假如需求為按下 Alt (option) 後更換 title 名字，程式碼可以改成以下

app.component.ts

```js
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  changeTitle($event: MouseEvent) {
    if ($event.altKey) {
      this.title = "change title click";
    }
  }
}
```

測試後 click 並無反應，需按著 Alt (option) + click 則可以改變 title

`範例二`

優化以上程式碼

直接在 html 直接傳入 $event.altKey

`app.component.html`

```html
<img
  (click)="changeTitle($event.altKey)"
  [title]="title"
  [src]="imgUrl"
  class="pull-left logo"
  alt="The Will Will Web"
/>
```

因為傳入為 altKey 的值，此型態為 boolean 後續在網頁上測試確認也可以成功更改 title

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  changeTitle(altKey: boolean) {
    if (altKey) {
      this.title = "change title click";
    }
  }
}
```

## 雙向繫結

在 ts 程式裡面新增一個 keyword 變數預設值為空字串

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  keyword = "";
  changeTitle(altKey: boolean) {
    if (altKey) {
      this.title = "change title click";
    }
  }
}
```

在 input 裡面加入`[(ngModel)]="keyword"`

代表雙向綁定 keyword 這個變數，但因為此時 Angular 不認識`[()]`，需在 module 引入 FormsModule 才行

`app.component.html`

```html
<!-- 約 160 行的 search start -->
<!-- Search START-->
<div class="widget search">
  <div class="widget-content">
    <div id="searchbox">
      <input
        type="text"
        [(ngModel)]="keyword"
        placeholder="請輸入搜尋關鍵字"
        accesskey="s"
      />
      <input type="button" value="搜尋" id="searchbutton" />
    </div>
  </div>
</div>
<!-- Search END -->
```

import FormsModule 後就不會報錯

`app.module.ts`

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
// 引入這個才能雙向綁定
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // 引入完需要 import 進 Module
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

此時在更改一下 html 的 input 與下面的文字

```html
<input
  type="text"
  [(ngModel)]="keyword"
  (keyup.escape)="keywordReset()"
  placeholder="請輸入搜尋關鍵字"
  accesskey="s"
/>
<span>關鍵字：{{ keyword }}</span>
<span>字串長度：{{ keyword.length }} 個字</span>
```

`app.component.ts`

```ts
export class AppComponent {
  title = "demo";
  url = "http://blog.miniasp.com/";
  keyword = "";
  changeTitle(altKey: boolean) {
    if (altKey) {
      this.title = "change title click";
    }
  }
  keywordReset() {
    this.keyword = "";
  }
}
```
