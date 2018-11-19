const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger, triggerPlay, triggerWaste,
} = require('./utils/time');
const {
  ANIMALS, GENDERS,
} = require('./constants');

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
    this.state = 'awake';
    this.waste = 0;
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
  async startLife(lifemeter) {
    this.lifemeter = lifemeter;

    this.lifemeter.displayStatus();
    this.lifemeter.increaseAge();

    this.triggerWakeUpCycles();
    this.triggerSleepingCycles();
    this.triggerHungerCycles();
    this.triggerWasteCycles();
    this.triggerPlayCycles();
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

  setName(name) {
    this.name = name;
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
  triggerWakeUpCycles() {
    triggerMorning().subscribe(() => {
      displayMessage(`Just woke up *${this.animal.sound}*, what a beautiful day!`);
      this.lifemeter.displayStatus();
      this.lifemeter.increaseAge();
      this.setWakeUpState();
    });
  }

  setWakeUpState() {
    this.state = 'awake';
  }

  /**
   * Triggers sleeping habit:
   *  - display sleeping message
   *  - set state to asleep
   * and is triggered by pet's concept of night = time when pet first woke up + 2.3 * LIFECYCLEMS
   *
   * @memberof Pet
   */
  triggerSleepingCycles() {
    triggerNight().subscribe(() => {
      displayMessage(`Sleepy sleepy *${this.animal.sound}*, going to sleep now!`);
      this.setSleepingState();
    });
  }

  setSleepingState() {
    this.state = 'sleeping';
  }

  /**
   * Triggers hungry habit if pet is awake:
   *  - display hungry message if isHungry event is triggered
   *  - decrease hunger meter
   * and is triggered by pet's concept of hunger = LIFECYCLEMS / 5
   *
   * @memberof Pet
   */
  triggerHungerCycles() {
    triggerHunger().subscribe(() => {
      if (this.isAwake()) {
        displayMessage(`Wow *${this.animal.sound}*! Starting to get hungry...`);
        this.lifemeter.decreaseHunger();
      }
    });

    this.lifemeter.isHungry.subscribe(() => {
      if (this.isAwake()) {
        displayMessage(`I'm hungry *${this.animal.sound}*! FEED ME NOW!`);
      }
    });
  }

  /**
   * Triggers waste habit if pet is awake:
   *  - display waste message if filthy
   *  - increase waste meter
   * and is triggered by pet's concept of waste = LIFECYCLEMS / 5
   *
   * @memberof Pet
   */
  triggerWasteCycles() {
    triggerWaste().subscribe(() => {
      if (this.isAwake()) {
        displayMessage('Yay poop!');

        this.lifemeter.increaseWaste();
      }
    });

    this.lifemeter.isFilthy.subscribe(() => {
      if (this.isAwake()) {
        displayMessage(`Yuck *${this.animal.sound}*! So dirty, I'm not going to leave waste anymore!`);
      }
    });
  }

  isAwake() {
    return this.state === 'awake';
  }

  /**
   * Triggers play habit if pet is awake:
   *  - display play message
   *  - decrease happiness meter
   * and is triggered by pet's concept of hunger = LIFECYCLEMS / 2
   *
   * @memberof Pet
   */
  triggerPlayCycles() {
    triggerPlay().subscribe(() => {
      if (this.isAwake()) {
        displayMessage(`C'mon let's play *${this.animal.sound}*! You've been so busy!`);
        this.lifemeter.decreaseHappiness();
      }
    });
  }
}

module.exports = Pet;
