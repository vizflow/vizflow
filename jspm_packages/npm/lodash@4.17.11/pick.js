/* */ 
var basePick = require('./_basePick'),
    flatRest = require('./_flatRest');
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});
module.exports = pick;
