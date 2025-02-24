'use strict';
const score1 = document.querySelector('#score--0');
const score2 = document.getElementById('score--1');
const currentScore1 = document.getElementById('current-score--0');
const currentScore2 = document.getElementById('current-score--1');
const player1 = document.querySelector('.player-0');
const player2 = document.querySelector('.player-1');
const diceEl = document.querySelector('.image');
const btnRoll = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold');
const btnReset = document.querySelector('.new-game');
const btnRules = document.querySelector('.rules');
const rulesModal = document.getElementById('rule-modal');
const btnCloseModal = document.querySelector('.close-btn');
const overlay = document.querySelector('.overlay');
const winModal = document.querySelector('.winning-modal');
const closeWin = document.querySelector('.close-win');
const btnAgain = document.querySelector('.btn-again');

let score, currentScore, player, playing, activePlayer;

const reset = function () {
  score1.textContent = 0;
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
  score = [0, 0];
  currentScore = 0;
  diceEl.classList.add('hidden');
  activePlayer = 0;
  playing = true;
  player1.classList.add('player-active');
  player2.classList.remove('player-active');
  player1.classList.remove('winner-player');
  player2.classList.remove('winner-player');
};
reset();
const swithPlayer = function () {
  currentScore = 0;
  document.getElementById(`current-score--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player1.classList.toggle('player-active');
  player2.classList.toggle('player-active');
};
const closeModal = function () {
  rulesModal.style.display = 'none';
  overlay.style.display = 'none';
 
};
const closeWinModal = function(){
  winModal.style.display = 'none';
} 
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      swithPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 100) {
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('winner-player');
      winModal.style.display = 'block';
      overlay.style.display = 'block';
      playing = false;
    } else {
      swithPlayer();
    }
  }
});

btnReset.addEventListener('click', reset);

btnRules.addEventListener('click', function () {
  rulesModal.style.display = 'block';
  overlay.style.display = 'block';
});
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', function () {
  closeModal();
 closeWinModal()
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape'){ 
    closeModal();
    closeWinModal()
  }
});
closeWin.addEventListener('click', function () {
  closeModal();
 closeWinModal()
});
btnAgain.addEventListener('click', function(){
  closeModal()
  reset()
 closeWinModal()

})
