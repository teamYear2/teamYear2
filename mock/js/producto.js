const productos = [
  {
    codigo: 'P001',
    nombre: 'Harina 000',
    categoria: 'Alimentos',
    stock: 38,
    consumoDiario: 3,
    consumoMensual: { enero: 93, febrero: 84, marzo: 91, abril: 89, mayo: 96, junio: 92, julio: 87, agosto: 94, septiembre: 90, octubre: 95, noviembre: 88, diciembre: 97 },
    consumoPorAnio: { 2021: 1080, 2022: 1120, 2023: 1150, 2024: 1180, 2025: 1200 }
  },
  {
    codigo: 'P002',
    nombre: 'Lavandina 1L',
    categoria: 'Limpieza',
    stock: 12,
    consumoDiario: 1,
    consumoMensual: { enero: 32, febrero: 29, marzo: 30, abril: 31, mayo: 32, junio: 30, julio: 33, agosto: 29, septiembre: 31, octubre: 30, noviembre: 30, diciembre: 33 },
    consumoPorAnio: { 2021: 360, 2022: 370, 2023: 375, 2024: 380, 2025: 390 }
  },
  {
    codigo: 'P003',
    nombre: 'Papel Higiénico 4 rollos',
    categoria: 'Higiene',
    stock: 55,
    consumoDiario: 4,
    consumoMensual: { enero: 120, febrero: 110, marzo: 118, abril: 115, mayo: 125, junio: 122, julio: 119, agosto: 117, septiembre: 121, octubre: 123, noviembre: 114, diciembre: 126 },
    consumoPorAnio: { 2021: 1350, 2022: 1400, 2023: 1450, 2024: 1500, 2025: 1550 }
  },
  {
    codigo: 'P004',
    nombre: 'Yerba Mate 1kg',
    categoria: 'Bebidas',
    stock: 20,
    consumoDiario: 2,
    consumoMensual: { enero: 62, febrero: 56, marzo: 60, abril: 59, mayo: 64, junio: 61, julio: 63, agosto: 60, septiembre: 62, octubre: 65, noviembre: 58, diciembre: 66 },
    consumoPorAnio: { 2021: 750, 2022: 800, 2023: 830, 2024: 860, 2025: 890 }
  },
  {
    codigo: 'P005',
    nombre: 'Jabón en Pan',
    categoria: 'Limpieza',
    stock: 28,
    consumoDiario: 1.5,
    consumoMensual: { enero: 45, febrero: 42, marzo: 46, abril: 44, mayo: 47, junio: 45, julio: 43, agosto: 46, septiembre: 44, octubre: 47, noviembre: 42, diciembre: 48 },
    consumoPorAnio: { 2021: 520, 2022: 540, 2023: 560, 2024: 580, 2025: 600 }
  }
];

// Variables globales
let paginaActual = 1;
let productosPorPagina = 4;
let productosFiltrados = productos;
let productosSeleccionados = [];

// Inicializar gráfico vacío
let ctx = document.getElementById('grafico').getContext('2d');
let grafico = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{
      label: '',
      data: [],
      backgroundColor: '#3498db'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: { beginAtZero: true }
    }
  }
});

// Mostrar productos en la tabla
function mostrarProductos() {
  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(inicio, fin);

  const tablaProductos = document.getElementById('tabla-productos').getElementsByTagName('tbody')[0];
  tablaProductos.innerHTML = '';

  productosPagina.forEach(producto => {
    const row = tablaProductos.insertRow();
    row.innerHTML = `
      <td>${producto.codigo}</td>
      <td>${producto.nombre}</td>
      <td>${producto.categoria}</td>
      <td>${producto.stock}</td>
    `;

    if (productosSeleccionados.some(p => p.codigo === producto.codigo)) {
      row.classList.add('seleccionado');
    }

    row.addEventListener('click', () => {
      toggleSeleccion(producto);
      row.classList.toggle('seleccionado');
      cambiarGrafico();
    });
  });

  actualizarPaginacion();
  cambiarGrafico();
}

// Alternar selección
function toggleSeleccion(producto) {
  const index = productosSeleccionados.findIndex(p => p.codigo === producto.codigo);
  if (index !== -1) {
    productosSeleccionados.splice(index, 1);
  } else {
    productosSeleccionados.push(producto);
  }
}

// Cambiar gráfico
function cambiarGrafico() {
  const tipo = document.getElementById('tipo-grafico').value;
  let labels = [];
  let datasets = [];

  const productosParaGraficar = productosSeleccionados.length > 0
    ? productosSeleccionados
    : productosFiltrados.slice((paginaActual - 1) * productosPorPagina, paginaActual * productosPorPagina);

  if (tipo === 'diario') {
    labels = productosParaGraficar.map(p => p.nombre);
    datasets.push({
      label: 'Consumo Diario',
      data: productosParaGraficar.map(p => p.consumoDiario || 0),
      backgroundColor: '#3498db'
    });
  } else if (tipo === 'mensual') {
    labels = Object.keys(productosParaGraficar[0]?.consumoMensual || {});
    productosParaGraficar.forEach((producto, index) => {
      datasets.push({
        label: producto.nombre,
        data: labels.map(mes => producto.consumoMensual[mes] || 0),
        backgroundColor: getColor(index)
      });
    });
  } else if (tipo === 'anual') {
    labels = Object.keys(productosParaGraficar[0]?.consumoPorAnio || {});
    productosParaGraficar.forEach((producto, index) => {
      datasets.push({
        label: producto.nombre,
        data: labels.map(anio => producto.consumoPorAnio[anio] || 0),
        backgroundColor: getColor(index)
      });
    });
  }

  grafico.data = { labels, datasets };
  grafico.update();
}

function getColor(index) {
  const colores = ['#3498db', '#2ecc71', '#e67e22', '#9b59b6', '#1abc9c', '#f1c40f', '#e74c3c'];
  return colores[index % colores.length];
}

// Paginación
function actualizarPaginacion() {
  document.getElementById('back-btn').disabled = paginaActual === 1;
  document.getElementById('next-btn').disabled = paginaActual * productosPorPagina >= productosFiltrados.length;

  for (let i = 1; i <= 3; i++) {
    const botonPagina = document.getElementById(`page-${i}`);
    if (botonPagina) {
      botonPagina.style.backgroundColor = paginaActual === i ? '#2980b9' : '#3498db';
    }
  }
}

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

// Filtro combinado de texto + categoría
function aplicarFiltros() {
  const textoBusqueda = document.getElementById('buscador-producto').value.toLowerCase();
  const categoriaSeleccionada = document.getElementById('categorias').value;

  productosFiltrados = productos.filter(producto => {
    const coincideTexto = producto.nombre.toLowerCase().includes(textoBusqueda) || producto.codigo.toLowerCase().includes(textoBusqueda);
    const coincideCategoria = categoriaSeleccionada ? producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase() : true;
    return coincideTexto && coincideCategoria;
  });

  paginaActual = 1;
  mostrarProductos();
}

// Limpiar selección
function limpiarSeleccion() {
  productosSeleccionados = [];
  mostrarProductos();
}

// Listeners
document.getElementById('buscador-producto').addEventListener('input', aplicarFiltros);
document.getElementById('categorias').addEventListener('change', aplicarFiltros);

// Inicializar
mostrarProductos();
