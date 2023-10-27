# canvas  2023/10/20

## Canvas 介紹

### 甚麼是 Canvas?
Canvas 全名是 HTML5 Canvas，是一個瀏覽器提供的繪圖 API，讓工程師可以使用 JavaScript(不是 HTML) 可以繪製各種圖形。

### 他可以做到甚麼?
1. 繪製圖形
1. 建立動畫
1. 合成圖片

## 實作 Canvas

### Step1 建立新專案

建立資料夾(canvas-playground) -> 建立 index.html, canvas.js, style.css

> 使用 Live Server - 建立即時更新的本機伺服器

先建立一個 html 模板 裡面引入canvas.js, style.css, 加入 canvas tag

（先使用 h1 測試是否有成功 import）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Canvas-playground</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>
    <canvas id="canvas"></canvas>
    <script src="./canvas.js"></script>
</body>
</html>
```

style.css 加入 border 來觀察 canvas tag

```css
#canvas {
    border: 1px solid #333;
    background: black;
    width: 100vw;
    height: 100vh;
}

body {
    margin: 0;
}
```
canvas.js 取得 html canvas tag

```js
const canvas = document.getElementById('canvas');
// 渲染環境(rendering context) 3D -> WebGL, OpenGL ES
const ctx = canvas.getContext('2d');
```

#### Canvas 2D 與 3D 範例

2D 範例
- [2D - example1]
- [2D - example2]
- [2D - example3]

3D 範例 (webgl, webgl2)

- [3D - example1]
- [3D - example2]
- [3D - example3]


打印 ctx 出來

```js
console.log('ctx', ctx);
```

會得到 CanvasRenderingContext2D 物件，裡面有很多屬性與方法可以使用

### Step2 Canvas 基本屬性

```js
// x, y canvas 位置, width, height 寬跟高
// 四邊形 ctx.fillRect(x, y, width, height);
// example 1
ctx.fillStyle = '#336912';
ctx.fillRect(10, 10, 20, 20);
ctx.fillStyle = '#ff6912';
ctx.fillRect(40, 40, 20, 20);
ctx.strokeStyle = '#ff6912';
ctx.strokeRect(80, 80, 20, 20);


// example 2
ctx.fillStyle = '#ff6912';
ctx.fillRect(10, 10, 100, 100);
ctx.clearRect(20, 20, 40, 40);

```

這時候發現拉寬螢幕時會造成 canvas 變形，因為我們需要去設定 canvas 長寬 (雖然有在 css 那邊這定，但 canvas 這邊需要再設定一次)

在 resize 並不會有 RWD 效果，因為 canvas 已經畫在指定的位置上

所以需要去監聽 resize 事件，因為 resize canvas 圖案會不見

```js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = '#ff6912';
ctx.fillRect(10, 10, 100, 100);
ctx.clearRect(20, 20, 40, 40);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // resize 時圖案會不見，這邊要在每次 resize 都要畫出來
    ctx.fillStyle = '#ff6912';
    ctx.fillRect(10, 10, 100, 100);
    ctx.clearRect(20, 20, 40, 40);
});
```

```js
// line
// 告訴 js 開始畫圖
ctx.beginPath();
// 移到 20, 20 位置 
ctx.moveTo(20, 20);
// 開始畫線到 50, 50
ctx.lineTo(50, 50);
// 開始畫線到 200, 20
ctx.lineTo(200, 20);
// changeColor
ctx.strokeStyle = '#22ff22';
// 畫出來, 沒有 stroke() 無法出現 line
ctx.stroke();
```

```js
// Circle
// 開始畫圖
ctx.beginPath();
// (位置X, 位置Y, radius, startAngle, endAngle, anticlockwise)
// anticlockwise true 逆時鐘開始畫
ctx.arc(300, 100, 30, 0, Math.PI * 2, false);
// 線的寬度
ctx.lineWidth = 5;
ctx.strokeStyle = 'yellow';
ctx.stroke();
// ctx.fillStyle = 'yellow';
// ctx.fill();
```

### Step3 Canvas 簡單動畫

先把程式碼 clean 成這樣

```js
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
```

建立 click 畫出圓圈的事件(簡易的程式互動效果)

```js
// 先建立 mouse 變數
const mouse = {
    x: 100,
    y: 100
}
// 加入 click 監聽事件
canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    // 最後在監聽事件中加入 drawCircle fn
    drawCircle();
});

// 建立 drawCircle fn
function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 50, 0 , Math.PI * 2);
    ctx.fill();
}
```

再加入 mousemove event 就可以在畫布上畫圖了
```js
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    // 最後在監聽事件中加入 drawCircle fn
    drawCircle();
});
```

建立另外一種形式的動畫 -> clearRect() -> drawCircle() -> clearRect() -> drawCircle() ...
```js
function animation() {
    // 清除整個畫布的圖案
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}

animation();
```

稍微調整一下程式碼 (移除監聽的 drawCircle()) 一樣可以達到畫圖的效果
```js
const mouse = {
    x: 100,
    y: 100
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0 , Math.PI * 2);
    ctx.fill();
}

function animation() {
    // 清除整個畫布的圖案
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}

animation();
```

### Step4 Canvas 進階動畫

init js
```js
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: 100,
    y: 100
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

function drawCircle() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 20, 0 , Math.PI * 2);
    ctx.fill();
}

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircle();
    requestAnimationFrame(animation);
}

animation();
```

我們現在想要建立一個circle 與 mousemove 互動的動畫

先建立一個 Particle class 

我想要這個 Particle 有位置, size, 移動的資訊

```js
class Particle {
    constructor() {
        // x, y, size, speedX, speedY
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }
    // 更新位置資訊
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // 畫出 parti
    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0 , Math.PI * 2);
        ctx.fill();
    }
}
```
Particle 有 draw() fn 後就可以把 drawCircle() 刪除

新增空陣列 particleArray, 再使用 init() new Particle() 出來 

console particleArray 陣列出來會發現該陣列裡面確實有 particle class

只是在 canvas 畫布上沒有顯示
```js
const particleArray = [];

function init() {
    for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}

init();
console.log(particleArray);

```

建立完 particle 後再利用另外一個 function 來控制這些 particles

在 animation() 中加入 handleParticle() -> 意味著每次跑 animation() 時
他會先 clear 整個畫布 handleParticle() ->  update(), draw() 每個 particle -> 一直重複

```js
function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

function animation() {
    // 清除整個畫布的圖案
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}
```

### Step5 Canvas 進階動畫-細節調整與互動

目前的程式碼

```js
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
const particleArray = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: 100,
    y: 100
}

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, 0 , Math.PI * 2);
        ctx.fill();
    }
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    init();
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});


function animation() {
    // 清除整個畫布的圖案
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}

animation();

function init() {
    for (let i = 0; i < 100; i++) {
        particleArray.push(new Particle());
    }
}

init();

function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }
}

```

調整 Particle size, update() 與 handleParticle() 細節
```js
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
        ctx.fill();
    }
}

function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        // 可以把下面的 if 隱藏，看 console 出來的結果
        console.log(particleArray.length);
        if (particleArray[i].size <= 0.3) {
            // 刪除一個 element
            particleArray.splice(i, 1);
            // 刪除後 i-- 
            // 假如 i = 0, i splice 1 後就變成 articleArray.length -> 99 個
            // i ++ -> i = 1 skip 掉一個 array 裡面的東西
            // i-- -> i++ -> i = 0 再從 splice 後的 array 去跑回圈
            i--;
            console.log(particleArray.length);
        }
    }
}
```

再來調整一下互動方式，把 init() fn 放到 監聽事件內 (mousemove, click), loop 改成 10 看一下互動效果
```js

function init() {
    for (let i = 0; i < 10; i++) {
        particleArray.push(new Particle());
    }
}

canvas.addEventListener('click', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    init();
});

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    init();
});
```

再來調整一下細節，做出特別煙花效果
```js
function animation() {
    // 清除整個畫布的圖案
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    // 畫四邊形
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}
```

調整顏色
```js
let hue = 0;

class Particle {
    draw() {
        // hsl 色相, 飽和度, 亮度
        ctx.fillStyle = 'hsl('+ hue +',100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
        ctx.fill();
    }
}

function animation() {
    // 我把 fillStyle -> 改成 'rgba(0,0,0,0.02)'
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 也可以改成 hue+=5 -> 變色會變更快
    hue++;
    handleParticle();
    // 方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在下次重繪畫面前呼叫特定函數更新動畫 (mdn)
    requestAnimationFrame(animation);
}
```

class Particle 可以再調整一下
```js
class Particle {
    constructor() {
        ...
        this.color = 'hsl('+ hue +',100%, 50%)';
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0 , Math.PI * 2);
        ctx.fill();
    }
}
```

### Step6 Canvas 進階動畫-1

js init
```js
function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0,0,0,0.02)';
    hue+=2;
    handleParticle();
    requestAnimationFrame(animation);
}
```
動畫 -> 想要把兩顆球連線

```js
function handleParticle() {
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
        // 新增項目， j 代表除了 i 以外的 particle
        for (let j = i + 1; j < particleArray.length; j++) {
            // 兩個 particle x 距離
            const dx = particleArray[i].x - particleArray[j].x;
            // 兩個 particle y 距離
            const dy = particleArray[i].y - particleArray[j].y;
            // 兩顆球直線距離
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 50) {
                ctx.beginPath();
                ctx.strokeStyle = particleArray[i].color;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particleArray[i].x, particleArray[i].y);
                ctx.lineTo(particleArray[j].x, particleArray[j].y);
                ctx.stroke();
            }
        }
        if (particleArray[i].size <= 0.3) {
            particleArray.splice(i, 1);
            i--
        }
    }
}
```

end


### 參考文章與影片
+ [Canvas 筆記 甚麼是 canvas ?]
+ [MDN canvas API]
+ [HTML5 Canvas Tutorial]
+ [HTML5 Canvas CRASH COURSE for Beginners]

[Canvas 筆記 甚麼是 canvas ?]: https://powerfultraveling.coderbridge.io/2021/12/07/what-is-canvas/
[MDN canvas API]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[HTML5 Canvas Tutorial]: https://www.youtube.com/watch?v=EO6OkltgudE&list=PLpPnRKq7eNW3We9VdCfx9fprhqXHwTPXL&index=1
[HTML5 Canvas CRASH COURSE for Beginners]: https://www.youtube.com/watch?v=Yvz_axxWG4Y&list=WL&index=1&t=689s

[2D - example website]: https://webdesign.tutsplus.com/21-ridiculously-impressive-html5-canvas-experiments--net-14210a

[2D - example1]: https://codepen.io/towc/pen/mJzOWJ
[2D - example2]: https://codepen.io/linrock/pen/nMadjQ
[2D - example3]: https://codepen.io/mimikos/pen/wKqyqY

[3D - example website]: https://www.kevs3d.co.uk/dev/


[3D - example1]: https://www.kevs3d.co.uk/dev/shaders/distancefield3.html
[3D - example2]: https://www.kevs3d.co.uk/dev/shaders/terrain3.html
[3D - example3]: https://www.kevs3d.co.uk/dev/shaders/fractal.html
