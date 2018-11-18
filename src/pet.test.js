const { timer } = require('rxjs');

const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger, triggerWaste, triggerPlay,
} = require('./utils/time');
const Pet = require('./pet');

jest.mock('./utils/console', () => ({
  displayBigMessage: jest.fn(),
  displayMessage: jest.fn(),
  askQuestion: jest.fn(),
}));
jest.mock('./utils/time', () => ({
  triggerMorning: jest.fn(),
  triggerNight: jest.fn(),
  triggerHunger: jest.fn(),
  triggerWaste: jest.fn(),
  triggerPlay: jest.fn(),
}));

describe('Pet: initialize()', () => {
  it('should initialize pet stats and props', () => {
    const pet = new Pet();

    expect(pet.animal.type).toEqual(expect.any(String));
    expect(pet.animal.sound).toEqual(expect.any(String));
    expect(pet.gender).toEqual(expect.any(String));
    expect(pet.age).toEqual(1);
    expect(pet.state).toEqual('awake');
    expect(pet.lifeMeter).toMatchObject({
      hunger: 5,
      health: 5,
      happiness: 5,
    });
  });
});

describe('Pet: hatchingEgg()', () => {
  beforeEach(() => jest.useFakeTimers());

  it('should call settimeout with 2sec delay', async () => {
    const pet = new Pet();

    pet.hatchingEgg();
    jest.advanceTimersByTime(2000);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 2000);
  });
});


describe('Pet: askName()', () => {
  beforeEach(() => {
    askQuestion.mockReturnValue(new Promise(resolve => resolve({ name: 'mockPetName' })));
  });

  it('should return name from prompt + display messages', async () => {
    const pet = new Pet();

    const name = await pet.askName();

    expect(displayMessage).toHaveBeenCalledTimes(2);
    expect(name).toEqual('mockPetName');
  });
});

describe('Pet: displayStatus()', () => {
  it('should display current pet status', () => {
    const pet = new Pet();

    pet.displayStatus();

    expect(displayMessage).toHaveBeenCalledWith(`This is my status for today:

    Age: 1 cycle old
    Happiness: 5
    Hunger: 5
    Health: 5`);
  });
});

describe('Pet: triggerWakeUpHabit()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerMorning.mockReturnValue(timer(100));
  });

  it('should display wake up message + status', () => {
    const pet = new Pet();

    pet.triggerWakeUpHabit();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(2);
  });

  it('should increase age', () => {
    const pet = new Pet();

    pet.triggerWakeUpHabit();
    jest.runOnlyPendingTimers();

    expect(pet.age).toEqual(2);
  });

  it('should set state to awake', () => {
    const pet = new Pet();
    pet.state = 'sleeping';

    pet.triggerWakeUpHabit();
    jest.runOnlyPendingTimers();

    expect(pet.state).toEqual('awake');
  });
});

describe('Pet: setWakeUpState()', () => {
  it('should set wake up state', () => {
    const pet = new Pet();
    pet.state = 'sleeping';

    pet.setWakeUpState();

    expect(pet.state).toEqual('awake');
  });
});

describe('Pet: increaseAge()', () => {
  it('should increase age of pet by 1', () => {
    const pet = new Pet();

    pet.increaseAge();

    expect(pet.age).toEqual(2);
  });
});

describe('Pet: triggerSleepingHabit()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerNight.mockReturnValue(timer(100));
  });

  it('should display sleeping message', () => {
    const pet = new Pet();

    pet.triggerSleepingHabit();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('should set state to sleeping', () => {
    const pet = new Pet();
    pet.state = 'awake';

    pet.triggerSleepingHabit();
    jest.runOnlyPendingTimers();

    expect(pet.state).toEqual('sleeping');
  });
});

describe('Pet: setSleepingState()', () => {
  it('should set sleeping state', () => {
    const pet = new Pet();
    pet.state = 'awake';

    pet.setSleepingState();

    expect(pet.state).toEqual('sleeping');
  });
});

describe('Pet: triggerHungerCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerHunger.mockReturnValue(timer(100));
  });

  it('should decrease hunger meter by 2', () => {
    const pet = new Pet();

    pet.triggerHungerCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifeMeter.hunger).toEqual(3);
  });

  it('should not decrease hunger meter by 2 if asleep', () => {
    const pet = new Pet();
    pet.state = 'sleeping';

    pet.triggerHungerCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifeMeter.hunger).toEqual(5);
  });

  it('should display hunger message if hungry', () => {
    const pet = new Pet();
    pet.lifeMeter.hunger = 1;

    pet.triggerHungerCycles();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(1);
  });
});

describe('Pet: isAwake()', () => {
  it('should return true if state is awake', () => {
    const pet = new Pet();

    expect(pet.isAwake()).toBeTruthy();
  });

  it('should return false if state is sleeping', () => {
    const pet = new Pet();
    pet.state = 'sleeping';

    expect(pet.isAwake()).toBeFalsy();
  });
});

describe('Pet: isHungry()', () => {
  it('should return hungry if lifeMeter.hunger <= 2', () => {
    const pet = new Pet();
    pet.lifeMeter.hunger = 2;

    expect(pet.isHungry()).toBeTruthy();
  });

  it('should return not hungry if lifeMeter.hunger <= 2', () => {
    const pet = new Pet();
    pet.lifeMeter.hunger = 5;

    expect(pet.isHungry()).toBeFalsy();
  });
});

describe('Pet: decreaseHungerMeter()', () => {
  it('should decrease hunger meter by 2', () => {
    const pet = new Pet();

    pet.decreaseHungerMeter();

    expect(pet.lifeMeter.hunger).toEqual(3);
  });
});

describe('Pet: triggerWasteCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerWaste.mockReturnValue(timer(100));
  });

  it('should increase waste by 1 if waste is not full and awake', () => {
    const pet = new Pet();
    pet.state = 'awake';
    pet.waste = 0;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.waste).toEqual(1);
  });

  it('should not increase waste by 1 if waste is full', () => {
    const pet = new Pet();
    pet.state = 'awake';
    pet.waste = 10;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.waste).toEqual(10);
  });

  it('should decrease health if waste is full + display message', () => {
    const pet = new Pet();
    pet.state = 'awake';
    pet.waste = 10;
    pet.lifeMeter.health = 5;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifeMeter.health).toEqual(3);
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });
});

describe('Pet: isWasteFull()', () => {
  it('should return true if waste is full', () => {
    const pet = new Pet();
    pet.waste = 10;

    expect(pet.isWasteFull()).toBeTruthy();
  });

  it('should return false if waste is not full', () => {
    const pet = new Pet();
    pet.waste = 8;

    expect(pet.isWasteFull()).toBeFalsy();
  });
});

describe('Pet: decreaseHealth()', () => {
  it('should decrease health by 2', () => {
    const pet = new Pet();
    pet.lifeMeter.health = 5;

    pet.decreaseHealth();

    expect(pet.lifeMeter.health).toEqual(3);
  });
});

describe('Pet: increaseWaste()', () => {
  it('should increase waste by 1', () => {
    const pet = new Pet();

    pet.increaseWaste();

    expect(pet.waste).toEqual(1);
  });
});

describe('Pet: triggerPlayCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerPlay.mockReturnValue(timer(100));
  });

  it('should decrease happiness by 2 if awake + display message', () => {
    const pet = new Pet();
    pet.state = 'awake';
    pet.lifeMeter.happiness = 5;

    pet.triggerPlayCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifeMeter.happiness).toEqual(3);
  });

  it('should not decrease happiness by if asleep', () => {
    const pet = new Pet();
    pet.state = 'sleeping';
    pet.lifeMeter.happiness = 5;

    pet.triggerPlayCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifeMeter.happiness).toEqual(5);
  });
});

describe('Pet: decreaseHappiness()', () => {
  it('should decrease happiness by 2', () => {
    const pet = new Pet();
    pet.lifeMeter.happiness = 5;

    pet.decreaseHappiness();

    expect(pet.lifeMeter.happiness).toEqual(3);
  });
});
