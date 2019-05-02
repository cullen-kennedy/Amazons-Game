/**
 * This class takes care of the games logic
 */

export default class game {
    constructor(roomId) {
        this.roomID = roomId;
        this.empty = 0;
        this.arrow = 9;
        this.player1IDs = [1,2,3,4];
        this.player2IDs = [5,6,7,8];
        this.player1Pos = [
                            {
                                "row": 3,
                                "col": 0
                            },
                            {
                                "row": 0,
                                "col": 3
                            },
                            {
                                "row": 0,
                                "col": 6
                            },
                            {
                                "row": 3,
                                "col": 9
                            }
        ];
        this.player2Pos = [
                            {
                                "row": 6,
                                "col": 0
                            },
                            {
                                "row": 9,
                                "col": 3
                            },
                            {
                                "row": 9,
                                "col": 6
                            },
                            {
                                "row": 6,
                                "col": 9
                            }
        ];                
        
        this.board = [
            [0,0,0,2,0,0,3,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [1,0,0,0,0,0,0,0,0,4],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [5,0,0,0,0,0,0,0,0,8],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,6,0,0,7,0,0,0]   
        ];
    
        this.moves = 0;
    } 

    moveEnd(player, x, y) {
        if (this.board[y][x] == this.empty){
            this.board[player.selection.row][player.selection.col] = 0;
            player.pieces.set(player.selection.ID, {row:y, col:x});
            this.board[y][x] = player.selection.ID;
            return true
        } else {
            return false
        }       
    }

    oppMove(player, ID, x, y) {
        this.board[player.oppPieces.get(ID).row][player.oppPieces.get(ID).col] = 0;
        player.oppPieces.set(ID, {row:y, col:x});
        this.board[y][x] = ID;
    }

    shoot(x, y) {
        if (this.board[y][x] == this.empty){
            this.board[y][x] = this.arrow;
            //print the board to check
            console.log(this.board)
            return true;           
        }
        else {
            return false;
        }    
    }

    oppShoot(x, y) {
        this.board[y][x] = this.arrow;
    }

} 