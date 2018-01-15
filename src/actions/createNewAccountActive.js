import * as types from '../constants/actionTypes.js';
import * as config from '../config/config.js';
import * as validators from '../helpers/validatorHelper.js';

export function exec(mnemonic, wid, deviceno) {
  return dispatch => {
    dispatch(execProcessing()); // processing
    var message = JSON.stringify({
      "wid": wid,
      "deviceno": deviceno,
      "memo": "",
      "active": "1"
    });
    var signature = validators.sign(message, mnemonic);
    // parameters
    const params = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: `data=${message}&signature=${signature}`
    }
    // update user
    let retval = fetch(`${config.BASE_URL}/v1.0/update_user`, params).then((res) => {
      dispatch(execDone(res)); // done
    }).catch(e => {
      dispatch(execError(e.toString())); // error
    });
  }
}

function execProcessing() {
  return {
    type: types.CREATE_NEW_ACCOUNT_ACTIVE_PROCESSING
  }
}

function execDone(data) {
  console.log(data);
  let dataJson = JSON.parse(data._bodyText);
  // check validation
  let message = dataJson['data'];
  let signature = dataJson['signature'];
  let ret = validators.verify(message, config.SERVER_ADDRESS, signature);
  if (ret == 'OK') {
    let d = JSON.parse(message);
    if (d['code'] == 200) {
      return {
        type: types.CREATE_NEW_ACCOUNT_ACTIVE_DONE,
        data: message
      }
    } else {
      return {
        type: types.CREATE_NEW_ACCOUNT_ACTIVE_ERROR,
        err_message: d['message']
      }
    }
  } else {
    return {
      type: types.CREATE_NEW_ACCOUNT_ACTIVE_ERROR,
      err_message: ret
    }
  }
}

function execError(error) {
  return {
    type: types.CREATE_NEW_ACCOUNT_ACTIVE_ERROR,
    err_message: error
  }
}
