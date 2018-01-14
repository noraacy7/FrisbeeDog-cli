import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  data: null,
  error: null
}

export default function createNewAccountActive(state=initialState, action) {
  switch(action.type) {
    case types.CREATE_NEW_ACCOUNT_ACTIVE_PROCESSING:
      return {
        ...state,
        status: 'processing',
        data: null,
        error: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ACTIVE_DONE:
      return {
        ...state,
        status: 'done',
        data: action.data || '',
        error: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ACTIVE_ERROR:
      return {
        ...state,
        status: 'error',
        data: null,
        error: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
