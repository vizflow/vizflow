/* */ 
var createCompounder = require('./_createCompounder'),
    upperFirst = require('./upperFirst');
var startCase = createCompounder(function(result, word, index) {
  return result + (index ? ' ' : '') + upperFirst(word);
});
module.exports = startCase;
