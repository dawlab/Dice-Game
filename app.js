/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gamePlaying, input;

init();

var lastDice;

document.querySelector('.btn-roll').addEventListener("click", function(){

    if (gamePlaying) {

        dice = Math.floor(Math.random() * 6) + 1;
        
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';

            document.querySelector('#message-box').style.display = 'inline';        
            document.querySelector('.max-score-message').textContent = "Double 6 - your total score is 0!";        
    
            setTimeout(function () {
                document.querySelector('#message-box').style.display = 'none';   
            }, 1000);

            nextPlayer();
        } else if (dice !== 1) {
            roundScore += dice;
            //roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
         } else {
            document.querySelector('#message-box').style.display = 'inline';        
            document.querySelector('.max-score-message').textContent = "1 - next player!";     
    
            setTimeout(function () {
                document.querySelector('#message-box').style.display = 'none';   
            }, 1000);

             nextPlayer();
        }

        lastDice = dice;
    }  
});

document.querySelector('.btn-hold').addEventListener('click', function() {

    if (gamePlaying) {
        //Add round score to global score
    scores[activePlayer] += roundScore;
    //scores[activePlayer] = scores[activePlayer] + roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    var winningScore;

    if (input) {
        winningScore = input;
    } else {
        winningScore = 100;
    }

    if (scores[activePlayer] >= winningScore ) {

        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';  
        gamePlaying = false;
    } else {
        nextPlayer();
    }
}
} );


function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');   
    document.querySelector('.player-1-panel').classList.toggle('active');     
    
    document.querySelector('.dice').style.display = 'none'; 
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    dice = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-submit').addEventListener('click', function() {
    input = document.querySelector('.input-score').value;

        document.querySelector('#message-box').style.display = 'inline';        
        document.querySelector('.max-score-message').textContent = "Max score is set to " + input;        

        setTimeout(function () {
            document.querySelector('#message-box').style.display = 'none';   
        }, 1000);
});


