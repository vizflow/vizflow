/* */ 
var baseSet = require('./_baseSet'),
    baseZipObject = require('./_baseZipObject');
function zipObjectDeep(props, values) {
  return baseZipObject(props || [], values || [], baseSet);
}
module.exports = zipObjectDeep;
