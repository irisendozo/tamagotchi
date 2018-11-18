const System = require('./system');

const initialize = async () => {
  const system = new System();
  const { pet, lifemeter } = await system.createHumanPetAndLifemeter();

  pet.startLife(lifemeter);
};

module.exports = {
  initialize,
};
