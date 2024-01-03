# Angular Route - Ep1

## AppRoutingModule

首先先看 app.module.ts 檔案

它有 import 路由的 module `AppRoutingModule` ，後續路由都會在這邊設置

```ts
@NgModule({
  imports: [
    AppRoutingModule,
  ]
})
```

接下來進來 `AppRoutingModule` 看一下裡面的架構

它可以去定義不同路由需要檢視何種元件

也可以去定義 services 像是 guards, resolvers, router specific services

```ts
import {NgModule} from '@angular/core';

const routes: Routes = [];

@NgModule({
  imports: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

在 imports 加入以下程式碼

這代表在路由設置在 root level 在程式裡面

並且拿到 routes 裡面的設定

並且記得要把 RouterModule exports 出去

```ts
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
```

## 渲覽元件

先加入 LoginComponent, AboutComponent 於 routes 變數中

```ts
const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "about",
        component: AboutComponent
    }
];
```

目前更換 route 時會發現畫面並不會 render 出元件

需要在 app.component.html 裡面加入 router-outlet directive 這樣才會 render 出元件

```html
<router-outlet></router-outlet>
```

## routerLink, routerLinkActive

在 app.component.html navbar 中加入 routerLink, routerLinkActive

如果寫 `routerLink` 可以直接傳字串進去， `[routerLink]` 則可以傳變數

但一般來會使用 routerLink 來寫（不會使用 []）

routerLink 代表點擊時會導該字串內的路由

routerLinkActive 代表在該路由時會新增一個 class

一般是用來顯示目前路由所在位置

```html
<a class="menu-item" 
   mat-button 
   [routerLink]="'/about'"
   [routerLinkActive]="'menu-item-active'">
  <span>About</span>
</a>

<a mat-button 
   class="menu-item" 
   routerLink="/login" 
   routerLinkActive="menu-item-active">
  <mat-icon>account_circle</mat-icon>
  <span>Login</span>
</a>
```

### routerLink 加斜線(`/`)差異

加 `/` 代表路徑為絕對路徑從 root 開始

不加 `/` 代表為相對路徑

假如使用的路由為巢狀路由的話，則需要注意這邊的用法

```html
<a routerLink="/login">
  <span>Login</span>
</a>

<a routerLink="login">
  <span>Login</span>
</a>
```
