'use stricts';

import '../../shim.js';
import bitcoinjs from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';
import bip39 from 'bip39';

let validators = {};

validators.checkSignature = function(message, address, signature) {
  var buffer = Buffer.from(signature, 'hex');
  var result = bitcoinMessage.verify(message, address, buffer);
  if (result.toString() == 'true') {
    return 'OK';
  } else {
    return Error('ERR_INVALID_SIGNATURE');
  }
}

module.exports = validators;
