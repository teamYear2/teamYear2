export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  estado: 'Disponible' | 'Agotado';
  unidadesVendidas: number;
}
