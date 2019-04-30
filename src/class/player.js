export default class player {
    constructor(name, startx, starty, opy, opx)
    {
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

    default(ctx)
    {
        ctx.fillRect(this.piece.row * this.stageProps.block_size, this.piece.col * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
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

