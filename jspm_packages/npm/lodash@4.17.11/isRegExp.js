/* */ 
var baseIsRegExp = require('./_baseIsRegExp'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');
var nodeIsRegExp = nodeUtil && nodeUtil.isRegExp;
var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
module.exports = isRegExp;
