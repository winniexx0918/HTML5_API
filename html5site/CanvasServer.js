var WebSocketServer = require('websocket').server;
var http = require('http');
var clients = [];
var server = http.createServer(function (request, response) {

});

server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

wsServer = new WebSocketServer({
    httpServer: server,
});

//每個連進來的使用者都會觸發request事件
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Connection accepted.');

    //將連進來的使用者存到clients陣列中
    var index = clients.push(connection) - 1;

    //瀏覽器傳過來得資料，會觸發message事件
    //可以在此事件中接收資料
    connection.on('message', function (message) {
        console.log(message);
        //將收到的資料，廣播給所有連進來的使用者
        for (var i = 0, max = clients.length; i < max; i++) {      
            clients[i].sendUTF(message.utf8Data);
        }

    });
    // 瀏覽器關閉或離開會觸發close事件
    connection.on('close', function (reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});







