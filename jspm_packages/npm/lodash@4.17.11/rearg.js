/* */ 
var createWrap = require('./_createWrap'),
    flatRest = require('./_flatRest');
var WRAP_REARG_FLAG = 256;
var rearg = flatRest(function(func, indexes) {
  return createWrap(func, WRAP_REARG_FLAG, undefined, undefined, undefined, indexes);
});
module.exports = rearg;
