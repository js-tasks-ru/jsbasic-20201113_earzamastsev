/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  let result = [];
  for (user of users) {
    result.push(user.name);
  }
  return result;
}
