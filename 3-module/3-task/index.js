/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let tmpArray = str.split("-");
  result = [];
  for (let word of tmpArray) {
    if ( word == "" ) continue;
    if (tmpArray.indexOf(word) == 0) {
      result.push(word)
    } else {
    result.push(word[0].toUpperCase() + word.slice(1))
    }
  }
  return result.join("")
}
