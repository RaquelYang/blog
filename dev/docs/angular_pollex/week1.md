# Week1

### 關於 ng-template, ng-container, ng-content

## ng-template

ng-template 屬於模板元素預設不顯示，需搭配 ngIf, ngFor, ngSwitch 使用

範例一
```html
<div *ngIf="show">show1</div>
<ng-template [ngIf]="show">show2</ng-template>
<!-- 以下寫法則不會 render -->
<ng-template *ngIf="show">show3</ng-template>
```

另外的用法使用 Template reference variables

當 show 為 true 顯示 div 否則顯示 #showWorld 的內容


```html
<div *ngIf="show; else showWorld">Hello</div>
<ng-template #showWorld>
  <div>World</div>
</ng-template>
<button (click)="show = !show">Toggle show</button>
```

## ng-container


## ng-content

* 參考文章

[Everything you need to know about ng-template, ng-content, ng-container, and *ngTemplateOutlet in Angular](https://www.freecodecamp.org/news/everything-you-need-to-know-about-ng-template-ng-content-ng-container-and-ngtemplateoutlet-4b7b51223691/)
