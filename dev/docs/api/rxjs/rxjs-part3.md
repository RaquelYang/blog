# Rxjs Operator

[打通 RxJS 任督二脈:從菜雞前進老鳥必學的關鍵知識 - 黃升煌Mike]

[RxJS-fruits]

## `distinct()`

`移除重複`

```ts
import { from, distinct } from 'rxjs';

const fruits$ = from(['apple', 'apple', 'banana', 'apple']);

fruits$.pipe(
  distinct()
).subscribe((fruit) => console.log(fruit));
// apple, banana
```

## `take()`

`只執行 N 次`

```ts
import { from, take } from 'rxjs';
const fruits$ = from(['apple', 'apple', 'apple', 'apple']);

fruits$.pipe(
  // 只執行兩次
  take(2)
).subscribe((fruit) => console.log(fruit));
```

## `filter()`

`過濾資料`

```ts
import { from, filter } from 'rxjs';

const fruits = from([
  "apple",
  "apple",
  "old-apple",
  "apple",
  "old-apple",
  "banana",
  "old-banana",
  "old-banana",
  "banana",
  "banana"]);

fruits.pipe(
  filter((fruit) => fruit === 'apple' || fruit === 'banana')
).subscribe(fruit => console.log(fruit));
// 'apple', 'apple', 'apple', 'banana', 'banana', 'banana'
```

## `map()`

`重組資料`

```ts
import { from, map } from 'rxjs';

const fruits = from(['dirty-apple', 'apple', 'dirty-banana', 'banana']);

fruits
  .pipe(
    map((fruit) => {
      if (fruit.includes('dirty')) {
        fruit.split('dirty-')[1];
        return fruit.split('dirty-')[1]
      }
      return fruit
    })
  )
  .subscribe((fruit) => console.log(fruit));
  // 'apple', 'apple', 'banana', 'banana'
```

## operator 組合運用

```ts
import { from, map, take } from 'rxjs';

const fruits = from([
  "old-banana",
  "apple",
  "dirty-banana",
  "apple"]);

fruits.pipe(
  take(2),
  map(fruit => {
    if (fruit.includes('-')) {
      fruit.split('old-')
      return fruit.split('old-').join('')
    }
    return fruit
  })
).subscribe(fruit => console.log(fruit));
// 'apple', 'banana'
```

## `distinctUntilChanged()`




[RxJS-fruits]: https://www.rxjs-fruits.com/subscribe
[打通 RxJS 任督二脈:從菜雞前進老鳥必學的關鍵知識 - 黃升煌Mike]: https://hackmd.io/@ModernWeb/MW21/%2F%40ModernWeb%2FryI-0OpNY
