const { timer, Subject } = require('rxjs');

const { WASTEMAX } = require('./constants');
const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger, triggerWaste, triggerPlay,
} = require('./utils/time');
const Lifemeter = require('./lifemeter');
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
jest.mock('./lifemeter');

beforeEach(() => {
  Lifemeter.mockClear();
});

describe('Pet: initialize()', () => {
  it('should initialize pet stats and props', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

    expect(pet.animal.type).toEqual(expect.any(String));
    expect(pet.animal.sound).toEqual(expect.any(String));
    expect(pet.gender).toEqual(expect.any(String));
    expect(pet.age).toEqual(1);
    expect(pet.state).toEqual('awake');
  });
});

describe('Pet: hatchingEgg()', () => {
  beforeEach(() => jest.useFakeTimers());

  it('should call settimeout with 2sec delay', async () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

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
    pet.lifemeter = new Lifemeter();

    const name = await pet.askName();

    expect(displayMessage).toHaveBeenCalledTimes(2);
    expect(name).toEqual('mockPetName');
  });
});

describe('Pet: displayStatus()', () => {
  beforeEach(() => {
    Lifemeter.mockImplementation(() => ({
      getHunger: jest.fn().mockReturnValue(5),
      getHealth: jest.fn().mockReturnValue(5),
      getHappiness: jest.fn().mockReturnValue(5),
    }));
  });

  it('should display current pet status', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.age = 1;

    pet.displayStatus();

    expect(displayMessage).toHaveBeenCalledWith(`This is my status for today:

    Age: 1 cycle old
    Happiness: 5
    Hunger: 5
    Health: 5`);
  });
});

describe('Pet: triggerWakeUpCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerMorning.mockReturnValue(timer(100));
  });

  it('should display wake up message + status', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

    pet.triggerWakeUpCycles();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(2);
  });

  it('should increase age', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.age = 1;

    pet.triggerWakeUpCycles();
    jest.runOnlyPendingTimers();

    expect(pet.age).toEqual(2);
  });

  it('should set state to awake', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'sleeping';

    pet.triggerWakeUpCycles();
    jest.runOnlyPendingTimers();

    expect(pet.state).toEqual('awake');
  });
});

describe('Pet: setWakeUpState()', () => {
  it('should set wake up state', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'sleeping';

    pet.setWakeUpState();

    expect(pet.state).toEqual('awake');
  });
});

describe('Pet: increaseAge()', () => {
  it('should increase age of pet by 1', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.age = 1;

    pet.increaseAge();

    expect(pet.age).toEqual(2);
  });
});

describe('Pet: triggerSleepingCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerNight.mockReturnValue(timer(100));
  });

  it('should display sleeping message', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

    pet.triggerSleepingCycles();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('should set state to sleeping', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.triggerSleepingCycles();
    jest.runOnlyPendingTimers();

    expect(pet.state).toEqual('sleeping');
  });
});

describe('Pet: setSleepingState()', () => {
  it('should set sleeping state', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.setSleepingState();

    expect(pet.state).toEqual('sleeping');
  });
});

describe('Pet: triggerHungerCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerHunger.mockReturnValue(timer(100));

    Lifemeter.mockImplementation(() => ({
      decreaseHunger: jest.fn(),
      isHungry: new Subject(),
    }));
  });

  it('should decrease hunger meter by 1', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.triggerHungerCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.decreaseHunger).toHaveBeenCalledTimes(1);
  });

  it('should display message if hungry', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.triggerHungerCycles();
    pet.lifemeter.isHungry.next(true);

    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('should not decrease hunger meter by 1 if asleep', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'sleeping';

    pet.triggerHungerCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.decreaseHunger).not.toHaveBeenCalled();
  });
});

describe('Pet: isAwake()', () => {
  it('should return true if state is awake', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    expect(pet.isAwake()).toBeTruthy();
  });

  it('should return false if state is sleeping', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'sleeping';

    expect(pet.isAwake()).toBeFalsy();
  });
});

describe('Pet: triggerWasteCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerWaste.mockReturnValue(timer(100));

    Lifemeter.mockImplementation(() => ({
      decreaseHealth: jest.fn(),
    }));
  });

  it('should increase waste by 1 if waste is not full and awake', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';
    pet.waste = 0;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.waste).toEqual(1);
  });

  it('should not increase waste by 1 if waste is full', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';
    pet.waste = WASTEMAX;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.waste).toEqual(WASTEMAX);
  });

  it('should decrease health if waste is full + display message', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';
    pet.waste = WASTEMAX;

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.decreaseHealth).toHaveBeenCalledTimes(1);
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });
});

describe('Pet: isWasteFull()', () => {
  it('should return true if waste is full', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.waste = WASTEMAX;

    expect(pet.isWasteFull()).toBeTruthy();
  });

  it('should return false if waste is not full', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.waste = WASTEMAX - 1;

    expect(pet.isWasteFull()).toBeFalsy();
  });
});

describe('Pet: increaseWaste()', () => {
  it('should increase waste by 1', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.waste = 0;

    pet.increaseWaste();

    expect(pet.waste).toEqual(1);
  });
});

describe('Pet: triggerPlayCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerPlay.mockReturnValue(timer(100));

    Lifemeter.mockImplementation(() => ({
      decreaseHappiness: jest.fn(),
    }));
  });

  it('should decrease happiness by 1 if awake + display message', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.triggerPlayCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.decreaseHappiness).toHaveBeenCalledTimes(1);
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });

  it('should not decrease happiness by if asleep', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'sleeping';

    pet.triggerPlayCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.decreaseHappiness).not.toHaveBeenCalled();
  });
});
