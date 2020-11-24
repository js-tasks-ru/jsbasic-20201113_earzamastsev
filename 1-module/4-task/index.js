/**
 * checkSpam
 * @param {string} str base
 * @returns {boolean}
 */
function checkSpam(str) {
  let stopWords = ["1xbet", "xxx"];
  let strInLowcase = str.toLowerCase();
  for (let word of stopWords) {
    if (strInLowcase.includes(word)) {
      return true;
    }
  }
  return false;
}
