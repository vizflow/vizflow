/* */ 
(function(process) {
  var baseRest = require('./_baseRest'),
      unzip = require('./unzip');
  var zip = baseRest(unzip);
  module.exports = zip;
})(require('@empty'));
