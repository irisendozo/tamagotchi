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
 * Returns an Observable.interval that emits initially at LIFECYCLEMS / 5
 * and subsequent emissions every LIFECYCLEMS milliseconds
 *
 * @returns {Observable.interval} Observable.interval that emits periodically
 */
const triggerHunger = () => interval(LIFECYCLEMS / 5);

/**
 * Returns an Observable.interval that emits initially at LIFECYCLEMS / 10
 * and subsequent emissions every LIFECYCLEMS milliseconds
 *
 * @returns {Observable.interval} Observable.interval that emits periodically
 */
const triggerWaste = () => interval(LIFECYCLEMS / 10);

/**
 * Returns an Observable.interval that emits initially at LIFECYCLEMS / 2
 * and subsequent emissions every LIFECYCLEMS milliseconds
 *
 * @returns {Observable.interval} Observable.interval that emits periodically
 */
const triggerPlay = () => interval(LIFECYCLEMS / 2);

module.exports = {
  triggerMorning,
  triggerNight,
  triggerHunger,
  triggerWaste,
  triggerPlay,
};
