// JS para cambiar de slide automáticamente
let currentSlide = 0;
const slides2 = document.querySelectorAll('.slide2');
const slider = document.getElementById('slider2');
let intervalId;

function showSlide(index) {
  slides2[currentSlide].classList.remove('active');
  currentSlide = (index + slides2.length) % slides2.length;
  slides2[currentSlide].classList.add('active');
}

function showNextSlide() {
  showSlide(currentSlide + 1);
}

function previousSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  intervalId = setInterval(showNextSlide, 5000);
}

function stopAutoSlide() {
  clearInterval(intervalId);
}

// Esperá a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  startAutoSlide();
  slider.addEventListener('mouseenter', stopAutoSlide);
  slider.addEventListener('mouseleave', startAutoSlide);
});