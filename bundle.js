(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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

},{"./player":4}],3:[function(require,module,exports){
class piece {
    constructor(stageProps, startx, starty)
    {
        this.block_size = stageProps.block_size;
        this.draw = this.draw.bind(this);
        this.json = 
        {       
                "piece": 'archer',
                "row": starty,
                "col": startx         
        };
    }

    draw(ctx)
    {
        let x = this.json.row;
        let y = this.json.col;
        console.log(x);
        ctx.fillRect(x*this.block_size, y*this.block_size, this.block_size, this.block_size);
    }

    move(ctx, x, y) {
        this.json.row = x;
        this.json.col = y;
        this.draw(ctx)
    }

    getPiece()
    {
        return this.json;  
    }

}

module.exports = piece;
},{}],4:[function(require,module,exports){
const piece = require('./piece');

class player {
    constructor(stageProps, startx, starty)
    {
        this.piece = new piece(stageProps, startx, starty)
        this.arrow = [];
        this.status = true;
    }

    place(ctx)
    {
        this.piece.draw(ctx);
    }


    move(ctx, gx, gy)
    {
        this.piece.move(ctx, gx, gy);
    }

    shoot(ctx, x, y)
    {
        this.piece.move(ctx, 3, 4);
    }

    getPosition()
    {
        return this.piece.getPiece();
    }

}

module.exports = player;
},{"./piece":3}],5:[function(require,module,exports){
/**
 * Todo: managing ctx and canvas through each class
 * 
 */

const board = require('./class/board');
const controller = require('./class/controller');

class CVS {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.stageProps = {
            size:500,
            num_rows:5,
            num_cols:5,
            block_size:500/5
        };

        this.canvas.width = 500;
        this.canvas.height = 500;

        this.board =  new board(this.stageProps);
        this.controller = new controller(this.stageProps, this.ctx);     

        window.addEventListener('load', () => {this.play();});
    }

    play() {
        this.board.draw(this.ctx);
        this.controller.run(this.ctx);
    }  
}

let cvs = new CVS();



},{"./class/board":1,"./class/controller":2}]},{},[5]);
