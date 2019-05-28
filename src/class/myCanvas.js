export default class myCanvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = canvas.getContext('2d');
        this.canvas.width = 500;
        this.canvas.height = 500;    
    }
}
