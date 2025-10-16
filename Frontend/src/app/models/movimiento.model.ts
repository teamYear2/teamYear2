export interface Movimiento {
  idOperaciones?: number;
  producto: {
    idProducto: number;
    nombre: string;
    codigo: string;
    descripcion?: string;
    categoria?: number;
  };
  producto_id?: number;
  inventario: {
    idInventario: number;
    descripcion: string;
  };
  inventario_id?: number;
  tipo_operacion: 'entrada' | 'salida';
  cantidad: number;
  fecha: string;
}
