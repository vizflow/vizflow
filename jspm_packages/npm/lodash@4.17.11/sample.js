/* */ 
var arraySample = require('./_arraySample'),
    baseSample = require('./_baseSample'),
    isArray = require('./isArray');
function sample(collection) {
  var func = isArray(collection) ? arraySample : baseSample;
  return func(collection);
}
module.exports = sample;
