# Dialog

以 app.component.ts 與 dialog.component.ts(dialog) 為例

新增 material dialog

app.component.ts

```ts
// 匯入 dialog
import { MatDialog } from "@angular/material/dialog";
// dialog.open(component,{dialog config})
openDialog(): void {
    this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      width: '600px',
      height: '500px',
      // 打開的 dialog 前面加入樣式 class dialog
      panelClass: "dialog"
    });
  }
```

```html
<button (click)="openDialog">打開 dialog</button>
```

dialog.component.ts

關掉 dialog 方式

```html
<!-- 方式一 -->
<button mat-dialog-close>關閉 dialog</button>
<!-- 方式二 -->
<button (click)="closeDialog()">關閉 dialog</button>
```

```ts
import { MatDialogRef } from "@angular/material/dialog";

export class RecommendAdviseDialogComponent implements OnInit {
  adviseText = "";
  email = "pollex@pollex.com.tw";
  constructor(public dialogRef: MatDialogRef<RecommendAdviseDialogComponent>) {}
  closeDialog(): void {
    const obj: data = {
      adviseText: this.adviseText,
      email: this.email,
    };
    // 關掉 dialog 並傳出資料到打開 dialog 的地方
    // 以此範例為 dialog.component.ts
    this.dialogRef.close(obj);
  }
}
```

app.component.ts

```ts
// 匯入 dialog
import { MatDialog } from "@angular/material/dialog";
// dialog.open(component,{dialog config})
openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    disableClose: true,
    autoFocus: false,
    width: '600px',
    height: '500px',
    panelClass: "dialog"
  });
  // 在 dialog 關掉以後訂閱它，result 為剛剛回傳出來的值
  dialogRef.afterClosed().subscribe(result => {
    this.advise = result
    // ... 下面可以放其他的操作
  })
}
```

今天做專案時遇到 material 一些坑，不管怎麼設計都無法更改 material 預設的樣式，可以使用 panelClass 自定義 dialog class 名稱，再到全域的 scss 自定義樣式

```scss
.dialog .mat-dialog-container {
  padding: 0px;
}
```
