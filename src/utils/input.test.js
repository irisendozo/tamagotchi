const readline = require('readline');

const { startReadingInput, stopReadingInput } = require('./input');

jest.mock('readline', () => ({
  emitKeypressEvents: jest.fn(),
}));

let realProcess;

beforeEach(() => {
  realProcess = process;
  global.process = {
    ...realProcess,
    stdin: {
      on: jest.fn(),
      setRawMode: jest.fn(),
      resume: jest.fn(),
      removeListener: jest.fn(),
    },
  };
});

afterEach(() => {
  global.process = realProcess;
});

describe('input: startReadingInput()', () => {
  it('should call readline emitKeypressEvents', () => {
    startReadingInput();

    expect(readline.emitKeypressEvents).toHaveBeenCalled();
    global.process = realProcess;
  });
});

describe('input: stopReadingInput()', () => {
  it('should call stdin removelistener', () => {
    stopReadingInput();

    expect(global.process.stdin.removeListener).toHaveBeenCalled();
    global.process = realProcess;
  });
});
