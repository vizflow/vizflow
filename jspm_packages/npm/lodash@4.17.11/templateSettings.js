/* */ 
var escape = require('./escape'),
    reEscape = require('./_reEscape'),
    reEvaluate = require('./_reEvaluate'),
    reInterpolate = require('./_reInterpolate');
var templateSettings = {
  'escape': reEscape,
  'evaluate': reEvaluate,
  'interpolate': reInterpolate,
  'variable': '',
  'imports': {'_': {'escape': escape}}
};
module.exports = templateSettings;
