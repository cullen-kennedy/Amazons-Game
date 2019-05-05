
//9s represent arrows
var board = [
  [0,1,0,0,0,3,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,4,0],
  [0,0,2,0,0,0,0,0,0,0],
  [9,9,9,9,9,9,9,9,9,9],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,8,0,5,0,0,4,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,6,0,0,0,0,0,0,0,0]
];

const player = new Map();
const opp = new Map();

pieces();

if (checkPlayer())
    console.log('game over!')
else 
    console.log('game not over!');        


/**
 * Just sets the player pieces I hardcode in into the board above
 */
function pieces() {
    for (let r = 0; r < 10; r++){
        for (let c = 0; c < 10; c++){
            if (board[r][c] > 0 && board[r][c] < 5)
                player.set(board[r][c], { "row":r, "col":c});
            else if (board[r][c] > 4 && board[r][c] < 9){
                opp.set(board[r][c], { "row":r, "col":c});
            }
        }
    }
}

/** 
 * We keep the player ids the same and count them as territory
 * If an empty space is met, the inverse of the id is filled in 
 * If an opponent ID is met, quit, game isn't over 
 *
 * if one players pieces are enclosed, then obviously the others are,
 * so no need to check player 2 every time.
 */
function checkPlayer() {
    for (let c = 1; c <= 4; c++) {

        if (!(forestFire(player.get(c), -c))) {
            return false;
        }else {
            return true;
        }
    }
}
    
function forestFire(value, place) {
  
    let queue = [];
    queue.push(value);

    while (queue.length != 0) {
 
        let n = queue.pop();
 
        if (n.col+1 < 10) {
            if (opp.has(board[n.row][n.col+1])) {
                return false;
            }else if (player.has(board[n.row][n.col+1]) || board[n.row][n.col+1] == 0) {
                board[n.row][n.col+1] = player.has(board[n.row][n.col+1]) ? board[n.row][n.col+1] : place;
                queue.push({row: n.row, col: n.col+1 })
            }
        }
        if (n.col-1 >= 0) {
            if (opp.has(board[n.row][n.col-1])) {
                return false;
            }else if (player.has(board[n.row][n.col-1]) || board[n.row][n.col-1] == 0) {
                board[n.row][n.col-1] = player.has(board[n.row][n.col-1]) ? board[n.row][n.col-1] : place;
                queue.push({row: n.row, col: n.col-1 })
            }
        }
        if (n.row+1 < 10) {
            if (opp.has(board[n.row+1][n.col])) {
                return false;
            }else if (player.has(board[n.row+1][n.col]) || board[n.row+1][n.col] == 0) {
                board[n.row+1][n.col] = player.has(board[n.row+1][n.col]) ? board[n.row+1][n.col] : place;
                queue.push({row: n.row+1, col: n.col })
            }
        }
        if (n.row-1 >= 0){
            if (opp.has(board[n.row-1][n.col])){
                return false;
            }else if (player.has(board[n.row-1][n.col]) || board[n.row-1][n.col] == 0) {
                board[n.row-1][n.col] = player.has(board[n.row-1][n.col]) ? board[n.row-1][n.col] : place;
                queue.push({row: n.row-1, col: n.col })
            }
        }
        if ((n.row-1 >= 0 && n.col-1 >=0)){
            if (opp.has(board[n.row-1][n.col-1])) {
                return false;
            } else if (player.has(board[n.row-1][n.col-1]) || board[n.row-1][n.col-1] == 0) {
                board[n.row-1][n.col-1] = player.has(board[n.row-1][n.col-1]) ? board[n.row-1][n.col-1] : place;
                queue.push({row: n.row-1, col: n.col-1 })
            }  
        }
        if ((n.row+1 < 10 && n.col+1 < 10)){
            if (opp.has(board[n.row+1][n.col+1])) {
                return false;
            }else if ((player.has(board[n.row+1][n.col+1]) || board[n.row+1][n.col+1] == 0)) {
                board[n.row+1][n.col+1] = player.has(board[n.row+1][n.col+1]) ? board[n.row+1][n.col+1] : place;
                queue.push({row: n.row+1, col: n.col+1 })
            }
        }
        if ((n.row+1 < 10 && n.col-1 >=0)){
            if (opp.has(board[n.row+1][n.col-1])) {
                return false;
            }else if ((player.has(board[n.row+1][n.col-1]) || board[n.row+1][n.col-1] == 0)) {
                board[n.row+1][n.col-1] = player.has(board[n.row+1][n.col-1]) ? board[n.row+1][n.col-1] : place;
                queue.push({row: n.row+1, col: n.col-1 })
            }
        }  
        if ((n.row-1 >= 0 && n.col+1 < 10) ){
            if (opp.has(board[n.row-1][n.col+1])) {
                return false;
            }else if ((player.has(board[n.row-1][n.col+1]) || board[n.row-1][n.col+1] == 0)) {
                board[n.row-1][n.col+1] = player.has(board[n.row][n.col+1]) ? board[n.row][n.col+1] : place;
                queue.push({row: n.row-1, col: n.col+1 })
            }
        }
    }
    return true;
}



