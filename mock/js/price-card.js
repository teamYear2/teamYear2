document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".snip1214 .plan");
    const buttons = document.querySelectorAll(".snip1214 .plan-select a");

    buttons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        // Quitar clase 'selected-plan' de todas
        cards.forEach(card => card.classList.remove("selected-plan"));

        // Quitar 'featured' también si querés que no se mantenga
        cards.forEach(card => card.classList.remove("featured"));

        // Agregar clase a la que fue clickeada
        cards[index].classList.add("selected-plan");
      });
    });
  });