/* */ 
var copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    keysIn = require('./keysIn');
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});
module.exports = assignIn;
