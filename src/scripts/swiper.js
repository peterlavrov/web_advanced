import Swiper from 'swiper'

var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 2,
  spaceBetween: 0,
  width: 800,
  grabCursor: true,
  breakpoints: {
    361: {
    },
    481: {
    },
    769: {
      width: 650
    },
    1201: {
      width: 1000
    }
  }
});