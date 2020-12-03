/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  let result = [];
  let min = a;
  let max = b;
  if (a > b) {
    min = b;
    max = a;
  }
  for (i of arr) {
    if (+i >= min && +i <= max) {
      result.push(i);
    }
  }
  return result;
}
