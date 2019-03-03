/* */ 
var toInteger = require('./toInteger');
function isInteger(value) {
  return typeof value == 'number' && value == toInteger(value);
}
module.exports = isInteger;
