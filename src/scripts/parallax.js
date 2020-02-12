const parallax1 = document.querySelector('.welcome-parallax');
const parallax2 = document.querySelector('.feedback-parallax');
const layers1 = parallax1.children;
const layers2 = parallax2.children;
const feedback = document.querySelector('.feedback-section');

function moveLayersDependsOnScroll(wScroll1, wScroll2) {
  if (wScroll2 <= 0) {
    Array.from(layers2).forEach(layer => {
      const divider = layer.dataset.speed;
      const strafe = wScroll2 * divider / 10;
      layer.style.transform = `translateY(${strafe}%)`;
    })
  }

  Array.from(layers1).forEach(layer => {
    const divider = layer.dataset.speed;
    const strafe = wScroll1 * divider / 10;
    layer.style.transform = `translateY(-${strafe}%)`;
  })
  
}


window.addEventListener('scroll', e => {
  const wScroll1 = window.pageYOffset;
  const wScroll2 = feedback.getBoundingClientRect().y;
  console.log(wScroll1);
  console.log(wScroll2);
  moveLayersDependsOnScroll(wScroll1, wScroll2);
});


