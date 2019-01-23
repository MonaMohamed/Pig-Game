/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores , currentScore , activePlayer, isPlaying , previousRoll1 ,previousRoll2 ;

init();

document.querySelector('.btn-new').addEventListener('click',init);

document.querySelector('.btn-roll').addEventListener('click',function(){
    if(isPlaying){
        //random number
        var dice1 = Math.floor(Math.random()*6)+1;
        var dice2 = Math.floor(Math.random()*6)+1;

        //display result
        document.querySelector('#dice-1').style.display = 'block';
        document.querySelector('#dice-2').style.display = 'block';

        document.querySelector('#dice-1').src = 'dice-' + dice1 + '.png';
        document.querySelector('#dice-2').src = 'dice-' + dice2 + '.png';

        //update current score if current dice != 1
        if((previousRoll1== 6 || previousRoll2 == 6) && (dice1 == 6 || dice2 == 6)){
            document.querySelector('#score-'+ activePlayer).textContent = '0';
            nextPlayer();
        }
        else if(dice1 !== 1 || dice2 !== 1){
            currentScore += dice1 + dice2;
            document.querySelector('#current-'+activePlayer).textContent = currentScore;
        }else{
            nextPlayer();
        } 
        previousRoll = dice1;  
        previousRoll2 = dice2;
    } 
});

document.querySelector('.btn-hold').addEventListener('click',function(){
    if(isPlaying && currentScore > 0){
        //add current score to global score
        scores[activePlayer] += currentScore;

        //update UI 
        //document.querySelector('#current-'+ activePlayer).textContent = '0';
        document.querySelector('#score-'+ activePlayer).textContent = scores[activePlayer];
        var finalScore = document.getElementById('final-score').value;

        if(!finalScore){
            finalScore = 100;
        }
        //check winner
        if(scores[activePlayer] >= finalScore){
            document.querySelector('#name-'+activePlayer).textContent = 'Winner!';
            document.querySelector('#current-' + activePlayer).textContent = '0';
            document.querySelector('.player-'+ activePlayer +'-panel').classList.add('winner');
            document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';

            isPlaying = false;
        }else{
            nextPlayer();
        }
    } 
});

function init(){
    scores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    previousRoll = 0;
    isPlaying = true;

    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
}

function nextPlayer(){
    currentScore = 0;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

}