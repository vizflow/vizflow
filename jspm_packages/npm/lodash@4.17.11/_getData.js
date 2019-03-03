/* */ 
var metaMap = require('./_metaMap'),
    noop = require('./noop');
var getData = !metaMap ? noop : function(func) {
  return metaMap.get(func);
};
module.exports = getData;
