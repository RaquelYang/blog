# 引入 tailwind 到 ionic project

```sh
ng add ngx-tailwind
```

接下來會問你

1. 安裝其他套件
1. 使用 css, scss
1. 安裝 plugin (可以不用裝)

安裝完後它會新增與修改一些檔案

到 `variables.scss`  它會把 tailwind 引入到這隻檔案

那將其剪下改到 `global.scss`
（作者有說要把 @ionic 前面的 `~` 拿掉不然會報錯，但我好像沒遇到）

```scss
/* Core CSS required for Ionic components to work properly */
@import "@ionic/angular/css/core.css";

/* Basic CSS for apps built with Ionic */
@import "@ionic/angular/css/normalize.css";
@import "@ionic/angular/css/structure.css";
@import "@ionic/angular/css/typography.css";
@import '@ionic/angular/css/display.css';

// 注意先後順序
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

/* Optional CSS utils that can be commented out */
// 如果使用 tailwind 可以把 ionic 自定義的 functional css 刪除
// @import "~@ionic/angular/css/padding.css";
// @import "~@ionic/angular/css/float-elements.css";
// @import "~@ionic/angular/css/text-alignment.css";
// @import "~@ionic/angular/css/text-transformation.css";
// @import "~@ionic/angular/css/flex-utils.css";

@import "./scss/layout";
```

這樣就引入完成，引入完成後到專案內使用 tailwind css 確認專案有沒有吃到樣式，吃到樣式代表引入完成～～

`setting` 設定檔調整

`commend + , ` 打開 vscode 設定檔搜尋 css.vali, 把 CSS: Validate, SCSS: Validate 這兩個打勾取消，不然後續使用 Tailwind 時可能會報錯
