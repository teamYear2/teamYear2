import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Chart, ChartDataset, ChartOptions, LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, Filler } from 'chart.js';
import { Movimiento } from '../../../../models/movimiento.model';
import { MovimientoService } from '../../../../service/movimiento/movimiento.service';

@Component({
  selector: 'app-inventario-movimiento',
  standalone: true,
  templateUrl: './inventario-movimiento.html',
  styleUrls: ['./inventario-movimiento.css']
})
export class InventarioMovimiento implements AfterViewInit, OnDestroy {
  @ViewChild('inventoryChart') inventoryChartRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'line'>;

  public diasSeleccionados = 7;
  public movimientos: Movimiento[] = [];
  public inventoryLabels: string[] = [];
  public inventoryType: 'line' = 'line';

  public inventoryOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', align: 'center', labels: { usePointStyle: true, pointStyle: 'line', padding: 16 } },
      tooltip: {
        intersect: false,
        mode: 'index',
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y}`
        }
      }
    },
    elements: {
      line: { borderWidth: 3, tension: 0.35, borderCapStyle: 'round' },
      point: { radius: 3, hoverRadius: 5, hitRadius: 10 }
    },
    scales: {
      x: { type: 'category', grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { maxRotation: 0 } },
      y: { type: 'linear', beginAtZero: false, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { stepSize: 2 } }
    }
  };

  constructor(private movimientoService: MovimientoService) {
    Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, Filler);
  }

  ngAfterViewInit(): void {
    this.movimientoService.getMovimientos().subscribe(movs => {
      this.movimientos = movs;
      this.inicializarGrafico();
    });
  }

  ngOnDestroy(): void {
    this.chart?.destroy();
  }

  onChangeDias(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.diasSeleccionados = Number(select.value);
    this.actualizarGrafico();
  }

  private inicializarGrafico() {
    const canvas = this.inventoryChartRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(59,130,246,0.25)');
    gradient.addColorStop(1, 'rgba(59,130,246,0.02)');

    this.chart = new Chart(ctx, {
      type: this.inventoryType,
      data: { labels: [], datasets: [] },
      options: this.inventoryOptions
    });

    this.actualizarGrafico();
  }

  private actualizarGrafico() {
  if (!this.chart) return;

  const hoy = new Date();
  const dias = this.diasSeleccionados;
  const labels: string[] = [];
  const data: number[] = [];

  for (let i = dias - 1; i >= 0; i--) {
    const dia = new Date();
    dia.setDate(hoy.getDate() - i);

    // Filtrar movimientos de ese día
    const movimientosDia = this.movimientos.filter(m => {
      const mFecha = new Date(m.fecha);
      return mFecha.getFullYear() === dia.getFullYear() &&
             mFecha.getMonth() === dia.getMonth() &&
             mFecha.getDate() === dia.getDate();
    });

    // Sumar cantidad de movimientos
    const totalDia = movimientosDia.reduce((acc, m) => acc + (m.tipo === 'entrada' ? m.cantidad : -m.cantidad), 0);
    data.push(totalDia);

    // Crear etiquetas con fecha y hora (si hay más de un movimiento por día, puedes ajustar)
    if (movimientosDia.length > 0) {
      const horas = movimientosDia.map(m => {
        const mFecha = new Date(m.fecha);
        return mFecha.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }).join(', '); // Si hay varias horas en un día, las separa por coma
      labels.push(`${dia.toLocaleDateString()} (${horas})`);
    } else {
      labels.push(dia.toLocaleDateString());
    }
  }

  this.chart.data.labels = labels;
  this.chart.data.datasets = [{
    label: 'Movimientos',
    data: data,
    borderColor: '#3B82F6',
    backgroundColor: (this.chart.ctx as CanvasRenderingContext2D).createLinearGradient(0, 0, 0, this.chart.height),
    fill: true
  }];

  // Crear degradado para el dataset
  const ctx = this.chart.ctx as CanvasRenderingContext2D;
  const gradient = ctx.createLinearGradient(0, 0, 0, this.chart.height);
  gradient.addColorStop(0, 'rgba(59,130,246,0.25)');
  gradient.addColorStop(1, 'rgba(59,130,246,0.02)');
  (this.chart.data.datasets[0] as ChartDataset<'line'>).backgroundColor = gradient;

  this.chart.update();
}

}
