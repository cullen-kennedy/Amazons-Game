var board = [
    [ 0,  -1,  -1,   2,   0,   0,   3,   0,   0,   0],
    [ 0,  -1,  -1,  -1,  -1,   0,   0,   0,   0,   0],
    [ 0,  -1,   0,   0,  -1,   0,   0,   0,   0,   0],
    [ 1,   0,   0,   0,  -1,  -1,   0,   0,   0,   4],
    [ 0,   0,   0,   0,   0,  -1,   0,   0,   0,   0],
    [-1,  -1,  -1,  -1,  -1,  -1,   0,   0,   0,   0],
    [ 5,   0,   0,   0,  -1,   0,   0,   0,   0,   8],
    [ 0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
    [ 0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
    [ 0,   0,   0,   6,   0,   0,   7,   0,   0,   0]
    
  
];

const player1 = new Map();
const player2 = new Map();

var opp1 = true;

pieces();

//Only try one piece
forestFire(player1.get(1), 1);

console.log(board);


/**
 * Just sets the player pieces I hardcode in into the board above
 */
function pieces() {
    for (let r = 0; r < 10; r++){
        for (let c = 0; c < 10; c++){
            if (board[r][c] > 0 && board[r][c] < 5)
                player1.set(board[r][c], { "row":r, "col":c});
            else if (board[r][c] > 4 && board[r][c] < 9){
                player2.set(board[r][c], { "row":r, "col":c});
            }
        }
    }
}

/**
 * If I pass in id 1: row 3, col 
 * first I check if there is an enemy ID in the surrounding node, if so return
 * Then I check if the node has already been -1, if so return
 * Then I check if the node is an arrow, return
 * Then I set it as -1
 * These steps may not be necessary since we already know it is a friendly piece
 * 
 * Then go into loop and visit all neighbors, and fill -1 as needed
 * Problem is this destroys the board, also I need to set a condition to stop the entire
 * thing if a piece finds an opponent piece, because that means the game isn't over
 */

function forestFire(value, key) {
    opp = (opp1 == true) ? player2 : player1;
   
    if (opp.has(key)){
        return;
    }
    if (key == -1) {
        return;
    }
    if (key == 9) {
        return;
    }
    

    board[value.row][value.col] = -1;
    let queue = [];
    queue.push(value);

    while (queue.length != 0) {
 
        let n = queue.pop();
 
        if (n.col+1 < 10 && (player1.has(board[n.row][n.col+1]) || board[n.row][n.col+1] == 0)) {
            board[n.row][n.col+1] = -1;
            queue.push({row: n.row, col: n.col+1 })
        }
        if (n.col-1 >= 0 && (player1.has(board[n.row][n.col-1]) || board[n.row][n.col-1] == 0)) {
            board[n.row][n.col-1] = -1;
            queue.push({row: n.row, col: n.col-1 })
        }
        if (n.row+1 < 10 && (player1.has(board[n.row+1][n.col]) || board[n.row+1][n.col] == 0)) {
            board[n.row+1][n.col] = -1;
            queue.push({row: n.row+1, col: n.col })
        }
        if (n.row-1 >= 0 && (player1.has(board[n.row-1][n.col]) || board[n.row-1][n.col] == 0)) {
            board[n.row-1][n.col] = -1;
            queue.push({row: n.row-1, col: n.col })
        }
        if ((n.row-1 >= 0 && n.col-1 >=0) && (player1.has(board[n.row-1][n.col-1]) || board[n.row-1][n.col-1] == 0)) {
            board[n.row-1][n.col-1] = -1;
            queue.push({row: n.row-1, col: n.col-1 })
        }    
        if ((n.row+1 < 10 && n.col+1 < 10) && (player1.has(board[n.row+1][n.col+1]) || board[n.row+1][n.col+1] == 0)) {
            board[n.row+1][n.col+1] = -1;
            queue.push({row: n.row+1, col: n.col+1 })
        }
        if ((n.row+1 < 10 && n.col-1 >=0) && (player1.has(board[n.row+1][n.col-1]) || board[n.row+1][n.col-1] == 0)) {
            board[n.row+1][n.col-1] = -1;
            queue.push({row: n.row+1, col: n.col-1 })
        }   
        if ((n.row-1 >= 0 && n.col+1 < 10) && (player1.has(board[n.row-1][n.col+1]) || board[n.row-1][n.col+1] == 0)) {
            board[n.row-1][n.col+1] = -1;
            queue.push({row: n.row-1, col: n.col+1 })
        }
       
    }
    return;
}



