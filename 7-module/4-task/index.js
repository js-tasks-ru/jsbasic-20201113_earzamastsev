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
    <div class="slider__progress" style="width: 50%;"></div>`;

    let sliderSteps = document.createElement('DIV');
    sliderSteps.classList.add('slider__steps');
    let sliderSpan = document.createElement('SPAN');
    for (let s = 0; s < this.steps; s++) {
      sliderSteps.insertAdjacentHTML('beforeEnd', "<span></span>");
    }  
    elem.insertAdjacentHTML('afterBegin', template);
    elem.insertAdjacentElement('beforeEnd', sliderSteps);
    sliderSteps.firstChild.classList.add('slider__step-active');
    let thumb = elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;

    thumb.addEventListener('pointerdown', event => {
      event.preventDefault();
      elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
      let segments = this.steps - 1;

      function onPointerMove(event) {
        event.preventDefault();

        let left = event.clientX - elem.getBoundingClientRect().left; 
        let leftRelative = left / elem.offsetWidth;
        
        if (leftRelative < 0) {
          leftRelative = 0;
        }
        
        if (leftRelative > 1) {
          leftRelative = 1;
        }
        
        let leftPercents = leftRelative * 100;
        let progress = elem.querySelector('.slider__progress');

        thumb.style.left = `${leftPercents}%`;
        progress.style.width = `${leftPercents}%`;

        let approximateValue = leftRelative * segments;
        this.value = Math.round(approximateValue);

        let sliderValue = elem.querySelector('.slider__value');
        let sliderSteps = elem.querySelector('.slider__steps');
        sliderValue.textContent = this.value;
      }

      function onPointerUp() {
        elem.classList.remove('slider_dragging');

        let sliderClick = new CustomEvent('slider-change', { // имя события должно быть именно 'slider-change'
          detail: this.value, // значение 0, 1, 2, 3, 4
          bubbles: true // событие всплывает - это понадобится в дальнейшем
        });
        elem.dispatchEvent(sliderClick);
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
      }
    });

    elem.addEventListener('click', event => {
      let left = event.clientX - elem.getBoundingClientRect().left;
      let leftRelative = left / elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      this.value = value;
      

      let thumb = elem.querySelector('.slider__thumb');
      let progress = elem.querySelector('.slider__progress');
      let sliderValue = elem.querySelector('.slider__value');
      let sliderSteps = elem.querySelector('.slider__steps');
      sliderValue.textContent = value;

      let leftPercents = value / segments * 100;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      for (let s of sliderSteps.children) {
        s.classList.remove(`slider__step-active`);
      }
      sliderSteps.children[value].classList.add(`slider__step-active`);

      let sliderClick = new CustomEvent('slider-change', { 
        detail: this.value, 
        bubbles: true
      });
      elem.dispatchEvent(sliderClick);
    });
    return elem;
  }
}
