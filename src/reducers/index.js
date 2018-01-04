import {
  combineReducers
} from 'redux';
import createNewAccount from './createNewAccount.js';
import counter from './counter.js';

const rootReducer = combineReducers({
  createNewAccount: createNewAccount,
  counter: counter
});

export default rootReducer;
