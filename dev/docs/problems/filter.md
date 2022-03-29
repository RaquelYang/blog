# 【JS】的 filter

最近在複習 todolist 但發現對於 filter() 這個方法觀念有點模糊，所以來寫一下遇到的問題
先到 mdn wev docs 看一下 filter 相關的資料 [filter()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

定義：<code>filter()</code> 方法會建立一個經指定之函式運算後，由原陣列中通過該函式檢驗之元素所構成的新陣列。

語法

<code>
var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])
</code>

### 參數

#### callback

此函式為一個斷言，用於測試陣列中的每個元素。回傳值為 true 時將當前的元素保留至新陣列中，若為 false 則不保留。可傳入三個參數：

#### element

原陣列目前所迭代處理中的元素。

#### index 選擇性

原陣列目前所迭代處理中的元素之索引。

#### array 選擇性

呼叫 filter 方法的陣列。
thisArg 選擇性
可選的。執行 callback 回呼函式的 this 值。

---

一堆英文字看不懂 QQ，那就實際來寫看看比較快

```js
const words = ["spray", "limit", "elite", "exuberant"];
const filterwords = words.filter((a, b, c) => {
  console.log(a, b, c);
  // spray 0 ["spray", "limit", "elite", "exuberant"]
  // limit 1 ["spray", "limit", "elite", "exuberant"]
  // elite 2 ["spray", "limit", "elite", "exuberant"]
  // exuberant 3 ["spray", "limit", "elite", "exuberant"]
});
```

filter 後面接一個 callback function (回呼函式)，function 裡面有三個參數，先假設 a, b, c

所以可以寫成下面這樣

第一個回傳的是陣列的值 value

第二個回傳的是陣列的位置(index)

第三個回傳的是整個陣列 []

```js
words.filter((a, b, c) => {
  // 程式碼
});
```

---

OK 知道他裡面的東西以後來看一下範例

```js
const words = [
  "spray",
  "limit",
  "elite",
  "exuberant",
  "destruction",
  "present",
  "happy",
];

let longWords = words.filter((word) => word.length > 6);

// Filtered array longWords is ["exuberant", "destruction", "present"]
// 它會回傳 filter 為 true 的結果
```

假設我的 todolist 資料如下

```js
const data = [
  { todo: "111", checked: false },
  { todo: "222", checked: false },
  { todo: "333", checked: true },
  { todo: "444", checked: true },
  { todo: "555", checked: false },
];
```

我想要過濾出 checked === true, false 還有全部的資料

```js
const data = data.filter((item) => {
  return item;
});
console.log("all", data);
// 得到全部的資料
const done = data.filter((item) => {
  return item.checked;
});
console.log("done", done);
// 得到 checked === true
const undo = data.filter((item) => {
  return !item.checked;
});
console.log("undo", undo);
// 得到 !checked === true
```

這樣就可以得到我需要的東西了

再進階一點，我使用變數來判斷我需要 filter 的條件
