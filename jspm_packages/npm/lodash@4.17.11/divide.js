/* */ 
var createMathOperation = require('./_createMathOperation');
var divide = createMathOperation(function(dividend, divisor) {
  return dividend / divisor;
}, 1);
module.exports = divide;
