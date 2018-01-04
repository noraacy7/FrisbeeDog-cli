import * as types from '../constants/actionTypes.js';

const initialState = {
  count: 0
}

export default function counter(state=initialState, action) {
  switch(action.type) {
    case types.COUNTER_INCREMENT:
      console.log('COUNTER_INCREMENT');
      return {
        ...state,
        count: state.count + 1,
      }
      break;
    case types.COUNTER_DECREMENT:
      console.log('COUNTER_DECREMENT');
      return {
        ...state,
        count: state.count - 1,
      }
      break;
    default:
      return state;
      break;
  }
}
