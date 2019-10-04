var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var flag = false;

//開始畫圖
canvas.addEventListener("mousedown", function (event) {
    flag = true;
    //console.log(event.offsetX + "," + event.offsetY)
    //to do 開始一個新路徑，產生後再使用繪圖指令來設定路徑。
    context.beginPath();

    //to do 移動畫筆到指定的滑鼠點選的位置上
    //使用event.offsetX 取得滑鼠的x軸座標點
    //使用event.offsetY 取得滑鼠的y軸座標點
    context.moveTo(event.offsetX,event.offsetY)

    //讀取使用者選取的顏色
    var color = document.querySelector("#color1").value;
    //讀取使用者設定線條的寬度
    var w = document.querySelector("#number1").value;

    //to do 設定線條顏色
    context.strokeStyle = color;

    //to do 設定線條寬度
    context.lineWidth = w;
}, false);

//畫圖中
canvas.addEventListener("mousemove", function (event) {
    if (flag) {
        //to do 從目前繪圖點畫一條直線到滑鼠點選的位置上
        //使用event.offsetX 取得滑鼠的x軸座標點
        //使用event.offsetY 取得滑鼠的y軸座標點
        //console.log(event.offsetX + "," + event.offsetY)
        context.lineTo(event.offsetX,event.offsetY);
        //to do 畫出圖形的線條
        context.stroke();
    }
}, false);

//結束畫圖
canvas.addEventListener("mouseup", function (event) {
    flag = false;
}, false);


document.querySelector("#text1").addEventListener("blur", function () {
    
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.font = "italic 2em 標楷體";
    context.textAlign = "center";
    context.fillStyle = "purple";

    //to do 請將輸入在text1裡面的文字寫到canvas中
    //使用this.value 讀出text1裡面的文字
    context.fillText(this.value,x,y);

}, false);

document.querySelector("#file1").addEventListener("change", function () {
    var imageObj = new Image();
    imageObj.onload = function () {
        for (var i = 0; i < 20; i++) {
            var w = Math.floor(Math.random() * 40);    //設定繪製圖型的大小
            var x = Math.floor(Math.random() * canvas.width); //設定繪製圖型位置的x座標
            var y = Math.floor(Math.random() * canvas.height); //設定繪製圖型位置的y座標

            //to do 將選取的圖,放大縮小後繪到canvas中
            context.drawImage(imageObj, x, y, w, w);
        }
    }

    //這是不正確的寫法
    imageObj.src = this.files[0].name;  //會到Server端去下載圖片

    //要改用FileReader物件去讀取使用者選到自己電腦中的圖
}, false);

//儲存
document.querySelector("#buttonSave").addEventListener("click", function () { 
        var myImg = document.querySelector("#img1");
        myImg.src = canvas.toDataURL("image/png");
}, false);


//清除
document.querySelector("#buttonClear").addEventListener("click", function () {
    location.reload();
}, false);