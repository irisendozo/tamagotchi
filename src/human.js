const { startReadingInput, stopReadingInput, userInputDetected } = require('./utils/input');
const {
  askMultipleChoice, displayMessage,
} = require('./utils/console');

const ACTIONS = [
  'Feed',
  'Play',
  'Cure',
  'Clean waste',
];

/**
 * Represents human interactions
 *
 * @class Human
 */
class Human {
  constructor(name) {
    this.name = name;
  }

  startPetCare(lifemeter) {
    this.lifemeter = lifemeter;

    startReadingInput();

    userInputDetected().subscribe(() => {
      // Stop reading user input to allow questions to be prompted
      stopReadingInput();
      this.triggerUserAction();
    });
  }

  /**
   * Outputs command prompt from a set of user actions and triggers
   * corresponding action on life meter depending on response
   *
   * @memberof Human
   */
  async triggerUserAction() {
    const { action } = await askMultipleChoice(`Hi ${this.name}! What would you like to do?`, 'action', ACTIONS);
    if (action === 'Feed') {
      this.lifemeter.increaseHunger();
      displayMessage('You have fed your pet!');
      this.lifemeter.displayStatus();
    } else if (action === 'Play') {
      this.lifemeter.increaseHappiness();
      displayMessage('You have played with your pet!');
      this.lifemeter.displayStatus();
    } else if (action === 'Cure') {
      this.lifemeter.increaseHealth();
      displayMessage('You have cured your pet!');
      this.lifemeter.displayStatus();
    } else if (action === 'Clean waste') {
      this.lifemeter.decreaseWaste();
      displayMessage('You have cleaned your pet\'s waste!');
      this.lifemeter.displayStatus();
    }

    startReadingInput();
  }
}

module.exports = Human;
