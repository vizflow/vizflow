/* */ 
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;
