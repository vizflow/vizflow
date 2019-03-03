/* */ 
var arraySample = require('./_arraySample'),
    values = require('./values');
function baseSample(collection) {
  return arraySample(values(collection));
}
module.exports = baseSample;
