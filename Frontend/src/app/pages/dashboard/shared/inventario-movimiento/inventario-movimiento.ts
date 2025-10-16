import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartDataset, ChartOptions, LineController, LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip, Filler } from 'chart.js';
import { MovimientoService } from '../../../../service/movimiento/movimiento.service';

@Component({
  selector: 'app-inventario-movimiento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario-movimiento.html',
  styleUrls: ['./inventario-movimiento.css']
})
export class InventarioMovimiento implements AfterViewInit, OnDestroy {
  @ViewChild('inventoryChart') inventoryChartRef!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart<'line'>;

  public diasSeleccionados = 7;
  public movimientos: any[] = [];
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
      y: { type: 'linear', beginAtZero: true, grid: { color: 'rgba(0,0,0,0.06)' }, ticks: { stepSize: 10 } }
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
    const dataEntradas: number[] = [];
    const dataSalidas: number[] = [];

    for (let i = dias - 1; i >= 0; i--) {
      const dia = new Date();
      dia.setDate(hoy.getDate() - i);
      dia.setHours(0, 0, 0, 0);
      
      const diaSiguiente = new Date(dia);
      diaSiguiente.setDate(dia.getDate() + 1);

      // Filtrar movimientos de ese día
      const movimientosDia = this.movimientos.filter(m => {
        const mFecha = new Date(m.fecha);
        return mFecha >= dia && mFecha < diaSiguiente;
      });

      // Sumar entradas y salidas por separado
      const totalEntradas = movimientosDia
        .filter(m => m.tipo_operacion === 'entrada')
        .reduce((acc, m) => acc + m.cantidad, 0);
      
      const totalSalidas = movimientosDia
        .filter(m => m.tipo_operacion === 'salida')
        .reduce((acc, m) => acc + m.cantidad, 0);

      dataEntradas.push(totalEntradas);
      dataSalidas.push(totalSalidas);

      // Formato de fecha simple
      labels.push(dia.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }));
    }

    // Actualizar datos del gráfico
    this.chart.data.labels = labels;
    this.chart.data.datasets = [
      {
        label: 'Entradas',
        data: dataEntradas,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true
      },
      {
        label: 'Salidas',
        data: dataSalidas,
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true
      }
    ];

    this.chart.update();
  }
}
