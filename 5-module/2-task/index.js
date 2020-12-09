function toggleText() {
  let buttonElem = document.querySelector('.toggle-text-button');
  let textElem = document.querySelector('#text');
  buttonElem.addEventListener('click', () => {textElem.toggleAttribute('hidden')} );
}
