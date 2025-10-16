# 📊 Resumen de Datos de Prueba Creados

## ✅ Datos Poblados Exitosamente

### 📦 **20 Productos Creados**

Con stock calculado (Entradas - Salidas):

#### 🔴 **Productos con BAJO STOCK** (≤ 10 unidades):
| Producto       | Stock | Entradas | Salidas | Estado    |
|---------------|-------|----------|---------|-----------|
| Agua Mineral  | 5     | 100      | 95      | 🔴 Crítico |
| Manzana       | 5     | 50       | 45      | 🔴 Crítico |
| Leche         | 5     | 40       | 35      | 🔴 Crítico |
| Galletas      | 5     | 75       | 70      | 🔴 Crítico |
| Pan           | 10    | 80       | 70      | 🟡 Bajo    |
| Banana        | 7     | 45       | 38      | 🟡 Bajo    |
| Café          | 7     | 35       | 28      | 🟡 Bajo    |
| Fideos        | 8     | 70       | 62      | 🟡 Bajo    |
| Yogurt        | 8     | 45       | 37      | 🟡 Bajo    |
| Naranja       | 8     | 60       | 52      | 🟡 Bajo    |

#### 🟢 **Productos con STOCK NORMAL** (> 10 unidades):
| Producto      | Stock | Entradas | Salidas |
|--------------|-------|----------|---------|
| Manteca      | 15    | 30       | 15      |
| Salchichas   | 17    | 35       | 18      |
| Huevos       | 20    | 60       | 40      |
| Té           | 20    | 40       | 20      |
| Jamón        | 20    | 40       | 20      |
| Aceite       | 25    | 50       | 25      |
| Arroz        | 25    | 55       | 30      |
| Chocolate    | 25    | 55       | 30      |
| Queso        | 25    | 50       | 25      |
| Azúcar       | 30    | 65       | 35      |

---

### 🏆 **TOP 10 Productos MÁS VENDIDOS** (por salidas):

| Posición | Producto      | Unidades Vendidas | Stock Restante |
|----------|---------------|-------------------|----------------|
| 🥇 1     | Agua Mineral  | 95                | 5              |
| 🥈 2     | Pan           | 70                | 10             |
| 🥉 3     | Galletas      | 70                | 5              |
| 4        | Fideos        | 62                | 8              |
| 5        | Naranja       | 52                | 8              |
| 6        | Manzana       | 45                | 5              |
| 7        | Huevos        | 40                | 20             |
| 8        | Banana        | 38                | 7              |
| 9        | Yogurt        | 37                | 8              |
| 10       | Leche         | 35                | 5              |

---

### 📁 **6 Categorías Creadas:**

1. 🍎 Frutas y Verduras
2. 🥛 Lácteos
3. 🍞 Panadería
4. 📦 Almacén
5. 🥤 Bebidas
6. 🥓 Fiambres

---

### 📊 **2 Inventarios Creados:**

1. **Inventario Principal** - Almacén Central
   - 20 productos con movimientos
   - 25 entradas totales
   - 20 salidas totales

2. **Inventario Secundario** - Sucursal Norte
   - 5 productos (primeros 5 de la lista)
   - Solo entradas

---

## 🔄 **Movimientos de Inventario:**

### Total de Operaciones: **45**

- **📥 Entradas:** 25 operaciones
- **📤 Salidas (Ventas):** 20 operaciones

### Distribución de Salidas:
- **Alta rotación** (50+ unidades): 4 productos
- **Media rotación** (30-49 unidades): 4 productos
- **Baja rotación** (< 30 unidades): 12 productos

---

## 📈 **Dashboard - Datos Visibles:**

### **Tarjetas de Métricas:**
- ✅ **Productos:** 20
- ✅ **Disponibles:** Variable según stock
- ⚠️ **Bajo Stock:** 10 productos
- ❌ **Agotados:** 0

### **Gráfico de Movimiento:**
- Muestra entradas (verde) y salidas (rojo) por día
- Filtrable por: 7, 30 o 90 días

### **Productos Más Vendidos:**
- Top 10 con barras de progreso
- Colores según rendimiento (verde/amarillo/rojo)

### **Productos Bajo Stock:**
- 10 productos con stock ≤ 10
- Ordenados por stock ascendente
- Iconos con colores de alerta

---

## 🎯 **Características de los Datos:**

✅ **Realistas:** Cantidades y movimientos similares a un negocio real  
✅ **Variados:** Diferentes niveles de stock y rotación  
✅ **Visualizables:** Perfectos para probar dashboard y gráficos  
✅ **Completos:** Incluyen todas las relaciones (categorías, inventarios)  

---

## 🚀 **Cómo Repoblar:**

Si necesitas regenerar los datos:

```bash
cd Backend
python poblar_datos.py
```

**⚠️ ADVERTENCIA:** Esto eliminará TODOS los datos existentes (productos, inventarios, operaciones, categorías).

---

## 🔗 **Endpoints para Verificar:**

- **Productos:** http://127.0.0.1:8000/api/productos/
- **Inventarios:** http://127.0.0.1:8000/api/inventarios/
- **Operaciones:** http://127.0.0.1:8000/api/detalle-operaciones/
- **Estadísticas:** http://127.0.0.1:8000/api/detalle-operaciones/estadisticas/

---

**Última actualización:** 15 de octubre de 2025  
**Script:** `poblar_datos.py`  
**Estado:** ✅ Funcionando correctamente
