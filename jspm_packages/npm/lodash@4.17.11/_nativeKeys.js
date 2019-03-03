/* */ 
var overArg = require('./_overArg');
var nativeKeys = overArg(Object.keys, Object);
module.exports = nativeKeys;
