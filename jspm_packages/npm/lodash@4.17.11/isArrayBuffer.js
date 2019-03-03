/* */ 
var baseIsArrayBuffer = require('./_baseIsArrayBuffer'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');
var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer;
var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
module.exports = isArrayBuffer;
