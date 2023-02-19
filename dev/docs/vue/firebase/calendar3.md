# 萬年曆 Calendar Part3

把原始的內容稍為整理一下，把 components 裡面的 HelloWord.vue 刪除，建立 Calendar.vue

```vue
<!-- Calendar.vue -->
<template>
  <div>Calendar</div>
</template>
```

然後將 app.vue 的內容刪除留下

```vue
<template>
  <v-app>
    <v-main>
      <Calendar />
    </v-main>
  </v-app>
</template>
<script>
import Calendar from "./components/Calendar";

export default {
  name: "App",
  components: {
    Calendar,
  },
  data: () => ({}),
};
</script>
```

整理完後查看頁面有沒有成功顯示組件的內容(Calendar)，若成功則進行下一步

到 Vuetify > UI components > Calendars 找一個喜歡的萬年曆(作者是找 Events Click, [link](https://vuetifyjs.com/en/components/calendars/#click)) 的這個萬年曆

直接複製 template 到 Calendar.vue (程式碼太長就不貼了)

貼上去之後一定報一堆錯誤，因為組件內還沒有寫用到的屬性與方法(不用怕很正常 =D )

接下來作者就稍微介紹組件 vuetify tags、屬性與方法，介紹時可以知道該組建用的屬性與方法，待會兒建立資料時會比較有概念

接下來就是建立屬性與方法拉～

先把基本的屬性(data)建立起來

```vue
<!-- calendar.vue -->
<template>...</template>
<script>
export default {
  data: () => ({
    // toISOString() 回傳一個 ISO 字串
    // substr(起始位置,長度)
    // today 就可以拿到今天的日期
    today: new Date().toISOString().substr(0, 10),
    // focus 應該是指定的那天變色
    focus: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Month",
      week: "Week",
      day: "Day",
      "4day": "4 Days",
    },
    // start firebase data
    name: null,
    details: null,
    start: null,
    end: null,
    color: "#1976D2",
    events: [],
    // end
    currentlyEditing: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    dialog: false,
  }),
};
</script>
```

掛載 firebase db 並使用它

從 firebase 取得資料 getEvents()

```vue
<script>
// import firebase db
import { db } from "@/main";
export default {
  mounted() {
    this.getEvents();
  },
  methods: {
    // 獲取 firebase 資料 (因為是獲取遠端資料需要用 async, await)
    async getEvents() {
      // get() 使用的方法 collection("collect 的名字")
      // snapshot 拿到的是 firebase db 回傳的一大包東西
      let snapshot = await db.collection("calendar").get();
      // 等等來塞資料到裡面的容器
      let events = [];
      snapshot.forEach((doc) => {
        // doc -> QueryDocumentSnapshot
        // doc.data() -> 剛剛建立資料表的資料
        let appData = doc.data();
        // doc.id -> 每個資料綁定唯一的 id
        appData.id = doc.id;
        // appData 裡面就包括剛剛建立的一包資料 + firebase 給的 ID
        events.push(appData);
      });
      // 最後更新裡面的 events 到屬性的 this.events
      this.events = events;
    },
  },
};
</script>
```

然後剩下的 methods 直接從 vuetify 抓，全部都可以共用(除了 updateRange() 以外)

```vue
<script>
export default {
  methods: {
    // 特別注意 updateRange 這個 function 有改寫過，原本它是使用元件內的資料，改寫成 firebase db 拿取後的資料
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
  },
};
</script>
```

現在架構已經整理得差不多了，最後再增加新增、修改、刪除就完成了

[source code] 因為接下來都是片段整理，如果有不清楚的地方可以找到 source code 來看一下

[source code]: https://github.com/RaquelYang/vue-calendar-vuetify-firebase
