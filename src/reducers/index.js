import {
  combineReducers
} from 'redux';
import counter from './counter.js';
import createNewAccount from './createNewAccount.js';
import createNewAccountActivation from './createNewAccountActivation.js';
import initApp from './initApp.js';
import inputTaskBox from './inputTaskBox.js';

const rootReducer = combineReducers({
  counter: counter,
  createNewAccount: createNewAccount,
  createNewAccountActivation: createNewAccountActivation, 
  initApp: initApp,
  inputTaskBox: inputTaskBox

});

export default rootReducer;
