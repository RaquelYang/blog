# Rxjs 範例

直接進入程式碼吧！！！使用 stackblitz 建立一個 Rxjs 專案

建立一個簡單的串流

## Subject
```ts
import { Subject } from 'rxjs';

// 建立一個被觀察者串流
const data$ = new Subject();

// 訂閱被觀察者
data$.subscribe((val) => {
  console.log(val);
});

// 新的事件發生
data$.next(1);
data$.next(3);
data$.next(5);
```

## fromEvent

```html
<button id="btn">click</button>
```

```ts
import { Subject, fromEvent } from 'rxjs';

// js 原始的 addEventListener
document.querySelector('#btn').addEventListener('click', () => {
  console.log('click');
});

// 使用 rxjs 建立 click 事件
const click$ = fromEvent(document.querySelector('#btn'), 'click');

// 需要再訂閱後才能監聽變化
click$.subscribe((event) => {
  console.log('fromEvent click');
});
```

## 製作簡易的計數器

```html
<button id="btn">click</button>
```

```ts
import { Subject, fromEvent } from 'rxjs';

let count = 0;
// 關注點分離
// 計數器串流，只專注在 counter
const counter$ = new Subject();

// click 串流只專注在 click
const click$ = fromEvent(document.querySelector('#btn'), 'click');

click$.subscribe((event) => {
  ++count;
  counter$.next(count);
});

counter$.subscribe((value) => {
  console.log(value);
});
```
