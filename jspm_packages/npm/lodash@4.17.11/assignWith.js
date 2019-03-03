/* */ 
var copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    keys = require('./keys');
var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keys(source), object, customizer);
});
module.exports = assignWith;
