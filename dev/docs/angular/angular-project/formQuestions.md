# 表單問題選擇實作

### 需求：
+ 有一個兩頁的表單當選擇完畢送出時要去後端打 API 拿到資料回傳資料顯示到前端
+ 第一頁選擇性別與年齡
+ 第二頁會隨著 A, B, C的問卷問題有所不同，點選回答時即可更換資料、預設為第一個選項、問題皆為單選題

### 實作：

先用 service 寫出資料結構

`questions.service.ts`

```ts
data = [
  {
    title: '問題一',
    firstPageTitle: '輸入性別與年齡',
    secondPageTitle: '填入資料',
    questions: [
      {
        questionType: 'food',
        questionTitle: '你喜歡的食物',
        questionValues: [
          { text: '香蕉', value: 'banana' },
          { text: '芭樂', value: 'guava' },
          { text: '其他', value: 'other' },
        ],
      },
      {
        questionType: 'car',
        questionTitle: '你喜歡的車子',
        questionValues: [
          { text: 'TOYOTA', value: 'toyota' },
          { text: 'BENZ', value: 'benz' },
          { text: '其他', value: 'other' },
        ],
      },
      {
        questionType: 'perfume',
        questionTitle: '你喜歡的香水',
        questionValues: [
          { text: 'CHANEL', value: 'chanel' },
          { text: 'JO MALONE', value: 'jomalone' },
          { text: '其他', value: 'other' },
        ],
      }
    ],
  },
  {
    title: '問題二',
    firstPageTitle: '輸入性別與年齡',
    secondPageTitle: '填入資料',
    options: [
      {
        questionType: 'food',
        questionTitle: '你喜歡的食物',
        questionValues: [
          { text: '香蕉', value: 'banana' },
          { text: '芭樂', value: 'guava' },
          { text: '其他', value: 'other' },
        ],
      },
      {
        questionType: 'phone',
        questionTitle: '你喜歡的手機',
        questionValues: [
          { text: 'IPHONE', value: 'iphone' },
          { text: 'SAMSUNG', value: 'samsung' },
          { text: '其他', value: 'other' },
        ],
      }
    ],
  },
];

export interface QuestionsData {
  title: string;
  firstPageTitle: string;
  secondPageTitle: string;
  options: Options[];
}

export interface Options {
  questionTitle: string;
  questionValues: any[];
}
```

進到不同頁面時拿取不同的資料(問題一或問題二)

接下來先接資料

`app.component.ts`

```ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuestionsData, QuestionsService, Options } from '../questions.service';

export class AppComponent implements OnInit {
  page = 1
  data: QuestionsData[] = [];

  questionsForm = this.fb.group({
    age: [undefined, [Validators.required, Validators.maxLength(3)]],
    sex: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder, 
    private questionsService: QuestionsService
  ) {}


  ngOnInit(): void {
    this.data = this.questionsService.data.filter((item: QuestionsData) => {
      item.title === '問題一'
    })
  }
}

```

`app.component.html`
```html
<div [formGroup]="questionsForm" (submit)="submitForm()">
  <div *ngIf="page === 1">
    <h2>{{ QuestionsData.firstPageTitle }}</h2>
    <div class="content">
      <label>性別：</label>
      <!-- 這邊不做性別的切版 -->
      <input formControlName="gender"/> 
      <label>年齡：</label>
      <input formControlName="age" type="number" [placeholder]="'請輸入年齡'"/>
    </div>
    <button (click)="page = page + 1">下一頁</button>
  </div>
  <div *ngIf="page === 2">
    <h2>{{ QuestionsData.firstPageTitle }}</h2>
    <div class="content">
      <!-- xxx -->
    </div>
    <button (click)="page = page - 1">上一頁</button>
  </div>
  <button type="submit">送出</button>
</div>
```

因為第一頁都固定問題，可以將版面寫死

但第二頁因為接收到的資料長度不同導致問題不同，且須接收到資料後才可以新增 FormControl

`app.component.ts`
```ts
import * as _ from 'lodash';

export class AppComponent implements OnInit {

  page = 1
  data: QuestionsData[] = [];
  options: Options[]

  questionsForm = this.fb.group({
    age: [undefined, [Validators.required, Validators.maxLength(3)]],
    sex: ['', Validators.required],
  });

  ngOnInit(): void {
    this.data = this.questionsService.data.filter((item: QuestionsData) => {
      item.title === '問題一'
    })
    // 拿到資料後用 forEach() 來新增表單問題
    // 使用的 FormControl 由 questionType 命名，賦值則是 questionValues[0].value
    this.options = this.data.options;
    _.forEach(this.options, (value:Options) => {
      this.form.addControl(value.questionType, new FormControl(value.questionValues[0].value))
    })
  }
}

```

所以現在已經接收到表單的內容與初始值了，接下來來刻畫面

以下只顯示 page === 2 的頁面

`app.component.html`
```html
<div *ngIf="page === 2">
    <h2>{{ QuestionsData.secondPageTitle }}</h2>
    <div class="content">
      <div class="box" *ngFor="let option of data.options">
        <div>
          <span>{{ option.optionTitle }}</span>
        </div>
        <div class="option" *ngFor="let optionValue of option.optionValues; let idx = index">
          <!-- [checked]="idx === 0" 這代表預設選擇第一個選項 -->
          <input
              type="radio"
              [checked]="idx === 0"
              name="{{ option.optionType }}"
              [value]="optionValue.value"
              (change)="updateForm(option.optionType, optionValue.value)"
            />
            <span>{{ optionValue.text }}</span>
          </label>
        </div>
      </div>
    </div>
    <button (click)="page = page - 1">上一頁</button>
  </div>
  <button type="submit">送出</button>
```

當點選時把項目賦予點選的值

`app.component.ts`
```ts
updateForm(type: string, value: any): void {
    this.questionsForm.get(type)?.setValue(value);
  }
```

`app.component.scss`
```scss
.option {
  span {
    display: inline-block;
    width: 120px;
    margin-right: 10px;
    cursor: pointer;
    text-align: center;
    border: 1px solid;
    border-color: #afafaf;
    border-radius: 3px;
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }
}

input[type='radio'] {
  display: none;
}
input[type='radio']:checked + span {
  border-color: #58a8dd;
  background: #f2f9fc;
  color: #58a8dd;
}
```
