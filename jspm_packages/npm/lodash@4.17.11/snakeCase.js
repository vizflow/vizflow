/* */ 
var createCompounder = require('./_createCompounder');
var snakeCase = createCompounder(function(result, word, index) {
  return result + (index ? '_' : '') + word.toLowerCase();
});
module.exports = snakeCase;
