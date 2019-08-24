var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io') (server);

var rooms = 0;

app.set('port', ( process.env.PORT || 5000 ));

app.use('/', express.static(__dirname +'/'));

app.get('/', function (request, response) {
    console.timeLog(__dirname);
    response.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    var currentRoomId;
    socket.on('createGame', (data) => {
        currentRoomId = 'room-' + ++rooms;
        socket.join(currentRoomId);
        socket.emit('newGame', {name: data.name, room: currentRoomId})
    });

    socket.on('joinGame', (data) => {
        var room = io.nsps['/'].adapter.rooms[data.room];
        currentRoomId = data.room
        if ( room && room.length == 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {name: data.name, room: data.room});
            socket.emit('player2', {name: data.name, room: currentRoomId});
        }
        else {
            socket.emit('err', {message: 'The room is full'});
        }
    });

    socket.on('playersMove', (data) => {
        socket.broadcast.to(currentRoomId).emit('oppMove', {
            selID: data.selID,
            row: data.newrow,
            col: data.newcol,
        });
    });

    socket.on('playersShoot', (data) => {
        socket.broadcast.to(currentRoomId).emit('oppShoot', {
            row: data.row,
            col: data.col,
        });
    });

    socket.on('gameOver', (data) => {
        socket.broadcast.to(currentRoomId).emit('oppEnd', {status: data.status});
    })

    socket.on('endGame', (data) => {
        socket.broadcast.to(currentRoomId).emit('oppEndGame', {myScore: data.oppScore, oppScore: data.myScore, winning: data.winning});
    })
    socket.on('continue', () => {
        socket.broadcast.to(currentRoomId).emit('continueGame');
    })

    //Need to force the other player to leave if other disconnects... for now.
    //Later maybe allow the game to be rejoinable
    socket.on('disconnect', () => {
        socket.broadcast.to(currentRoomId).emit('disconnected');
    } )

});

server.listen(app.get('port'), function() {
    console.log('starting server');
});