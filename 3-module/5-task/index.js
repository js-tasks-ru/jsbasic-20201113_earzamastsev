/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let re = /[\d-.]+/g;
  let numbersArray = str.match(re);
  numbersArray.sort((a, b) => a - b);
  let result = {
    min: +numbersArray[0],
    max: +numbersArray[numbersArray.length-1]
  };
  return result;
}
