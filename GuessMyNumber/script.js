'use strict';
// Guess the number -> JavaScript code for implementing the game logic
// Comments on this will be relating to some of the game logic
//and some syntax explanations to further my understanding of JS
// Generating the Secret Number
const DEBUG = 1;
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let record = 0;
if (DEBUG) {
  document.querySelector('.number').textContent = secretNumber;
} else {
  document.querySelector('.number').textContent = '?';
}

let numGuesses = 0;
// //event listener
// class name is btn check -> only interested in the check, not the button
document.querySelector('.check').addEventListener('click', function () {
  // converts string to secretNumber
  const guess = Number(document.querySelector('.guess').value);
  // No valid input
  if (!guess) {
    document.querySelector('.message').textContent = ' No Number!';

    // Player wins
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent = 'Correct Answer';
    if (DEBUG) {
      console.log(numGuesses);
      console.log(record);
    }
    numGuesses++;
    document.querySelector('.guesses').textContent = numGuesses;
    if (numGuesses <= record || record === 0) {
      record = numGuesses;
    }
    document.querySelector('.record').textContent = record;
    document.querySelector('.number').textContent = secretNumber;
    // Manipulating the CSS
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    //Player's guess is out of range
  } else if (guess > 20 || guess < 1) {
    document.querySelector('.message').textContent = 'Guess is out of range!';

    // Player Guessed Incorrectly
  } else {
    document.querySelector('.message').textContent =
      'Incorrect Answer, try again!';
    numGuesses++;
    document.querySelector('.guesses').textContent = numGuesses;
    if (numGuesses === 20) {
      document.querySelector('.message').textContent = 'You have lost';
    }
  }
});
document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  numGuesses = 0;
  document.querySelector('.guesses').textContent = '0';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  if (DEBUG) {
    document.querySelector('.number').textContent = secretNumber;
  } else {
    document.querySelector('.number').textContent = '?';
  }
});
