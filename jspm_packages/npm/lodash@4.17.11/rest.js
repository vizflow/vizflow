/* */ 
var baseRest = require('./_baseRest'),
    toInteger = require('./toInteger');
var FUNC_ERROR_TEXT = 'Expected a function';
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = start === undefined ? start : toInteger(start);
  return baseRest(func, start);
}
module.exports = rest;
