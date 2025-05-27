// Initialize pie chart
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: {
    labels: ['En stock', 'Bajo stock', 'Agotado'],
    datasets: [{
      data: [65, 15, 20],
      backgroundColor: [
        '#10B981',
        '#F59E0B',
        '#EF4444'
      ],
      borderWidth: 0
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 10,
          padding: 20
        }
      }
    }
  }
});

