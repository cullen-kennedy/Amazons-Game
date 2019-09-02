export default class display {

    constructor() {
        this.room = room;
        this.stageProps;
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500; 
        this.canvas.style.display = "block" 
  
    }

    setupBoard(x, y) {
        this.stageProps = {
            size:500,
            num_rows: x,
            num_cols: y,
            block_size:500/x,
			line_width:2,
			inner_size: 48
        };
        this.generateBoard()
    }

    generateBoard() {
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

    default(player) {
        player.pieces.forEach((value) =>{
            this.ctx.drawImage(player.image, (value.col * this.stageProps.block_size)+5, (value.row * this.stageProps.block_size)+5, this.stageProps.block_size-10, this.stageProps.block_size-10);
        });
    }

    oppDefault(player) {
        player.oppPieces.forEach((value) =>{
            this.ctx.drawImage(player.oppImage, (value.col * this.stageProps.block_size)+5, (value.row * this.stageProps.block_size)+5, (this.stageProps.block_size)-10, this.stageProps.block_size-10);
        });
    }

    moveStart(sel) {
        this.showSelection(sel.col, sel.row)
    }

    moveEnd(image, x, y) {

        this.ctx.drawImage(image, (x * this.stageProps.block_size)+5, (y * this.stageProps.block_size)+5, this.stageProps.block_size-10, this.stageProps.block_size-10);
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

    oppMove(image, x, y) {
       this.ctx.drawImage(image, (x * this.stageProps.block_size)+5, (y * this.stageProps.block_size)+5, (this.stageProps.block_size)-10, this.stageProps.block_size-10);
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
	
	flashTurn(player) {
		player.pieces.forEach((value, key) =>{
			this.showSelection(value.col, value.row)
		})
	}
	
	resetFlashTurn(player) {
		player.pieces.forEach((value, key) =>{
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