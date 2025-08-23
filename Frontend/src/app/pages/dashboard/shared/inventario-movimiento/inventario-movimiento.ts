import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {
  Chart,
  ChartDataset,
  ChartOptions,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Filler
} from 'chart.js';

@Component({
  selector: 'app-inventario-movimiento',
  standalone: true,
  imports: [],
  templateUrl: './inventario-movimiento.html',
  styleUrls: ['./inventario-movimiento.css']
})
export class InventarioMovimiento implements AfterViewInit, OnDestroy {
  @ViewChild('inventoryChart') inventoryChartRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'line'>;

  constructor() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, Filler);
  }

  public inventoryType: 'line' = 'line';

  // Etiquetas como en la maqueta
  public inventoryLabels: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  // Datos de ejemplo estilo maqueta (puedes reemplazar por los tuyos)
  private movimientos = [10, -5, 8, -3, 7, 3, -2];

  // opciones estilo “vanilla mockup”
  public inventoryOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // usamos el wrapper con height fija
    plugins: {
      legend: {
        position: 'top',
        align: 'center',
        labels: { usePointStyle: true, pointStyle: 'line', padding: 16 }
      },
      tooltip: {
        intersect: false,
        mode: 'index',
        callbacks: {
          label: (ctx) => ` ${ctx.dataset.label}: ${ctx.parsed.y}`
        }
      }
    },
    elements: {
      line: { borderWidth: 3, tension: 0.35, borderCapStyle: 'round' },
      point: { radius: 3, hoverRadius: 5, hitRadius: 10 }
    },
    scales: {
      x: {
        type: 'category',
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: { maxRotation: 0 }
      },
      y: {
        type: 'linear',
        beginAtZero: false,
        grid: { color: 'rgba(0,0,0,0.06)' },
        ticks: { stepSize: 2 } // ajusta a gusto
      }
    }
  };

  ngAfterViewInit(): void {
    const canvas = this.inventoryChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Degradado suave azul como en la maqueta
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(59,130,246,0.25)'); // azul 500 ~25%
    gradient.addColorStop(1, 'rgba(59,130,246,0.02)'); // casi transparente

    const dataset: ChartDataset<'line'> = {
      label: 'Movimientos',
      data: this.movimientos,
      borderColor: '#3B82F6',        // azul
      backgroundColor: gradient,     // relleno degradado
      fill: true
    };

    this.chart = new Chart(ctx, {
      type: this.inventoryType,
      data: {
        labels: this.inventoryLabels,
        datasets: [dataset]
      },
      options: this.inventoryOptions
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }
}
