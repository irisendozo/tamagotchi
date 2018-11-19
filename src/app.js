const System = require('./system');

const initialize = async () => {
  const system = new System();
  const { human, pet, lifemeter } = await system.createHumanPetAndLifemeter();

  human.startPetCare(lifemeter);
  pet.startLife(lifemeter);
};

module.exports = {
  initialize,
};
