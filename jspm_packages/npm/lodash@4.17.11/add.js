/* */ 
var createMathOperation = require('./_createMathOperation');
var add = createMathOperation(function(augend, addend) {
  return augend + addend;
}, 0);
module.exports = add;
