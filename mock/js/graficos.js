  // Inicializamos con un gráfico
  let ctx = document.getElementById('grafico').getContext('2d');
  let grafico = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [{
              label: 'Consumo Diario',
              data: [12, 19, 3, 5, 2, 3, 7],
              backgroundColor: '#3498db'
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  // Cambiar tipo de gráfico
  function cambiarGrafico() {
      const tipo = document.getElementById('tipo-grafico').value;

      let nuevosDatos = {};
      if (tipo === 'diario') {
          nuevosDatos = {
              labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
              datasets: [{
                  label: 'Consumo Diario',
                  data: [12, 19, 3, 5, 2, 3, 7],
                  backgroundColor: '#3498db'
              }]
          };
      } else if (tipo === 'mensual') {
          nuevosDatos = {
              labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
              datasets: [{
                  label: 'Consumo Mensual',
                  data: [120, 90, 130, 100, 80, 70],
                  backgroundColor: '#2ecc71'
              }]
          };
      } else if (tipo === 'anual') {
          nuevosDatos = {
              labels: ['2022', '2023', '2024'],
              datasets: [{
                  label: 'Consumo Anual',
                  data: [1500, 1700, 1400],
                  backgroundColor: '#e67e22'
              }]
          };
      } else if (tipo === 'stock') {
          nuevosDatos = {
              labels: ['Stock Actual', 'Stock Mínimo'],
              datasets: [{
                  label: 'Stock Comparativo',
                  data: [35, 20],
                  backgroundColor: ['#9b59b6', '#c0392b']
              }]
          };
      }

      // Actualizamos el gráfico
      grafico.data = nuevosDatos;
      grafico.update();
  }