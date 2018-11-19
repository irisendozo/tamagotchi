const { Subject } = require('rxjs');
const readline = require('readline');

const userInput = new Subject();

const keyPressListener = (letter, key) => {
  if (key && key.ctrl && key.name === 'c') {
    process.exit();
  } else if (key && key.name === 'space') {
    userInput.next(true);
  }
};

/**
 * Read input from command line and trigger an next event to
 * userInput subject when a space is recognized
 *
 */
const startReadingInput = () => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on('keypress', keyPressListener);
  process.stdin.setRawMode(true);
  process.stdin.resume();
};

/**
 * Stop reading active user input
 *
 */
const stopReadingInput = () => {
  process.stdin.removeListener('keypress', keyPressListener);
};

const userInputDetected = () => userInput;

module.exports = { startReadingInput, stopReadingInput, userInputDetected };
