/* */ 
var createMathOperation = require('./_createMathOperation');
var subtract = createMathOperation(function(minuend, subtrahend) {
  return minuend - subtrahend;
}, 0);
module.exports = subtract;
