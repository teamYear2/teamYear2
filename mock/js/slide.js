let currentSlide = 0;
const slides2 = document.querySelectorAll('.slide2');
const slider = document.getElementById('slider2');
const dotsContainer = document.getElementById('slider-dots');
let intervalId;

// Crear los puntos
slides2.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => showSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('span');

function showSlide(index) {
  slides2[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');

  currentSlide = (index + slides2.length) % slides2.length;

  slides2[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  intervalId = setInterval(showNextSlide, 2000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
  dots[0].classList.add('active'); // Activar el primer punto
});
