import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  result: null,
}

export default function createNewAccount(state=initialState, action) {
  switch(action.type) {
    case types.CREATE_NEW_ACCOUNT_PROCESSING:
      return {
        ...state,
        status: 'processing',
        result: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_DONE:
      return {
        ...state,
        status: 'done',
        result: action.result,
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ERROR:
      return {
        ...state,
        status: 'error',
        result: null,
      }
      break;
    default:
      return state;
      break;
  }
}
