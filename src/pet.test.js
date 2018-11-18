const { timer } = require('rxjs');

const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger,
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
  it('should return hungry if lifeMeter.hunger <= 2', () => {
    const pet = new Pet();

    expect(pet.isAwake()).toBeTruthy();
  });
});

describe('Pet: isHungry()', () => {
  it('should return hungry if lifeMeter.hunger <= 2', () => {
    const pet = new Pet();
    pet.lifeMeter.hunger = 2;

    expect(pet.isHungry).toBeTruthy();
  });
});

describe('Pet: decreaseHungerMeter()', () => {
  it('should decrease hunger meter by 2', () => {
    const pet = new Pet();

    pet.decreaseHungerMeter();

    expect(pet.lifeMeter.hunger).toEqual(3);
  });
});
