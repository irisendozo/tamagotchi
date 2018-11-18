const Human = require('./human');

describe('Human: initialize()', () => {
  it('should initialize human name', () => {
    const human = new Human('mockName');

    expect(human.name).toEqual('mockName');
  });
});
