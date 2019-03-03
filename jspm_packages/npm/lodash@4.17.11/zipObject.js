/* */ 
var assignValue = require('./_assignValue'),
    baseZipObject = require('./_baseZipObject');
function zipObject(props, values) {
  return baseZipObject(props || [], values || [], assignValue);
}
module.exports = zipObject;
