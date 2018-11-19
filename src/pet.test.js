const { timer, Subject } = require('rxjs');

const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning, triggerNight, triggerHunger, triggerWaste, triggerPlay,
} = require('./utils/time');
const Lifemeter = require('./lifemeter');
const Pet = require('./pet');

jest.mock('./utils/console', () => ({
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

describe('Pet: setName()', () => {
  it('should set pet name', async () => {
    const pet = new Pet();

    pet.setName('Iris');

    expect(pet.name).toEqual('Iris');
  });
});

describe('Pet: triggerWakeUpCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerMorning.mockReturnValue(timer(100));
    Lifemeter.mockImplementation(() => ({
      getAge: jest.fn().mockReturnValue(1),
      getHunger: jest.fn().mockReturnValue(5),
      getHealth: jest.fn().mockReturnValue(5),
      getHappiness: jest.fn().mockReturnValue(5),
      increaseAge: jest.fn(),
      displayStatus: jest.fn(),
    }));
  });

  it('should display wake up message + status', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

    pet.triggerWakeUpCycles();
    jest.runOnlyPendingTimers();

    expect(displayMessage).toHaveBeenCalledTimes(1);
    expect(pet.lifemeter.displayStatus).toHaveBeenCalled();
  });

  it('should increase age', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();

    pet.triggerWakeUpCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.increaseAge).toHaveBeenCalledTimes(1);
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
      increaseWaste: jest.fn(),
      isFilthy: new Subject(),
    }));
  });

  it('should increase waste by 1 if awake', () => {
    const pet = new Pet();
    pet.lifemeter = new Lifemeter();
    pet.state = 'awake';

    pet.triggerWasteCycles();
    jest.runOnlyPendingTimers();

    expect(pet.lifemeter.increaseWaste).toHaveBeenCalledTimes(1);
  });
});

describe('Pet: triggerPlayCycles()', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    triggerPlay.mockReturnValue(timer(100));

    Lifemeter.mockImplementation(() => ({
      decreaseHappiness: jest.fn(),
      isSad: new Subject(),
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
