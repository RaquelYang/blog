# Vuex 簡介

## 管理 Vue 資料

同步元件之間的資料狀態，解決元件之間資料溝通問題

屬於單向資料流 View > Actions > State

## 為什麼要使用 Vuex

因為元件之間若層級差距兩層以上，資料傳遞不易(無法使用 props, emit)

可以使用 Vuex 來管理網站全域狀態，將資料集中管理(isLogin, isAdmin)

或是兩個組件以上用到相同資料狀態則可以使用 vuex 來管理

Actions > 處理 API

Mutations > 改動 State

Components > 可以直接 Commit Mutations

Getter > State 的 computed

## 寫入

讀取 API

+ components dispatch actions > actions commit mutations > mutations mutate state
+ 直接改動資料(未碰到 API) > components commit mutations

## 讀取

直接讀取 > render
資料進行整理後再使用 > getter
components 讀取 state 資料
使用 computed 拿取資料

## Component

```js
// components
<script>
computed:{
     day(){
    return this.$store.state.day
    }
},
mounted(){
    // 呼叫vuex actions
    this.$store.dispatch('getList',day)
}
</script>
```

Actions 很重要
Context 內有 commit, dispatch, getters, state

## Store

```js
<script>
actions:{ getList(context, day){
// 呼叫mutations
context.commit('setDay',day) return axios.get('/list.json').then(res=>{
context.commit('setList',res.data) }) } }, mutations:{ setDay(state, day){
state.day = day }, setList(state, list){ state.list = list } },
// 嚴格模式
stric:true
</script>
```
