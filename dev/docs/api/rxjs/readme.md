# Rxjs 筆記

首先想要寫 Rxjs 的筆記是因為使用 Angular 開發近一年（Rxjs 可能半年），看過很多課程但對於 Rxjs 一直無法深入的了解箇中奧妙，所以決定來寫個筆記，來釐清 Rxjs 一些觀念。

### 教學影片
+ [一小時帶你掌握 RxJS 關鍵知識]

在 Rx 官方網站有提到 

> ReactiveX is a combination of the best ideas from
the `Observer pattern`, the `Iterator pattern`, and `functional programming`

## Reactive X 三個成員

### Observer pattern (觀察者模式)

### 參考文章
+ [初探設計模式 - 觀察者模式 ( Observer Pattern )]
+ [觀察者模式 | Observer Pattern]


觀察者模式有兩個角色，`觀察者`和`被觀察者`，在`被觀察者`改變時`觀察者`需要知道狀態

> 定義：觀察者模式為一對多的依賴關係，當物件的狀態改變，所有依賴於它的物件都會得到通知並被自動更新

例如：

你訂閱了 youtube 頻道（被觀察者），當有新影片上架時就會發通知給你（觀察者）

當然，可以很多人去訂閱該頻道，這樣訂閱的所有人都可以接收到通知

Observer Pattern 成員

|名稱|描述|
|:--|:--|
|Subject|抽象目標，提供保存觀察者物件的集合以及增加觀察者物件的方法、刪除觀察者物件的方法以及通知所有觀察者的抽象方法。|
|ConcreteSubject|具體目標，實作抽象目標中的通知方法。具體目標內部發生改變時會通知所有加入的觀察者物件。|
|Observer|抽象觀察者，可以是抽象類別或是介面。含有更新自己的抽象方法。|
|ConcreteObserver|實作抽象觀察者，在目標更改狀態時接收通知並更改自身狀態。|

ok 到這小菜雞已經想放棄了 ＱＡＱ (Skip Skip)


### Iterator pattern

### 參考文章
+ [Design Pattern - Iterator 迭代器模式]

Iterator pattern 有兩個主要的角色，一個是 `Iterator` 本身，另一個是容器（也稱作 `Aggregate`）。

好了，我又想放棄了ＱＡＱ (Skip Skip)

### functional programming

這是偶的專業（復活了！！！！）

把重複或是又臭又長的程式碼寫成 function，優點是容易理解、容易改變、容易除錯和具有彈性

## Reactive X 在做的事情

### CREATE

建立資料串流

### COMBINE

組合串流

### LISTEN

接收串流資料

























[一小時帶你掌握 RxJS 關鍵知識]: https://www.youtube.com/watch?v=uEL0Fl-uWpc
[初探設計模式 - 觀察者模式 ( Observer Pattern )]: https://ithelp.ithome.com.tw/articles/10204117
[觀察者模式 | Observer Pattern]: https://ianjustin39.github.io/ianlife/design-pattern/observer-pattern/
[Design Pattern - Iterator 迭代器模式]: https://ithelp.ithome.com.tw/articles/10224707
