/**
 * This class takes care of the visual board
 */

export default class board {

    constructor(room) {
        this.room = room;
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
/**
 * Note:
 * Most of these functions only use player.colour or oppcolour 
 * from the player object. Change it.
 */

    default(ctx, player) {
        ctx.fillStyle = player.colour;
            player.pieces.forEach((value) =>{
                console.log('default');
                ctx.fillRect(value.col * this.stageProps.block_size, value.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            });
    }

    oppDefault(ctx, player) {
        ctx.fillStyle = player.oppColour;
            player.oppPieces.forEach((value) =>{
                console.log('oppDefault');
                ctx.fillRect(value.col * this.stageProps.block_size, value.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            });
    }

    moveStart(ctx, player) {
        console.log("movestart");
        ctx.fillStyle = 'green';
        ctx.fillRect(player.selection.col * this.stageProps.block_size, player.selection.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    moveEnd(ctx, player, x, y) {
        ctx.fillStyle = player.colour;
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    shoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }


    oppMove(ctx, player, x, y) {
       ctx.fillStyle = player.oppColour;
       ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    oppShoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }


    

}