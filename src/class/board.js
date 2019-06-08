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
        
        for(var y = 0; y < this.stageProps.num_rows; y++)
        {
            for (var x = 0; x < this.stageProps.num_rows; x++)
            {
                this.ctx.strokeRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
                if (y % 2 == 0){
                    this.ctx.fillStyle = (x % 2 == 0 ) ? 'yellow': 'green';
                }else {
                    this.ctx.fillStyle = (x % 2 != 0 ) ? 'yellow': 'green';
                }
                
                this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
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
        if (y % 2 == 0){
            this.ctx.fillStyle = (x % 2 == 0 ) ? 'yellow': 'green';
        }else {
            this.ctx.fillStyle = (x % 2 != 0 ) ? 'yellow': 'green';
        }
        this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        this.resetBorder(x, y)
    }

    resetBorder(x, y) {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

    validMoves(validMoves, type) {
        this.ctx.fillStyle = (type == 0) ? '#add8e6' : '#ffb2b2';
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
            this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        });
    }

    clearValidMoves(validMoves) {
        
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
            if (y % 2 == 0){
                this.ctx.fillStyle = (x % 2 == 0 ) ? 'yellow': 'green';
            }else {
                this.ctx.fillStyle = (x % 2 != 0 ) ? 'yellow': 'green';
            }
            this.ctx.fillRect(x * this.stageProps.block_size +1, y * this.stageProps.block_size+1, this.stageProps.block_size-2, this.stageProps.block_size-2);
        });
    }

    badMove(x, y) {
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(x * this.stageProps.block_size , y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

}