class piece {
    constructor(stageProps, startx, starty)
    {
        this.block_size = stageProps.block_size;
        this.draw = this.draw.bind(this);
        this.json = 
        {       
                "piece": 'archer',
                "row": starty,
                "col": startx         
        };
    }

    draw(ctx)
    {
        let x = this.json.row;
        let y = this.json.col;
        console.log(x);
        ctx.fillRect(x*this.block_size, y*this.block_size, this.block_size, this.block_size);
    }

    move(ctx, x, y) {
        this.json.row = x;
        this.json.col = y;
        this.draw(ctx)
    }

    getPiece()
    {
        return this.json;  
    }

}

module.exports = piece;