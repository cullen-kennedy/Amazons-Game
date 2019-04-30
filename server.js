var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io') (server);

var rooms = 0;

app.set('port', 5000);

app.use('/', express.static(__dirname +'/'));

app.get('/', function (request, response) {
    console.timeLog(__dirname);
    response.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function(socket) {
    
    socket.on('createGame', function(data) {
        socket.join('room-' + ++rooms);
        socket.emit('newGame', {name: data.name, room: 'room-' + rooms})
    });

    socket.on('joinGame', function(data) {
        var room = io.nsps['/'].adapter.rooms[data.room];
        if ( room && room.length == 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {name: data.name, room: data.room});
            socket.emit('player2', {name: data.name, room: data.room});
        }
        else {
            socket.emit('err', {message: 'The room is full'});
        }
    });

    socket.on('default', function(data) {

        socket.broadcast.to(data.room).emit('oppDefault', {
            row: data.row,
            col: data.col,
            room: data.room
        });
       
    });

});

server.listen(5000, function() {
    console.log('starting server on port 5000');
});