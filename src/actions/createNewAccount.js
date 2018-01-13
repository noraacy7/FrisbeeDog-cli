import * as types from '../constants/actionTypes.js';
import * as config from '../config/config.js';
import * as validators from '../helpers/validatorHelper.js';

export function exec() {
  return dispatch => {
    dispatch(execProcessing()); // processing
    // create mnemonic
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
  let ret = validators.verify(message, config.SERVER_ADDRESS, signature);
  if (ret == 'OK') {
    let d = JSON.parse(message);
    if (d['code'] == 200) {
      return {
        type: types.CREATE_NEW_ACCOUNT_DONE,
        data: d
      }
    } else {
      return {
        type: types.CREATE_NEW_ACCOUNT_ERROR,
        err_message: d['message']
      }
    }
  } else {
    return {
      type: types.CREATE_NEW_ACCOUNT_ERROR,
      err_message: ret
    }
  }
}

function execError(error) {
  return {
    type: types.CREATE_NEW_ACCOUNT_ERROR,
    err_message: error
  }
}
