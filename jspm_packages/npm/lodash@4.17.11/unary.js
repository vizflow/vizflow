/* */ 
var ary = require('./ary');
function unary(func) {
  return ary(func, 1);
}
module.exports = unary;
