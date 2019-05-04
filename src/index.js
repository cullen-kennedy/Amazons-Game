import Player from './class/player'
import myCanvas from './class/myCanvas'
import Game from './class/game'
import Board from './class/board'

var socket = io.connect('http://localhost:5000');
var canvas = new myCanvas();
var player, game, board;


/***************************************************************************************
 * Player 1 functions
 */

 //New game
$('#new').on('click', () => {
    var name = $('#nameNew').val();
    socket.emit('createGame', {name: name}); //server.js on.createGame
    player = new Player(name, 'blue', 'red', true); //first player with name and initial starting point
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', (data) => {
    
    game = new Game(data.room, player);
    board = new Board(data.room, player);
    player.setup(game.player1IDs, game.player1Pos, game.player2IDs, game.player2Pos);
   

    
    board.displayBoard(canvas.ctx);
    document.getElementById("message").innerHTML = data.room + ' ' + player.name + ' ' + player.myTurnStart;  
});

//Called by server.js, broadcast to player 1 by player 2
//sends player 1 the room name and a name
//CHECK WHAT NAME IS SENT BACK?
socket.on ('player1', (data) => {
    const message = 'Hello, player1';
    
    //Default value are hardcoded in game and player class
    board.default(canvas.ctx);
    board.oppDefault(canvas.ctx);

    canvas.canvas.addEventListener('click', (e) => {       
        processClick(e.clientX, e.clientY);
    });
});

/****************************************************************************************
 * Player 2 functions
 */

//Join created game
$('#join').on('click', () => {
    var name = $('#nameJoin').val();
    var roomID = $('#room').val();

    socket.emit('joinGame', {name: name, room: roomID}); //server.js on.joinGame 
    player = new Player(name, 'red', 'blue', false); //second player with name and initial starting point
    
});

//Displays board and does the same as on.'player1'
socket.on ('player2', (data) => {
    const message = 'Hello, player2';
   
    game = new Game(data.room, player);
    board = new Board(data.room, player);
    player.setup(game.player2IDs, game.player2Pos, game.player1IDs, game.player1Pos);
    
    document.getElementById("message").innerHTML = data.room;
    board.displayBoard(canvas.ctx);
    board.default(canvas.ctx);
    board.oppDefault(canvas.ctx);

    canvas.canvas.addEventListener('click', (e)=> {       
        processClick(e.clientX, e.clientY);
    });
});

/**************************************************************************
* Game Controller functions
* Game class controls the logic while board class controls the
* visuals. Player class also keeps track of own pieces, opponent
* pieces and selected piece
**************************************************************************/

/**
 * Opponent functions to update board with data from server
 */

//Update Move
socket.on('oppMove', (data) => {
    console.log('oppmove');
    canvas.ctx.fillStyle = 'white';
    canvas.ctx.fillRect(player.oppPieces.get(data.selID).col * 50, player.oppPieces.get(data.selID).row * 50, 50, 50);
    game.oppMove(data.selID, data.col, data.row)
    board.oppMove(canvas.ctx, data.col, data.row);
    
});

//Update opponents arrow
socket.on('oppShoot', (data) => {
    game.oppShoot(data.col, data.row)
    board.oppShoot(canvas.ctx, data.col, data.row)
    player.myTurnStart = true;
})

//The event listener is always listening, 
//but the action that is takes depends on player variables
function processClick(x, y) {

        if (player.myTurnStart == true)
        {
            let xcoord = (~~((x - canvas.canvas.offsetLeft) /50));
            let ycoord = (~~((y - canvas.canvas.offsetTop) / 50));

            if (processMoveStart(xcoord, ycoord) == true) {

                player.myTurnStart = false;
                player.myTurnEnd = true;
            }
            else {
                console.log("Not your piece");
            }

        }
        else if (player.myTurnEnd == true)
        {

            let xcoord = (~~((x - canvas.canvas.offsetLeft) / 50));
            let ycoord = (~~((y - canvas.canvas.offsetTop) / 50));

            if (processMoveEnd(xcoord, ycoord) == true) {
                socket.emit('playersMove', {
                    selID: player.selection.ID,
                    newrow: ycoord,
                    newcol: xcoord,
                    room: game.roomID
                });

                player.myTurnEnd = false;
                player.myShoot = true;
            }
            else {
                console.log('Not Legal Move')
            }
        }
        else if (player.myShoot == true)
        { 
            let xcoord = (~~((x - canvas.canvas.offsetLeft) / 50));
            let ycoord = (~~((y - canvas.canvas.offsetTop) / 50)); 

            if (processShoot(xcoord, ycoord) == true) {
                
                socket.emit('playersShoot', {
                    row: ycoord,
                    col: xcoord,
                    room: game.roomID
                });
                
                player.myShoot = false;
                //print player instant pieces
                console.log(player.pieces);
                console.log(player.oppPieces);
            }
            else {
                console.log("Not legal shot");
            }
        } 
        else 
        {
            console.log("not your turn");
        } 


    function processMoveStart(x, y) {

        if (player.pieces.has(game.board[y][x]))
        {
            player.selection.ID = game.board[y][x];
            player.selection.row = y;
            player.selection.col = x;
            board.moveStart(canvas.ctx);
            return true;
        }
        else{
            return false;
        }
    }

    function processMoveEnd(x, y) {

        //CheckPath starts at the original place
        if (game.checkPath(player.selection.col, player.selection.row).includes(x + (y*10)) && game.moveEnd(x, y) == true){
            //Replace these next two lines with a function
            canvas.ctx.fillStyle = 'white';
            canvas.ctx.fillRect(player.selection.col * 50, player.selection.row * 50, 50, 50);
            board.moveEnd(canvas.ctx, x, y);
            return true;
        }
        else {
            return false;
        }    
    }
            
    function processShoot(x, y) {
        
        //checkpath starts at the new player piece position
        if (game.checkPath(player.pieces.get(player.selection.ID).col, player.pieces.get(player.selection.ID).row).includes(x + (y * 10)) && game.shoot(x, y) == true){
            board.shoot(canvas.ctx, x, y);
            return true;
        } else 
        {
            return false;
        }
    }
}

