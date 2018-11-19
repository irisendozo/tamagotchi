// Pet life cycle in milliseconds
// The pet ages every increase in life cycle
// Life cycle in MS set to 30 minutes
const LIFECYCLEMS = 1800000;

// Maximum threshold on all life meter stats
const LIFEMETERMAX = 5;
// Minimum threshold on all life meter stats
const LIFEMETERMIN = 2;
// Maximum threshold on waste, if waste === WASTEMAX, next waste cycle health decreases
const WASTEMAX = 10;
// Cycle age when pet will die
const OLDAGE = 12;

// Pet store name
const PETSTORE = 'The Zodiac';

// Available pets with specific sound
const ANIMALS = [{
  type: 'rat',
  sound: 'squeak',
}, {
  type: 'tiger',
  sound: 'roar',
}, {
  type: 'ox',
  sound: 'moo',
}, {
  type: 'rabbit',
  sound: 'squeak',
}, {
  type: 'snake',
  sound: 'hiss',
}, {
  type: 'goat',
  sound: 'baa',
}, {
  type: 'horse',
  sound: 'neigh',
}, {
  type: 'dragon',
  sound: 'growl',
}, {
  type: 'monkey',
  sound: 'scream',
}, {
  type: 'rooster',
  sound: 'crow',
}, {
  type: 'pig',
  sound: 'oink',
}, {
  type: 'dog',
  sound: 'arf',
}, {
  type: 'cat',
  sound: 'meow',
}];

// Available pet genders
const GENDERS = ['male', 'female'];

module.exports = {
  LIFECYCLEMS,
  LIFEMETERMAX,
  LIFEMETERMIN,
  WASTEMAX,
  OLDAGE,
  PETSTORE,
  ANIMALS,
  GENDERS,
};
