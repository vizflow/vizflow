/* */ 
var castFunction = require('./_castFunction'),
    partial = require('./partial');
function wrap(value, wrapper) {
  return partial(castFunction(wrapper), value);
}
module.exports = wrap;
