/* */ 
var baseNth = require('./_baseNth'),
    toInteger = require('./toInteger');
function nth(array, n) {
  return (array && array.length) ? baseNth(array, toInteger(n)) : undefined;
}
module.exports = nth;
