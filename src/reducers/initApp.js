import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  data: null,
  data: null
}

export default function initApp(state=initialState, action) {
  switch(action.type) {
    case types.INIT_APP_PROCESSING:
      return {
        ...state,
        status: 'processing',
        data: null,
        data: null
      }
      break;
    case types.INIT_APP_DONE:
      return {
        ...state,
        status: 'done',
        data: action.data || '',
        data: null
      }
      break;
    case types.INIT_APP_ERROR:
      return {
        ...state,
        status: 'error',
        data: null,
        data: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
