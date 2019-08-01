export default class messages {

    static endGameMessage(myScore, oppScore, winning) {
        let endGameBox = document.getElementById("end-game");
        endGameBox.style.display = 'block'
        let alertMessage = endGameBox.querySelector(".alert-message");
        let exitAlert = endGameBox.querySelector(".exit-alert");
        if (winning) {
            exitAlert.style.display = 'none';
            endGameBox.querySelector("#continue-endgame").style.display = 'none';
        } else {
            endGameBox.querySelector("#wait-concede").style.display = 'none';
        }
        //Message formatting is kind of messy
        alertMessage.textContent = "ENDGAME\r\nApprox. Moves left: " + myScore + "\r\n\r\nApprox. Opponent\r\nMoves Left: " + oppScore;
    
    }

    static bigAlert(message, allowexit) {
        let bigAlertBox = document.getElementById("big-alert");
        let endGameBox = document.getElementById("end-game");
        if (allowexit)
        {
            document.getElementById("reload").style.display = 'block';
        }
        else
        {
            document.getElementById("reload").style.display = 'none';
        }
        endGameBox.style.display = 'none'
        bigAlertBox.style.display = 'block'
        let alertMessage = bigAlertBox.querySelector(".alert-message")

        alertMessage.textContent = message;
    }
}