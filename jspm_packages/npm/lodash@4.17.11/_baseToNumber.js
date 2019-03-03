/* */ 
(function(process) {
  var isSymbol = require('./isSymbol');
  var NAN = 0 / 0;
  function baseToNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    return +value;
  }
  module.exports = baseToNumber;
})(require('@empty'));
