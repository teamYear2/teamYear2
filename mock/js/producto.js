// Datos de ejemplo (productos)
const productos = [
    {codigo: 'P001', nombre: 'Producto 1', categoria: 'Categoria A', stock: 20},
    {codigo: 'P002', nombre: 'Producto 2', categoria: 'Categoria B', stock: 15},
    {codigo: 'P003', nombre: 'Producto 3', categoria: 'Categoria A', stock: 30},
    {codigo: 'P004', nombre: 'Producto 4', categoria: 'Categoria C', stock: 50},
    {codigo: 'P005', nombre: 'Producto 5', categoria: 'Categoria B', stock: 10},
    {codigo: 'P006', nombre: 'Producto 6', categoria: 'Categoria A', stock: 25},
    {codigo: 'P007', nombre: 'Producto 7', categoria: 'Categoria C', stock: 40},
    {codigo: 'P008', nombre: 'Producto 8', categoria: 'Categoria A', stock: 5},
    {codigo: 'P009', nombre: 'Producto 9', categoria: 'Categoria B', stock: 8},
    {codigo: 'P010', nombre: 'Producto 10', categoria: 'Categoria C', stock: 60},
    {codigo: 'P011', nombre: 'Producto 11', categoria: 'Categoria A', stock: 12},
    {codigo: 'P012', nombre: 'Producto 12', categoria: 'Categoria B', stock: 18}
  ];
  
  // Variables para paginación
  let paginaActual = 1;
  let productosPorPagina = 4;
  let productosFiltrados = productos; // Al principio, todos los productos están visibles
  
  // Función para mostrar productos
  function mostrarProductos() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPagina = productosFiltrados.slice(inicio, fin);
  
    const tablaProductos = document.getElementById('tabla-productos').getElementsByTagName('tbody')[0];
    tablaProductos.innerHTML = ''; // Limpiar tabla
  
    productosPagina.forEach(producto => {
      const row = tablaProductos.insertRow();
      row.innerHTML = `
        <td>${producto.codigo}</td>
        <td>${producto.nombre}</td>
        <td>${producto.categoria}</td>
        <td>${producto.stock}</td>
      `;
    });
  
    actualizarPaginacion();
  }
  
  // Función para actualizar los botones de paginación
  function actualizarPaginacion() {
    document.getElementById('back-btn').disabled = paginaActual === 1;
    document.getElementById('next-btn').disabled = paginaActual * productosPorPagina >= productosFiltrados.length;
  
    for (let i = 1; i <= 3; i++) {
      const botonPagina = document.getElementById(`page-${i}`);
      if (paginaActual === i) {
        botonPagina.style.backgroundColor = '#2980b9';
      } else {
        botonPagina.style.backgroundColor = '#3498db';
      }
    }
  }
  
  // Función para cambiar de página
  function cambiarPagina(pagina) {
    if (pagina === 'back') {
      if (paginaActual > 1) paginaActual--;
    } else if (pagina === 'next') {
      if (paginaActual * productosPorPagina < productosFiltrados.length) paginaActual++;
    } else {
      paginaActual = pagina;
    }
    mostrarProductos();
  }
  
  // Función para filtrar productos por el texto ingresado
  function filtrarProductos() {
    const textoBusqueda = document.getElementById('buscador-producto').value.toLowerCase();
    productosFiltrados = productos.filter(producto =>
      producto.nombre.toLowerCase().includes(textoBusqueda) || 
      producto.codigo.toLowerCase().includes(textoBusqueda)
    );
    paginaActual = 1; // Reseteamos a la primera página después de filtrar
    mostrarProductos();
  }
  
  // Inicializar productos al cargar la página
  mostrarProductos();
  