/**
 * This class takes care of the games logic
 */

export default class game {
    constructor(roomId) {
        this.roomID = roomId;
        //Obviously need a better way of doing this for bigger boards
        //0 for empty, 1 for piece, 2 for arrow
        this.board = 
        {
            "tile":
            [
                {
                    "row": 0,
                    "col": 0,
                    "status": 1,
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
                    "status": 1,
                }
            ]
        };
        this.moves = 0;
    } 

} 