const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

const { displayBigMessage, displayMessage, askQuestion } = require('./console');

jest.mock('chalk', () => ({
  green: jest.fn(),
}));

jest.mock('figlet', () => ({
  textSync: jest.fn(),
}));

jest.mock('inquirer', () => ({
  prompt: jest.fn(() => new Promise(resolve => resolve())),
}));

describe('console: displayBigMessage()', () => {
  it('should call figlet + console when displaying big message', () => {
    displayBigMessage('mockMessage');

    expect(chalk.green).toHaveBeenCalled();
    expect(figlet.textSync).toHaveBeenCalledWith('mockMessage', {
      font: 'Standard',
    });
  });
});

describe('console: displayMessage()', () => {
  it('should call console when displaying default message', () => {
    displayMessage('mockMessage');

    expect(chalk.green).toHaveBeenCalledWith(`mockMessage
    `);
  });
});

describe('console: askQuestion()', () => {
  it('should call inquirer with message return object with field answer name', async () => {
    await askQuestion('mockMessage', 'answer');

    expect(inquirer.prompt).toHaveBeenCalledWith([{
      message: 'mockMessage', name: 'answer', type: 'input', validate: expect.any(Function),
    }]);
  });
});
