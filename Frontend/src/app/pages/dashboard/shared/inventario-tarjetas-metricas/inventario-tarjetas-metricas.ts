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
  ];

}
