/* */ 
var toFinite = require('./toFinite');
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;
  return result === result ? (remainder ? result - remainder : result) : 0;
}
module.exports = toInteger;
