const {
  LIFEMETERMAX, LIFEMETERMIN, WASTEMAX, OLDAGE,
} = require('./constants');
const {
  displayMessage,
} = require('./utils/console');
const Lifemeter = require('./lifemeter');

jest.mock('./utils/console', () => ({
  displayMessage: jest.fn(),
}));

describe('Lifemeter: initialize()', () => {
  it('should initialize lifemeter stats', () => {
    const lifemeter = new Lifemeter();

    expect(lifemeter.hunger).toEqual(LIFEMETERMAX);
    expect(lifemeter.health).toEqual(LIFEMETERMAX);
    expect(lifemeter.happiness).toEqual(LIFEMETERMAX);
    expect(lifemeter.waste).toEqual(0);
    expect(lifemeter.age).toEqual(1);
  });
});

describe('Lifemeter: displayStatus()', () => {
  it('should display current lifemeter status', () => {
    const lifemeter = new Lifemeter();
    lifemeter.age = 1;
    lifemeter.hunger = 5;
    lifemeter.happiness = 5;
    lifemeter.health = 5;
    lifemeter.waste = 0;

    lifemeter.displayStatus();

    expect(displayMessage).toHaveBeenCalledWith(`Current pet status:

    Age: 1 cycle old
    Happiness: 5
    Hunger: 5
    Health: 5`);
  });
});

describe('Lifemeter: getAge()', () => {
  it('should get age', () => {
    const lifemeter = new Lifemeter();
    lifemeter.age = 5;

    expect(lifemeter.getAge()).toBe(5);
  });
});

describe('Lifemeter: increaseAge()', () => {
  it('should increase age if < OLDAGE', () => {
    const lifemeter = new Lifemeter();
    lifemeter.age = OLDAGE - 1;

    lifemeter.increaseAge();

    expect(lifemeter.age).toEqual(OLDAGE);
  });

  it('should trigger isDead if age === OLDAGE', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.age = OLDAGE;

    lifemeter.isDead.subscribe((dead) => {
      expect(dead).toBeTruthy();
    });
    lifemeter.increaseAge();

    expect(lifemeter.age).toEqual(OLDAGE);
  });
});

describe('Lifemeter: getHunger()', () => {
  it('should return current hunger stat', () => {
    const lifemeter = new Lifemeter();
    lifemeter.hunger = 4;

    expect(lifemeter.getHunger()).toEqual(4);
  });
});

describe('Lifemeter: increaseHunger()', () => {
  it('should increase hunger by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.hunger = 4;

    lifemeter.increaseHunger();

    expect(lifemeter.hunger).toEqual(5);
  });

  it('should not increase hunger by 1 if > LIFEMETERMAX', () => {
    const lifemeter = new Lifemeter();
    lifemeter.hunger = 5;

    lifemeter.increaseHunger();

    expect(lifemeter.hunger).toEqual(5);
  });
});

describe('Lifemeter: decreaseHunger()', () => {
  it('should decrease hunger by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.hunger = 5;

    lifemeter.decreaseHunger();

    expect(lifemeter.hunger).toEqual(4);
  });

  it('should trigger isHungry subject if hunger is < LIFEMETERMIN', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.hunger = LIFEMETERMIN - 1;
    lifemeter.isHungry.subscribe((hungry) => {
      expect(hungry).toBeTruthy();
    });

    lifemeter.decreaseHunger();

    expect(lifemeter.hunger).toEqual(LIFEMETERMIN - 1 - 1);
  });

  it('should trigger isDead subject if hunger is 1 and need to decrease', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.hunger = 0;
    lifemeter.isDead.subscribe((dead) => {
      expect(dead).toBeTruthy();
    });

    lifemeter.decreaseHunger();

    expect(lifemeter.hunger).toEqual(0);
  });
});

describe('Lifemeter: getHealth()', () => {
  it('should return current health stat', () => {
    const lifemeter = new Lifemeter();
    lifemeter.health = 4;

    expect(lifemeter.getHealth()).toEqual(4);
  });
});

describe('Lifemeter: increaseHealth()', () => {
  it('should increase health by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.health = 4;

    lifemeter.increaseHealth();

    expect(lifemeter.health).toEqual(5);
  });

  it('should not increase health by 1 if > LIFEMETERMAX', () => {
    const lifemeter = new Lifemeter();
    lifemeter.health = 5;

    lifemeter.increaseHealth();

    expect(lifemeter.health).toEqual(5);
  });
});

describe('Lifemeter: decreaseHealth()', () => {
  it('should decrease health by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.health = 5;

    lifemeter.decreaseHealth();

    expect(lifemeter.health).toEqual(4);
  });

  it('should trigger isSick subject if hunger is < LIFEMETERMIN', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.health = LIFEMETERMIN - 1;
    lifemeter.isSick.subscribe((sick) => {
      expect(sick).toBeTruthy();
    });

    lifemeter.decreaseHealth();

    expect(lifemeter.health).toEqual(LIFEMETERMIN - 1 - 1);
  });

  it('should trigger isDead subject if health is 1 and need to decrease', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.health = 0;
    lifemeter.isDead.subscribe((dead) => {
      expect(dead).toBeTruthy();
    });

    lifemeter.decreaseHealth();

    expect(lifemeter.health).toEqual(0);
  });
});

describe('Lifemeter: getHappiness()', () => {
  it('should return current happiness stat', () => {
    const lifemeter = new Lifemeter();
    lifemeter.happiness = 4;

    expect(lifemeter.getHappiness()).toEqual(4);
  });
});

describe('Lifemeter: increaseHappiness()', () => {
  it('should increase happiness by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.happiness = 4;

    lifemeter.increaseHappiness();

    expect(lifemeter.happiness).toEqual(5);
  });

  it('should not increase happiness by 1 if > LIFEMETERMAX', () => {
    const lifemeter = new Lifemeter();
    lifemeter.happiness = 5;

    lifemeter.increaseHappiness();

    expect(lifemeter.happiness).toEqual(5);
  });
});

describe('Lifemeter: decreaseHappiness()', () => {
  it('should decrease happiness by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.happiness = 5;

    lifemeter.decreaseHappiness();

    expect(lifemeter.happiness).toEqual(4);
  });

  it('should trigger isSad subject if happiness is < LIFEMETERMIN', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.happiness = LIFEMETERMIN - 1;
    lifemeter.isSad.subscribe((sad) => {
      expect(sad).toBeTruthy();
    });

    lifemeter.decreaseHappiness();

    expect(lifemeter.happiness).toEqual(LIFEMETERMIN - 1 - 1);
  });

  it('should trigger isDead subject if health is 1 and need to decrease', () => {
    expect.assertions(2);

    const lifemeter = new Lifemeter();
    lifemeter.happiness = 0;
    lifemeter.isDead.subscribe((dead) => {
      expect(dead).toBeTruthy();
    });

    lifemeter.decreaseHappiness();

    expect(lifemeter.happiness).toEqual(0);
  });
});

describe('Lifemeter: getWaste()', () => {
  it('should return current waste stat', () => {
    const lifemeter = new Lifemeter();
    lifemeter.waste = 4;

    expect(lifemeter.getWaste()).toEqual(4);
  });
});

describe('Lifemeter: increaseWaste()', () => {
  it('should increase waste by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.waste = 4;

    lifemeter.increaseWaste();

    expect(lifemeter.waste).toEqual(5);
  });

  it('should trigger isFilthy subject if waste is >= WASTEMAX', () => {
    expect.assertions(1);

    const lifemeter = new Lifemeter();
    lifemeter.waste = WASTEMAX;
    lifemeter.isFilthy.subscribe((filthy) => {
      expect(filthy).toBeTruthy();
    });

    lifemeter.increaseWaste();
  });

  it('should not increase waste by 1 if > LIFEMETERMAX', () => {
    const lifemeter = new Lifemeter();
    lifemeter.health = 10;
    lifemeter.waste = WASTEMAX;

    lifemeter.increaseWaste();

    expect(lifemeter.health).toEqual(9);
    expect(lifemeter.waste).toEqual(WASTEMAX);
  });
});

describe('Lifemeter: decreaseWaste()', () => {
  it('should decrease waste by 1', () => {
    const lifemeter = new Lifemeter();
    lifemeter.waste = 5;

    lifemeter.decreaseWaste();

    expect(lifemeter.waste).toEqual(4);
  });

  it('should not decrease waste by 1 if waste is already 0', () => {
    const lifemeter = new Lifemeter();
    lifemeter.waste = 0;

    lifemeter.decreaseWaste();

    expect(lifemeter.waste).toEqual(0);
  });
});
