export interface Movimiento {
  id?: number;
  producto_id: number;
  inventario_id: number;
  tipo_operacion: 'entrada' | 'salida';
  cantidad: number;
}
