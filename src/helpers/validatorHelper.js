'use stricts';

import '../../shim.js';
import bitcoinjs from 'bitcoinjs-lib';
import bitcoinMessage from 'bitcoinjs-message';
import bip39 from 'bip39';

let validators = {};

validators.sign = function(message, mnemonic) {
  let seed = bip39.mnemonicToSeed(mnemonic);
  let node = bitcoinjs.HDNode.fromSeedBuffer(seed);
  let keyPair = bitcoinjs.ECPair.fromWIF(node.keyPair.toWIF());
  let priKey = keyPair.d.toBuffer(32);
  let signature = bitcoinMessage.sign(message, priKey, keyPair.compressed);
  return signature.toString('hex');
}

validators.verify = function(message, address, signature) {
  let buffer = Buffer.from(signature, 'hex');
  let result = bitcoinMessage.verify(message, address, buffer);
  if (result.toString() == 'true') {
    return 'OK';
  } else {
    return Error('ERR_INVALID_SIGNATURE');
  }
}

module.exports = validators;
