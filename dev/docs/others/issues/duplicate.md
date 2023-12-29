# 判斷資料內是否含有重複的資料

### `方式一`

使用 lodash 的 uniq

lodash 中的 uniq 代表建立一個去除重複的 array

isDuplicate 的意思就是當去除重複的長度若不等於原本的長度代表 array 內有重複的數據

`無重複`

```ts
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const isDuplicate = _.uniq(arr).length !== arr.length;
  console.log(isDuplicate); // false
```

`有重複`
```ts
  const arr = [1, 2, 3, 4, 5, 6, 6];
  const isDuplicate = _.uniq(arr).length !== arr.length;
  console.log(isDuplicate); // true
```

### `方式二`

使用 `Set` 來判斷陣列是否有重複

先複製一份 arr 到 Set() 裡面，再判斷長度是否一樣
```ts
  const arr = [1, 2, 3, 4, 5, 6, 7];
  const setArr = [...new Set(arr)];
  
  const isDuplicate = setArr.length !== arr.length;

  console.log(isDuplicate); // false
```

```ts
  const arr = [1, 2, 3, 4, 5, 6, 6];
  const setArr = [...new Set(arr)];
  
  const isDuplicate = setArr.length !== arr.length;

  console.log(isDuplicate); // true
```

### 方式三
