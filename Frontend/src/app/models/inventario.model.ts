export interface EstadisticasInventario {
    total_entradas: number;
    total_salidas: number;
    stock_general: number;
    total_operaciones: number;
    ultimas_operaciones: OperacionDetalle[];
}

export interface OperacionDetalle {
    id: number;
    tipo_operacion: 'entrada' | 'salida';
    cantidad: number;
    fecha: string;
    producto_id: number;
    inventario_id: number;
    producto?: {
        nombre: string;
    };
}

export interface ProductoStock {
    producto_id: number;
    producto__nombre: string;
    stock: number;
    entradas?: number;
    salidas?: number;
}