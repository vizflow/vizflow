/* */ 
var arrayEach = require('./_arrayEach'),
    arrayPush = require('./_arrayPush'),
    baseFunctions = require('./_baseFunctions'),
    copyArray = require('./_copyArray'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    keys = require('./keys');
function mixin(object, source, options) {
  var props = keys(source),
      methodNames = baseFunctions(source, props);
  var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
      isFunc = isFunction(object);
  arrayEach(methodNames, function(methodName) {
    var func = source[methodName];
    object[methodName] = func;
    if (isFunc) {
      object.prototype[methodName] = function() {
        var chainAll = this.__chain__;
        if (chain || chainAll) {
          var result = object(this.__wrapped__),
              actions = result.__actions__ = copyArray(this.__actions__);
          actions.push({
            'func': func,
            'args': arguments,
            'thisArg': object
          });
          result.__chain__ = chainAll;
          return result;
        }
        return func.apply(object, arrayPush([this.value()], arguments));
      };
    }
  });
  return object;
}
module.exports = mixin;
