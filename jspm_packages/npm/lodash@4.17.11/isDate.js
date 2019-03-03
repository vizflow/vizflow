/* */ 
var baseIsDate = require('./_baseIsDate'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');
var nodeIsDate = nodeUtil && nodeUtil.isDate;
var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
module.exports = isDate;
