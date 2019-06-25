/**
 * This class takes care of the games logic
 */

export default class game {
    constructor(roomId, player) {
        this.roomID = roomId;
        this.empty = 0;
        this.arrow = 9;
        this.endGameBool = false;
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

        let sel = this.player.selection;

        if (this.board[y][x] == this.empty){
            this.board[sel.row][sel.col] = 0;
            this.player.pieces.set(sel.ID, {row:y, col:x});
            this.board[y][x] = sel.ID;
            return true
        } else {
            return false
        }       
    }

    oppMove(ID, x, y) {

        let oppPieces = this.player.oppPieces

        this.board[oppPieces.get(ID).row][oppPieces.get(ID).col] = 0;
        oppPieces.set(ID, {row:y, col:x});
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

    endGame(){
        let boardCopy = this.board.map((arr) => {
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
            if (!(this.FillArea(boardCopy, this.player.pieces.get(c), -c))) {
                return false;
            }
        }
        this.count(boardCopy)
        return true;
    }
    /*
    * Could use cleaning up, but works
    */
    FillArea(boardCopy, value, place) {
  
        let queue = [];
        queue.push(value);
        
        boardCopy[value.row][value.col] = place;
    
        while (queue.length != 0) {
     
            let n = queue.pop();
            
            if (n.col+1 < 10) {
                if (this.player.oppPieces.has(boardCopy[n.row][n.col+1])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row][n.col+1]) || boardCopy[n.row][n.col+1] == 0) {
                    boardCopy[n.row][n.col+1] = place;
                    queue.push({row: n.row, col: n.col+1 })
                }
            }
            if (n.col-1 >= 0) {
                if (this.player.oppPieces.has(boardCopy[n.row][n.col-1])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row][n.col-1]) || boardCopy[n.row][n.col-1] == 0) {
                    boardCopy[n.row][n.col-1] = place;
                    queue.push({row: n.row, col: n.col-1 })
                }
            }
            if (n.row+1 < 10) {
                if (this.player.oppPieces.has(boardCopy[n.row+1][n.col])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row+1][n.col]) || boardCopy[n.row+1][n.col] == 0) {
                    boardCopy[n.row+1][n.col] = place;
                    queue.push({row: n.row+1, col: n.col })
                }
            }
            if (n.row-1 >= 0){
                if (this.player.oppPieces.has(boardCopy[n.row-1][n.col])){
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row-1][n.col]) || boardCopy[n.row-1][n.col] == 0) {
                    boardCopy[n.row-1][n.col] = place;
                    queue.push({row: n.row-1, col: n.col })
                }
            }
            if ((n.row-1 >= 0 && n.col-1 >=0)){
                if (this.player.oppPieces.has(boardCopy[n.row-1][n.col-1])) {
                    return false;
                } else if (this.player.pieces.has(boardCopy[n.row-1][n.col-1]) || boardCopy[n.row-1][n.col-1] == 0) {
                    boardCopy[n.row-1][n.col-1] = place;
                    queue.push({row: n.row-1, col: n.col-1 })
                }  
            }
            if ((n.row+1 < 10 && n.col+1 < 10)){
                if (this.player.oppPieces.has(boardCopy[n.row+1][n.col+1])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row+1][n.col+1]) || boardCopy[n.row+1][n.col+1] == 0) {
                    boardCopy[n.row+1][n.col+1] = place;
                    queue.push({row: n.row+1, col: n.col+1 })
                }
            }
            if ((n.row+1 < 10 && n.col-1 >=0)){
                if (this.player.oppPieces.has(boardCopy[n.row+1][n.col-1])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row+1][n.col-1]) || boardCopy[n.row+1][n.col-1] == 0) {
                    boardCopy[n.row+1][n.col-1] = place;
                    queue.push({row: n.row+1, col: n.col-1 })
                }
            }  
            if ((n.row-1 >= 0 && n.col+1 < 10) ){
                if (this.player.oppPieces.has(boardCopy[n.row-1][n.col+1])) {
                    return false;
                }else if (this.player.pieces.has(boardCopy[n.row-1][n.col+1]) || boardCopy[n.row-1][n.col+1] == 0) {
                    boardCopy[n.row-1][n.col+1] = place;
                    queue.push({row: n.row-1, col: n.col+1 })
                }
            }
        }
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