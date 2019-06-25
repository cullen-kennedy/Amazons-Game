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

io.on('connection', (socket) => {
    
    socket.on('createGame', (data) => {
        socket.join('room-' + ++rooms);
        socket.emit('newGame', {name: data.name, room: 'room-' + rooms})
    });

    socket.on('joinGame', (data) => {
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

    socket.on('playersMove', (data) => {
        socket.broadcast.to(data.room).emit('oppMove', {
            selID: data.selID,
            row: data.newrow,
            col: data.newcol,
        });
    });

    socket.on('playersShoot', (data) => {
        socket.broadcast.to(data.room).emit('oppShoot', {
            row: data.row,
            col: data.col,
            room: data.room
        });
    });

    socket.on('gameOver', (data) => {
        socket.broadcast.to(data.room).emit('oppEnd', {status: data.status});
    })

    socket.on('endGame', (data) => {
        socket.broadcast.to(data.room).emit('oppEndGame', {score: data.score, winning: data.winning});
    })
    socket.on('continue', (data) => {
        socket.broadcast.to(data.room).emit('continueGame');
    })

    //Need to force the other player to leave if other disconnects... for now.
    //Later maybe allow the game to be rejoinable
    socket.on('disconnect', () => {
        console.log("disconnected");
        socket.broadcast.to('room-'+rooms).emit('disconnected');
    } )

});

server.listen(5000, function() {
    console.log('starting server on port 5000');
});