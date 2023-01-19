# template form 表單

## Template Driven From

這次使用 stackblitz 來建立這次範例的 [demo]

首先先引入 bootstrap

在左側 dependencies enter package name 收尋 bootstrap 安裝後會問要不要加裝套件

直接 enter 就好了，再將 bootstrap 的樣式表引入 style.css

```css
@import "~bootstrap/dist/css/bootstrap.min.css";
```

引入完後測試一下有沒有成功，打入 button 後看有沒有吃到樣式，有吃到樣式就可以開始囉

`app.component.html`

```html
<button class="btn btn-secondary">Publish Article</button>
```

先建立一個 component 引入到 app.module.ts 並引入到模板中

建立一個 form 表單，我直接拿 bootstrap 範例預設的表單來改 [表單內容]

確認在 `app.model.ts` 有 imports `FormsModule`

```ts
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [ FormsModule],
})
```

在 app 裡建立 article.model.ts 裡面定義 Article, Author, ArticleResponse ，可以查看 [Article]

定義 title, description, body 變數

`editor.component.ts` 

```ts
import { ArticleResponse, Article, Author } from "../article.model";

export class EditorComponent implements OnInit {
  title: string;
  description: string;
  body: string;

  constructor() {}

  ngOnInit() {}
}
```

input 使用 ngModel 綁定 title 資料

```html
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article Title</label>
  <input
    type="text"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article Title"
    [(ngModel)]="title"
  />
</div>
...
```

```sh
# Error 為如果 ngModel 在 form tag 裡面的話，必須給 name

Error: If ngModel is used within a form tag, either the name attribute must 
be set or the form control must be defined as 'standalone' in ngModelOptions.
```

所以 input 改成以下程式碼，加個 `name="title"`

```html
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article Title</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article Title"
    name="title"
    [(ngModel)]="title"
  />
</div>
...
```

使用樣板變數來獲得表單內所有內容

在 form 中加入樣板變數

ngForm 會建立出一個 FormGroup 裡面會包含一些東西

```html
{{ f.value | json }}
<form #f="ngForm">...</form>
```

這邊得到的值是 input 裡面的 name 跟 ngModel 所綁定的名稱無關係

這樣可以再改寫 input 成以下程式碼，把原本的 ngModel 改寫

ngModel 代表的是 FormControl

    ngModel 可以從 angular 原始碼找出來，它繼承了 NgControl

```html
...
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article Title</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article Title"
    name="title"
    ngModel
  />
</div>
...
```

如果要放預設值，需改成 `[(ngModel)]` 

```html
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article Title</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article Title"
    name="title"
    [(ngModel)]="title"
  />
</div>
```

```ts
title = "lorem@scd.com";
```

假如目前的需求是某個表單需要驗證還能填寫，這樣需改寫 input

input 加上 #t="ngModel"， ngModel 會回傳 

FormControl 的東西，下面的 required 為 !!t.value

再將 t.valid 列印出來

以下寫法代表假如說第一個 input 有值，那第二個 input 為必填；

如果第一個 input 沒有值，第二的 input 為非必填

```html
{{ f.valid }}
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article Title</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article Title"
    name="title"
    [(ngModel)]="title"
    #t="ngModel"
  />
</div>
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Article about</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Article about"
    name="email"
    ngModel
    [required]="!!t.value"
  />
</div>
```

如果要在表單 valid 時才能送出，直接綁定 disabled 屬性

```html
<button type="button" class="btn btn-secondary" [disabled]="!f.valid">
  Publish Article
</button>
```

    Template driven form 可以了解原理，但在專案上盡量不要使用

## Model driven form

概念為把 FromControl 先在 class 裡面定義好

定義完之後在 template 裡面實作出對應的 FromControl

首先需 import ReactiveFormsModule

`app.module.ts`

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { EditorComponent } from "./editor/editor.component";

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, EditorComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

把 `editor.component.ts` 原本的資料結構改寫成 FormGroup 與 FormControl

```ts
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.css"],
})
export class EditorComponent implements OnInit {
  formData = new FormGroup({
    title: new FormControl(),
    email: new FormControl(),
    description: new FormControl(),
    body: new FormControl(),
  });
  constructor() {}

  ngOnInit() {}
}
```

把原本的 form 使用 template driven 改成使用 form > formGroup 並綁定 formData

原本的 name 改成 formControlName 這樣就會從 formGroup 裡拿到它的屬性

取值的方式使用
```
{{ formData.value | json }}
```

一開始會給 null (因為沒給預設值) 而非空值

若要給預設值直接在 new FormControl('abc') 即可

`editor.component.html`
```html
{{ formData.value | json}}
<form [formGroup]="formData">
  <div class="mb-3 col-6">
    <label for="exampleFormControlInput1" class="form-label"
      >Article Title</label
    >
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Article Title"
      formControlName="title"
    />
  </div>
  <div class="mb-3 col-6">
    <label for="exampleFormControlInput1" class="form-label"
      >Article about</label
    >
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Article about"
      formControlName="email"
    />
  </div>
  <div class="mb-3 col-6">
    <label for="exampleFormControlTextarea1" class="form-label"
      >Write your article</label
    >
    <textarea
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3"
      formControlName="body"
    ></textarea>
  </div>
  <div class="mb-3 col-6">
    <label for="exampleFormControlInput1" class="form-label">Enter tags</label>
    <input
      type="email"
      class="form-control"
      id="exampleFormControlInput1"
      placeholder="Enter tags"
      formControlName="description"
    />
  </div>
  <button type="button" class="btn btn-secondary" [disabled]="formData.invalid">
    Publish Article
  </button>
</form>
```

若想給預設值如下

```ts
formData = new FormGroup({
  title: new FormControl("title"),
  email: new FormControl("lore@sdf.com"),
  description: new FormControl(""),
  body: new FormControl(""),
});
```

button 若要符合才可點選的話，直接從 ts 那邊寫

先知道該怎麼取得 FormGroup 裡面的值

```ts
export class EditorComponent implements OnInit {
  formData = new FormGroup({
    title: new FormControl("aaa"),
    email: new FormControl(""),
    description: new FormControl(""),
    body: new FormControl(""),
    // group: new FormGroup({
    //   field: new FormControl(''),
    // }),
  });

  constructor() {}

  ngOnInit(): void {
    // 取得 formData 的值的兩種方式
    // 多層寫法較複雜
    // this.formData.controls.group.controls.field;
    // 單層寫法 1
    // this.formData.controls.title;
    // 很多層可以這樣寫，TS 嚴謹模式也可以使用
    // this.formData.get('group.field')
    // 單層寫法 2
    // this.formData.get("title");
  }
}
```

接下來我們要監聽當 title 屬性改變的時使用 valueChanges 並且訂閱它

會 console 出修改後的值

```ts
ngOnInit(): void {
  this.formData.controls.title.valueChanges.subscribe({
    next: (v) => {
      console.log(v);
    },
  });
}
```

下面改寫原本 template driven form > formControl driven form

```ts
ngOnInit(): void {
  // 持續監聽，元件摧毀就會跟著消失
  this.formData.controls.title.valueChanges.subscribe({
    next: (v) => {
      if (!!v) {
        // 如果 title 有值，那 email 需要放置 Validators
        this.formData.controls.email.setValidators([Validators.required]);
      } else {
        // 如果沒有值就不需要 Validators
        this.formData.controls.email.clearValidators();
      }
      // 驗證表單狀態
      this.formData.controls.email.updateValueAndValidity();
    },
  });
}
```

取 formData 的值的方式，兩個都可以取到值，後面使用下面的方式來演示

```ts
ngOnInit(): void{
  // 方法一
  console.log(this.formData.value);
  // 方法二
  this.formData.valueChanges.subscribe({
    next: (value) => console.log(value),
  });
}
```

```ts
export class EditorComponent implements OnInit {
  formData = new FormGroup({
    title: new FormControl("aaa"),
    email: new FormControl(""),
    description: new FormControl(""),
    // 預設 disabled formData 的 body
    body: new FormControl({ value: "", disabled: true }),
  });
  ngOnInit(): void {
    // 在這拿到的 formData 不包括 disabled 的 data，這邊拿不到 body 的資訊，所以傳到後端的資料會少 body
    this.formData.valueChanges.subscribe({
      next: (value) => {
        console.log(value);
        // 這個方式就可以連 disabled 的 FormControl 都可以拿到
        // 如果要傳到後端要注意這點
        console.log("getRawValue", this.formData.getRawValue());
      },
    });
    this.formData.controls.title.valueChanges.subscribe({
      next: (v) => {
        if (!!v) {
          this.formData.controls.email.setValidators([Validators.required]);
        } else {
          this.formData.controls.email.clearValidators();
        }
        // 這邊如果開啟代表會觸發 valueChanges
        this.formData.controls.email.updateValueAndValidity({
          // 避免不必要的異動偵測行為，要把 emitEvent 關掉
          emitEvent: false,
        });
      },
    });
  }
}
```

接下來介紹當輸入 input 時資料加入到 Array 裡面

首先先新增 tag, tags 儲存資料的變數

`editor.component.ts`

```ts
formData = new FormGroup({
  title: new FormControl("aaa"),
  email: new FormControl(""),
  description: new FormControl(""),
  body: new FormControl({ value: "", disabled: true }),
  tag: new FormControl(""),
  // group: new FormGroup({
  //   field: new FormControl(''),
  // }),
});
tags = [];
```

### `方式一`

下面有個 ul > li 來跑 tag 的迴圈
然後在 input 那邊加入 keyup.enter 觸發 addtag 方法

`editor.component.html`

```html
<div class="mb-3 col-6">
  <label for="exampleFormControlInput1" class="form-label">Enter tags</label>
  <input
    type="email"
    class="form-control"
    id="exampleFormControlInput1"
    placeholder="Enter tags"
    formControlName="tag"
    (keyup.enter)="addtag()"
  />
  <ul>
    <li *ngFor="let tag of tags">{{ tag }}</li>
  </ul>
</div>
```

`editor.component.ts`

```ts
addtag() {
  this.tags.push(this.formData.controls.tag.value);
  // 若要清空 formData 的 form controls 需要使用 setValue
  this.formData.controls.tag.setValue('', {
      emitEvent: false,
    });
}
```

這樣就能新增輸入的 tag 在下方

使用 formArray 改寫

```ts
formData = new FormGroup({
  title: new FormControl("aaa"),
  email: new FormControl(""),
  description: new FormControl(""),
  body: new FormControl({ value: "", disabled: true }),
  tag: new FormControl(),
  // 可以放FormGroup, FormControl, 在 reactForm 裡面有
  tagList: new FormArray([]),
});
tags = [];
```

迴圈改成用 tagList.controls 來跑

```html
<div formArrayName="tagList">
  <ul>
    <!-- <li *ngFor="let tag of tags">{{ tag }}</li> -->
    <li *ngFor="let tagControl of tagList.controls">
      <input type="text" [formControl]="$any(tagControl)" />
    </li>
  </ul>
</div>
```

```ts
get tagList() {
  return this.formData.controls.tagList as FormArray;
}

addtag() {
  // 在 FormArray push FormControl
  this.tagList.push(new FormControl(this.formData.value.tag));
  // this.tags.push(this.formData.controls.tag.value);
  this.formData.controls.tag.setValue('', {
    emitEvent: false,
  });
}
```
```html
此時在 <input type="text" [formControl]="$any(tagControl)" /> 修改值時會直接改動

在迴圈在跑時添加 idx 變數並加入 <button (click)="remove(idx)">x</button>
```
```html
<div formArrayName="tagList">
  <ul>
    <!-- <li *ngFor="let tag of tags">{{ tag }}</li> -->
    <li *ngFor="let tagControl of tagList.controls; let idx = index">
      <input type="text" [formControl]="$any(tagControl)" />
      <button (click)="remove(idx)">x</button>
    </li>
  </ul>
</div>
```

36:00 button remove 那邊有 bug QQ，影片好像也有 bug 的樣子

[part2]

因為 tagList formControl 有點複雜，把它用一個 component 去接

先建立一個 editor/tag-select component

記得在 module 引入 editor/tag-select component

然後把 tagList 的 html 貼到 editor/tag-select component，然後 button type="button" 不然預設為 submit 會直接送出表單

```html
<label for="exampleFormControlInput1" class="form-label">Enter tags</label>
<input
  type="email"
  class="form-control"
  id="exampleFormControlInput1"
  placeholder="Enter tags"
  [formControl]="tag"
  (keyup.enter)="addtag()"
/>
<div>
  <ul>
    <!-- <li *ngFor="let tag of tags">{{ tag }}</li> -->
    <li *ngFor="let tagControl of tagList.controls; let idx = index">
      <input type="text" [formControl]="$any(tagControl)" />
      <button type="button" (click)="remove(idx)">x</button>
    </li>
  </ul>
</div>
```

搬移程式碼後會報錯，因為 tag-select 變數還沒給，那就一個一個補上去吧

```ts
import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl } from "@angular/forms";

export class TagSelectComponent implements OnInit {
  tag = new FormControl();
  tagList = new FormArray([]);
  constructor() {}

  ngOnInit() {}
  addtag() {
    this.tagList.push(new FormControl(this.tag.value));
    this.tag.reset();
  }
  remove(idx) {
    this.tagList.removeAt(idx);
  }
}
```

這樣就可以完成新增、修改、刪除的動作了 yeah!!!!

但因為將這部分元件化了，尚未把值傳到父層去，此時需實做 ControlValueAccessor

```ts
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, ControlValueAccessor } from '@angular/forms';
export class TagSelectComponent implements OnInit, ControlValueAccessor {
  ...
}
```

ControlValueAccessor 裡面 Angular 提供了四個方法

```ts
// onTouched;

// ControlValueAccessor
// Input
writeValue(obj: string[]): void {
  this.tagList.clear();
  obj.forEach((x) => this.tagList.push(new FormControl(x)));
}
// Output 傳一個callback function 把值回傳回去
registerOnChange(fn): void {
  this.tagList.valueChanges.subscribe({
    next: (value) => {
      fn(value);
      if (!!this.onTouched) {
        this.onTouched();
      }
    },
  });
}
// 有沒有被碰過
registerOnTouched(fn) {
  this.onTouched = fn;
}
// 當設定 disable/enable 時所對應的畫面操作
setDisabledState() {}
```

停在 part2 10:00 左右

[demo]: https://www.youtube.com/watch?v=n9OuCW9Nrfw&t=2197s
[表單內容]: https://stackblitz.com/edit/angular-ivy-24muef?file=src%2Fapp%2Feditor%2Feditor.component.html
[Article]: https://stackblitz.com/edit/angular-ivy-24muef?file=src%2Fapp%2Feditor%2Feditor.component.html
[part2]: https://www.youtube.com/watch?v=eCedsPG_rxo&t=13s
