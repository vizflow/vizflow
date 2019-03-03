/* */ 
var baseInRange = require('./_baseInRange'),
    toFinite = require('./toFinite'),
    toNumber = require('./toNumber');
function inRange(number, start, end) {
  start = toFinite(start);
  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }
  number = toNumber(number);
  return baseInRange(number, start, end);
}
module.exports = inRange;
