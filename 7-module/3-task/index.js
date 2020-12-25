export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
  }

  render() {
    let elem = document.createElement('DIV');
    elem.classList.add('slider');
    let template = `
    <div class="slider__thumb" style="left: 50%;">
    <span class="slider__value">2</span>
    </div>

    <div class="slider__progress" style="width: 50%;"></div>
    `;

    let sliderSteps = document.createElement('DIV');
    sliderSteps.classList.add('slider__steps');
    let sliderSpan = document.createElement('SPAN');
    for (let s = 0; s < this.steps; s++) {
      sliderSteps.insertAdjacentHTML('beforeEnd', "<span></span>");
    }  
    elem.insertAdjacentHTML('afterBegin', template);
    elem.insertAdjacentElement('beforeEnd', sliderSteps);
    sliderSteps.firstChild.classList.add('slider__step-active');

    elem.addEventListener('click', event => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      

      let thumb = this.elem.querySelector('.slider__thumb');
      let progress = this.elem.querySelector('.slider__progress');
      let sliderValue = this.elem.querySelector('.slider__value');
      let sliderSteps = this.elem.querySelector('.slider__steps');
      sliderValue.textContent = value;

      let leftPercents = value / segments * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      for (let s of sliderSteps.children) {
        s.classList.remove(`slider__step-active`);
      }
      sliderSteps.children[value].classList.add(`slider__step-active`);



      let sliderClick = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
        detail: value, // значение 0, 1, 2, 3, 4
        bubbles: true // событие всплывает - это понадобится в дальнейшем
      });
      elem.dispatchEvent(sliderClick);
    });
    return elem;
  }
}