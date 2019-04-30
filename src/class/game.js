export default class game {
    constructor(roomId) {
        this.roomID = roomId;
        this.stageProps = {
            size:500,
            num_rows:5,
            num_cols:5,
            block_size:500/5
        };
        //Obviously need a better way of doing this for bigger boards
        this.board = 
        {
            "tile":
            [
                {
                    "row": 0,
                    "col": 0,
                    "status": 0,
                },
                {
                    "row": 0,
                    "col": 1,
                    "status": 0,
                },
                {
                    "row": 0,
                    "col": 2,
                    "status": 0,
                },
                {
                    "row": 0,
                    "col": 3,
                    "status": 0,
                },
                {
                    "row": 0,
                    "col": 4,
                    "status": 0,
                },
                {
                    "row": 1,
                    "col": 0,
                    "status": 0,
                },
                {
                    "row": 1,
                    "col": 1,
                    "status": 0,
                },
                {
                    "row": 1,
                    "col": 2,
                    "status": 0,
                },
                {
                    "row": 1,
                    "col": 3,
                    "status": 0,
                },
                {
                    "row": 1,
                    "col": 4,
                    "status": 0,
                },
                {
                    "row": 2,
                    "col": 0,
                    "status": 0,
                },
                {
                    "row": 2,
                    "col": 1,
                    "status": 0,
                },
                {
                    "row": 2,
                    "col": 2,
                    "status": 0,
                },
                {
                    "row": 2,
                    "col": 3,
                    "status": 0,
                },
                {
                    "row": 2,
                    "col": 4,
                    "status": 0,
                },
                {
                    "row": 3,
                    "col": 0,
                    "status": 0,
                },
                {
                    "row": 3,
                    "col": 1,
                    "status": 0,
                },
                {
                    "row": 3,
                    "col": 2,
                    "status": 0,
                },
                {
                    "row": 3,
                    "col": 3,
                    "status": 0,
                },
                {
                    "row": 3,
                    "col": 4,
                    "status": 0,
                },
                {
                    "row": 4,
                    "col": 0,
                    "status": 0,
                },
                {
                    "row": 4,
                    "col": 1,
                    "status": 0,
                },
                {
                    "row": 4,
                    "col": 2,
                    "status": 0,
                },
                {
                    "row": 4,
                    "col": 3,
                    "status": 0,
                },
                {
                    "row": 4,
                    "col": 4,
                    "status": 0,
                }
            ]
        };
        this.moves = 0;
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

   
} 