#!/usr/bin/env node

const { initialize } = require('./src/app');

try {
  initialize();
} catch (error) {
  console.error(error);
}
