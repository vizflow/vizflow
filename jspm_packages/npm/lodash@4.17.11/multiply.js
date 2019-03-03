/* */ 
var createMathOperation = require('./_createMathOperation');
var multiply = createMathOperation(function(multiplier, multiplicand) {
  return multiplier * multiplicand;
}, 1);
module.exports = multiply;
