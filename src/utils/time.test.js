const { LIFECYCLEMS } = require('../constants');
const {
  triggerMorning, triggerNight, triggerHunger, triggerWaste,
} = require('./time');

beforeEach(() => jest.useFakeTimers());

describe('time: triggerMorning()', () => {
  it('should not trigger morning if lifecycle in ms is not completed', async () => {
    let triggered = false;
    triggerMorning().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 2);

    expect(triggered).toBeFalsy();
  });

  it('should trigger morning if lifecycle in ms is completed', async (done) => {
    let triggered = false;
    triggerMorning().subscribe(() => {
      triggered = true;
      done();
    });

    jest.advanceTimersByTime(LIFECYCLEMS);

    expect(triggered).toBeTruthy();
  });
});

describe('time: triggerNight()', () => {
  it('should not trigger night if lifecycle in ms is not completed', async () => {
    let triggered = false;
    triggerNight().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 2);

    expect(triggered).toBeFalsy();
  });

  it('should first trigger night on 2 * LIFECYCLEMS / 3', async (done) => {
    let triggered = false;
    triggerNight().subscribe(() => {
      triggered = true;
      done();
    });

    jest.advanceTimersByTime((2 * LIFECYCLEMS) / 3);

    expect(triggered).toBeTruthy();
  });

  it('should trigger subsequent nights on LIFECYCLEMS', async () => {
    let triggered = 0;
    triggerNight().subscribe(() => {
      triggered += 1;
    });

    jest.advanceTimersByTime(((2 * LIFECYCLEMS) / 3) + LIFECYCLEMS);

    expect(triggered).toEqual(2);
  });
});

describe('time: triggerHunger())', () => {
  it('should not trigger hunger if lifecycle in ms is not completed', async () => {
    let triggered = false;
    triggerHunger().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 7);

    expect(triggered).toBeFalsy();
  });

  it('should trigger hunger on LIFECYCLEMS / 5', async () => {
    let triggered = false;
    triggerHunger().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 5);

    expect(triggered).toBeTruthy();
  });
});

describe('time: triggerWaste())', () => {
  it('should not trigger waste if lifecycle in ms is not completed', async () => {
    let triggered = false;
    triggerWaste().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 12);

    expect(triggered).toBeFalsy();
  });

  it('should trigger hunger on LIFECYCLEMS / 10', async () => {
    let triggered = false;
    triggerWaste().subscribe(() => {
      triggered = true;
    });

    jest.advanceTimersByTime(LIFECYCLEMS / 10);

    expect(triggered).toBeTruthy();
  });
});
