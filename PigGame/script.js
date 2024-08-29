'use strict';
const DEBUG = 0;
// using # for ids, . is for classes
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // another way of doing it when theres an ID
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let scores, currentScore, activePlayer, playing;
// init function
const init = function () {
  scores = [0, 0]; // refers to the big scores
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // keeping player 0 as the active player
  player1El.classList.remove('player--active');
};
init();
// Function for switching player
const SwitchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // changing the background to the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Dice roll functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate Random dice roll: number between 1 and 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    if (DEBUG) {
      console.log(dice);
    }
    // display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // following the naming convention of the dice images

    // Check if 1 was rolled
    if (dice !== 1) {
      // dice is not 1
      currentScore += dice;
      // dynamic player selection
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      SwitchPlayer();
    }
  }
  if (DEBUG) console.log(playing);
});

// Hold score functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // add current score to the active players total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if the players score is >= 100
    // Finish Game
    if (scores[activePlayer] >= 20) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
    } else {
      SwitchPlayer();
    }
    // Switch Players
    SwitchPlayer();
  }
});

btnNew.addEventListener('click', init); // no brackets as JS calls the function when new is clicked
