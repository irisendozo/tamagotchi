const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning,
} = require('./utils/time');
const { ANIMALS, GENDERS } = require('./constants');

const selectAnimal = () => ANIMALS[Math.floor(Math.random() * (ANIMALS.length - 1))];
const selectGender = () => GENDERS[Math.floor(Math.random() * (GENDERS.length - 1))];

/**
 * Represents pet status + interactions
 *
 * @class Pet
 */
class Pet {
  constructor() {
    this.animal = selectAnimal();
    this.gender = selectGender();
    this.age = 1;
    this.lifeMeter = {
      hunger: 100,
      health: 100,
      happiness: 100,
    };
  }

  /**
   * Timed promise that returns after 2 seconds delay to
   * simulate egg hatching
   *
   * @returns {Promise} new Promise that resolves after 2s
   * @memberof Pet
   */
  // eslint-disable-next-line class-methods-use-this
  hatchingEgg() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  /**
   * Initializes life cycle of new pet
   *
   * @memberof Pet
   */
  async startLife() {
    this.name = await this.askName();
    this.displayStatus();

    this.triggerWakeUpHabit();
  }

  /**
   * Gets pet name from user command prompt
   *
   * @returns {string} String representing name of new pet
   * @memberof Pet
   */
  async askName() {
    displayMessage(`Hello my new human! I am your new baby pet *${this.animal.sound}*.`);
    const { name } = await askQuestion('First, I need a name. What would you like to call me?', 'name');
    displayMessage(`Okay, you can call me ${name} from now on.`);

    return name;
  }

  /**
   * Displays current status of pet on command line
   *
   * @memberof Pet
   */
  displayStatus() {
    displayMessage(`This is my status for today:

    Age: ${this.age} cycle old
    Happiness: ${this.lifeMeter.happiness}
    Hunger: ${this.lifeMeter.hunger}
    Health: ${this.lifeMeter.health}`);
  }

  /**
   * Triggers waking up habit:
   *  - display waking up message
   *  - increase pet age
   * and is triggered by pet's concept of morning = time when pet first woke up + LIFECYCLEMS
   *
   * @memberof Pet
   */
  triggerWakeUpHabit() {
    return triggerMorning().subscribe(() => {
      displayMessage(`Just woke up *${this.animal.sound}*, what a beautiful day!`);
      this.displayStatus();
      this.increaseAge();
    });
  }

  /**
   * Increases current age of pet by 1
   *
   * @memberof Pet
   */
  increaseAge() {
    this.age += 1;
  }
}

module.exports = Pet;
