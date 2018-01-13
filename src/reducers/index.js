import {
  combineReducers
} from 'redux';
import counter from './counter.js';
import createNewAccount from './createNewAccount.js';
import createNewAccountActive from './createNewAccountActive.js';
import initApp from './initApp.js';
import inputTaskBox from './inputTaskBox.js';

const rootReducer = combineReducers({
  counter: counter,
  createNewAccount: createNewAccount,
  createNewAccountActive: createNewAccountActive,
  initApp: initApp,
  inputTaskBox: inputTaskBox

});

export default rootReducer;
