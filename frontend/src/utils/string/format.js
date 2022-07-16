/**
 * @description Method to format string with given values
 * @param {String} str Value to be formatted
 * @param {[Object]} args multiple parameters Object with the value to format
 * @example format('this {} an {}', 'is', 'example') => 'this is an example'
 */
function format(str, ...args) {
  if (!args) return str;
  let numberOfOccurrence = -1;
  return str.replace(/{}/g, (match) => {
    numberOfOccurrence += 1;
    return typeof args[numberOfOccurrence] !== 'undefined' ? args[numberOfOccurrence] : match;
  });
}

export default format;
