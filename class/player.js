const piece = require('./piece');

class player {
    constructor(stageProps, startx, starty)
    {
        this.piece = new piece(stageProps, startx, starty)
        this.arrow = [];
        this.status = true;
    }

    place(ctx)
    {
        this.piece.draw(ctx);
    }


    move(ctx, gx, gy)
    {
        this.piece.move(ctx, gx, gy);
    }

    shoot(ctx, x, y)
    {
        this.piece.move(ctx, 3, 4);
    }

    getPosition()
    {
        return this.piece.getPiece();
    }

}

module.exports = player;