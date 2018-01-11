import * as types from '../constants/actionTypes.js';
import * as config from '../config/config.js';
import * as validators from '../helpers/validatorHelper.js';

export function exec() {
  return dispatch => {
    dispatch(execProcessing()); // processing
    // 模拟用户登录
    let retval = fetch(`${config.BASE_URL}/v1.0/create_mnemonic`).then((res) => {
      dispatch(execDone(res)); // done
    }).catch(e => {
      dispatch(execError(e)); // error
    });
  }
}

function execProcessing() {
  return {
    type: types.CREATE_NEW_ACCOUNT_PROCESSING
  }
}

function execDone(data) {
  let dataJson = JSON.parse(data._bodyText);
  // check validation
  let message = dataJson['data'];
  let signature = dataJson['signature'];
  if (validators.checkSignature(message, config.SERVER_ADDRESS, signature) === 'OK') {
    return {
      type: types.CREATE_NEW_ACCOUNT_DONE,
      data: message
    }
  } else {
    dispatch(execError(e)); // error
  }
}

function execError(error) {
  console.log(error);
  return {
    type: types.CREATE_NEW_ACCOUNT_ERROR,
    err_message: error
  }
}
