# Vue2 的生命週期

### beforeCreate

beforeCreate(少使用) > 可以讀到 Vue 但在此階段無法讀取到資料

### created

created(常使用) > 已完成 data, methods 建立

### beforeMounted

beforeMounted > DOM 掛載在瀏覽器之前(等一下等到所有東西都 ready 後才會 Mounted)

beforeCreate[父] > created[父] > beforeMounted[父] > beforeCreate[子] > created[子] > beforeMounted[子] > Mounted[子]... ready(子層都 Mounted 完後父層才會 Mounted ) > Mounted[父]

### Mounted

Mounted(常使用) > 掛載到瀏覽器

### beforeUpdate

beforeUpdate > 更新之前

addcomponent 當父層新增一個 component 的生命週期

beforeUpdate[父] > beforeCreate[子] > created[子] > beforeMounted[子] > Mounted[子] > Updated[父]

update data 只更新資料時

beforeUpdate > Updated

### Updated

Updated > 更新完成

### beforeDestory

beforeDestory(常使用) > 摧毀之前(關閉計時器、移除事件增聽)

### Destory

Destory > 摧毀 components

![Vue 的生命週期](https://th.bing.com/th/id/OIP.byyX8EW6mIhRsCBWwByNYgHaSw?pid=ImgDet&rs=1)
