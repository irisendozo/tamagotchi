const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

/**
 * displayBigMessage sets console output to `message` formatted
 * using chalk and figlet -- used for welcome + high impact messages
 *
 * @param {string} message string to display
 */
const displayBigMessage = (message) => {
  console.log(
    chalk.green(
      figlet.textSync(message, {
        font: 'Standard',
      }),
    ),
  );
};

/**
 * displayMessage sets console output to `message` formatted
 * using chalk -- used for normal messages
 *
 * @param {string} message string to display
 */
const displayMessage = (message) => {
  console.log(
    chalk.green(`${message}
    `),
  );
};

/**
 * askQuestion sets console output to get ONE command line prompt from user
 * and returns the answer as an object with field `answerName`
 *
 * @param {string} message question to display
 * @param {string} answerName field where answer is stored
 * @returns {Object} Object with answerName field
 */
const askQuestion = async (message, answerName) => inquirer.prompt([{
  message,
  name: answerName,
  type: 'input',
  validate: input => input && input.length > 0,
}]);

module.exports = {
  displayBigMessage,
  displayMessage,
  askQuestion,
};
