const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger,
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
    this.state = 'awake';
    this.lifeMeter = {
      hunger: 5,
      health: 5,
      happiness: 5,
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
    this.triggerSleepingHabit();
    this.triggerHungerCycles();
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
   *  - set state to awake
   *  - increase pet age
   * and is triggered by pet's concept of morning = time when pet first woke up + LIFECYCLEMS
   *
   * @memberof Pet
   */
  triggerWakeUpHabit() {
    triggerMorning().subscribe(() => {
      displayMessage(`Just woke up *${this.animal.sound}*, what a beautiful day!`);
      this.displayStatus();
      this.setWakeUpState();
      this.increaseAge();
    });
  }

  /**
   * Sets pet state to 'awake'
   *
   * @memberof Pet
   */
  setWakeUpState() {
    this.state = 'awake';
  }

  /**
   * Increases current age of pet by 1
   *
   * @memberof Pet
   */
  increaseAge() {
    this.age += 1;
  }

  /**
   * Triggers sleeping habit:
   *  - display sleeping message
   *  - set state to asleep
   * and is triggered by pet's concept of night = time when pet first woke up + 2.3 * LIFECYCLEMS
   *
   * @memberof Pet
   */
  triggerSleepingHabit() {
    triggerNight().subscribe(() => {
      displayMessage(`Sleepy sleepy *${this.animal.sound}*, going to sleep now!`);
      this.setSleepingState();
    });
  }

  /**
   * Sets pet state to 'sleeping'
   *
   * @memberof Pet
   */
  setSleepingState() {
    this.state = 'sleeping';
  }

  /**
   * Triggers hungry habit if pet is awake:
   *  - display hungry message if hungry
   *  - decrease hunger meter
   * and is triggered by pet's concept of hunger = LIFECYCLEMS / 5
   *
   * @memberof Pet
   */
  triggerHungerCycles() {
    triggerHunger().subscribe(() => {
      if (this.isAwake()) {
        if (this.isHungry()) {
          displayMessage(`I'm hungry *${this.animal.sound}*! FEED ME NOW!`);
        }

        this.decreaseHungerMeter();
      }
    });
  }

  /**
   * States if pet is awake or not
   *
   * @returns {Boolean} Boolean true if awake, false if not
   * @memberof Pet
   */
  isAwake() {
    return this.state === 'awake';
  }

  /**
   * States if pet is hungry or not, pet is hungry if lifeMeter.hunger <= 2
   *
   * @returns {Boolean} Boolean true if hungry, false if not
   * @memberof Pet
   */
  isHungry() {
    return this.lifeMeter.hunger <= 2;
  }

  /**
   * Decreases hunger meter by 2
   *
   * @memberof Pet
   */
  decreaseHungerMeter() {
    this.lifeMeter.hunger -= 2;
  }
}

module.exports = Pet;
