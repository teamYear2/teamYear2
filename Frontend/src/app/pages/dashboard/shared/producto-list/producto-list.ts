import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Producto {
  id:number,
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  estado: 'Disponible' | 'Agotado';
}

@Component({
  selector: 'app-producto-list',
  standalone: true,
  templateUrl: './producto-list.html',
  styleUrls: ['./producto-list.css']
})
export class ProductoList {
  productos: Producto[] = [
    {
      id:1,
      codigo: 'DIS-008',
      nombre: 'Disco Duro 1TB',
      categoria: 'Almacenamiento',
      stock: 0,
      precio: 49.99,
      estado: 'Agotado'
    },
    {
      id:2,
      codigo: 'TEC-002',
      nombre: 'Mouse Inalámbrico',
      categoria: 'Periféricos',
      stock: 25,
      precio: 19.99,
      estado: 'Disponible'
    },
    {
      id:3,
      codigo: 'TEC-003',
      nombre: 'Teclado Mecánico',
      categoria: 'Periféricos',
      stock: 10,
      precio: 89.99,
      estado: 'Disponible'
    },
    {
  id: 4,
  codigo: 'MON-004',
  nombre: 'Monitor 27"',
  categoria: 'Monitores',
  stock: 7,
  precio: 199.99,
  estado: 'Disponible'
},
{
  id: 5,
  codigo: 'IMP-005',
  nombre: 'Impresora Láser',
  categoria: 'Impresoras',
  stock: 3,
  precio: 129.99,
  estado: 'Disponible'
},
{
  id: 6,
  codigo: 'AUD-006',
  nombre: 'Auriculares Bluetooth',
  categoria: 'Audio',
  stock: 12,
  precio: 59.99,
  estado: 'Disponible'
},
{
  id: 7,
  codigo: 'DIS-007',
  nombre: 'SSD 512GB',
  categoria: 'Almacenamiento',
  stock: 8,
  precio: 79.99,
  estado: 'Disponible'
},
{
  id: 8,
  codigo: 'CAM-008',
  nombre: 'Cámara Web HD',
  categoria: 'Periféricos',
  stock: 5,
  precio: 49.99,
  estado: 'Disponible'
}

  ];

  constructor(private router: Router) {}

  changeSection(section: string) {
    this.router.navigate([`/dashboard/${section}`]);
  }
}
