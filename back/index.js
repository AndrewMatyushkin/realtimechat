// подключение модулей
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

// чтение только этого порта
server.listen(3000);

// при заходе на гл страницу - будет запускаться файл
app.get('/', function(request, respons){
    respons.sendFile(__dirname + "/index.html")
});

// Массивы с информацией
users = [];
connections = [];

// при подключении происходит:
io.sockets.on('connection', function(socket){
    console.log('добро пожаловать')
    // добавление в массив подключение
    connections.push(socket);

    // дисконнекст
    socket.on('disconnect', function(data) {
        console.log('пока')
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on('send msg', function(data) {
        io.sockets.emit('new msg', {msg: data});
    })
});