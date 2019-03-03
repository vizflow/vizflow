/* */ 
var baseConvert = require('./_baseConvert'),
    util = require('./_util');
function convert(name, func, options) {
  return baseConvert(util, name, func, options);
}
module.exports = convert;
