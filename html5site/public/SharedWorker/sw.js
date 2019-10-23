var d = null, c = 0;
self.addEventListener('connect',function(event){
    var port = event.ports[0];
    //每個主程式都會看到相同的時間
    if(d == null){
        d = new Date();
    }
   //每個主程式會看到累加的結果
    c++
    port.onmessage = function(event){
        //接收主程式傳過來的資料event.data {"name":"Jack"}{"name":"Mary"}
        var data = "Hello " + event.data.name + "一樣的時間：" + d + "累加的數字：" + c;
        
        //將資料傳回給主程式
        port.postMessage(data);

    }
})