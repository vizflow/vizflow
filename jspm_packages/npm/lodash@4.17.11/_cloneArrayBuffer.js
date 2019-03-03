/* */ 
var Uint8Array = require('./_Uint8Array');
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}
module.exports = cloneArrayBuffer;
