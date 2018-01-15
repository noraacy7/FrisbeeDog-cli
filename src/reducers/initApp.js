import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  exchanges: null,
  history: [],
  notifications: [],
  error: null
}

export default function initApp(state=initialState, action) {
  switch(action.type) {
    case types.INIT_APP_PROCESSING:
      return {
        ...state,
        status: 'processing',
        exchanges: null,
        history: [],
        notifications: [],
        error: null
      }
      break;
    case types.INIT_APP_DONE:
      return {
        ...state,
        status: 'done',
        exchanges: action.data['data']['exchanges'],
        history: action.data['data']['history'],
        notifications: action.data['data']['notifications'],
        error: null
      }
      break;
    case types.INIT_APP_ERROR:
      return {
        ...state,
        status: 'error',
        exchanges: null,
        history: [],
        notifications: [],
        error: action.err_message
      }
      break;
    default:
      return state;
      break;
  }
}
