/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  let ulElement = document.createElement('ul');
  for (let friend of friends) {
    let liElement = document.createElement('li');
    liElement.innerHTML = friend.firstName + " " + friend.lastName;
    ulElement.append(liElement);
  }
  return ulElement;
}
