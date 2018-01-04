import * as types from '../constants/actionTypes.js';

export function increment() {
  return {
    type: types.COUNTER_INCREMENT
  }
}

export function decrement() {
  return {
    type: types.COUNTER_DECREMENT
  }
}
