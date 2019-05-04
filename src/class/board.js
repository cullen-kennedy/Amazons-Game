/**
 * This class takes care of the visual board
 */

export default class board {

    constructor(room, player) {
        this.room = room;
        this.player = player;
        this.stageProps = {
            size:500,
            num_rows:10,
            num_cols:10,
            block_size:500/10
        };
    }

    displayBoard(ctx) {
        for(var r = 0; r < this.stageProps.num_rows; r++)
        {
            for (var b = 0; b < this.stageProps.num_rows; b++)
            {
                ctx.strokeRect(r * this.stageProps.block_size, b * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            }
        }
    }

    default(ctx) {
        ctx.fillStyle = this.player.colour;
            this.player.pieces.forEach((value) =>{
                console.log('default');
                ctx.fillRect(value.col * this.stageProps.block_size, value.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            });
    }

    oppDefault(ctx) {
        ctx.fillStyle = this.player.oppColour;
            this.player.oppPieces.forEach((value) =>{
                console.log('oppDefault');
                ctx.fillRect(value.col * this.stageProps.block_size, value.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            });
    }

    moveStart(ctx) {
        console.log("movestart");
        ctx.fillStyle = 'green';
        ctx.fillRect(this.player.selection.col * this.stageProps.block_size, this.player.selection.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    moveEnd(ctx, x, y) {
        ctx.fillStyle = this.player.colour;
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    shoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }


    oppMove(ctx, x, y) {
       ctx.fillStyle = this.player.oppColour;
       ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    oppShoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

}