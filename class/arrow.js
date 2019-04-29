/**
 * Not used yet, but important to keep track of arrows obviously
 */

class arrow {
    constructor(stageProps)
    {
        this.block_size = stageProps.block_size;
        this.draw = this.draw.bind(this);
    }

    draw(ctx, x, y)
    {
        ctx.fillRect(x*this.block_size, y*this.block_size, this.block_size, this.block_size);
    }

}

module.exports = arrow;