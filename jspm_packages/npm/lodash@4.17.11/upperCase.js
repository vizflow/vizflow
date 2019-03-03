/* */ 
var createCompounder = require('./_createCompounder');
var upperCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + word.toUpperCase();
});
module.exports = upperCase;
