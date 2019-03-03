/* */ 
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
module.exports = merge;
