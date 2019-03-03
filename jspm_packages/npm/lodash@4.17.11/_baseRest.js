/* */ 
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}
module.exports = baseRest;
