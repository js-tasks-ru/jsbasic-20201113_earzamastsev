function initCarousel() {
  let rightButton = document.querySelector('.carousel__arrow_right');
  let leftButton = document.querySelector('.carousel__arrow_left');
  let carousel = document.querySelector('.carousel__inner');
  let carouselSlide = document.querySelector('.carousel__slide');
  let offsetWidth = carouselSlide.offsetWidth;
  let currentOffset = 0;
  leftButton.style.display = 'none';
  let pageCount = 1;
  
  rightButton.addEventListener('click', buttonHendler);
  leftButton.addEventListener('click', buttonHendler);

  function buttonHendler(event) {
    if (event.currentTarget == rightButton) {
      leftButton.style.display = '';
      pageCount += 1;
      currentOffset = currentOffset - offsetWidth;
      carousel.style.transform = 'translateX(' + currentOffset + 'px)';
      if (pageCount == 4) {
        rightButton.style.display = 'none';
      };
    }
    if (event.currentTarget == leftButton) {
      pageCount -= 1;
      rightButton.style.display = '';
      currentOffset = currentOffset + offsetWidth;
      carousel.style.transform = 'translateX(' + currentOffset + 'px)';
      if (pageCount == 1) {
        leftButton.style.display = 'none';
      };
    };
  };
}