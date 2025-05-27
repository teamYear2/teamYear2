// Toggle sidebar

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    const isHidden = sidebar.classList.toggle('hidden');

    mainContent.classList.toggle('ml-0', isHidden);
    mainContent.classList.toggle('ml-[250px]', !isHidden);
}


// Change section
function changeSection(section) {
    // Hide all sections
    document.querySelectorAll('[id$="-section"]').forEach(el => {
        el.classList.add('hidden');
    });

    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active-nav');
    });

    // Show selected section
    document.getElementById(`${section}-section`).classList.remove('hidden');

    // Add active class to clicked nav item
    event.currentTarget.classList.add('active-nav');

    // Update title
    const titles = {
        'dashboard': 'Dashboard',
        'productos': 'Gestión de Productos',
        'categorias': 'Gestión de Categorías',
        'reportes': 'Reportes de Inventario',
        'configuracion': 'Configuración del Sistema'
    };
    document.getElementById('section-title').textContent = titles[section];

    // Initialize charts if needed
    if (section === 'dashboard' || section === 'reportes') {
        initCharts();
    }
}

// Change config tab
function changeConfigTab(tab) {
    // Remove active class from all tabs
    document.querySelectorAll('.config-tab').forEach(el => {
        el.classList.remove('active-tab');
        el.classList.remove('border-blue-500');
        el.classList.remove('text-blue-600');
        el.classList.add('border-transparent');
        el.classList.add('text-gray-500');
    });

    // Add active class to clicked tab
    event.currentTarget.classList.add('active-tab');
    event.currentTarget.classList.add('border-blue-500');
    event.currentTarget.classList.add('text-blue-600');
    event.currentTarget.classList.remove('border-transparent');
    event.currentTarget.classList.remove('text-gray-500');

    // Hide all content
    document.querySelectorAll('.config-content').forEach(el => {
        el.classList.add('hidden');
    });

    // Show selected content
    document.getElementById(`${tab}-config`).classList.remove('hidden');
}

// Initialize charts
function initCharts() {
    // Inventory Chart
    const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
    if (window.inventoryChart) {
        window.inventoryChart.destroy();
    }
    window.inventoryChart = new Chart(inventoryCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Entradas',
                    data: [120, 190, 170, 210, 180, 220],
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Salidas',
                    data: [90, 120, 140, 160, 150, 190],
                    borderColor: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Stock Report Chart
    const stockReportCtx = document.getElementById('stockReportChart').getContext('2d');
    if (window.stockReportChart) {
        window.stockReportChart.destroy();
    }
    window.stockReportChart = new Chart(stockReportCtx, {
        type: 'bar',
        data: {
            labels: ['Periféricos', 'Monitores', 'Almacenamiento', 'Componentes'],
            datasets: [{
                label: 'Stock actual',
                data: [32, 15, 28, 45],
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(139, 92, 246, 0.7)'
                ],
                borderColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(139, 92, 246, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', function () {
    initCharts();
});

// script para el grafico dashboard

const ctx = document.getElementById('inventoryChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
        datasets: [{
            label: 'Movimientos',
            data: [10, -5, 8, -3, 7, 4, -2],
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});