# Angular 命名規則與程式碼攥寫風格

### 命名規則

- 元件(component) -> 用 "-" 分隔名稱(eq : hero-list.component.ts )
- 類 (class) -> 用大寫駝峰式規則 (eq : AppModule, LoggerService, AddressPipe, HighlightDirective)
- 函式(function) -> 用小寫駝峰式規則(eq : clickOutSide)
- 常數(constant) -> 全部大寫連接用"_" (eq : HERO_URL)
- 禁止使用 var
- 命名控制在三個單字內，常見單字可縮寫
- 接口(interface) -> 用大寫駝峰式規則 (eq : ProfileConfig)
- 接口(interface) 內的屬性 -> 用小寫駝峰式規則(eq : scheduleList: ScheduleInfo[])
```ts

export interface DashboardInfo {
  month: number;
  scheduleList: ScheduleInfo[];
}

export interface ScheduleInfo {
  scheduleTime: string;
  title: string;
}
```
- 屬性(property)與方法(method) -> 用小寫駝峰式規則(eq : clickOutSide)
- import 空一行來區分第三方庫導入項目
- observable 命名方式 title$ ，最後加錢字號
- observable 攥寫方式如下

```ts
/**
   * api 功能
   * 
   */
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(`api/product`);
  }
```

[Angular官方代码风格指南](https://zhuanlan.zhihu.com/p/29784072)

