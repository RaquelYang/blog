# Pipe 管線元件

+ UppercasePipe
+ LowercasePipe
+ DecimalPipe
+ CurrencyPipe

## UppercasePipe & LowercasePipe

```html
<h2 class="post-title">
  <!-- 一般用法 -->
  <a [href]="item.href">{{ item.title | uppercase }}</a>
  <a [href]="item.href">{{ item.title | lowercase }}</a>
</h2>
```

## DecimalPipe (number)

官方提供的語法

```html
{{ value_expression | number [ : digitsInfo [ : locale ] ] }}
```

`digitsInfo`

```html
{minIntegerDigits}.{minFractionDigits}-{maxFractionDigits}
```

digitsInfo 預設值

+ 'minIntegerDigits': The minimum number of integer digits before the decimal point. Default is 1.
+ 最小整數單位為 1

+ 'minFractionDigits': The minimum number of digits after the decimal point. Default is 0.
+ 最小小數單位為 0

+ 'maxFractionDigits': The maximum number of digits after the decimal point. Default is 3.
+ 最大小數單位為 3

locale 預設值為 undefined

先定義一個數值 pi = 3.1415...

```ts
export class AppComponent {
  pi: number = 3.14159265359;
  a: number = 1;
  b: number = 0.12;
}
```

預設 number 會抓到個位數抓到第 1 位、小數抓 0 - 3

```html
<p>{{ pi | number }}</p>
<!-- output 3.142 -->
<p>{{ a | number }}</p>
<!-- 1 -->
<p>{{ b | number }}</p>
<!-- 0.12 -->
```

下面格式為小數點前面抓到第 3 位、小數抓 1 - 5

```html
<p>{{ pi | number:'3.1-5' }}</p>
<!-- output 003.14159 -->
<p>{{ a | number:'3.1-5' }}</p>
<!-- 001.0 -->
<p>{{ b | number:'3.1-1' }}</p>
<!-- 000.1 -->
```

假如想要設定 locale 的話，因為 component 不知道 locale 當你設定時會報錯

```html
<p>{{ pi | number:'3.1-5' | 'fr' }}</p>
```

所以須先在 ts 引入後再使用

```ts
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';

export class AppComponent {
  keyword = '';
  pi: number = 3.14159265359;
  a: number = 1;
  b:number = 0.12;
  ngOnInit(){
    registerLocaleData( fr );
  }
  ...
}
```

這樣就會顯示法國的格式

```html
<p>{{ pi | number:'5.1-5' | 'fr' }}</p>
<!-- 00 003,14159 -->
```

若想輸入台灣的格式 'zh-TW'

## CurrencyPipe

官方提供的語法

```html
{{ value_expression | currency [ : currencyCode [ : display [ : digitsInfo [ :
locale ] ] ] ] }}
```

### currencyCode

The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code, such as USD for the US dollar and EUR for the euro. The default currency code can be configured using the DEFAULT_CURRENCY_CODE injection token.

### display

code: Show the code (such as USD).

symbol(default): Show the symbol (such as $).

symbol-narrow: Use the narrow symbol for locales that have two symbols for their currency. For example, the Canadian dollar CAD has the symbol CA$ and the symbol-narrow $. If the locale has no narrow symbol, uses the standard symbol for the locale.

### digitsInfo, locale

 上面的 pipe 一樣

`app.component.ts`

```ts
export class CurrencyPipeComponent {
  a: number = 0.259;
  b: number = 1.3495;
}
```

`app.component.html`

```html
<!--output '$0.26'-->
<p>A: {{a | currency}}</p>

<!--output 'CA$0.26'-->
<p>A: {{a | currency:'CAD'}}</p>

<!--output 'CAD0.26'-->
<p>A: {{a | currency:'CAD':'code'}}</p>

<!--output 'CA$0,001.35'-->
<p>B: {{b | currency:'CAD':'symbol':'4.2-2'}}</p>

<!--output '$0,001.35'-->
<p>B: {{b | currency:'CAD':'symbol-narrow':'4.2-2'}}</p>

<!--output '0 001,35 CA$'-->
<p>B: {{b | currency:'CAD':'symbol':'4.2-2':'fr'}}</p>

<!--output 'CLP1' because CLP has no cents-->
<p>B: {{b | currency:'CLP'}}</p>
```

## PercentPipe

```html
{{ value_expression | percent [ : digitsInfo [ : locale ] ] }}
```

### digitsInfo & locale

跟上面的 pipe 一樣

`app.component.ts`

```ts
export class PercentPipeComponent {
  a: number = 0.259;
  b: number = 1.3495;
}
```

`app.component.html`

```html
<!--output '26%'-->
<p>A: {{a | percent}}</p>

<!--output '0,134.950%'-->
<p>B: {{b | percent:'4.3-5'}}</p>

<!--output '0 134,950 %'-->
<p>B: {{b | percent:'4.3-5':'fr'}}</p>
```

## DatePipe

[DatePipe]

```html
{{ value_expression | date [ : format [ : timezone [ : locale ] ] ] }}
```

### value_expression

輸入日期格式、1970 到現在的毫秒數或 ISO string

### format

可以輸入內建格式 'short', 'medium', 'long', 'full'...

### timezone

Default 為瀏覽器內建的 local 時區，'+0430' 的話則是在格林威治標準時間 +0430

### locale

跟上面的 pipe 一樣

`app.component.ts`

```ts
export class DatePipeComponent {
  today: number = Date.now();
}
```

`app.component.html`

```html
<!-- Apr 25, 2022 -->
<p>Today is {{today | date}}</p>
<!-- Monday, April 25, 2022 -->
<p>Or if you prefer, {{today | date:'fullDate'}}</p>
<!-- 2:49 PM GMT+8 -->
<p>The time is {{today | date:'h:mm a z'}}</p>
```

在日期資料裡面轉換格式

```html
<span class="post-date">
  <i class="glyphicon glyphicon-calendar"></i>
  {{ item.date | date:'yyyy-MM-dd'}}
</span>
```

## JsonPipe

直接在物件後面加入 jsonpipe 即可看到資料原貌，方便用來偵錯

```html
{{ value_expression | json }}
```

## SlicePipe

可以傳入一個字串或陣列

```html
{{ value_expression | slice : start [ : end ] }}
```

`app.component.html`

```html
<!-- 先把 item.title 轉小寫後在取 0-20 個字 -->
<a [href]="item.href">{{ item.title | lowercase | slice:0:20 }}</a>
<!-- 取最後面的 20 個字元 -->
<a [href]="item.href">{{ item.title | lowercase | slice:-20 }}</a>
```

ngFor 也可以使用 SlicePipe

```html
<!-- 取 ngFor 1-3 筆資料 -->
<article
  class="post"
  id="post{{idx}}"
  *ngFor="let item of data | slice:0:2;let idx = index"
></article>
```

[DatePipe]: https://angular.io/api/common/DatePipe
