/* */ 
var coreJsData = require('./_coreJsData'),
    isFunction = require('./isFunction'),
    stubFalse = require('./stubFalse');
var isMaskable = coreJsData ? isFunction : stubFalse;
module.exports = isMaskable;
