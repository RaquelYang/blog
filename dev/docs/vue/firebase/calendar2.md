# 萬年曆 Calendar Part2

## 建立 VueCLI

如果還沒全域安裝 VueCLI 可在終端機輸入

```sh
npm i -g @vue/cli
```

建立一個新的 VueCLI

```sh
vue create vue-calendar
```

作者直接用 default 來建立，那就 default 吧

使用 VScode 打開剛建立好的資料夾(vue-calendar)

掛載 vuetify 到專案中

```sh
vue add vuetify
```

一樣選擇 default 就好

安裝 firebase, vue textarea 套件

```sh
npm i firebase vue-textarea-autosize
```

打開 VueCLI

```sh
npm run serve
```

確認可以正常打開 VueCLI 後接下來載入 firsebase 跟 vue-textarea-autosize

到資料夾的 main.js 引入

```js
import VueTextAreaAutoszie from "vue-textarea-autosize";
// v8 的 firebase 不需加 compat
// import firebase from "firebase/app";
// import "firebase/firestore";
// v9 的 firebase 需加 compat
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

Vue.use(VueTextAreaAutoszie);

// 貼上剛剛註冊的 SDK
// 以下為假的
const firebaseConfig = {
  apiKey: "Axxxx_bpxxxxxxxjzu_yDxxxxxkhF4",
  authDomain: "vue-calendar-xxxx1c.firebaseapp.com",
  databaseURL: "https://vue-calendar-xxx1c-default-rtdb.firebaseio.com",
  projectId: "vue-calendar-xxx1c",
  storageBucket: "vue-calendar-xxx1c.appspot.com",
  messagingSenderId: "4xxxxxx9142",
  appId: "1:4782xxxxx142:web:abexxxxxxxxdc9f0f37",
  measurementId: "G-DKJFFJHH",
};
// 初始化 firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
```

這樣 firebase 設定完畢了，接下來就專心地寫 code 吧～
