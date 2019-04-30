import Player from './class/player'
import myCanvas from './class/myCanvas'
import Game from './class/game'

var socket = io.connect('http://localhost:5000');
var canvas = new myCanvas();
var player, game;

//New game
$('#new').on('click', function() {
    var name = $('#nameNew').val();
    socket.emit('createGame', {name: name}); //server.js on.createGame
    player = new Player(name, 0, 0, 4, 4); //first player with name and initial starting point
});

//Join created game
$('#join').on('click', function() {
    var name = $('#nameJoin').val();
    var roomID = $('#room').val();

    socket.emit('joinGame', {name: name, room: roomID}); //server.js on.joinGame 
    player = new Player(name, 4, 4, 0, 0); //second player with name and initial starting point
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', function(data) {
    game = new Game(data.room);
    game.displayBoard(canvas.ctx);
    document.getElementById("message").innerHTML = data.room;
    
});

//Called by server.js, broadcast to player 1 by player 2
//sends player 1 the room name and a name
//CHECK WHAT NAME IS SENT BACK?
socket.on ('player1', (data) => {
    const message = 'Hello, player1';
    player.default(canvas.ctx);

//Sends back to server.js player1s initial position, which is broadcasted to player 2   
    socket.emit('default', {
        row: player.piece.row,
        col: player.piece.col,
        room: data.room
    });
});

//Displays board and does the same as on.'player1'
socket.on ('player2', (data) => {
    const message = 'Hello, player2';

    game = new Game(data.room);
    game.displayBoard(canvas.ctx);
    document.getElementById("message").innerHTML = data.room;
    player.default(canvas.ctx);
   
    socket.emit('default', {
        row: player.piece.row,
        col: player.piece.col,
        room: data.room
    });
});

//Temporary fill of opponents space and setting op piece
socket.on('oppDefault', (data) => {
    player.oppPiece.opy = data.row;
    player.oppPiece.opx = data.col;
    canvas.ctx.fillRect(data.row * 100, data.col * 100, 100, 100);
})

