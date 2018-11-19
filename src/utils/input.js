const { Subject } = require('rxjs');
const readline = require('readline');

const userInput = new Subject();

const startReadingInput = () => {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.on('keypress', (letter, key) => {
    if (key && key.ctrl && key.name === 'c') {
      process.exit();
    } else if (key && key.name === 'space') {
      userInput.next(true);
    }
  });

  process.stdin.setRawMode(true);
  process.stdin.resume();
};

const userInputDetected = () => userInput;

module.exports = { startReadingInput, userInputDetected };
