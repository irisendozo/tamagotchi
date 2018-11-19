# Tamagotchi [![build status](https://gitlab.com/nesiri/trafficlights/badges/master/build.svg)](https://gitlab.com/nesiri/trafficlights/commits/master) [![coverage report](https://gitlab.com/nesiri/trafficlights/badges/master/coverage.svg)](https://gitlab.com/nesiri/trafficlights/commits/master)

This is an interactive command-line tamagotchi app based on https://en.wikipedia.org/wiki/Tamagotchi. The animals available as pets are based on the Chinese Zodiac.

This project is a NodeJS application.

## Project Specifications

The tamagotchi must have at least the following requirements:

* Capable of being fed
* Capable of being put to bed
* Capable of going to sleep on its own, losing health from hunger and pooping on its own without prompting
* Capable of aging from birth through to death

# Table of Contents

- [Prerequisites](#prerequisites)
- [Starting the application](#starting-the-application)
- [Running unit tests](#running-unit-tests)
- [Implementation](#implementation)
- [Intersection State Machine](#intersection-state-machine)
- [Technology Stack](#technology-stack)
- [Results](#results)

# Prerequisites

This project **strongly requires node >=v10.13.0 and npm >=6.4.1**. More info on Node and NPM installation [here](https://docs.npmjs.com/getting-started/installing-node).

# Starting the application + Gameplay

Once you have installed the necessary prerequisites, run `npm run start` to initialize the command-line application.

## Pet Lifecycle
When the game starts, the pet starts it's lifecycle. It has four life status meters:
 - health (decreases by 1 when waste > `WASTEMAX` threshold, increases by cure)
 - happiness (decreases by 1 every time pet notifies to play, increases by play)
 - hunger (decreases by 1 every time pet notifies of hunger, increases by feed)
 - waste (increases by 1 every time pet notifies of poop)
 - age (increases every time pet wakes up -- new cycle)
The pet can also sleep and wake up. When the pet sleeps, all pet cycles (hunger, play, waste) are PAUSED. Therefore any life meter will not decrease. When the pet reaches `OLDAGE`, it will die. When any of the life meter reaches 0 (except waste), the pet will die.

## Gameplay
1. Once you have started the application, you will be prompted to enter your name.
2. The egg will then hatch and reveal a random pet from the Chinese Zodiac.
3. You will be prompted to enter a name for your pet.
4. Once done, the pet life cycle will begin, you can enter an action at any time by pressing `SPACE`. You have the available options:
    ```
    ? Hi asd! What would you like to do? (Use arrow keys)
    ❯ Feed (increases hunger)
      Play (increases happiness)
      Cure (increases health)
      Clean waste (decreases waste)
    ```

# Running unit tests

The unit tests are implemented using [Jest](https://jestjs.io/). You can run the unit tests by running `npm run test`. This will also generate a coverage report. If you want to run the tests while making changes, you can run `npm run test:watch`.

# Implementation

## Technology Stack

As stated above, this is a Node application using the ff technologies:
 - Node v10.13
 - ES6
 - RxJS
 - Jest
 - ESLint (using airbnb format rules)

The relevant code is mostly inside `src/*`.

`app.js`

The app's main entrypoint. This initializes the system and starts the lifecycle of the pet.

`constants.js`

This contains the relevant constants for the app including i.e. the thresholds for the life meters, the length of one life cycle in milliseconds and the animals available as pets.

`system.js`

This contains the class for system-wide interactions. This has the initial display and initial interaction with the player. This had the initialization of the pet, human and lifemeter classes. It also contains the subscription to death of the pet that exits the app.

`lifemeter.js`

This contains the class for keeping the lifemeter state. The methods for increasing/decreasing/fetching each meter can be found here. It also exposes `Subjects`: `isDead`, `isHungry`, `isSick`, `isFilthy`, `isSad` that clients can subscribe to.

`human.js`

This contains the class for triggering user actions via the command prompt. This initiates reading command line input from the user at any time and when a proper input is detected (in this case, the `SPACE` button), it prompts the user for a question.

Every action chosen corresponds to a change in a life meter.

`pet.js`

This contains the class for maintaining the life cycle of the pet. The pet has 5 cycles: waking up, sleeping, hungry, dropping wastes and playing. Each of these cycles are instantiated inside `startLife` method. Every cycle is triggered periodically and changes a life meter if the pet is awake.

This also contains method for setting the name of the pet.

`utils/console.js`

These methods are mainly responsible for the formatting displays on the console output.

`utils/time.js`

These methods are responsible for exposing timers/intervals triggered periodically according to the `LIFECYCLE` constant which can be subscribed to.

`utils/input.js`

These methods are responsible for getting user input for actions.

## Limitations + Improvement Actions
* The pet lifecycle is strictly implemented using [timers](https://rxjs-dev.firebaseapp.com/api/index/function/timer) and [intervals](https://rxjs-dev.firebaseapp.com/api/index/function/interval). One limitation of this tamagotchi is that every pet cycle (hunger, playtime, waking up, dropping waste) is set to be periodic.
* No discipline meter
* Wake up time + sleep time is dependent on app start (ideally want this to be based on machine local time)
* Every restart of the game is a new pet -- there is no database storage implemented for this app
* Greetings are static (ideally want this to be random and varying)
* Addition of an interactive user mini game i.e. rock paper scissors
