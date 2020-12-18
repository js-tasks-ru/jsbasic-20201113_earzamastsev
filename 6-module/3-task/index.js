export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render() {
    const carousel = document.createElement('div');
    carousel.classList.add('carousel');
    const innerTemplate = `
    <div class="carousel__arrow carousel__arrow_right">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
    <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    </div>
    `;
    carousel.insertAdjacentHTML('afterBegin', innerTemplate);

    for (let slide of this.slides) {
      const addProductEvent = new CustomEvent("product-add", 
        { 
          detail: slide.id,
          bubbles: true 
        }
      );
      const slideTemplate = `
      <div class="carousel__slide" data-id="${slide.id}">
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
      `;
      carousel.querySelector('.carousel__inner').insertAdjacentHTML('beforeEnd', slideTemplate);
      carousel.querySelector('button.carousel__button').addEventListener('click', (event) => {
        carousel.dispatchEvent(addProductEvent);
      });
    }
    const slidesLength = this.slides.length;
    const rightButton = carousel.querySelector('.carousel__arrow_right');
    const leftButton = carousel.querySelector('.carousel__arrow_left');
    const carouselInner = carousel.querySelector('.carousel__inner');
    leftButton.style.display = 'none';
    let currentOffset = 0;
    let pageCount = 1;

    carousel.addEventListener('click', buttonHandler);
    
    function buttonHandler(event) {
      let offsetWidth = carouselInner.offsetWidth;
 
      if (event.target.closest('div.carousel__arrow_right') == rightButton) {
        leftButton.style.display = '';
        pageCount += 1;
        currentOffset = currentOffset - offsetWidth;
        carouselInner.style.transform = 'translateX(' + currentOffset + 'px)';
        console.log('right button pressed,  offsetWidth:', currentOffset, offsetWidth, pageCount);
        if (pageCount == slidesLength) {
          rightButton.style.display = 'none';
        }
      }

      if (event.target.closest('div.carousel__arrow_left') == leftButton) {
        pageCount -= 1;
        rightButton.style.display = '';
        currentOffset = currentOffset + offsetWidth;
        carouselInner.style.transform = 'translateX(' + currentOffset + 'px)';
        console.log('left button pressed, currentOffset:', currentOffset);
        if (pageCount == 1) {
          leftButton.style.display = 'none';
        }
      }
    }

    return carousel;
  }
}
