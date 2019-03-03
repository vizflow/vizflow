/* */ 
var flatten = require('./flatten'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');
function flatRest(func) {
  return setToString(overRest(func, undefined, flatten), func + '');
}
module.exports = flatRest;
