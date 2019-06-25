/**
 * This class is mostly for player identifying variables for now
 */

export default class player {
    constructor(name, src, oppSrc, turn)
    {
        this.myTurnStart = turn;
        this.myTurnEnd = false;
        this.myShoot = false;
        this.oppImage = new Image();
        this.image = new Image();
        this.src = src;
        this.oppSrc = oppSrc;
       
        this.name = name;
        this.selection = {
                            ID: 0,
                            row: 0, //row and col may not be needed
                            col: 0
                         };
        this.pieces =  new Map();
        this.oppPieces =  new Map();
        this.EndCount;
        this.oppEndCount;

           
    }

    setup(ID, startPos, oppID, oppStartPos)
    {
        this.oppImage.src = this.oppSrc
        this.image.src = this.src;
        this.pieces.set(ID[0], startPos[0])
        this.pieces.set(ID[1], startPos[1])
        this.pieces.set(ID[2], startPos[2])
        this.pieces.set(ID[3], startPos[3])

        //This might not be needed either, but I'll keep it and update it 
        //it for now just incase :)
        this.oppPieces.set(oppID[0], oppStartPos[0])
        this.oppPieces.set(oppID[1], oppStartPos[1])
        this.oppPieces.set(oppID[2], oppStartPos[2])
        this.oppPieces.set(oppID[3], oppStartPos[3])
    }

    updateSel(id, x, y) {
        this.selection.ID = id;
        this.selection.row = y;
        this.selection.col = x;
    }
}

