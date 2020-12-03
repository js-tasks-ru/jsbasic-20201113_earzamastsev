/**
 * Складываем зарплаты
 * @param {Object} salaries - объект зарплат
 * @returns {Number}
 */
function sumSalary(salaries) {
  let result = 0;
  for (let salary in salaries) {
    if (+salaries[salary]) {
      result += salaries[salary];
    } 
  }
  return result;
}