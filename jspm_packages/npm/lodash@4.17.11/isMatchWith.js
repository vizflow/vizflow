/* */ 
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');
function isMatchWith(object, source, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return baseIsMatch(object, source, getMatchData(source), customizer);
}
module.exports = isMatchWith;
