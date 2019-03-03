/* */ 
var apply = require('./_apply'),
    baseRest = require('./_baseRest'),
    isError = require('./isError');
var attempt = baseRest(function(func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});
module.exports = attempt;
