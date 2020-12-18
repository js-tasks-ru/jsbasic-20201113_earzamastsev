import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.elem = this.render();
    this.addProductEvent = new CustomEvent("product-add", 
      { 
        detail: this.product.id,
        bubbles: true 
      }
    );
  }
  render() {
    let elem = document.createElement('div');
    let template = `
      <div class="card">
      <div class="card__top">
        <img src="/assets/images/products/${this.product["image"]}" class="card__image" alt="product">
        <span class="card__price">€${this.product["price"].toFixed(2)}</span>
      </div>
      <div class="card__body">
        <div class="card__title">${this.product["name"]}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    </div>`;
    elem.insertAdjacentHTML('afterBegin', template);
    elem.querySelector('button.card__button').addEventListener('click', (event) => {
      elem.querySelector('div.card').dispatchEvent(this.addProductEvent);
    });
    return elem;
  }
}