/* */ 
var arrayReduce = require('./_arrayReduce'),
    deburr = require('./deburr'),
    words = require('./words');
var rsApos = "['\u2019]";
var reApos = RegExp(rsApos, 'g');
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}
module.exports = createCompounder;
