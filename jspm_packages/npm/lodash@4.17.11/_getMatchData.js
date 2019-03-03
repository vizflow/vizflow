/* */ 
var isStrictComparable = require('./_isStrictComparable'),
    keys = require('./keys');
function getMatchData(object) {
  var result = keys(object),
      length = result.length;
  while (length--) {
    var key = result[length],
        value = object[key];
    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}
module.exports = getMatchData;
