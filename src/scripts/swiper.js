import Swiper from 'swiper'

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  spaceBetween: 0,
  grabCursor: true,
  breakpoints: {
    481: {
      slidesPerView: 1,
    },
    769: {
      slidesPerView: 2
    },
    1201: {
      slidesPerView: 2
    }
  }
});