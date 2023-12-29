# var, let, const 差異

## var

若不宣告變數可能不知道變數從哪裡來，造成全域污染，多人開發可能造成問題。

```js
// 為什麼要宣告變數
function fn() {
  a = 0; // 全域屬性
}
fn();
console.log(a); // 0

function fnB() {
  a = 1;
}
fnB();
console.log(a); // 1
```

```js
function fn() {
  var a = 0; // 作用域在函式裡面
}
fn();

function fnB() {
  var a = 1; // 作用域在函式裡面
}
fnB();
console.log(a); // a is not defined
```

## 全域屬性跟變數的差異

```js
// 屬性可以被刪除
a = 0; // 全域屬性
// 屬性可以被刪除
delete window.a; // a 不見了
var b = 1; // 變數
// 變數無法被刪除
delete window.b; // b 還在
function fn() {
  a = 1;
}
fn();
console.log(a);
```

var 的作用域

```js
var b = 0;
function fn() {
  var a = 1;
  debugger; // sources > 55行
  // local a:1, this > window
  // global b:0
}
fn();
```

var 辭法作用域
var 的作用域在程式碼寫完的當下就確定了

```js
// 基礎
var a = 0;
function fnA() {
  console.log(a); // 0
}
function fnB() {
  var a = "Raquel";
}
fnB();
fnA();
```

```js
// 進階
var a = 0;
function fnA() {
  console.log(a); // 直接找上面的變數
}
function fnB() {
  var a = 1;
  fnA(); // 0
}
fnB();
```

var 的特性

```js
function fn() {
  var a = 1;
  var a = 0;
}
fn();

{
  var b = 2;
}
// not error
console.log(b); // 2
```

for 迴圈

```js
for (var i = 0; i < 10; i++) {
  console.log(i); // 0-9
  setTimeout(() => {
    console.log(i); // 10*10
  }, 0); // setTimeout 往後放
}
console.log(i); // 10
```

```js
var a;
console.log(a); //undefined 有宣告但沒有賦值
```

var 的 hoisting
先把所有的程式碼先建立起來，但尚未賦值，所以會先得到 undefined

```js
console.log(a); //undefined (hoisting)
var a = 1;
console.log(a); // 1
```

## let vs const

```js
// let 只存在 {} 內
{
  let a = 1;
}
console.log(a); // a is not defined
```

```js
function fn() {
  let a = 1;
}
console.log(a); // a is not defined
```

```js
for (let i = 0; i < 10; i++) {
  console.log(i); // 0-9
  setTimeout(() => {
    console.log(i); // 0-9
  }, 0);
}
console.log(i); // i is not defined
```

let 跟 var 的差異

- 作用域不同
- let 會出現在 window 內
- 不可重複宣告

```js
var a = 0;
let b = 1;
console.log(window); // 只會有 a, 不會有 b
```

let 的 hoisting

```js
console.log(a); // error, can't access 'a' before initialization
let a = 0;
```

```js
function fn(a) {
  console.log(a); // 1
  var a = 2;
  console.log(a); // 2
}
fn(1);
```

let 類似 hoisting

```js
function fn(a) {
  console.log(a); // TDZ 暫時性死區
  let a = 2; // Identifier 'a' has already been declared
  console.log(a); //
}
fn(1);
```

### let 與 const 差異

const 無法重新賦值  
let 可以重新賦值

物件傳參考（記憶體位置）

```js
const a = {
  name: "Ray",
};
a.name = "Raquel"; // ok
```

```js
const a = {
  name: "Ray",
};
// a 指向新的物件
a = {
  name: "Raquel", // error
};
```
