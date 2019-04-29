class board {
    constructor(stageProps) {
        this.width = this.height = 500;
        this.numrows = 5;
        this.numcols = 5;
        this.block_size = stageProps.block_size;
    }

    draw(ctx) {
        for(var r = 0; r < this.numrows; r++)
        {
            for (var b = 0; b < this.numrows; b++)
            {
                ctx.strokeRect(r * this.block_size, b * this.block_size, this.block_size, this.block_size);
            }
        }
    }
}

module.exports = board;