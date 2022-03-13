---
title: Vue2 生命週期
tags: Vue
---

# Vue2 的生命週期

beforeCreate(少使用) > 可以讀到 Vue 但在此階段無法讀取到資料

created(常使用) > 完成 data, methods 建立

beforeMounted > DOM 掛載在瀏覽器之前(等一下等到所有東西都 ready 後才會 Mounted)

beforeCreate > created > beforeMounted > beforeCreate > created > beforeMounted... ready > Mounted

Mounted(常使用) > 掛載到瀏覽器

beforeUpdate > 更新之前

addvcomponent

beforeUpdate > beforeCreate > created > beforeMounted > Mounted > Updated

update data

beforeUpdate > Updated

Updated > 更新完成

beforeDestory(常使用) > 摧毀之前(關閉計時器、移除事件增聽)

Destory > 摧毀 cpmponents

![Vue 的生命週期](https://th.bing.com/th/id/OIP.byyX8EW6mIhRsCBWwByNYgHaSw?pid=ImgDet&rs=1)
