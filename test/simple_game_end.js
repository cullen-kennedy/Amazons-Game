var board = [
    [9,9,0,9,3,9,9,0,0,9],
    [1,9,0,9,9,9,9,9,9,9],
    [9,9,9,9,9,9,9,9,9,2],
    [9,9,9,9,9,9,9,9,9,9],
    [9,4,9,9,9,9,9,9,9,9],
    [9,6,9,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,8,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,5,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0]
    
  ];

  player1 = [1,2,3,4]
  player2 = [5,6,7,8]

gameOver();

  
function gameOver() {

    let stuckPieces1 = [];
    let stuckPieces2 = []; 
    for (let r = 0; r < 10; r++){
        for (let c = 0; c < 10; c++){
            if (board[r][c] > 0 && board[r][c] < 5)
                if (!canMove(player2, r, c)) {
                    stuckPieces1.push(board[r][c])
                }
            else if (board[r][c] > 4 && board[r][c] < 9){
                if (!canMove(player1, r, c)) {
                    stuckPieces2.push(board[r][c])
                }
            }
        }
    }
    if (stuckPieces1.length == 4) {
        console.log('player2 wins')
    }
    else if (stuckPieces2.length == 4) {
        console.log('player 1 wins')
    }
    else {
        console.log('game not over')
    }
}

    function canMove(opp, r, c) {
        
            let badMoves = 0

            if (r+1 > 9)
                badMoves++
            else if (board[r+1][c] == 9 || opp.includes(board[r+1][c])) 
                badMoves++;

            if (r-1 < 0)
                badMoves++;
            else if (board[r-1][c] == 9 || opp.includes(board[r-1][c])) 
                badMoves++;
                
            
            if (c+1 > 9) 
                badMoves++; 
            else if (board[r][c+1] == 9 || opp.includes(board[r][c+1]))
                    badMoves++;
            
            if (c-1 < 0) 
                badMoves++
            else if (board[r][c-1] == 9 || opp.includes(board[r][c-1]))
                    badMoves++;
            
            if (r+1 > 9 || c+1 > 9) 
                badMoves++
            else if (board[r+1][c+1] == 9 || opp.includes(board[r+1][c+1]))
                    badMoves++;
            
            if (r-1 < 0 || c-1 < 0) 
                badMoves++
            else if (board[r-1][c-1] == 9 || opp.includes(board[r-1][c-1]))
                    badMoves++;
            
            if (r+1 > 9 || c-1 < 0) 
                badMoves++
            else if (board[r+1][c-1] == 9 || opp.includes(board[r+1][c-1]))
                    badMoves++;
            
            if (r-1 < 0 || c+1 > 9) 
                badMoves++
            else if (board[r-1][c+1] == 9 || opp.includes(board[r-1][c+1]))
                badMoves++;
            

            console.log(board[r][c])
            console.log(badMoves)
            
            if (badMoves < 8)
                return true;
            else
                return false;
    }
    
    