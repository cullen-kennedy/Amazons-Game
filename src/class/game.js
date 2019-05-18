/**
 * This class takes care of the games logic
 */

export default class game {
    constructor(roomId, player) {
        this.roomID = roomId;
        this.empty = 0;
        this.arrow = 9;
        this.player = player;
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

    moveEnd(x, y) {
        if (this.board[y][x] == this.empty){
            this.board[this.player.selection.row][this.player.selection.col] = 0;
            this.player.pieces.set(this.player.selection.ID, {row:y, col:x});
            this.board[y][x] = this.player.selection.ID;
            return true
        } else {
            return false
        }       
    }

    oppMove(ID, x, y) {
        this.board[this.player.oppPieces.get(ID).row][this.player.oppPieces.get(ID).col] = 0;
        this.player.oppPieces.set(ID, {row:y, col:x});
        this.board[y][x] = ID;
    }

    shoot(x, y) {
        if (this.board[y][x] == this.empty){
            this.board[y][x] = this.arrow;
            //print the board to check
            return true;           
        }
        else {
            return false;
        }    
    }

    oppShoot(x, y) {
        this.board[y][x] = this.arrow;
    }

    /**
     * 
     * Checks path for move and shoot, and returns an array of available positions
     * The calling function, using x and y
     * checks if it exists in the returned array
     * 
     */
    checkPath(x, y) {
        let validMoves = [];
       
        let sel = x + (y*10);

        //First up
        let up = sel - 10; 
        while(up >= 0 && this.board[(~~(up/10))][up % 10] == 0) {
            validMoves.push(up);
            up -= 10;
        }

        //Then down
        let down = sel + 10; 
        while(down <= 99 && this.board[(~~(down/10))][down % 10] == 0) {
            validMoves.push(down);
            down += 10;
        }

        //yadda yadda
        let right = sel + 1;
        while((right % 10 != 0) && this.board[(~~(right/10))][right % 10] == 0) {
            validMoves.push(right);
            right++;
        }

        let left = sel - 1;
        while((left % 10 != 9) && this.board[(~~(left/10))][left % 10] == 0) {
            validMoves.push(left);
            left--;
        }

        let upleftx = x-1;
        let uplefty = y-1;
        while (upleftx >= 0 && uplefty >= 0 && this.board[uplefty][upleftx] == 0) {
            validMoves.push(upleftx + (uplefty * 10));
            upleftx--;
            uplefty--;
        }


        let uprightx = x+1;
        let uprighty = y-1;
        while (uprightx <= 9  && uprighty >= 0 && this.board[uprighty][uprightx] == 0) {
            validMoves.push(uprightx + (uprighty * 10));
            uprightx++;
            uprighty--;
        }

        let downleftx = x-1;
        let downlefty = y+1;
        while (downleftx >= 0  && downlefty <= 9 && this.board[downlefty][downleftx] == 0) {
            validMoves.push(downleftx + (downlefty * 10));
            downleftx--;
            downlefty++;
        }

        let downrightx = x+1;
        let downrighty = y+1;
        while (downrightx <= 9  && downrighty <= 9 && this.board[downrighty][downrightx] == 0) {
            validMoves.push(downrightx + (downrighty * 10));
            downrightx++;
            downrighty++;
        }
        return validMoves;
    }

    //Reusing checkPath to check if player has any valid moves
    lose() {    
      
        for (let [k, v] of this.player.pieces) {
            if (this.checkPath(v.col, v.row).length > 0)
                return false
        }
        return true;     
    }

    win() {
        for (let [k, v] of this.player.oppPieces) {
            if (this.checkPath(v.col, v.row).length > 0)
                return false
        }
        return true;
    }

} 