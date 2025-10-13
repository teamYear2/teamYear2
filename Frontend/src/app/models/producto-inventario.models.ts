export interface ProductoInventario {
  productoId: number;
  nombre: string;
  codigo: string;
  entradas: number;
  salidas: number;
  stock: number;
  categoria: string;
  estado: 'Disponible' | 'Agotado';
}
