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
            block_size:500/10,
			line_width:2,
			inner_size: 48
        };
        this.ctx = ctx;
    }

    displayBoard() {
        this.ctx.lineWidth = this.stageProps.line_width;
        for(var y = 0; y < this.stageProps.num_rows; y++)
        {
            for (var x = 0; x < this.stageProps.num_rows; x++)
            {
                this.ctx.strokeRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
                if (y % 2 == 0){
                    this.ctx.fillStyle = (x % 2 == 0 ) ? '#eeeed2': '#ffffff';
                }else {
                    this.ctx.fillStyle = (x % 2 != 0 ) ? '#eeeed2': '#ffffff';
                }
				
				let posx = (x * this.stageProps.block_size) + (this.stageProps.line_width/2) 
				let posy = (y * this.stageProps.block_size) + (this.stageProps.line_width/2) 
                
                this.ctx.fillRect(posx, posy, this.stageProps.inner_size, this.stageProps.inner_size);
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

	//Probably dont need two functions for shoot, but its more descriptive
    shoot(x, y) {
		let xcenter = (x*this.stageProps.block_size) + (this.stageProps.block_size/2)
		let ycenter = (y*this.stageProps.block_size) + (this.stageProps.block_size/2)
	    this.ctx.fillStyle = "#000000";
	    this.ctx.beginPath();
	    this.ctx.arc(xcenter, ycenter, 20, 0, 2 * Math.PI);
	    this.ctx.fill();
    }

    oppShoot(x, y) {
		let xcenter = (x*this.stageProps.block_size) + (this.stageProps.block_size/2)
		let ycenter = (y*this.stageProps.block_size) + (this.stageProps.block_size/2)
	    this.ctx.fillStyle = "#000000";
	    this.ctx.beginPath();
	    this.ctx.arc(xcenter, ycenter, 20, 0, 2 * Math.PI);
	    this.ctx.fill();
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
            this.ctx.fillStyle = (x % 2 == 0 ) ? '#eeeed2': '#ffffff';
        }else {
            this.ctx.fillStyle = (x % 2 != 0 ) ? '#eeeed2': '#ffffff';
        }
		
		let posx = (x * this.stageProps.block_size) + (this.stageProps.line_width/2) 
		let posy = (y * this.stageProps.block_size) + (this.stageProps.line_width/2) 
		
        this.ctx.fillRect(posx, posy, this.stageProps.inner_size, this.stageProps.inner_size);
        this.resetBorder(x, y)
    }
	
	flashTurn() {
		this.player.pieces.forEach((value, key) =>{
			this.showSelection(value.col, value.row)
		})
	}
	
	resetFlashTurn() {
		this.player.pieces.forEach((value, key) =>{
			this.resetBorder(value.col, value.row)
		})
	}

    resetBorder(x, y) {
        this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
	}

    validMoves(validMoves, type) {
        this.ctx.fillStyle = (type == 0) ? '#769656' : '#baca44';
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
			let posx = (x * this.stageProps.block_size) + (this.stageProps.line_width/2) 
			let posy = (y * this.stageProps.block_size) + (this.stageProps.line_width/2) 
            this.ctx.fillRect(posx, posy, this.stageProps.inner_size, this.stageProps.inner_size);
        });
    }

    clearValidMoves(validMoves) {
        
        validMoves.forEach( (element) => {
            let x = element % 10;
            let y = ~~(element / 10)
            if (y % 2 == 0){
                this.ctx.fillStyle = (x % 2 == 0 ) ? '#eeeed2': '#ffffff';
            }else {
                this.ctx.fillStyle = (x % 2 != 0 ) ? '#eeeed2': '#ffffff';
            }
			let posx = (x * this.stageProps.block_size) + (this.stageProps.line_width/2) 
			let posy = (y * this.stageProps.block_size) + (this.stageProps.line_width/2) 
            this.ctx.fillRect(posx, posy, this.stageProps.inner_size, this.stageProps.inner_size);
        });
    }

    badMove(x, y) {
        this.ctx.strokeStyle = 'red';
        this.ctx.strokeRect(x * this.stageProps.block_size , y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);
    }

}