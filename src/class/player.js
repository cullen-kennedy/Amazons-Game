/**
 * Interacts with the logical board class to make a move
 * Responds with success/failure to game class which then updates the display
 */

export default class player {
    constructor(name, board)
    {
        this.oppImage = new Image();
        this.image = new Image();
        this.whiteQueen
        this.blackQueen
        this.creator = name
        this.turn
        this.name = name;
        this.selection = {
                            ID: 0,
                            row: 0, //row and col may not be needed
                            col: 0
                         };
        this.pieces =  new Map(); 
        this.oppPieces = new Map();  
        this.board = board  
        this.EndCount
        this.oppEndCount     
    }

    

    updateSel(id, x, y) {
        this.selection.ID = id;
        this.selection.row = y;
        this.selection.col = x;
    }

    setupPlayerPieces(whiteQueen, blackQueen)
    {
        if (this.creator) {
            this.image.src = whiteQueen
            this.pieces.set(1, {"row": 3,"col": 0})
            this.pieces.set(2, {"row": 0,"col": 3})
            this.pieces.set(3, {"row": 0,"col": 6})
            this.pieces.set(4, {"row": 3,"col": 9})
            this.turn = "moveStart"

        }else {
            this.image.src = blackQueen
            this.pieces.set(5, {"row": 6,"col": 0})
            this.pieces.set(6, {"row": 9,"col": 3})
            this.pieces.set(7, {"row": 9,"col": 6})
            this.pieces.set(8, {"row": 6,"col": 9})
            this.turn = "none"
        }

        
    }

    setupOppPieces(whiteQueen, blackQueen) {

        if (this.creator) {
            this.oppImage.src = blackQueen
            this.oppPieces.set(5, {"row": 6,"col": 0})
            this.oppPieces.set(6, {"row": 9,"col": 3})
            this.oppPieces.set(7, {"row": 9,"col": 6})
            this.oppPieces.set(8, {"row": 6,"col": 9})
        }else {
            this.oppImage.src = whiteQueen
            this.oppPieces.set(1, {"row": 3,"col": 0})
            this.oppPieces.set(2, {"row": 0,"col": 3})
            this.oppPieces.set(3, {"row": 0,"col": 6})
            this.oppPieces.set(4, {"row": 3,"col": 9})  
        }
    }

    moveStart(x, y) {
        if (this.pieces.has(this.board.getBlockState(x, y))) {
            this.updateSel(this.board.getBlockState(x, y), x, y)
            
            this.turn = "moveEnd"
            return true
        }
        else {
            return false
        }
    }

    moveEnd(x, y, validMoves) {
        let sel = this.selection
        
        if (validMoves.includes(x + (y*10)) && this.board.moveEnd(sel, x, y)) {
            
            this.pieces.set(sel.ID, {row:y, col:x});
            this.turn = "shoot"
            
            return true
        } else {
            return false
        }
    }

    shoot(x, y, validMoves) {
        if (validMoves.includes(x + (y * 10)) && this.board.shoot(x, y) == true) {

            this.turn = "none"
            return true
        } else {
            return false
        }
    }

}