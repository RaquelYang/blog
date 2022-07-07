# Typescript

教學連結
[TypeScript TS 快速入門｜Tiktok工程師帶你入門前端｜布魯斯前端](https://www.youtube.com/watch?v=GinkGJZBHIY&t=6887s)

## 基本類型

```ts
// ---- 基本類型 ----

// 當有賦值時不需要定義變數類型
let str = 'bruce';

// 若未賦值時則需定義變數類型
let str1: string;
str1 = 'bruce2';

let num = 1000;
let boo = true;

// 因筆記方便故定義變數類型與復值
let n: null = null;
let un: undefined = undefined;

// 寫 any 等於沒寫 =)
let test: any = 1
```

## 陣列

```ts
// ---- Array ----
let arr: string[] = ['a', 'b', 'c']

// 二維陣列
let arr2: string[][] = [['aa', 'bb'], ['cc']]

// 元組
let tuple: [number, string, boolean] = [1, 'a', true]

// 二維元組
let tuple: [string, string][] = [['a', 'a'],['b', 'c']]
```
## Enum
```ts
// ---- Enum 枚舉 ----

// 開直播 api => 獲取直播狀態
// 成功 失敗 直撥中
// 0 -1 1

// 使用 Enum 來分類直播狀態，可以更直觀的閱讀程式碼
enum LiveStatus {
  SUCCESS = 0,
  FAIL = -1,
  STREAMING = 1
}

const status = LiveStatus.SUCCESS
console.log(status) // 0

```

## Union
```ts
// ---- Union ----
let aaa: number | string;
aaa = 123;
aaa = 'aaa';



```
## type
```ts
// ---- type ----
// 自定義類型，有點類似 interface
type A = number | string;
type B = boolean | string;

let a1: A;
a1 = 123;
a1 = 'aaa';

let b1: B;
b1 = true;
b1 = 'bbb'
```

```ts
// ---- interface 介面 ----
// 與 type 差異 => interface 為可擴充、type 不可擴充

interface User {
  name: string;
  age: number;
}


```
## object
```ts
// ---- object ----
// 不可擴充
type Card = {
  name: string;
  desc: string;
}

// 可擴充、可被 class 繼承
interface Card1 = {
  name: string;
  desc: string;
}

// age 可選擇顯示或不顯示
interface Card1 = {
  age?: number;
}

const obj: Card = {
  name: 'bruce',
  desc: '...',
}

// 融合兩個 interface
const obj1: Card1 = {
  name: 'bruce',
  desc: '...',
  age: 100
}
```

## function
```ts
// ---- function ----
// 參數
function hello (a: string, b: string) {
  return a + b
}

function hello1 (a: string, b: string): number {
  console.log(a, b)
  return 999
}

function hello2 (a: number, b: boolean, c:string): number {
  console.log(a, b, c)
  return 100
}

// undefined
// 可選參數需放在最後一個(c?: sting)
function hello3 (a: number, b: boolean, c?:string): number {
  let age: string;
  if (c === undefined) return -1 // 解法：直接在這邊下判斷
  age = c; // c 可能為 string | undefined 則會報錯
  return 100
}

// 箭頭函式
const func = () => {
  
}

const func = () => {
  return 1
}
```
## unknown
```ts
// ---- 斷言 as unknown ----
// call API 時有些資料無法推導出來

type Data = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

async function getData() {
  // 因為拿到的東西 typescript 也不知道是什麼
  // 所以我們使用斷言告訴 typescript 說是什麼類型
  const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  const data = await res.json() as Data; // 斷言
}

const data1: Data = {
  userId: 1,
  id: 1,
  title: 'title',
  completed: true
}

type Beta = {
  name: string
}

// 假設 data1 為動態資料可能會增多或減少
// 所以先把 data1 轉換成 unknown 在轉換成想要的 type (Beta)
const beta = data1 as unknown as Beta
```
## class
```ts
// ---- class ----

// private 私有
// public 公開
// protected 受保護

class Live {
  roomName: string // 未宣告即為 public
  // 在 typescript 開發的時候不能被訪問
  private id: string
  protected name: string

  // private 跟 protected 差異在於 protected 在繼承時才能使用
  // private 跟 protected 無法在外面使用

  constructor (roomName1: string, id1: string, name1:string){
    console.log('建立直播中...')
    this.roomName = roomName1;
    this.id = id1;
    this.name = name1;
  }

  start() {
    console.log(this.id) 
  }
}

class CarLive extends Live {
  constructor (roomName1: string, id1: string, name1:string){
    super(roomName1, id1, name1)
  }

  start() {
    console.log(super.name)
  }
}

// 外面
const live = new Live('1號', '0001', 'bruce');
console.log(live);

const carLive = new CarLive('CarRoom', '0002', 'bruce2')
carLive.name // 在外面無法訪問到

// 但最後轉譯成 js 時還是都會被看到內容

// js 私有變數寫法
class Live2 {
  // 有 # 代表在 js 內把變數變成私有變數
  #name
  constructor (name: string) {
    this.#name = name
  }
}

const live2 = new Live2('live2')
// 會報錯 不應該從外面讀取它
// console 不出來 #name
console.log(live2.#name)

// 使用 interface 實作 class
interface CarProps {
  name: string,
  age: number,
  start: () => void
}

class Car implenments CarProps {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  start() {}
}
```
## 泛型

```ts
// ---- 泛型 ----
// 在使用時在定義該屬性類型
function print<T> (data: T) {
  console.log('data', data)
}
// 調用 function 時定義該類型
// 可重複使用各種不同類型的 function
print<number>(999)
print<string>('aaa')
print<boolean>(true)

class Print<T> {
  data: T
  constructor(d: T) {
    this.data = d
  }
}

const p = new Print<number>(999)
const p1 = new Print<string>('aaa')
console.log('p', p)
console.log('p1', p1)

```
[typescript utility](https://www.typescriptlang.org/docs/handbook/utility-types.html)
裡面有很多工具可以使用
```ts
// ---- utility ----
// Record
// 在物件內只能放指定的 key, value
interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
// <CatName, CatInfo> >> key, value
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};

const obj1: Record<string, boolean> = {
  name: true,
  age: false
}


// Pick
// 重複使用 interface 裡面宣告的屬性或方法
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
// 拿出 Todo 裡面的 title, completed 來成為新的 type
type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

// Omit
// 移除 interface 裡面宣告的屬性或方法
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
// 把 Todo description 屬性拿掉
type TodoPreview = Omit<Todo, "description">;
 
const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
  createdAt: 1615544252770,
};
```
