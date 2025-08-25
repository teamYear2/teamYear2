import { Component } from '@angular/core';

interface Stat {
  id:number,
  title: string;
  value: string | number;
  iconClass?: string;    // ejemplo: "fas fa-boxes"
  colorClass?: string;   // ejemplo: "text-primary"
}

@Component({
  selector: 'app-inventario-tarjetas-metricas',
  imports: [],
  templateUrl: './inventario-tarjetas-metricas.html',
  styleUrl: './inventario-tarjetas-metricas.css'
})


export class InventarioTarjetasMetricas {

  stats: Stat[] = [
    { id:1, title: 'Productos', value: '1,248', iconClass: 'fas fa-boxes', colorClass: 'text-primary' },
    { id:2,  title: 'Disponibles', value: '956', iconClass: 'fas fa-check-circle', colorClass: 'text-success' },
    { id:3, title: 'Bajo stock', value: '42', iconClass: 'fas fa-exclamation-triangle', colorClass: 'text-warning' },
    { id:4, title: 'Agotados', value: '15', iconClass: 'fas fa-times-circle', colorClass: 'text-danger' },
  ];

}
