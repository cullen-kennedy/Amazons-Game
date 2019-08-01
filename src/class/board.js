import Display from "./display"

export default class board {
    constructor() { 
        this.blocks = [];
        this.empty = 0;
        this.arrow = 9;
        this.display = new Display() 
    }

    //Setting up board and display at the same time seems good, but what about operations?
    setupBoard(r, c) {
        var x;
        var y;
        for (x = 0; x < c; x++) {
            this.blocks[x] = []
            for (y = 0; y < r; y++) {
                this.blocks[x].push(0)
            }
        }  
        this.display.setupBoard(r, c)
    }

    defaultPositions(player) {

        player.pieces.forEach((value, key) =>{
            this.blocks[value.row][value.col] = key;
        });

        player.oppPieces.forEach((value, key) =>{
            this.blocks[value.row][value.col] = key;
        });

        player.image.onload = () => {
            this.display.default(player);
        }
    
        player.oppImage.onload = () => {
            this.display.oppDefault(player);
        }  
    }

    getBlockState(x, y) {
        return this.blocks[y][x]
    }

    getBlocks() {
        return this.blocks
    }

    
    moveEnd(sel, x, y) {

        if (this.blocks[y][x] == this.empty){

            //Must reset block before piece coords are changed 
            
            this.blocks[sel.row][sel.col] = 0;
            this.blocks[y][x] = sel.ID;
            return true
        } else {
            return false
        }       
    }


    shoot(x, y) {
        if (this.blocks[y][x] == this.empty){
            this.blocks[y][x] = this.arrow;
            //print the board to check
            return true;           
        }
        else {
            return false;
        }    
    }

    oppMove(oppPieces, ID, x, y) {

        this.blocks[oppPieces.get(ID).row][oppPieces.get(ID).col] = 0;
        oppPieces.set(ID, {row:y, col:x});
        this.blocks[y][x] = ID;
    }

    

    oppShoot(x, y) {
        this.blocks[y][x] = this.arrow;
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
        while(up >= 0 && this.blocks[(~~(up/10))][up % 10] == 0) {
            validMoves.push(up);
            up -= 10;
        }

        //Then down
        let down = sel + 10; 
        while(down <= 99 && this.blocks[(~~(down/10))][down % 10] == 0) {
            validMoves.push(down);
            down += 10;
        }

        //yadda yadda
        let right = sel + 1;
        while((right % 10 != 0) && this.blocks[(~~(right/10))][right % 10] == 0) {
            validMoves.push(right);
            right++;
        }

        let left = sel - 1;
        while((left % 10 != 9) && this.blocks[(~~(left/10))][left % 10] == 0) {
            validMoves.push(left);
            left--;
        }

        let upleftx = x-1;
        let uplefty = y-1;
        while (upleftx >= 0 && uplefty >= 0 && this.blocks[uplefty][upleftx] == 0) {
            validMoves.push(upleftx + (uplefty * 10));
            upleftx--;
            uplefty--;
        }


        let uprightx = x+1;
        let uprighty = y-1;
        while (uprightx <= 9  && uprighty >= 0 && this.blocks[uprighty][uprightx] == 0) {
            validMoves.push(uprightx + (uprighty * 10));
            uprightx++;
            uprighty--;
        }

        let downleftx = x-1;
        let downlefty = y+1;
        while (downleftx >= 0  && downlefty <= 9 && this.blocks[downlefty][downleftx] == 0) {
            validMoves.push(downleftx + (downlefty * 10));
            downleftx--;
            downlefty++;
        }

        let downrightx = x+1;
        let downrighty = y+1;
        while (downrightx <= 9  && downrighty <= 9 && this.blocks[downrighty][downrightx] == 0) {
            validMoves.push(downrightx + (downrighty * 10));
            downrightx++;
            downrighty++;
        }
        return validMoves;
    }
    
    /*
    * Could use cleaning up, but works
    */
    FillArea(player, boardCopy, value, place) {
  
        let queue = [];
        queue.push(value);
        
        boardCopy[value.row][value.col] = place;
    
        while (queue.length != 0) {
     
            let n = queue.pop();
            
            if (n.col+1 < 10) {
                if (player.oppPieces.has(boardCopy[n.row][n.col+1])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row][n.col+1]) || boardCopy[n.row][n.col+1] == 0) {
                    boardCopy[n.row][n.col+1] = place;
                    queue.push({row: n.row, col: n.col+1 })
                }
            }
            if (n.col-1 >= 0) {
                if (player.oppPieces.has(boardCopy[n.row][n.col-1])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row][n.col-1]) || boardCopy[n.row][n.col-1] == 0) {
                    boardCopy[n.row][n.col-1] = place;
                    queue.push({row: n.row, col: n.col-1 })
                }
            }
            if (n.row+1 < 10) {
                if (player.oppPieces.has(boardCopy[n.row+1][n.col])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row+1][n.col]) || boardCopy[n.row+1][n.col] == 0) {
                    boardCopy[n.row+1][n.col] = place;
                    queue.push({row: n.row+1, col: n.col })
                }
            }
            if (n.row-1 >= 0){
                if (player.oppPieces.has(boardCopy[n.row-1][n.col])){
                    return false;
                }else if (player.pieces.has(boardCopy[n.row-1][n.col]) || boardCopy[n.row-1][n.col] == 0) {
                    boardCopy[n.row-1][n.col] = place;
                    queue.push({row: n.row-1, col: n.col })
                }
            }
            if ((n.row-1 >= 0 && n.col-1 >=0)){
                if (player.oppPieces.has(boardCopy[n.row-1][n.col-1])) {
                    return false;
                } else if (player.pieces.has(boardCopy[n.row-1][n.col-1]) || boardCopy[n.row-1][n.col-1] == 0) {
                    boardCopy[n.row-1][n.col-1] = place;
                    queue.push({row: n.row-1, col: n.col-1 })
                }  
            }
            if ((n.row+1 < 10 && n.col+1 < 10)){
                if (player.oppPieces.has(boardCopy[n.row+1][n.col+1])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row+1][n.col+1]) || boardCopy[n.row+1][n.col+1] == 0) {
                    boardCopy[n.row+1][n.col+1] = place;
                    queue.push({row: n.row+1, col: n.col+1 })
                }
            }
            if ((n.row+1 < 10 && n.col-1 >=0)){
                if (player.oppPieces.has(boardCopy[n.row+1][n.col-1])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row+1][n.col-1]) || boardCopy[n.row+1][n.col-1] == 0) {
                    boardCopy[n.row+1][n.col-1] = place;
                    queue.push({row: n.row+1, col: n.col-1 })
                }
            }  
            if ((n.row-1 >= 0 && n.col+1 < 10) ){
                if (player.oppPieces.has(boardCopy[n.row-1][n.col+1])) {
                    return false;
                }else if (player.pieces.has(boardCopy[n.row-1][n.col+1]) || boardCopy[n.row-1][n.col+1] == 0) {
                    boardCopy[n.row-1][n.col+1] = place;
                    queue.push({row: n.row-1, col: n.col+1 })
                }
            }
        }
        return true;
    }
    
} 
