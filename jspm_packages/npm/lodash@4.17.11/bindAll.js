/* */ 
var arrayEach = require('./_arrayEach'),
    baseAssignValue = require('./_baseAssignValue'),
    bind = require('./bind'),
    flatRest = require('./_flatRest'),
    toKey = require('./_toKey');
var bindAll = flatRest(function(object, methodNames) {
  arrayEach(methodNames, function(key) {
    key = toKey(key);
    baseAssignValue(object, key, bind(object[key], object));
  });
  return object;
});
module.exports = bindAll;
