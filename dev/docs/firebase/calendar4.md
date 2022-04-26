# 萬年曆 Calendar Part4

使用的架構為 Vue + Vuetify + Firebase storage

版本別如下：
| 名稱 | 版本 |
| ---- | ---- |
| Vue | 2.6.11 |
| Vuetify | 2.6.0 |
| Firebase | 9.6.10 |
| firestore | 1.1.6 |

[source code](https://github.com/RaquelYang/vue-calendar-vuetify-firebase) 因為接下來都是片段整理，如果有不清楚的地方可以找到 source code 來看一下

建立刪除、修改功能，以下截取部分程式碼，擷取 v-calendar 下面的 v-menu

```vue
<template>
  ...
  <v-menu
    v-model="selectedOpen"
    :close-on-content-click="false"
    :activator="selectedElement"
    offset-x
  >
    <v-card color="grey lighten-4" min-width="350px" flat>
      <v-toolbar :color="selectedEvent.color">
        <!-- 把其他的 icon 刪除，只留下 delete icon 再加入 deleteEvent -->
        <v-btn @click="deleteEvent(selectedEvent.id)" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <!-- v-card-text 原本的內容刪掉，加入 form 進去 -->
        <form v-if="currentlyEditing !== selectedEvent.id">
          {{ selectedEvent.details }}
        </form>
        <form v-else>
          <!-- 剛剛安裝的套件 -->
          <textarea-autosize
            v-model="selectedEvent.details"
            type="text"
            style="width: 100%"
            :min-height="100"
            placeholder="add note"
          >
          </textarea-autosize>
        </form>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="secondary" @click="selectedOpen = false">
          <!-- 原本為 Cancel 改成 Close -->
          Close
        </v-btn>
        <!-- 新增儲存與更新的按鈕 -->
        <!-- 編輯 -->
        <v-btn
          text
          v-if="currentlyEditing !== selectedEvent.id"
          @click.prevent="editEvent(selectedEvent)"
        >
          Edit
        </v-btn>
        <!-- 儲存 -->
        <v-btn text v-else @click.prevent="updateEvent(selectedEvent)">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
  ...
</template>
<script>
// 上面新增了刪除、編輯、修改的方法，在下面新增吧
export default {
  methods: {
    editEvent(event) {
      // click 把事件 id 塞入 currentlyEditing，上面字串就變成 textarea
      this.currentlyEditing = event.id;
    },
    async updateEvent(event) {
      // firebase 更新資料
      // 使用 id 去更新 firebase 資料
      await db.collection("calendar").doc(this.currentlyEditing).update({
        // 更改 details
        details: event.details,
      });
      // 關掉 selectedOpen 視窗
      this.selectedOpen = false;
      // 把值改成 null 以免重複按到
      this.currentlyEditing = null;
    },
    async deleteEvent(event) {
      // firebase 刪除資料
      await db.collection("calendar").doc(event).delete();
      // 關掉 selectedOpen 視窗
      this.selectedOpen = false;
      // 刪除後重新獲得資料
      this.getEvents();
    },
  },
};
</script>
```

是不是烙烙長(沒事習慣就好)

因為裡面加了滿多的功能，所以全都寫在一起

終於剩下最後一個功能了！！！！新增功能！！！！就完成這個萬年曆的範例了

在 v-toolbar 後 Today btn 前面再塞一個 btn 取名叫做 New Event，點擊之後打開 dialog 視窗

[vuetify-dialog](https://vuetifyjs.com/en/components/dialogs/)

dialog 放在兩個 sheet 之間，真的看不懂 [source code](https://github.com/RaquelYang/vue-calendar-vuetify-firebase) 傳送連結 ＸＤ

```vue
<template>
  ...
  <v-btn class="mr-4" color="primary" @click="dialog = true"> New Event </v-btn>
  <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
    Today
  </v-btn>
  ...
  <!-- 在兩個 sheet 之間新增 v-dialog -->
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-container>
        <!-- 新增 addEvent -->
        <v-form @submit.prevent="addEvent">
          <!-- 新增四個 input-field -->
          <v-text-field
            v-model="name"
            type="text"
            label="event name (required)"
          ></v-text-field>
          <v-text-field
            v-model="details"
            type="text"
            label="detail"
          ></v-text-field>
          <v-text-field
            v-model="start"
            type="date"
            label="start (required)"
          ></v-text-field>
          <v-text-field
            v-model="end"
            type="date"
            label="end (required)"
          ></v-text-field>
          <v-text-field
            v-model="color"
            type="color"
            label="color (click to open color menu)"
          ></v-text-field>
          <!-- 建立之後關掉 dialog -->
          <v-btn
            type="submit"
            color="primary"
            class="mr-4"
            @click.stop="dialog = false"
          >
            Create Event
          </v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  methods: {
    // 新增資料到 firebase
    async addEvent() {
      if (this.name && this.start && this.end) {
        await db.collection("calendar").add({
          name: this.name,
          details: this.details,
          start: this.start,
          end: this.end,
          color: this.color,
        });
        // 新增後重新獲取資料
        this.getEvents();
        // 把資料清空
        this.name = "";
        this.details = "";
        this.start = "";
        this.end = "";
        this.color = "#1976D2";
      } else {
        // 如果 name, start, end 有尚未輸入則跑出 alert
        alert("Name, start, end date are required.");
      }
    },
  },
};
</script>
```

end !!! finally !!!
