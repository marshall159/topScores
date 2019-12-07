function isStr(str) {
  return typeof str === 'string';
}

function isEmpty(str) {
  return !str.length;  
}

function hasRequiredProperties(object) {
  return object.hasOwnProperty('name') && object.hasOwnProperty('word');
}

function hasAllValidParameters(body) {
   const allValid = hasRequiredProperties(body) && isStr(body.name) && !isEmpty(body.name);

   return allValid;
}

module.exports = {
  isStr,
  isEmpty,
  hasRequiredProperties,
  hasAllValidParameters,
}
