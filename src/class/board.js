/**
 * This class takes care of the visual board
 * Notes: Some of these functions can be combined maybe?
 */

export default class board {

    constructor(ctx, room, player) {
        this.room = room;
        this.player = player;
        this.stageProps = {
            size:500,
            num_rows:10,
            num_cols:10,
            block_size:500/10
        };
        this.ctx = ctx;
    }

    displayBoard() {
        
        for(var r = 0; r < this.stageProps.num_rows; r++)
        {
            for (var b = 0; b < this.stageProps.num_rows; b++)
            {
                this.ctx.strokeRect(r * this.stageProps.block_size, b * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
            }
        }
    }

    default() {
            this.player.pieces.forEach((value) =>{
                console.log('default');
                this.ctx.drawImage(this.player.image, (value.col * this.stageProps.block_size)+5, (value.row * this.stageProps.block_size)+5, this.stageProps.block_size-10, this.stageProps.block_size-10);
            });
    }

    oppDefault() {
            this.player.oppPieces.forEach((value) =>{
                console.log('oppDefault');
                this.ctx.drawImage(this.player.oppImage, (value.col * this.stageProps.block_size)+5, (value.row * this.stageProps.block_size)+5, (this.stageProps.block_size)-10, this.stageProps.block_size-10);
            });
    }

    moveStart() {
        this.showSelection(this.player.selection.col,this.player.selection.row)
    }

    moveEnd(x, y) {
        this.ctx.drawImage(this.player.image, (x * this.stageProps.block_size)+5, (y * this.stageProps.block_size)+5, this.stageProps.block_size-10, this.stageProps.block_size-10);
    }

    shoot(x, y) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
    }

    oppShoot(x, y) {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
    }

    oppMove(x, y) {
       this.ctx.drawImage(this.player.oppImage, (x * this.stageProps.block_size)+5, (y * this.stageProps.block_size)+5, (this.stageProps.block_size)-10, this.stageProps.block_size-10);
    }

    showSelection(x, y) {
        this.ctx.strokeStyle = 'blue';
        this.ctx.strokeRect((x * this.stageProps.block_size), (y * this.stageProps.block_size), this.stageProps.block_size, this.stageProps.block_size);
    }

    resetBlock(x, y) {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        this.resetBorder(x, y)
    }

    resetBorder(x, y) {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    validMoves(validMoves, type) {
        this.ctx.fillStyle = (type == 0) ? 'rgba(0,225,0,0.5)' : 'rgba(225,225,0,0.5)';
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
            this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        });
    }

    clearValidMoves(validMoves) {
        this.ctx.fillStyle = 'white';
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
            this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        });
    }

    badMove(x, y) {
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(x * this.stageProps.block_size , y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

}