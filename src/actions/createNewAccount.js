import * as types from '../constants/actionTypes.js';
import * as uri from '../config/config.js';

export function exec() {
  return dispatch => {
    dispatch(isCreateNewAccount()); // processing
    // 模拟用户登录
    let retval = fetch(`${uri.BASE_URL}/v1.0/create_mnemonic`).then((res) => {
      dispatch(execSuccess(res)); // done
    }).catch(e => {
      dispatch(execError(e)); // error
    });
  }
}

function isCreateNewAccount() {
  return {
    type: types.CREATE_NEW_ACCOUNT_PROCESSING
  }
}

function execSuccess(data) {
  var dataJson = JSON.parse(data._bodyText);
  console.log(dataJson['data']);
  var result = JSON.parse(dataJson['data']);
  // check validation

  return {
    type: types.CREATE_NEW_ACCOUNT_DONE,
    result: result
  }
}

function execError(error) {
  return {
    type: types.CREATE_NEW_ACCOUNT_ERROR,
    errors: error
  }
}
