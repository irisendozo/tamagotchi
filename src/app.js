const System = require('./system');

const initialize = async () => {
  const system = new System();
  const { pet } = await system.createHumanAndPet();

  pet.startLife();
};

module.exports = {
  initialize,
};
