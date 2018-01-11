import * as types from '../constants/actionTypes.js';

// 初始状态
const initialState = {
  status: '',
  result: null,
  errors: null
}

export default function createNewAccount(state=initialState, action) {
  switch(action.type) {
    case types.CREATE_NEW_ACCOUNT_PROCESSING:
      return {
        ...state,
        status: 'processing',
        result: null,
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_DONE:
      let json_data = JSON.parse(action.data);
      //console.log(json_data);
      return {
        ...state,
        status: 'done',
        result: json_data['data']['mnemonic'] || '',
        errors: null
      }
      break;
    case types.CREATE_NEW_ACCOUNT_ERROR:
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
