/* */ 
var createCompounder = require('./_createCompounder');
var lowerCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + word.toLowerCase();
});
module.exports = lowerCase;
