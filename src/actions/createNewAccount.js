import * as types from '../constants/actionTypes.js';

let result = {
  name: 'Frank',
  age: 42
}

export function exec() {
  return dispatch => {
    dispatch(isCreateNewAccount()); // processing
    // 模拟用户登录
    let retval = fetch('https://www.baidu.com/').then((res) => {
      dispatch(execSuccess(result)); // done
    }).catch(e => {
      dispatch(execError()); // error
    });
  }
}

function isCreateNewAccount() {
  return {
    type: types.CREATE_NEW_ACCOUNT_PROCESSING
  }
}

function execSuccess(data) {
  return {
    type: types.CREATE_NEW_ACCOUNT_DONE,
    result: data
  }
}

function execError() {
  return {
    type: types.CREATE_NEW_ACCOUNT_ERROR
  }
}
