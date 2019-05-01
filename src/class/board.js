/**
 * This class takes care of the visual board
 */

export default class board {

    constructor(room) {
        this.room = room;
        this.stageProps = {
            size:500,
            num_rows:5,
            num_cols:5,
            block_size:500/5
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

    default(ctx, player) {
        ctx.fillStyle = player.colour;
        ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    oppDefault(ctx, player) {
        ctx.fillStyle = player.oppcolour;
        ctx.fillRect(player.oppPiece.col * this.stageProps.block_size, player.oppPiece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    moveStart(ctx, player) {
        ctx.fillStyle = 'green';
        ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    moveEnd(ctx, player) {
        ctx.fillStyle = player.colour;
        ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    shoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    oppMove(ctx, player) {
       ctx.fillStyle = player.oppcolour;
       ctx.fillRect(player.oppPiece.col * this.stageProps.block_size, player.oppPiece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    oppShoot(ctx, x, y) {
        ctx.fillStyle = 'black';
        ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }


    

}