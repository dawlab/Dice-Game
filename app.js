/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0,0];
roundScore = 0;
activePlayer = 0;
dice = 0;

document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.addEventListener("click", function roll(){
            
    dice = Math.floor(Math.random() * 6) + 1;

    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";
        
    
    /*switch(dice) {
    
         case 1:
            document.querySelector(".dice").src = "dice-1.png";
            break;
        case 2:
            document.querySelector(".dice").src = "dice-2.png";
            break;
        case 3:
            document.querySelector(".dice").src = "dice-3.png";
            break;
        case 4:
            document.querySelector(".dice").src = "dice-4.png";
            break;
        case 5:
            document.querySelector(".dice").src = "dice-5.png";
            break;
        case 6:
            document.querySelector(".dice").src = "dice-6.png";
            break;
        
    }*/


    if (dice !== 1) {
        roundScore += dice;
        //roundScore = roundScore + dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        
    } else {
        nextPlayer();
    }
    
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    //Add round score to global score
    scores[activePlayer] += roundScore;
    //scores[activePlayer] = scores[activePlayer] + roundScore;

    // Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 20) {

        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        document.querySelector('.dice').style.display = 'none';        
        
    } else {
        nextPlayer();
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
}
    
    



