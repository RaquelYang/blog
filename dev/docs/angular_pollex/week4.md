# Week4

## Angular pipe async 使用方式

```ts
export class AppComponent {
  // 先定義一個 Observable 變數
  // 在開發習慣中，我們會在變數後面加上一個 $ 符號，代表他是一個 observable。
  todos$: Observable<any[]>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    // 在初始時將變數給予 httpClient get 方式，但先不要訂閱它

    this.todos$ = this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/todos/');
  }
}
```


```html
<!-- 在 html 模板中加入 pipe async 在此時訂閱它，並 render 在畫面上 -->
<li *ngFor="let todo of todos$ | async">{{ todo.title }}</li>
```

有時候做專案時因為 rxjs 資料尚未回來但瀏覽器已經在 render 畫面，導致跑迴圈或做判斷時會造成無資料的問題，可能會讓網頁破版或無法渲染在瀏覽器上

所以使用 pipe async 時，當瀏覽器 render 到此 html 時就會進行訂閱

### 類延遲載入


畫面一開始不會載入資料，因為 todos$ | async 的部分並沒有被載入，當按下按鈕把 this.load 設為 true 時，才會進行訂閱就可以在真正需要資料時才進行載入的動作，避免不必要的 API 呼叫啦！（省資源）
```ts
@Component({
  selector: 'my-app',
  template: `
  <button (click)="loadTodos()">Load Todos</button>
  <ul *ngIf="load">
    <li *ngFor="let todo of todos$ | async">{{ todo.title }}</li>
  </ul>
  `
})
export class AppComponent {
  load: boolean;
  todos$: Observable<any[]>;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.todos$ = this.httpClient.get<any[]>('https://jsonplaceholder.typicode.com/todos/');
  }

  loadTodos() {
    this.load = !this.load;
  }
}
```

### 使用 shareReplay 避免重複載入

這樣 api 就只會打一次

```ts
ngOnInit() {
  this.todos$ = this.httpClient
    .get<any[]>('https://jsonplaceholder.typicode.com/todos/')
    // 重播最近一次的資料
    .pipe(shareReplay(1));
}
```

### 搭配 ngIf 使用

```html
<ng-container *ngIf="todos$ | async; else loading">>
  <ul>
    <li *ngFor="let todo of todos$ | async">{{ todo.title }}</li>
  </ul>
</ng-container>
<ng-template #loading>Loading...</ng-template>
```

修改後
```html
<ng-container *ngIf="todos$ | async as todos; else loading">
  <ul>
    <!-- 在內部就不需要使用 todos$ | async，而是使用 as 後面的 todos 區域變數 -->
    <li *ngFor="let todo of todos">{{ todo.title }}</li>
  </ul>
</ng-container>
```

[認識 AsyncPipe (1) - 基本使用技巧](https://fullstackladder.dev/blog/2018/11/11/mastering-angular-27-async-pipe/)

[全端開發人員天梯](https://fullstackladder.dev/blog/)
