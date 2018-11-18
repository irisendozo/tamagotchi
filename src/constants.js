// Pet life cycle in milliseconds
// The pet ages every increase in life cycle
const LIFECYCLEMS = 1000;

const LIFEMETERMAX = 5;
const LIFEMETERMIN = 2;

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
  PETSTORE,
  ANIMALS,
  GENDERS,
};
