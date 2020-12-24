import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.render();
    this.scrolllWidth = 350;
    this.currentScrollPosition = 0;
  }

  render() {
    let elem = document.createElement('DIV');
    elem.classList.add('ribbon');
    let leftButtonTemplate = `
      <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    let rightButtonTemplate = `
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    
    let ribbonInner = document.createElement('NAV');
    ribbonInner.classList.add('ribbon__inner');

    for (let category of this.categories) {
      ribbonInner.insertAdjacentHTML('beforeEnd',
        `<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`);
    }
    elem.insertAdjacentHTML('afterBegin', leftButtonTemplate);
    elem.insertAdjacentElement('beforeEnd', ribbonInner);
    elem.insertAdjacentHTML('beforeEnd', rightButtonTemplate);

    let rightButton = elem.querySelector('button.ribbon__arrow_right');
    let leftButton = elem.querySelector('button.ribbon__arrow_left');

    rightButton.addEventListener('click', event => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;  
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;       
      ribbonInner.scrollBy(350, 0);
      leftButton.classList.add('ribbon__arrow_visible');

      if (scrollRight <= 1) {
        rightButton.classList.remove('ribbon__arrow_visible');
      } else {
        rightButton.classList.add('ribbon__arrow_visible');
      }
    });

    leftButton.addEventListener('click', event => {
      ribbonInner.scrollBy(-350, 0);
      rightButton.classList.add('ribbon__arrow_visible');
      if (ribbonInner.scrollLeft == 0) {
        leftButton.classList.remove('ribbon__arrow_visible');
      } else {
        leftButton.classList.add('ribbon__arrow_visible');
      }
    });

    ribbonInner.addEventListener('click', event => {
      let ribbonSelect = new CustomEvent('ribbon-select', {
        detail: event.target.dataset.id, 
        bubbles: true
      });
      ribbonInner.dispatchEvent(ribbonSelect);
    });

    return elem;

  }
}
