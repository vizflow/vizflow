/* */ 
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}
module.exports = isMatch;
