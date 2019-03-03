/* */ 
var baseGetAllKeys = require('./_baseGetAllKeys'),
    getSymbols = require('./_getSymbols'),
    keys = require('./keys');
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}
module.exports = getAllKeys;
