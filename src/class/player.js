/**
 * This class is mostly for player identifying variables for now
 */

export default class player {
    constructor(name, startx, starty, opy, opx, colour, oppcolour, turn)
    {
        this.myTurnStart = turn;
        this.myTurnEnd = false;
        this.myShoot = false;
        this.colour = colour;
        this.oppcolour = oppcolour;
        this.name = name;
        this.stageProps = {
            size:500,
            num_rows:5,
            num_cols:5,
            block_size:500/5
        };
        this.arrow;
        this.piece = {
            "row": starty,
            "col": startx
        };
        this.oppPiece = {
            "row": opy,
            "col": opx
        };
           
    }

}

