---
title: props, emit, refs 資料傳遞
tags: Vue
---

# 元件之間的資料傳遞與事件觸發 （props & emit & ref）

## 父子資料傳遞與事件

+ props 父層資料傳遞到子層
+ emit 子層傳遞事件到父層
+ ref 父層傳遞事件到子層

```vue
<!-- 父層 -->
<div>
    <Addproduct v-for="post in posts" :key=post.id 
        :title="post.title"  
        @enlarge-text="postFontSize += 0.1"
        ref="open"/>
            <!-- emit 觸發function -->
<!--         @enlarge-text="onEnlargeText"/> -->
            <!-- emit 傳值 -->
<!--         @enlarge-text="postFontSize += $event"/> -->
</div>
<script>
export default {
    data() {
        return{
            posts: [
              { id: 1, title: 'My journey with Vue' },
              { id: 2, title: 'Blogging with Vue' },
              { id: 3, title: 'Why Vue is so fun' }
            ],
            postFontSize:1
        }
    },
    methods:{
        onEnlargeText(enlargeAmount){
            this.postFontSize += enlargeAmount
        },
        getChildMethod(){
            <!--     使用子組件的function close()     -->
            this.$ref.open.close()
        }
    },
    props:['title']
}
</script>
```

```vue
<!-- 子層 -->
<template>
  <p>{{ title }}</p>
  <button @click="$emit('enlarge-text')">enlarge text</button>
  <!-- emit 傳值, 觸發function -->
  <!--     <button @click="$emit('enlarge-text', 0.1)">enlarge text</button> -->
</template>
<script>
export default {
  props: ["title"],
  emits: ["enlarge-text"],
  methods: {
    close() {
      concole.log("123");
    },
  },
};
</script>
```
