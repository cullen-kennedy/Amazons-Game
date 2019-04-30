export default class myCanvas {
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

    }
}
