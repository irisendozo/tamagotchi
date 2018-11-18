const { timer } = require('rxjs');

const {
  askQuestion, displayMessage,
} = require('./utils/console');
const {
  triggerMorning,
} = require('./utils/time');
const Pet = require('./pet');

jest.mock('./utils/console', () => ({
  displayBigMessage: jest.fn(),
  displayMessage: jest.fn(),
  askQuestion: jest.fn(),
}));
jest.mock('./utils/time', () => ({
  triggerMorning: jest.fn(),
}));

describe('Pet: initialize()', () => {
  it('should initialize pet stats and props', () => {
    const pet = new Pet();

    expect(pet.animal.type).toEqual(expect.any(String));
    expect(pet.animal.sound).toEqual(expect.any(String));
    expect(pet.gender).toEqual(expect.any(String));
    expect(pet.age).toEqual(1);
    expect(pet.lifeMeter).toMatchObject({
      hunger: 100,
      health: 100,
      happiness: 100,
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
    Happiness: 100
    Hunger: 100
    Health: 100`);
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
});

describe('Pet: increaseAge()', () => {
  it('should increase age of pet by 1', () => {
    const pet = new Pet();

    pet.increaseAge();

    expect(pet.age).toEqual(2);
  });
});
