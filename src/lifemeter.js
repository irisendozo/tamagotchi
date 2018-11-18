const { Subject } = require('rxjs');

const { LIFEMETERMAX, LIFEMETERMIN } = require('./constants');

/**
 * Represents pet status life meter
 *
 * @class Pet
 */
class Lifemeter {
  constructor() {
    this.hunger = LIFEMETERMAX;
    this.health = LIFEMETERMAX;
    this.happiness = LIFEMETERMAX;

    this.isDead = new Subject();
    this.isHungry = new Subject();
    this.isSick = new Subject();
    this.isSad = new Subject();
  }

  /**
   * Increment hunger by 1 if less than life meter max threshold
   *
   * @memberof Lifemeter
   */
  increaseHunger() {
    if (this.hunger < LIFEMETERMAX) {
      this.hunger += 1;
    }
  }

  /**
   * Decrements hunger by 1 if != 0 and triggers isDead if 0
   *
   * @memberof Lifemeter
   */
  decreaseHunger() {
    if (this.hunger === 0) {
      this.isDead.next(true);
    } else if (this.hunger < LIFEMETERMIN) {
      this.isHungry.next(true);
      this.hunger -= 1;
    } else {
      this.hunger -= 1;
    }
  }

  /**
   * Increment health by 1 if less than life meter max threshold
   *
   * @memberof Lifemeter
   */
  increaseHealth() {
    if (this.health < LIFEMETERMAX) {
      this.health += 1;
    }
  }

  /**
   * Decrements health by 1 if != 0 and triggers isDead if 0
   *
   * @memberof Lifemeter
   */
  decreaseHealth() {
    if (this.health === 0) {
      this.isDead.next(true);
    } else if (this.health < LIFEMETERMIN) {
      this.isSick.next(true);
      this.health -= 1;
    } else {
      this.health -= 1;
    }
  }

  /**
   * Increment happiness by 1 if less than life meter max threshold
   *
   * @memberof Lifemeter
   */
  increaseHappiness() {
    if (this.happiness < LIFEMETERMAX) {
      this.happiness += 1;
    }
  }

  /**
   * Decrements happiness by 1 if != 0 and triggers isDead if 0
   *
   * @memberof Lifemeter
   */
  decreaseHappiness() {
    if (this.happiness === 0) {
      this.isDead.next(true);
    } else if (this.happiness < LIFEMETERMIN) {
      this.isSad.next(true);
      this.happiness -= 1;
    } else {
      this.happiness -= 1;
    }
  }
}

module.exports = Lifemeter;
