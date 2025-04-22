// Fecha dinámica en el footer
function actualizarFechaFooter() {
    const fecha = new Date();
    const texto = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    document.getElementById('footer-date').innerText = `© ${texto} ISPC GESTOR DE INVENTARIO INTERNO.`;
  }
  setInterval(actualizarFechaFooter, 1000);
  
  