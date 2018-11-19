const { Subject } = require('rxjs');

const { startReadingInput, userInputDetected } = require('./utils/input');
const {
  askMultipleChoice, displayMessage,
} = require('./utils/console');
const Lifemeter = require('./lifemeter');
const Human = require('./human');

jest.mock('./utils/console', () => ({
  askMultipleChoice: jest.fn(),
  displayMessage: jest.fn(),
}));
jest.mock('./utils/input', () => ({
  startReadingInput: jest.fn(),
  userInputDetected: jest.fn(),
}));
jest.mock('./lifemeter');

beforeEach(() => {
  Lifemeter.mockClear();
});

describe('Human: initialize()', () => {
  it('should initialize human name', () => {
    const human = new Human('mockName');

    expect(human.name).toEqual('mockName');
  });
});

describe('Human: startPetCare()', () => {
  beforeEach(() => {
    userInputDetected.mockReturnValue(new Subject());
  });
  it('should call readInput', () => {
    const human = new Human('mockName');

    human.startPetCare(new Lifemeter());

    expect(startReadingInput).toHaveBeenCalled();
  });
});

describe('Human: triggerUserAction()', () => {
  const subject = new Subject();

  beforeEach(() => {
    userInputDetected.mockReturnValue(subject);
    askMultipleChoice.mockReturnValue(new Promise(resolve => resolve({ action: 'Feed' })));
    Lifemeter.mockImplementation(() => ({
      increaseHunger: jest.fn(),
      increaseHappiness: jest.fn(),
      increaseHealth: jest.fn(),
      decreaseWaste: jest.fn(),
    }));
  });

  it('should call appropriate action according to user input', async () => {
    const human = new Human('mockName');
    human.lifemeter = new Lifemeter();

    await human.triggerUserAction();

    expect(human.lifemeter.increaseHunger).toHaveBeenCalled();
    expect(displayMessage).toHaveBeenCalledTimes(1);
  });
});
