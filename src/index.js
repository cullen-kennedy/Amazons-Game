import Game from './class/game'
import Messages from './class/messages'

var socket = io.connect('http://localhost:5000');
var game;


//Setup exit button
$(".exit-alert").on('click', function() {
       let exittype = this.id;
       processExit(exittype);
})

function processExit(exittype) {

    let endGameBox = document.getElementById("end-game");
    switch(exittype){
        case "concede-endgame":
            endGameBox.style.display = 'none'; 
            socket.emit('gameOver', {status: 'You Won'} )
            Messages.bigAlert('You Lost', true)
            break;
        case "reload":
            location.reload();
            break;
        case "continue-endgame":
            endGameBox.style.display = 'none';
            socket.emit('continue');
    }
}

//======================================================================================================
// Player 1 Setup
//======================================================================================================
$('#new').on('click', () => {
    var name = $('#nameNew').val();
    socket.emit('createGame', {name: name});
});

//Called by server.js with on.createGame
//It passes back the name of the player and the room name that was created
socket.on('newGame', (data) => {
    
    game = new Game(socket);

    document.getElementById("roomid").textContent = 'Room ID: ' + data.room; 
    document.getElementById("message").textContent = 'Player: ' + data.name;
    
});

socket.on ('player1', (data) => {
    //Default value are hardcoded in game and player class
    //Images have loaded by the time get here?
      document.getElementById("menu").style.display = 'none'
      game.setupBoard(10, 10)
      game.setupPlayer(true)
      game.setupPieces()
      game.startingPositions()

      let bigAlertBox = document.getElementById("big-alert");
      Messages.bigAlert("Welcome!\r\nYour Move!")
      setTimeout(() => {bigAlertBox.style.display = 'none'}, 2000)
      
      game.start()  
});

//======================================================================================================
// Player 2 Setup
//======================================================================================================

//Join created game
$('#join').on('click', () => {
    var name = $('#nameJoin').val();
    var roomID = $('#room').val();
    //second player with name and initial starting point

    socket.emit('joinGame', {name: name, room: roomID}); //server.js on.joinGame    
});

//Displays board and does the same as on.'player1'
socket.on ('player2', (data) => {
	
	document.getElementById("menu").style.display = 'none'

    game = new Game(socket);

    game.setupBoard(10, 10)
    game.setupPlayer(false)
    game.setupPieces()
    game.startingPositions()

    document.getElementById("roomid").textContent = 'Room ID: ' + data.room; 
    document.getElementById("message").textContent = 'Player: ' + data.name;
    let bigAlertBox = document.getElementById("big-alert");
    Messages.bigAlert("Welcome to: " + data.room + "\r\nOpponents Move!")
    setTimeout(() => {bigAlertBox.style.display = 'none'}, 2000)
    
    game.start()
      
});
