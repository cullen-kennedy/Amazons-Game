import Player from './class/player'
import myCanvas from './class/myCanvas'
import Game from './class/game'
import Board from './class/board'

var socket = io.connect('http://localhost:5000');
var canvas = new myCanvas();
var player, game, board, validMoves, gameOver = false;


/***************************************************************************************
 * Player 1 functions
 */

 //New game
$('#new').on('click', () => {
    var name = $('#nameNew').val();
    player = new Player(name, 'images/queen.jpg', 'images/queen2.jpg', true);
    socket.emit('createGame', {name: name}); //server.js on.createGame
     //first player with name and initial starting point
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', (data) => {
    
    game = new Game(data.room, player);
    board = new Board(canvas.ctx, data.room, player);
    player.setup(game.player1IDs, game.player1Pos, game.player2IDs, game.player2Pos);

    document.getElementById("roomid").innerHTML = 'Room: ' + data.room; 
    document.getElementById("message").innerHTML = 'Player: ' + player.name;
    
    board.displayBoard();
    
    

});

//Called by server.js, broadcast to player 1 by player 2
//sends player 1 the room name and a name
//CHECK WHAT NAME IS SENT BACK?
socket.on ('player1', (data) => {
    
    
    //Default value are hardcoded in game and player class
    board.default();
    board.oppDefault();

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
     //second player with name and initial starting point
    player = new Player(name, 'images/queen2.jpg', 'images/queen.jpg', false);

    
    socket.emit('joinGame', {name: name, room: roomID}); //server.js on.joinGame    
});

//Displays board and does the same as on.'player1'
socket.on ('player2', (data) => {

    game = new Game(data.room, player);
    board = new Board(canvas.ctx, data.room, player);
    board.displayBoard();
    player.setup(game.player2IDs, game.player2Pos, game.player1IDs, game.player1Pos);
    
    document.getElementById("roomid").innerHTML = 'Room: ' + data.room; 
    document.getElementById("message").innerHTML = 'Player: ' + player.name;
   
    //This doesn't work every time!
    player.image.onload = () => {
        board.default();
    }

    player.oppImage.onload = () => {
        board.oppDefault();
    }

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
    board.resetBlock(player.oppPieces.get(data.selID).col, player.oppPieces.get(data.selID).row)  
    game.oppMove(data.selID, data.col, data.row)
    board.oppMove(data.col, data.row);
    
});

//Update opponents arrow
socket.on('oppShoot', (data) => {
    game.oppShoot(data.col, data.row)
    board.oppShoot(data.col, data.row)
    player.myTurnStart = true;
})

socket.on('end', (data) => {
    console.log(data.status)
})

socket.on('disconnected', () => {
    console.log("Your opponent disconnected")
})
//The event listener is always listening, 
//but the action that is takes depends on player variables
function processClick(x, y) {

        if (player.myTurnStart == true)
        { 
         
            let xcoord = (~~((x - canvas.canvas.offsetLeft) / 50));
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

            if (player.pieces.has(game.board[ycoord][xcoord])) {
                player.myTurnEnd = false;
                player.myTurnStart = true;
                board.clearValidMoves(validMoves);
                board.resetBorder(player.selection.col, player.selection.row);
            }

            else if (processMoveEnd(xcoord, ycoord) == true) {
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
                if (game.win())  {
                    socket.emit('gameOver', {room: game.roomID, status: 'You Lost'} )
                    console.log('You Won')
                }
                else if (game.lose()) {
                    socket.emit('gameOver', {room: game.roomID, status: 'You Won'} )
                    console.log('You Lost')
                }
                player.myShoot = false;
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
                player.updateSel(game.board[y][x], x, y);
                board.moveStart();
                validMoves = game.checkPath(x, y)
                board.validMoves(validMoves, 0)
                return true;
            }
            else{
                return false;
            }
        }

        function processMoveEnd(x, y) {
            //CheckPath starts at the original place
            if (validMoves.includes(x + (y*10)) && game.moveEnd(x, y) == true){
                board.clearValidMoves(validMoves)
                board.resetBlock(player.selection.col, player.selection.row)
                board.moveEnd(x, y);
                validMoves = game.checkPath(player.pieces.get(player.selection.ID).col, player.pieces.get(player.selection.ID).row)
                board.showSelection(player.pieces.get(player.selection.ID).col, player.pieces.get(player.selection.ID).row)
                board.validMoves(validMoves, 1);
                
                return true;
            }
            else {
                return false;
            }    
        }
                
        function processShoot(x, y) {

            //checkpath starts at the new player piece position
            if (validMoves.includes(x + (y * 10)) && game.shoot(x, y) == true){
                board.clearValidMoves(validMoves);
                board.resetBorder(player.pieces.get(player.selection.ID).col, player.pieces.get(player.selection.ID).row)
                board.shoot(x, y);
                return true;
            } else 
            {
                return false;
            }
        }
    }
//}
