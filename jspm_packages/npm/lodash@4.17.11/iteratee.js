/* */ 
var baseClone = require('./_baseClone'),
    baseIteratee = require('./_baseIteratee');
var CLONE_DEEP_FLAG = 1;
function iteratee(func) {
  return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
}
module.exports = iteratee;
