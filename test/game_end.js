/**
 * This determines if the endgame has been reached, both teams are isolated 
 * It counts the remaining moves, and determines who will fill their space 
 * up more quickly with optimal moves and therefore lose.
 * 
 * There are a few problems though,
 * 1. On wikipedia, the end game example shows immediately after any player
 *    makes a move and there are no meaningful moves left, endgame starts.
 *    This includes if a player is blocked by an enemy piece. 
 *         - this current algorithm only tests if the player is blocked by arrows
 * 2. In rare cases a territory is structured in such a way that the inhabiting amazons
      cannot move to all of the remaining squares and therefore some moves are lost.
           - Solution (for now?), allow player with least moves to concede 
      
 */
//9s represent arrows
var board = [
  [9,0,0,5,9,0,0,9,0,0],
  [0,9,9,9,0,9,0,0,9,0],
  [9,9,1,9,9,9,9,9,9,9],
  [0,0,9,9,9,2,0,0,9,3],
  [0,0,9,0,9,9,9,9,9,9],
  [0,9,9,9,6,9,0,9,0,0],
  [0,9,9,0,0,9,9,0,0,0],
  [9,9,0,9,9,9,9,9,0,0],
  [9,9,7,9,4,9,9,0,0,0],
  [0,0,9,9,9,9,8,0,0,9]
  
];

const player = new Map();
const opp = new Map();

pieces();

if (gameOver()) {
    console.log('game over!')
	count();
}
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
 * We inverse the player ids and count them as visited territory
 * If an empty space is met, the inverse of the id is filled in 
 * If an opponent ID is met, quit, game isn't over 
 *
 * if one players pieces are enclosed, then obviously the others are,
 * so no need to check player 2 every time.
 */
function gameOver() {
    for (let c = 1; c <= 4; c++) {
        if (!(forestFire(player.get(c), -c))) {
            return false;
        }
    }
	console.log(board);
    return true;
}
    
function forestFire(value, place) {
  
    let queue = [];
	let visited = [];
    queue.push(value);
	let count = 0;
	
	board[value.row][value.col] = place;

    while (queue.length != 0) {
 
        let n = queue.pop();
 
        if (n.col+1 < 10) {
            if (opp.has(board[n.row][n.col+1])) {
                return false;
            }else if (player.has(board[n.row][n.col+1]) || board[n.row][n.col+1] == 0) {
                board[n.row][n.col+1] = place;
                queue.push({row: n.row, col: n.col+1 })
            }
        }
        if (n.col-1 >= 0) {
            if (opp.has(board[n.row][n.col-1])) {
                return false;
            }else if (player.has(board[n.row][n.col-1]) || board[n.row][n.col-1] == 0) {
                board[n.row][n.col-1] = place;
                queue.push({row: n.row, col: n.col-1 })
            }
        }
        if (n.row+1 < 10) {
            if (opp.has(board[n.row+1][n.col])) {
                return false;
            }else if (player.has(board[n.row+1][n.col]) || board[n.row+1][n.col] == 0) {
                board[n.row+1][n.col] = place;
                queue.push({row: n.row+1, col: n.col })
            }
        }
        if (n.row-1 >= 0){
            if (opp.has(board[n.row-1][n.col])){
                return false;
            }else if (player.has(board[n.row-1][n.col]) || board[n.row-1][n.col] == 0) {
                board[n.row-1][n.col] = place;
                queue.push({row: n.row-1, col: n.col })
            }
        }
        if ((n.row-1 >= 0 && n.col-1 >=0)){
            if (opp.has(board[n.row-1][n.col-1])) {
                return false;
            } else if (player.has(board[n.row-1][n.col-1]) || board[n.row-1][n.col-1] == 0) {
                board[n.row-1][n.col-1] = place;
                queue.push({row: n.row-1, col: n.col-1 })
            }  
        }
        if ((n.row+1 < 10 && n.col+1 < 10)){
            if (opp.has(board[n.row+1][n.col+1])) {
                return false;
            }else if (player.has(board[n.row+1][n.col+1]) || board[n.row+1][n.col+1] == 0) {
                board[n.row+1][n.col+1] = place;
                queue.push({row: n.row+1, col: n.col+1 })
            }
        }
        if ((n.row+1 < 10 && n.col-1 >=0)){
            if (opp.has(board[n.row+1][n.col-1])) {
                return false;
            }else if (player.has(board[n.row+1][n.col-1]) || board[n.row+1][n.col-1] == 0) {
                board[n.row+1][n.col-1] = place;
                queue.push({row: n.row+1, col: n.col-1 })
            }
        }  
        if ((n.row-1 >= 0 && n.col+1 < 10) ){
            if (opp.has(board[n.row-1][n.col+1])) {
                return false;
            }else if (player.has(board[n.row-1][n.col+1]) || board[n.row-1][n.col+1] == 0) {
                board[n.row-1][n.col+1] = place;
                queue.push({row: n.row-1, col: n.col+1 })
            }
        }

    }

    return true;
}

function count() {
	
	let playerc = 0;
	let playerd = 0;
	
    for (let r = 0; r < 10; r++){
        for (let c = 0; c < 10; c++){
            if ((board[r][c] < 0 && board[r][c] > -5))
                playerc++;
            else if ((board[r][c] > 4 && board[r][c] < 9) || board[r][c] == 0)
                playerd++;
            
        }
    }
	
	//Final scores!
	console.log(playerc - 4);
	console.log(playerd - 4);
}



