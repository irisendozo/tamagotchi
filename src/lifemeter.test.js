const { LIFEMETERMAX, LIFEMETERMIN } = require('./constants');
const Lifemeter = require('./lifemeter');

describe('Lifemeter: initialize()', () => {
  it('should initialize lifemeter stats', () => {
    const lifemeter = new Lifemeter();

    expect(lifemeter.hunger).toEqual(LIFEMETERMAX);
    expect(lifemeter.health).toEqual(LIFEMETERMAX);
    expect(lifemeter.happiness).toEqual(LIFEMETERMAX);
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
