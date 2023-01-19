# 【JS】 map() 與 computed 觀念釐清

製作專題遇到一個問題，想說寫下來之後忘記可以再來找查

這裡都是將原本的陣列資料加以運算後新增資料

```js
// 資料結構
products = [
  {
    quantity:3,
    product:
      {
        _id:"6205f11124897566f8273115"
        name:"無花果 1 台斤"
        price:599
      }
  }
]
computed: {
  total () {
    return this.products.reduce((accu, curr) => {
      return accu + curr.quantity * curr.product.price
    }, 0)
  }
}
```

```js
// 資料結構
orders =
[
  {
    products:
    [
      {
        quantity:7,
        product:
        [
          {
          _id:"6205f11124897566f8273115"
          name:"無花果 1 台斤"
          price:599
          }
        ]
      }
    ]
  }
]
this.orders = data.result.reverse().map((order) => {
  order.total = order.products.reduce((accu, curr) => {
    return accu + curr.quantity * curr.product.price
  }, 0)
  return order
})
```

打完以後發現資料結構有點小複雜，我的天ＱＱ

簡單來說就是我需要新增總價［ 價格 × 數量 ］

但都是總價為什麼使用兩種方式來獲得

1. 使用 computed
2. 使用 map() + reduce()

## 使用 computed

若使用 computed 代表當更改 quantity 數量則會重新運算

## 使用 map() + reduce()

使用 使用 map() + reduce() 代表我剛從後端拿到資料的時候就加以運算，且 quantity 不會改變時使用

大概釐清兩者之間的差異之後，開始解析 map(), reduce() 這兩者的功能
雖然知道 map(), reduce() 這兩個方法拿來做什麼，但不常使用導致觀念模糊
所以後面用簡單的範例來實作一下

    先將資料結構簡單化，只需要價格與數量個兩個變數就好

然後打開 chrome F12 console 面板來測試

```js
data = [
  { quantity: 7, price: 299 },
  { quantity: 9, price: 399 },
  { quantity: 2, price: 199 },
  { quantity: 1, price: 111 },
];
```

依樣畫葫蘆
MDN 官方文件這樣寫的
arr.reduce(callback[accumulator, currentValue, currentIndex, array], initialValue)
當我們加總時 callback 只需要 accumulator, currentValue 變數，initialValue 起始值為 0

```js
let total = data.reduce((a, b) => {
  return a + b.quantity * b.price;
}, 0);
// total = 6193
```

我們來看看 map() 這個傢伙

```js
let maps = data.map((x) => x.quantity * x.price);
// [2093, 3591, 398, 111]
```

這樣就達到相乘加總
但四個傢伙要加在一起才是總價
再用一次 reduce() 來處理

```js
maps.reduce((a, b) => {
  return a + b;
}, 0);
// 6193
```

結果一樣！！！
那來合併一下

```js
let data = [
  { quantity: 7, price: 299 },
  { quantity: 9, price: 399 },
  { quantity: 2, price: 199 },
  { quantity: 1, price: 111 },
];
data.map((x) => {
  x.total = x.price * x.quantity;
  console.log(x);
});
// x value
// {quantity: 7, price: 299, total: 2093}
// {quantity: 9, price: 399, total: 3591}
// {quantity: 2, price: 199, total: 398}
// {quantity: 1, price: 111, total: 111}
// data value
console.log(data);
// [ {quantity: 7, price: 299, total: 2093},
// {quantity: 9, price: 399, total: 3591},
// {quantity: 2, price: 199, total: 398},
// {quantity: 1, price: 111, total: 111} ]
let a = data.reduce((a, b) => {
  console.log(a, b);
  return a + b.total;
}, 0);

console.log(a);
// 6193
```

ok 我合併不起來ＱＱ
先放著下次再戰ＸＤＤ
