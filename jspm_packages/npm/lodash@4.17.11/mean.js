/* */ 
var baseMean = require('./_baseMean'),
    identity = require('./identity');
function mean(array) {
  return baseMean(array, identity);
}
module.exports = mean;
