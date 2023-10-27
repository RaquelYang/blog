# RxJS

+ [RxJS 6 新手入門]
+ [一小時帶你掌握 RxJS 關鍵知識]

## RxJS 是什麼

RxJS 是一套藉由 Observable sequences 來組合非同步行為和事件基礎程序的 Library，Rxjs 可以處理複雜的非同步問題

## RxJS 重要的五個基本東西

| 名稱 | 解釋 |
|:--|:-- |
| Observable 可觀察的物件 | 代表一個觀察者，他可以去幫助我們持續監聽某一個事件或是做一件事情 |
| Observer 觀察者物件 | 代表一個接收觀察者情報的人，他可以得到觀察者所觀察的內容。其中有 next,error,complete 三個參數來幫助你在監聽到事件的時候可以做的事情 |
| Subscription 訂閱物件 | 代表發布命令請觀察者開始監聽 |
| Operators 運算子 | 在 RxJS 當中，有一百多個 Operators 可以使用，其中像是 filter 他可以幫我們去過濾資料 |
| Subject 主體物件 | 主要用來廣播收到的事件資料給多個 Observer (觀察者) 讓我們不需要一直執行 Subscribe |

[參考資料]

## RxJS 的運算子(operators)

[在 Angular 中應用 RxJS 的 operators (1) - 基礎篇]

[在 Angular 中應用 RxJS 的 operators (2) - 進階應用]

### map

RxJS 則是將一個訂閱可以得到的資料轉換成另外一筆資料

```ts
// #1
// 只拿 res 回來的 res.title
title$ = this.httpClient.get('...').pipe(
  map(data => data.title)
);

// #2
// 取得資料後加入一筆預設資料
menuItems$ = this.httpClient.get('...').pipe(
  map(items => [{label: 'Please Select', value: null}, ...items])
);
```

### tap

不會影響整個 RxJS 資料流方向，某種程度的意思是「什麼都不影響」，加入 console.log 進行除錯

```ts
// #1
title$ = this.httpClient.get('...').pipe(
  tap(data => console.log(data)), // 在 map() 前先印一次資料
  map(data => data.title),
  tap(data => console.log(data)) // 在 map() 後再次印一次，觀察 map 內程式的結果
);
// #2
// 暫存資料用

data$: Observable<any>;
data: any;
  
ngOnInit() {
  this.data$ = this.httpClient.get('...').pipe(
    tap(data => this.data = data)
  );
}

buttonClick() {
  this.data.title = 'Hello';
}
```

### switchMap

處理巢狀 subscribe 事件，比如你需要打 api 拿到資料後再用該資料去打 api 拿資料(api 有順序)

```ts
// 原始
constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

ngOnInit() {
  this.route.params.subscribe(params => {
    this.httpClient.get(`.../post/${params['id']}`).subscribe(post => {
      this.post = post;
    })
  });
}

// switchMap
this.route.params.pipe(
  switchMap(params => this.httpClient.get(`.../post/${params['id']}`))
)

```

如果有一系列的轉換，且資料都要保存起來呢？可以再額外透過 map() 最終組成一個大物件：

```ts
// 打出一個 api 拿到資料後再使用第一個 switchMap 拿到 post 建立 object ，第二個拿到 comments 塞入 object 裡
this.postData$ = this.route.params.pipe(
  switchMap(params => this.httpClient.get(`.../post/${params['id']}`).pipe(
    map(post => ({ id: params['id'], post: post }))
  )),
  switchMap(post => this.httpClient.get(`.../comments/${post.id}`).pipe(
    map(comments => Object.assign(post, { comments: comments }))
  ))
)
```

### debounceTime

面對搜尋的需求，我們常常會遇到需要在輸入完後自動搜尋資料，而不用再去按個按鈕，這時候我們可以使用 FormControl 或 ngModel 的 valueChanges 搭配 switchMap 來完成搜尋

```ts
data$ = this.searchControl.valueChanges.pipe(
  switchMap(keyword => this.httpClient.get(`.../?q=${keyword}`))
);
```

當每次資料一變更的瞬間，就會發出一次 API 呼叫，對伺服器的 loading 會太重，這時候就可以使用 debounceTime 這個 operator，來進行緩衝，debounceTime 可以設定一個時間(毫秒)，在這段時間只要還有新資料傳入，就會暫時忽視，直到一定時間沒有新資料後，才將最新的資料交給下一個 operator

```ts
data$ = this.searchControl.valueChanges.pipe(
  debounceTime(300), // 當 300 毫秒沒有新資料時，才進行搜尋
  switchMap(keyword => this.httpClient.get(`.../?q=${keyword}`))
);
```

### distinctUntilChanged

在使用 debounceTime 後，已經可以大幅度減少伺服器的負荷，還有沒有進步空間呢？有的，假設當 decounceTime 過去後，不管資料是不是跟上次不同，還是會將資料送到下一個 operator 去，如此一來就有可能出現重複的關鍵字搜尋的狀況，這時候透過 distinctUntilChanged 就能在上一次資料與這次資料相同時，主動忽略變更，就能更真正資料有變更時，才觸發搜尋的動作：

```ts
data$ = this.searchControl.valueChanges.pipe(
  debounceTime(300), // 當 300 毫秒沒有新資料時，才進行搜尋
  distinctUntilChanged(), // 當「內容真正有變更」時，才進行搜尋
  switchMap(keyword => this.httpClient.get(`.../?q=${keyword}`))
);
```

### filter

在搜尋的例子最後介紹一個簡單常用的 operator - filter ，這個 operator 跟陣列的 filter 非常類似，就是用來過濾資料用的，當 filter 內的條件符合時，才允許這次變更發生，因此若希望輸入超過 3 個字才允許搜尋的話，可以改為：

```ts
data$ = this.searchControl.valueChanges.pipe(
  debounceTime(300), // 當 300 毫秒沒有新資料時，才進行搜尋
  distinctUntilChanged(), // 當「內容真正有變更」時，才進行搜尋
  filter(keyword => keyword.length >= 3), // 當關鍵字大於 3 個字時，才搜尋
  switchMap(keyword => this.httpClient.get(`.../?q=${keyword}`))
);
```

[RxJS 6 新手入門]: https://www.youtube.com/watch?v=BA1vSZwzkK8
[一小時帶你掌握 RxJS 關鍵知識]: https://www.youtube.com/watch?v=uEL0Fl-uWpc
[參考資料]: https://dotblogs.com.tw/leo_codespace/2017/05/12/133807
[在 Angular 中應用 RxJS 的 operators (1) - 基礎篇]: https://fullstackladder.dev/blog/2018/11/13/mastering-angular-29-angular-with-rxjs-basic/
[在 Angular 中應用 RxJS 的 operators (2) - 進階應用]: https://fullstackladder.dev/blog/2018/11/14/mastering-angular-30-angular-with-rxjs-advanced/
