const { PETSTORE } = require('./constants');
const {
  askQuestion, displayBigMessage, displayMessage,
} = require('./utils/console');
const Human = require('./human');
const Pet = require('./pet');
const System = require('./system');

jest.mock('./human');
jest.mock('./pet');
jest.mock('./utils/console', () => ({
  displayBigMessage: jest.fn(),
  displayMessage: jest.fn(),
  askQuestion: jest.fn(),
}));

beforeEach(() => {
  Human.mockClear();
  Pet.mockClear();
});

describe('System: initialize()', () => {
  it('should initialize pet store name', () => {
    const system = new System();
    expect(system.petStoreName).toEqual(PETSTORE);
  });
});

describe('System: createHumanPetAndLifemeter()', () => {
  beforeEach(() => {
    Pet.mockImplementation(() => ({
      name: 'mockName',
      animal: {
        type: 'someanimal',
      },
      gender: 'female',
      hatchingEgg: jest.fn(() => new Promise(resolve => resolve())),
    }));
    askQuestion.mockReturnValue(new Promise(resolve => resolve({ playerName: 'mockName' })));
  });

  it('should display output', async () => {
    const system = new System();

    await system.createHumanPetAndLifemeter();

    expect(displayBigMessage).toHaveBeenCalledTimes(1);
    expect(displayMessage).toHaveBeenCalledTimes(2);
    expect(askQuestion).toHaveBeenCalledTimes(1);
  });

  it('should call hatching egg', async () => {
    const system = new System();

    const { pet } = await system.createHumanPetAndLifemeter();

    expect(pet.hatchingEgg).toHaveBeenCalled();
  });

  it('should return an instantiated pet and human and lifemeter instance', async () => {
    const system = new System();

    const { human, pet, lifemeter } = await system.createHumanPetAndLifemeter();

    expect(human).toHaveProperty('startPetCare');
    expect(pet).toHaveProperty('hatchingEgg');
    expect(lifemeter).toHaveProperty('happiness');
  });
});
