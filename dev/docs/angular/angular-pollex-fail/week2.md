# Week2

## Angular Route 帶資料的方式

這邊介紹兩種方式來使用路由傳送資料

## state

此資料不會在路由上顯示

在 app 裡面使用 navigate 後面帶 state 帶欲傳送的變數

`app.component.ts`

```ts
export class AppComponent {
  constructor(private router: Router) {}

  changePage(): void {
    this.router.navigate(['/home'], { state: { products: this.productsList }});
  }
}
```

在 home 這需要在 constructor 建構式的地方接資料

`app.component.ts`

```ts
export class HomeComponent {
  constructor(private router: Router) {
    this.productsList = this.router.getCurrentNavigation()?.extras.state?.products;
  }
}
```

## queryParams

此資料會在路由上顯示 XXXX?products=abc

在 app 裡面使用 navigate 後面帶 state 帶欲傳送的變數

`app.component.ts`

```ts
export class AppComponent {
  constructor(private router: Router) {}

  changePage(): void {
    this.router.navigate(['/home'], { queryParams: { products: 'abc' }});
  }
}
```

使用 ActivatedRoute 的 snapshot 功能來拿取資料

`home.component.ts`

```ts
export class HomeComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.products = this.route.snapshot.queryParams.products
  }
}
```
