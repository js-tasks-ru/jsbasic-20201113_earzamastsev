/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  filteredUsers = users.filter(user => user.age <= age);
  mappedUsers = filteredUsers.map(user => {
    return user.name + ", " + user.balance;
  });
  return mappedUsers.join("\n"); 
}
