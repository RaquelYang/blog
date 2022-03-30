# HTTP 請求與 AJAX

HTTP 請求 : 向後端請求資料

常見請求方法：GET, PATCH, DELETE, POST, PUT (少用)

如果使用上述方法設計 API => RESTful API(規範)

> GET, DELETE 沒有 BODY 不能傳資料

AJAX(Asynchronous Javascript And XML)

傳統： form > Server > new HTML
AJAX: Request > Data(XML, JSON) > Update data(DOM)
在不更新網頁的前提下向服務器（Server）拿取必要的資料(發送 HTTP Request)，拿到資料後用 JS 改變 DOM
優點：減少讀取時間，使用者體驗比一班網頁好

## AJAX 種類

- XMLHttpRequest (XHR) > 瀏覽器原生 - 4
- Fetch API > 瀏覽器原生 - 2
- jQuery AJAX - 3
- Axios - 1

練習串接 API 網站
[jsonplaceholder](https://jsonplaceholder.typicode.com/)

### XMLHttpRequest (XHR)

沒人在用了ＱＱ

```js
// XMLHttpRequest (GET)
// 取得資料
// 建立一個 XHR 實體
const xhr = new XMLHttpRequest();
// 建立 get 請求
xhr.open("get", "https://jsonplaceholder.typicode.com/posts");
xhr.onload = () => {
  const json = JSON.parse(xhr.responseText);
  console.log(json);
};
xhr.onerror = (error) => {
  console.log(error);
};
xhr.send();
```

---

```js
// XMLHttpRequest (POST)
// 新增資料
const xhr = new XMLHttpRequest();
xhr.open("post", "https://jsonplaceholder.typicode.com/posts");
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = () => {
  const json = JSON.parse(xhr.responseText);
  console.log(json);
};
xhr.onerror = (error) => {
  console.log(error);
};
xhr.send(
  JSON.stringify({
    title: "Hello",
    body: "seeeee you",
  })
);
```
