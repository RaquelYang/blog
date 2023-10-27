# Angular 2 表單處理與驗證

[影片 link]

## 什麼是 Angular Forms

- 基本用途
  - 表單資料進行序列化
  - 提供初始預設資料
  - 驗證表單資料
  - 顯示錯誤訊息
- 進階用途
  - 自訂表單控制項(Form Controls)
  - 自訂驗證器(Validators)
  - 動態建立控制項

## Template-driven 介紹

input(view - ControlValueAccessor) 加入 attr ngModel 時可以建立 Model 實體(FormControl)

注意：一定要加 name

```html
<input type="text" ngModel />
```

Model 實體

- value
- valid/invalid
- pristine/dirty
- touched/untouched
- errors

看到表單以後要思考怎麼切它，假如有個輸入地址的表單

表單包含：city, state, street, zip 這四個控制項(可逐一驗證)，這四個控制項可以變成一個 formGroup，formGroup 包含單一 FormControl Model 也提供一些方法可以讓我們存取或是修改的動作，formGroup 的好處就是當 formGroup 內如果有任一的 FormControl invalid 那 formGroup 也會 invalid

## Model-driven 介紹

## Demo - Template-driven

12:00 開始
[demo]

TemplatdrivenComponent 在此 component 進行實作

使用模板字串來驗證 form 表單 `<form #f="ngForm">...</form>`

ngForm 是 Angular 提供的一個

```html
<div class="container">
  <div class="row">
    <form #f="ngForm">
      <div class="mb-3 col-6">
        <label for="exampleFormControlInput1" class="form-label"
          >Article Email</label
        >
        <input
          type="email"
          class="form-control"
          placeholder="Article Email"
          name="email"
          [(ngModel)]="myEmail"
        />
      </div>
      <button type="button" class="btn btn-secondary">Publish Article</button>
    </form>
    {{ f.value | json }}
  </div>
</div>
```

## Demo - Model-driven

[影片 link]: https://www.youtube.com/watch?v=XQ4aCmtjOBM&t=4753s
[demo]: https://stackblitz.com/edit/angular-ivy-24muef?file=src%2Fapp%2Ftemplatdriven%2Ftemplatdriven.component.html
