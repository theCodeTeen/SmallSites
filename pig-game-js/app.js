/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores,round,activePlayer,work,last=0,finalScore=0,temp;
function init()
{
    scores =[0,0];
    round=0;
    activePlayer=0;
    work=true;
    document.querySelector('#score-0').textContent='0';
    document.querySelector('#score-1').textContent='0';
    document.querySelector('#current-0').textContent='0';
    document.querySelector('#current-1').textContent='0';
    document.querySelector('.dice-0').style.display='none';
    document.querySelector('.dice-1').style.display='none';
    document.querySelector('.player-'+last+'-panel').classList.remove('winner');
    document.querySelector('.player-'+last+'-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#name-'+last).textContent='Player '+(last+1);
    temp=document.getElementById('intro');
    temp.parentNode.removeChild(temp);
    document.getElementById('wrap').appendChild(temp);
    
}
init();
function switchPlayer()
{
        round=0;
        document.querySelector('#current-'+activePlayer).textContent=round;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        document.querySelector('.dice-0').style.display='none';
        document.querySelector('.dice-1').style.display='none';
        activePlayer=(activePlayer+1)%2;
}
document.querySelector('.btn-roll').addEventListener('click',function(){
    if(work){
    var rand=Math.floor(Math.random()*6)+1;
    var rand2=Math.floor(Math.random()*6)+1;
    var act=document.querySelector('#current-'+activePlayer);
    round+=rand;
    round+=rand2;
    act.textContent=round;
    
    document.querySelector('.dice-0').style.display='block';
    document.querySelector('.dice-0').src='dice-'+rand+'.png';
    document.querySelector('.dice-1').style.display='block';
    document.querySelector('.dice-1').src='dice-'+rand2+'.png';
    if(rand===1||rand2===1)
    {
        switchPlayer();
    }}
})
document.querySelector('.btn-hold').addEventListener('click',function(){
    if(work){
    var score=document.querySelector('#score-'+activePlayer);
    scores[activePlayer]+=round;
    score.textContent=scores[activePlayer];
        console.log(finalScore);
    if(scores[activePlayer]<finalScore){
    switchPlayer();}
    else
    {
        document.querySelector('#name-'+activePlayer).textContent='Winner!';
        document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.dice-0').style.display='none';
        document.querySelector('.dice-1').style.display='none';
        work=false;
        last=activePlayer;
    }
    }
})
document.querySelector('.btn-new').addEventListener('click',function(){
    temp.querySelector('input').value=null;
    document.getElementById('wrap').appendChild(temp);
    init();
});

document.querySelector('.sub').addEventListener('click',function(){
    finalScore=document.querySelector('input').value;
    if(!isNaN(finalScore)){
    temp.parentNode.removeChild(temp);
    }
    else
    {
        alert("Enter a numeric value");
    }
})