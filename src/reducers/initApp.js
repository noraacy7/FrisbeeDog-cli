import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  result: null,
  errors: null
}

export default function initApp(state=initialState, action) {
  switch(action.type) {
    case types.INIT_APP_PROCESSING:
      return {
        ...state,
        status: 'processing',
        result: null,
        errors: null
      }
      break;
    case types.INIT_APP_DONE:
      return {
        ...state,
        status: 'done',
        result: action.data || '',
        errors: null
      }
      break;
    case types.INIT_APP_ERROR:
      return {
        ...state,
        status: 'error',
        result: null,
        errors: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
