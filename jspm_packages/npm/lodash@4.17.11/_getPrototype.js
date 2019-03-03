/* */ 
var overArg = require('./_overArg');
var getPrototype = overArg(Object.getPrototypeOf, Object);
module.exports = getPrototype;
