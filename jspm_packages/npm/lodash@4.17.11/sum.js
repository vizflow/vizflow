/* */ 
var baseSum = require('./_baseSum'),
    identity = require('./identity');
function sum(array) {
  return (array && array.length) ? baseSum(array, identity) : 0;
}
module.exports = sum;
