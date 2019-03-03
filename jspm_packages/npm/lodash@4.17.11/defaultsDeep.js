/* */ 
var apply = require('./_apply'),
    baseRest = require('./_baseRest'),
    customDefaultsMerge = require('./_customDefaultsMerge'),
    mergeWith = require('./mergeWith');
var defaultsDeep = baseRest(function(args) {
  args.push(undefined, customDefaultsMerge);
  return apply(mergeWith, undefined, args);
});
module.exports = defaultsDeep;
