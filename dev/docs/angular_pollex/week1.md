# Week1

### 關於 ng-template, ng-container, ng-content

## ng-template

`ng-template` 屬於模板元素預設不顯示，需搭配 `ngIf`, `ngFor`, `ngSwitch` 使用

### `範例一`
```html
<div *ngIf="show">show1</div>
<ng-template [ngIf]="show">show2</ng-template>
<!-- 以下寫法則不會 render -->
<ng-template *ngIf="show">show3</ng-template>
```

另外的用法使用 Template reference variables

當 show 為 true 顯示 div 否則顯示 `#showWorld` 的內容

### `範例二`
```html
<div *ngIf="show; else showWorld">Hello</div>
<ng-template #showWorld>
  <div>World</div>
</ng-template>
<button (click)="show = !show">Toggle show</button>
```

## ng-container

ng-container 它在 DOM 中不會佔元素的位置(空元素)，故使用時不會造成破版問題

以下只會顯示 aaa 的 div

### `範例一`

```html
<ng-container>
  <div>aaa</div>
</ng-container>
```

## ng-content

`ng-content` 使用於組件之間，假設有兩個組件 app(父), main(子) 

兩個 components 當我想另外加資料在 app 的 main 中時即可使用 


### `範例一`

原始資料如下

`app.component.html`
```html
<app-main></app-main>
```

`main.component.html`
```html
<p>main works!</p>
```

將 app 資料放入 main 元件內

`app.component.html`
```html
<app-main>
  <p>APP 要加資料在元件裡面</p>
</app-main>
```

`main.component.html`
```html
<p>main works!</p>
<ng-content></ng-content>
```

當我想加很多資料到元件內各位置的方式， select 可以選擇元素，所以想坐著放碩躺著放都可以

### `範例二`

`app.component.html`
```html
<app-main>
  <p>APP 要加資料在元件裡面</p>
  <div>APP 要加 div 在元件裡面</div>
  <h5 class="h5">APP 要加 h5 在元件裡面</h5>
  <article id="article">APP 要加 id:article 在元件裡面</article>
</app-main>
```

`main.component.html`
```html
<p>main works!</p>

<div style="background:#999">
  <ng-content select="#article"></ng-content>
</div>

<div style="background:#eee">
  <ng-content select="div"></ng-content>
</div>

<div style="background:#999">
<ng-content select=".h5"></ng-content>
</div>
```

+ 參考文章

[Everything you need to know about ng-template, ng-content, ng-container, and *ngTemplateOutlet in Angular]

[Everything you need to know about ng-template, ng-content, ng-container, and *ngTemplateOutlet in Angular]: https://www.freecodecamp.org/news/everything-you-need-to-know-about-ng-template-ng-content-ng-container-and-ngtemplateoutlet-4b7b51223691/
