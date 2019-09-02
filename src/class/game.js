import Player from './player'
import Board from './board'
import Messages from './messages'

/**
 * Game class is responsible for constructing the board and players
 * It is also responsible for updating the display on the "success" response from the player 
 * who interacts with the logical board
 */
export default class game {
    constructor(socket) {

        this.endGameBool = false;
        this.validMoves
        this.board;
        this.player;
        this.socket = socket

        this.socket.on('oppMove', (data) => {
            let oppPieces = this.player.oppPieces
            this.board.display.resetBlock(oppPieces.get(data.selID).col, oppPieces.get(data.selID).row) 
            this.board.oppMove(this.player.oppPieces, data.selID, data.col, data.row)
            this.board.display.oppMove(this.player.oppImage, data.col, data.row)
        });
        
        //Update opponents arrow
        this.socket.on('oppShoot', (data) => {
            this.board.oppShoot(data.col, data.row)
            this.board.display.oppShoot(data.col, data.row)
            this.player.turn = "moveStart"
            this.board.display.flashTurn(this.player);
	            setTimeout(() =>{
                    this.board.display.resetFlashTurn(this.player);
	        }, 500)
            
        })
        
        this.socket.on('oppEndGame', (data) => {
            this.endGameBool = true;
            Messages.endGameMessage(data.myScore, data.oppScore, data.winning);   
        }
        )
        
        this.socket.on('oppEnd', (data) => {
            Messages.bigAlert(data.status, true)
        })
        
        this.socket.on('continueGame', () => {
            let endGameBox = document.getElementById("end-game");
            endGameBox.style.display = 'none'
        })

        this.socket.on('disconnected', () => {
            Messages.bigAlert("Your opponent disconnected", true)
            //Quick fix for rejoining bug. kick em!
            this.socket.disconnect();
        })
    } 

    setupPlayer(creator) {
        this.player = new Player(creator, this.board)
    }

    setupPieces() {
        this.player.setupPlayerPieces("./images/queen.jpg", "./images/queen2.jpg")
        this.player.setupOppPieces("./images/queen.jpg", "./images/queen2.jpg")
    }

    setupBoard(x, y) {
        this.board = new Board()
        this.board.setupBoard(x, y)
    }


    startingPositions() {
        this.board.defaultPositions(this.player)   
    }

    start() {
        this.board.display.canvas.addEventListener('click', (e) => {       
            this.processClick(e.clientX, e.clientY)
        });
    }

    processClick(x, y) {
        
        /**
         * ??????
         * Game class is responsible for updating the display.
         * Board class is responsible for initializing the display
         * Choose one or the other?
         */

        let display = this.board.display
        let sel = this.player.selection
	
        let rect = display.canvas.getBoundingClientRect();
        let xcoord = (~~((x - rect.left) / 50));
        let ycoord = (~~((y - rect.top) / 50));
	
        if (this.player.turn === "moveStart")
        { 
            let success = this.player.moveStart(xcoord, ycoord) 
            if (success) {
                display.moveStart(sel)
                //Show valid moves for moveEnd turn
                this.validMoves = this.board.checkPath(xcoord, ycoord)
                display.validMoves(this.validMoves, 0)
            } else {
                display.badMove(xcoord, ycoord)
                setTimeout(() => {display.resetBorder(xcoord, ycoord)}, 500)
            }
        }
        else if (this.player.turn === "moveEnd")
        {
            //Check if another piece has been chosen
            if (this.player.pieces.has(this.board.getBlockState(xcoord, ycoord))) {
                display.clearValidMoves(this.validMoves)
                display.resetBorder(this.player.pieces.get(sel.ID).col, this.player.pieces.get(sel.ID).row)
                this.player.turn = "moveStart"
            }
            else {
                let success = this.player.moveEnd(xcoord, ycoord, this.validMoves)
                
                if (success){
                    display.clearValidMoves(this.validMoves)
                    display.moveEnd(this.player.image, xcoord, ycoord)
                    
                    this.socket.emit('playersMove', {
                        selID: sel.ID,
                        newrow: ycoord,
                        newcol: xcoord,
                    });
                    //Selection was changed
                    display.resetBlock(sel.col, sel.row)
                    sel = this.player.selection
                    
                    //Show valid moves for shoot turn
                    this.validMoves = this.board.checkPath(this.player.pieces.get(sel.ID).col, this.player.pieces.get(sel.ID).row)
                    display.showSelection(this.player.pieces.get(sel.ID).col, this.player.pieces.get(sel.ID).row)
                    display.validMoves(this.validMoves, 1); 
                } else {
                    display.badMove(xcoord, ycoord)
                        setTimeout(() => {display.resetBorder(xcoord, ycoord)}, 500)
                }
            }
            
        }
        else if (this.player.turn === "shoot")
        { 
            let success = this.player.shoot(xcoord, ycoord, this.validMoves)

            if (success) {
                display.clearValidMoves(this.validMoves);
                display.resetBorder(this.player.pieces.get(sel.ID).col, this.player.pieces.get(sel.ID).row)
                display.shoot(xcoord, ycoord);
                this.socket.emit('playersShoot', {
                    row: ycoord,
                    col: xcoord,
                });  
            } else {
                display.badMove(xcoord, ycoord)
                    setTimeout(() => {display.resetBorder(xcoord, ycoord)}, 500)
            }

            if (!this.endGameBool)
            {
                if (this.checkEndGame())  {
                    
                    //Check if endgame isn't actually just game over
                    if (this.win())  {
                        this.socket.emit('gameOver', {status: 'You Lost'} )
                        Messages.bigAlert('You Won', true)
                    }
                    else if (this.lose()) {
                        this.socket.emit('gameOver', {status: 'You Won'} )
                        Messages.bigAlert('You Lost', true)
                    }else{
                        this.endGameBool = true;
                        if (this.player.EndCount > this.player.oppEndCount) {
                            this.socket.emit('endGame', {myScore: this.player.EndCount, oppScore: this.player.oppEndCount, winning: false} )
                            Messages.endGameMessage(this.player.EndCount, this.player.oppEndCount, true);
                        }else {
                            this.socket.emit('endGame', {myScore: this.player.EndCount, oppScore: this.player.oppEndCount, winning: true} )
                            Messages.endGameMessage(this.player.EndCount, this.player.oppEndCount, false);
                        }
                        
                    }
                }   
            }
            else
            {
                if (this.win())  {
                    this.socket.emit('gameOver', {room: game.roomID, status: 'You Lost'} )
                    Messages.bigAlert('You Won', true)
                }
                else if (this.lose()) {
                    this.socket.emit('gameOver', {room: game.roomID, status: 'You Won'} )
                    Messages.bigAlert('You Lost', true)
                }
            }
            
        } 
            
        else 
        {
            display.badMove(xcoord, ycoord)
                setTimeout(() => {display.resetBorder(xcoord, ycoord)}, 500)
        }
    
    }

    lose() {    
      
        for (let [k, v] of this.player.pieces) {
            if (this.board.checkPath(v.col, v.row).length > 0)
                return false
        }
        return true;     
    }

    win() {
        for (let [k, v] of this.player.oppPieces) {
            if (this.board.checkPath(v.col, v.row).length > 0)
                return false
        }
        return true;
    }

    checkEndGame(){
        let boardCopy = this.board.getBlocks().map((arr) => {
            return arr.slice();
        });

        //Quick fix to determine player
        var c, e;
        if (this.player.pieces.has(1)){
            c = 1;
            e = 4
        }
        else{
            c = 5;
            e = 8;
        }
        for (; c <= e; c++) {
            if (!(this.board.FillArea(this.player, boardCopy, this.player.pieces.get(c), -c))) {
                return false;
            }
        }
        this.count(boardCopy)
        return true;
    }

    count(boardCopy) {
	
        let player1 = 0;
        let player2 = 0;
        if (this.player.pieces.has(1)) {
            for (let r = 0; r < 10; r++){
                for (let c = 0; c < 10; c++){
                    if ((boardCopy[r][c] < 0 && boardCopy[r][c] > -5))
                        player1++;
                    else if ((boardCopy[r][c] > 4 && boardCopy[r][c] < 9) || boardCopy[r][c] == 0)
                        player2++;
                    
                }
            }

        } else {
            for (let r = 0; r < 10; r++){
                for (let c = 0; c < 10; c++){
                    if ((boardCopy[r][c] < -4 && boardCopy[r][c] > -9))
                        player2++;
                    else if ((boardCopy[r][c] >= 0 && boardCopy[r][c] < 9))
                        player1++;
                }
            }
        }
   
        player1 -= 4;
        player2 -= 4;

        this.player.EndCount = this.player.pieces.has(1) ? player1 : player2;
        this.player.oppEndCount = this.player.oppPieces.has(1) ? player1 : player2;
   
    }   
}
