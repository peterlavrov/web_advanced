const menuButton = document.querySelector('.hero__hamburger');
const closeButton = document.querySelector('.popup-menu__close');
const popupMenu = document.querySelector('.hero__popup-menu');

menuButton.addEventListener('click', event => {
  event.preventDefault();
  popupMenu.style.display = "flex";
})
closeButton.addEventListener('click', event => {
  event.preventDefault();
  popupMenu.style.display = "none";
})
window.addEventListener('resize', () => {
  if(window.innerWidth > 768) {
    popupMenu.style.display = "none";
  }
})