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


