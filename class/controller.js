/**
 * TODOs: a lot, but first replace the fills with the piece and arrow functions
 */

const player = require('./player');

class controller 
{

    constructor(stageProps, ctx)
    {
        this.ctx = ctx;
        this.stageProps = stageProps;
        this.game = true;
        this.turn = 1;
        this.player1 = new player(this.stageProps, 0, 0, 'player1');
        this.player2 = new player(this.stageProps, 4, 4, 'player2');
        this.currentPlayer = this.player1;
        this.moveturnStart = true;
        this.moveturnEnd = false
        this.shootturn = false;
        this.selectedPiece = { col: 0, row: 0};
    }

    run(ctx)
    {
        this.player1.place(ctx);
        this.player2.place(ctx);
       
        document.getElementById('canvas').addEventListener('click', (e)=> {       
            this.processCoords(e.clientX, e.clientY);
        });
    }

    processCoords(x, y)
    {
        //replace 100 with blocksize
        var can = document.getElementById('canvas');
        var xcoord = (~~((x - can.offsetLeft) / 100 ));
        var ycoord = (~~((y - can.offsetLeft) / 100 ));

        var clickedBlock = this.getBlock(xcoord, ycoord);

        if (this.moveturnStart)
            this.processMoveStart(clickedBlock);
        else if (this.moveturnEnd)    
            this.processMoveEnd(clickedBlock)
        else if (this.shootturn)
            this.processShoot(clickedBlock);
    }

    getBlock(x, y)
    {
        return {
            col: y,
            row: x
        };
    }

    processMoveStart(block)
    {
       
        if (this.currentPlayer.piece.json.row == block.row
            && this.currentPlayer.piece.json.col == block.col)
        {
            this.selectedPiece = block;
            this.ctx.fillStyle = "blue";
            this.ctx.fillRect(block.row * 100, block.col * 100, 100, 100);
    
    
            this.moveturnStart = false;
            this.moveturnEnd = true;
        }
        else
        {
            console.log('not your block');
        }  
    }

    processMoveEnd(block)
    {
        this.ctx.fillStyle = "#000000";
        this.ctx.fillRect(block.row * 100, block.col * 100, 100, 100);
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(this.selectedPiece.row * 100, this.selectedPiece.col *100, 100, 100);

        this.currentPlayer.piece.json.row = block.row;
        this.currentPlayer.piece.json.col = block.col;

        this.moveturnEnd = false;
        this.shootturn = true;
    }

    processShoot(block)
    {
        this.ctx.fillStyle = "red";
        this.ctx.fillRect(block.row * 100, block.col * 100, 100, 100);

        this.shootturn = false;
        this.moveturnStart = true;

        if (this.currentPlayer == this.player1)
            this.currentPlayer = this.player2;
        else if (this.currentPlayer == this.player2)
            this.currentPlayer = this.player1;

    }
}

module.exports = controller;
