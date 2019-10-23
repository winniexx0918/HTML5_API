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




//儲存
document.querySelector("#buttonSave").addEventListener("click", function () { 
        var myImg = document.querySelector("#img1");
        myImg.src = canvas.toDataURL("image/png");
}, false);


//清除
document.querySelector("#buttonClear").addEventListener("click", function () {
    location.reload();
}, false);