import Player from './class/player'
import myCanvas from './class/myCanvas'
import Game from './class/game'
import Board from './class/board'

var socket = io.connect('http://localhost:5000');
var canvas = new myCanvas();
var player, game, board, controller;


/***************************************************************************************
 * Player 1 functions
 */

 //New game
$('#new').on('click', function() {
    var name = $('#nameNew').val();
    socket.emit('createGame', {name: name}); //server.js on.createGame
    player = new Player(name, 0, 0, 4, 4, 'blue', 'red', true); //first player with name and initial starting point
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', function(data) {
    game = new Game(data.room);
    board = new Board(data.room);
    board.displayBoard(canvas.ctx);
    document.getElementById("message").innerHTML = data.room + ' ' + player.name + ' ' + player.myTurnStart;
    
});

//Called by server.js, broadcast to player 1 by player 2
//sends player 1 the room name and a name
//CHECK WHAT NAME IS SENT BACK?
socket.on ('player1', (data) => {
    const message = 'Hello, player1';
    board.default(canvas.ctx, player);

//Sends back to server.js player1s initial position, which is broadcasted to player 2   
    socket.emit('default', {
        row: player.piece.row,
        col: player.piece.col,
        room: data.room
    });

    canvas.canvas.addEventListener('click', (e)=> {       
        processClick(e.clientX, e.clientY);
    });
});

/****************************************************************************************
 * Player 2 functions
 */

//Join created game
$('#join').on('click', function() {
    var name = $('#nameJoin').val();
    var roomID = $('#room').val();

    socket.emit('joinGame', {name: name, room: roomID}); //server.js on.joinGame 
    
    player = new Player(name, 4, 4, 0, 0, 'red', 'blue', false); //second player with name and initial starting point
    
});

//Displays board and does the same as on.'player1'
socket.on ('player2', (data) => {
    const message = 'Hello, player2';

    game = new Game(data.room);
    board = new Board(data.room);
    
    document.getElementById("message").innerHTML = data.room;
    board.displayBoard(canvas.ctx);
    board.default(canvas.ctx, player);
   
    socket.emit('default', {
        row: player.piece.row,
        col: player.piece.col,
        room: data.room
    });

    canvas.canvas.addEventListener('click', (e)=> {       
        processClick(e.clientX, e.clientY);
    });
});

/***********************************************************************************
 * General functions
 */
//fill of opponents space on setup
socket.on('oppDefault', (data) => {
    player.oppPiece.row = data.row;
    player.oppPiece.col = data.col;
    board.oppDefault(canvas.ctx, player);
})
//Update opponents move
socket.on('oppMove', (data)=> {

    //Replace these next two lines with a function
    canvas.ctx.fillStyle = 'white';
    canvas.ctx.fillRect(player.oppPiece.col * 100, player.oppPiece.row * 100, 100, 100);

    player.oppPiece.row = data.row;
    player.oppPiece.col = data.col;
    board.oppMove(canvas.ctx, player);
});

//Update opponents arrow
socket.on('oppShoot', (data) => {
    board.oppShoot(canvas.ctx, data.col, data.row)
    player.myTurnStart = true;
})

//The event listener is always listening, but the action that is takes depends on player variables
function processClick(x, y) {

    if (player.myTurnStart == true)
    {
        let xcoord = (~~((x - canvas.canvas.offsetLeft) / 100));
        let ycoord = (~~((y - canvas.canvas.offsetTop) / 100));

        processMoveStart(xcoord, ycoord);

        player.myTurnStart = false;
        player.myTurnEnd = true;
    }
    else if (player.myTurnEnd == true)
    {

        let xcoord = (~~((x - canvas.canvas.offsetLeft) / 100));
        let ycoord = (~~((y - canvas.canvas.offsetTop) / 100));

        processMoveEnd(xcoord, ycoord);

        socket.emit('playersMove', {
            row: player.piece.row,
            col: player.piece.col,
            room: game.roomID
        });

        player.myTurnEnd = false;
        player.myShoot = true;
    }
    else if (player.myShoot == true)
    { 
        let xcoord = (~~((x - canvas.canvas.offsetLeft) / 100));
        let ycoord = (~~((y - canvas.canvas.offsetTop) / 100)); 

        processShoot(xcoord, ycoord);

        console.log('emit');
        console.log(game.room);
        socket.emit('playersShoot', {
            row: ycoord,
            col: xcoord,
            room: game.roomID
        });

        player.myShoot = false;
    } 
    else 
    {
        console.log("not your turn");
    } 


    function processMoveStart(x, y) {
        if (player.piece.row == y && player.piece.col == x)
        {
            board.moveStart(canvas.ctx, player);
        }
    }

    function processMoveEnd(x, y) {
        //check if space is available

        //Replace these next two lines with a function
        canvas.ctx.fillStyle = 'white';
        canvas.ctx.fillRect(player.piece.col * 100, player.piece.row * 100, 100, 100);

        player.piece.row = y;
        player.piece.col = x;

        board.moveEnd(canvas.ctx, player);

    }
        
    function processShoot(x, y) {
        board.shoot(canvas.ctx, x, y);
    }
}


