const { timer, interval } = require('rxjs');

const { LIFECYCLEMS } = require('../constants');

/**
 * Returns an Observable.interval that emits every
 * LIFECYCLEMS milliseconds
 *
 * @returns {Observable.interval} Observable.timer that emits periodically
 */
const triggerMorning = () => interval(LIFECYCLEMS);

/**
 * Returns an Observable.timer that emits initially at 2.3 * LIFECYCLEMS
 * and subsequent emissions every LIFECYCLEMS milliseconds
 *
 * @returns {Observable.timer} Observable.timer that emits periodically
 */
const triggerNight = () => timer((2 * LIFECYCLEMS) / 3, LIFECYCLEMS);

/**
 * Returns an Observable.timer that emits initially at LIFECYCLEMS / 5
 * and subsequent emissions every LIFECYCLEMS milliseconds
 *
 * @returns {Observable.interval} Observable.interval that emits periodically
 */
const triggerHunger = () => interval(LIFECYCLEMS / 5);

module.exports = {
  triggerMorning,
  triggerNight,
  triggerHunger,
};
