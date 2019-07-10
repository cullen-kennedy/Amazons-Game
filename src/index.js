import Player from './class/player'
import myCanvas from './class/myCanvas'
import Game from './class/game'
import Board from './class/board'

var socket = io.connect('http://localhost:5000');
var canvas = new myCanvas();
var player, game, board, validMoves, gameOver = false;
var endGameBox = document.getElementById("end-game");
var bigAlertBox = document.getElementById("big-alert");



//======================================================================================================
// Messages
//======================================================================================================

function endGameMessage(myScore, oppScore, winning) {
    endGameBox.style.display = 'block'
    let alertMessage = endGameBox.querySelector(".alert-message");
    let exitAlert = endGameBox.querySelector(".exit-alert");
    if (winning) {
        exitAlert.style.display = 'none';
        endGameBox.querySelector("#continue-endgame").style.display = 'none';
    } else {
        endGameBox.querySelector("#wait-concede").style.display = 'none';
    }
	//Message formatting is kind of messy
    alertMessage.textContent = "ENDGAME\r\nApprox. Moves left: " + myScore + "\r\n\r\nApprox. Opponent\r\nMoves Left: " + oppScore;
 
}

function bigAlert(message, allowexit) {
	if (allowexit)
	{
		document.getElementById("reload").style.display = 'block';
	}
	else
	{
		document.getElementById("reload").style.display = 'none';
	}
    endGameBox.style.display = 'none'
    bigAlertBox.style.display = 'block'
    let alertMessage = bigAlertBox.querySelector(".alert-message")

    alertMessage.textContent = message;
}

$(".exit-alert").on('click', function() {
       let exittype = this.id;
       processExit(exittype);
})

function processExit(exittype) {
    switch(exittype){
        case "concede-endgame":
            endGameBox.style.display = 'none'; 
            socket.emit('gameOver', {room: game.roomID, status: 'You Won'} )
            bigAlert('You Lost', true)
            break;
        case "reload":
            location.reload();
            break;
        case "continue-endgame":
            endGameBox.style.display = 'none';
            socket.emit('continue', {room: game.roomID});
    }
}


//======================================================================================================
// Player 1 functions
//======================================================================================================

 //New game
$('#new').on('click', () => {
    var name = $('#nameNew').val();
    player = new Player(name, 'images/queen.jpg', 'images/queen2.jpg', true);
    socket.emit('createGame', {name: name}); //server.js on.createGame
	bigAlert("Waiting for player to join", true)
     //first player with name and initial starting point
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', (data) => {
    
    game = new Game(data.room, player);
    board = new Board(canvas.ctx, data.room, player);
    player.setup(game.player1IDs, game.player1Pos, game.player2IDs, game.player2Pos);

    document.getElementById("roomid").textContent = 'Room ID: ' + data.room; 
    document.getElementById("message").textContent = 'Player: ' + player.name;
    
    board.displayBoard();
});

//Called by server.js, broadcast to player 1 by player 2
//sends player 1 the room name and a name
//CHECK WHAT NAME IS SENT BACK?
socket.on ('player1', (data) => {
    //Default value are hardcoded in game and player class
    //Images have loaded by the time get here?
	  document.getElementById("menu").style.display = 'none'
	  bigAlertBox.style.display = 'none'
      board.default();
      board.oppDefault();
	  bigAlert(data.name + " has joined\r\nYour Move!", false)
	  setTimeout(() => {bigAlertBox.style.display = 'none'}, 2000)
    
    canvas.canvas.addEventListener('click', (e) => {       
        processClick(e.clientX, e.clientY);
    });
});

//======================================================================================================
// Player 2 functions
//======================================================================================================

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
	
	document.getElementById("menu").style.display = 'none'

    game = new Game(data.room, player);
    board = new Board(canvas.ctx, data.room, player);
    board.displayBoard();
    player.setup(game.player2IDs, game.player2Pos, game.player1IDs, game.player1Pos);
    
    document.getElementById("roomid").textContent = 'Room ID: ' + data.room; 
    document.getElementById("message").textContent = 'Player: ' + player.name;
	
	bigAlert("Welcome to: " + data.room + "\r\nOpponents Move!")
	setTimeout(() => {bigAlertBox.style.display = 'none'}, 2000)
   
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


//=====================================================================================================

//======================================================================================================
// Game Controller functions
// Game class controls the logic while board class controls the
// visuals. Player class also keeps track of own pieces, opponent
// pieces and selected piece
//======================================================================================================


//======================================================================================================
// Opponent functions to update board with data from server
//======================================================================================================

//Update Move
socket.on('oppMove', (data) => {
    board.resetBlock(player.oppPieces.get(data.selID).col, player.oppPieces.get(data.selID).row)  
    game.oppMove(data.selID, data.col, data.row)
    board.oppMove(data.col, data.row);
    
});

//Update opponents arrow
socket.on('oppShoot', (data) => {
    game.oppShoot(data.col, data.row)
    board.oppShoot(data.col, data.row)
    player.myTurnStart = true;
	board.flashTurn();
	setTimeout(() =>{
		board.resetFlashTurn();
	}, 500)
})

socket.on('oppEndGame', (data) => {
    game.endGameBool = true;
    endGameMessage(data.myScore, data.oppScore, data.winning);   
}
)

socket.on('oppEnd', (data) => {
    bigAlert(data.status, true)
})

socket.on('continueGame', () => {
    endGameBox.style.display = 'none'
})

//Just kick the players if one disconnects,
//Can be improved later (allow same player to rejoin)
socket.on('disconnected', () => {
    bigAlert("Your opponent disconnected", true)
})

//===========================================================================
// Game Master
//===========================================================================

//The event listener is always listening, 
//but the action that is takes depends on player variables
function processClick(x, y) {
	
        let rect = canvas.canvas.getBoundingClientRect();
        let xcoord = (~~((x - rect.left) / 50));
        let ycoord = (~~((y - rect.top) / 50));
	
        if (player.myTurnStart)
        { 
            if (processMoveStart(xcoord, ycoord) == true) {

                player.myTurnStart = false;
                player.myTurnEnd = true;
            }
            else {
                board.badMove(xcoord, ycoord)
                setTimeout(() => {board.resetBorder(xcoord, ycoord)}, 500)
            }

        }
        else if (player.myTurnEnd)
        {
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
                board.badMove(xcoord, ycoord)
                setTimeout(() => {board.resetBorder(xcoord, ycoord)}, 500)
            }
        }
        else if (player.myShoot)
        { 
            if (processShoot(xcoord, ycoord) == true) {
                
                socket.emit('playersShoot', {
                    row: ycoord,
                    col: xcoord,
                    room: game.roomID
                });

                if (!game.endGameBool)
                {
                    if (game.endGame())  {

                        console.log(player.EndCount);
                        
                        //Check if endgame isn't actually just game over
                        if (game.win())  {
                            socket.emit('gameOver', {room: game.roomID, status: 'You Lost'} )
                            bigAlert('You Won', true)
                        }
                        else if (game.lose()) {
                            socket.emit('gameOver', {room: game.roomID, status: 'You Won'} )
                            bigAlert('You Lost', true)
                        }else{

                            game.endGameBool = true;
                            if (player.EndCount > player.oppEndCount) {
                                socket.emit('endGame', {room: game.roomID, myScore: player.EndCount, oppScore: player.oppEndCount, winning: false} )
                                endGameMessage(player.EndCount, player.oppEndCount, true);
                            }else {
                                socket.emit('endGame', {room: game.roomID, myScore: player.EndCount, oppScore: player.oppEndCount, winning: true} )
                                endGameMessage(player.EndCount, player.oppEndCount, false);
                            }
                            
                        }
                    }   
                }
                else
                {
                    if (game.win())  {
                        socket.emit('gameOver', {room: game.roomID, status: 'You Lost'} )
                        bigAlert('You Won', true)
                    }
                    else if (game.lose()) {
                        socket.emit('gameOver', {room: game.roomID, status: 'You Won'} )
                        bigAlert('You Lost', true)
                    }
                }
                
                player.myShoot = false;
            }
            else {
                board.badMove(xcoord, ycoord)
                setTimeout(() => {board.resetBorder(xcoord, ycoord)}, 500)
            }
        } 
        else 
        {
            board.badMove(xcoord, ycoord)
                setTimeout(() => {board.resetBorder(xcoord, ycoord)}, 500)
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

