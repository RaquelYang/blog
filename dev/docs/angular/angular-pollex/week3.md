# Week3

## Angular 帶 JSON 假資料方式 

```ts
// import json 路徑
import * as jsonFile from '../../../../assets/json/insurance-content.json';

// 使用 rxjs 直接 return json
  getInsuranceContent(amoProductCode: AmoProductCode[]): Observable<any> {
    return of(jsonFile.AmoProductList);
  }

```

在 tsconfig.json 加入compilerOptions 下加入 resolveJsonModule 設定 

`tsconfig.json`
```json
{
  "compilerOptions": {
    ......
    "resolveJsonModule": true
  }
}
```
