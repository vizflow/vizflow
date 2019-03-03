/* */ 
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');
var INFINITY = 1 / 0;
var createSet = !(Set && (1 / setToArray(new Set([, -0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};
module.exports = createSet;
