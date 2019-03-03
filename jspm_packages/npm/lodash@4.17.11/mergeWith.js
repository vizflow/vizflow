/* */ 
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});
module.exports = mergeWith;
