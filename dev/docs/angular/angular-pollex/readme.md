# Angular Document 筆記

[week1](week1.md)

[week2](week2.md)

[week3](week3.md)

疑問：
.model > interface
.class > interface
.ts > interface
.enum > 用法

bootstrap modal 打開 > 使用  #content, (click)="open(content)"

@ViewChild() staticModalAlert: ModalDirective;

<input (blur)="open()"/> 
ng-blur可以使用在window, input, select, textarea, a，這五種標籤，
用來判斷焦點是否存在。

router 帶資料

```ts
this.router.navigate(['...'], {
  state: { data: this.data, title: this.title, routePath: this.routePath }
});

```

下個 component

```ts
constructor(private router: Router) {
    // 在建構式時需給值
    console.log('router',this.router.getCurrentNavigation());
    this.title = this.router.getCurrentNavigation()?.extras.state?.title
    this.routePath = this.router.getCurrentNavigation()?.extras.state?.routePath
  }
```
