"""
Script para poblar la base de datos con datos de prueba
Ejecutar desde la carpeta Backend con: python poblar_datos.py
"""
from categorias.models import Categoria
from productos.models import Producto
from inventarios.models import Inventario
from detalleOperaciones.models import DetalleOperaciones
import os
import django
from decimal import Decimal

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'InventarioProBack.settings')
django.setup()

# Ahora sí importar los modelos


def limpiar_datos():
    """Eliminar todos los datos existentes"""
    print("🗑️  Limpiando datos existentes...")
    DetalleOperaciones.objects.all().delete()
    Producto.objects.all().delete()
    Inventario.objects.all().delete()
    Categoria.objects.all().delete()
    print("✅ Datos eliminados")


def crear_categorias():
    """Crear categorías de ejemplo"""
    print("\n📁 Creando categorías...")

    categorias_data = [
        {"nombre": "Frutas y Verduras"},
        {"nombre": "Lácteos"},
        {"nombre": "Panadería"},
        {"nombre": "Almacén"},
        {"nombre": "Bebidas"},
        {"nombre": "Fiambres"},
    ]

    categorias = []
    for data in categorias_data:
        categoria = Categoria.objects.create(**data)
        categorias.append(categoria)
        print(f"   ✓ {categoria.nombre}")

    print(f"✅ {len(categorias)} categorías creadas")
    return categorias


def crear_productos(categorias):
    """Crear productos de ejemplo"""
    print("\n📦 Creando productos...")

    # Asignar categorías
    frutas = categorias[0]
    lacteos = categorias[1]
    panaderia = categorias[2]
    almacen = categorias[3]
    bebidas = categorias[4]
    fiambres = categorias[5]

    productos_data = [
        {"codigo": "001", "nombre": "Manzana",
            "descripcion": "Manzana roja fresca", "categoria": frutas},
        {"codigo": "002", "nombre": "Banana",
            "descripcion": "Banana amarilla madura", "categoria": frutas},
        {"codigo": "003", "nombre": "Naranja",
            "descripcion": "Naranja valenciana", "categoria": frutas},
        {"codigo": "004", "nombre": "Leche",
            "descripcion": "Leche entera 1L", "categoria": lacteos},
        {"codigo": "005", "nombre": "Pan",
            "descripcion": "Pan francés", "categoria": panaderia},
        {"codigo": "006", "nombre": "Arroz",
            "descripcion": "Arroz blanco 1kg", "categoria": almacen},
        {"codigo": "007", "nombre": "Fideos",
            "descripcion": "Fideos secos 500g", "categoria": almacen},
        {"codigo": "008", "nombre": "Aceite",
            "descripcion": "Aceite de girasol 1L", "categoria": almacen},
        {"codigo": "009", "nombre": "Azúcar",
            "descripcion": "Azúcar blanca 1kg", "categoria": almacen},
        {"codigo": "010", "nombre": "Café",
            "descripcion": "Café molido 250g", "categoria": bebidas},
        {"codigo": "011", "nombre": "Té",
            "descripcion": "Té negro en saquitos", "categoria": bebidas},
        {"codigo": "012", "nombre": "Galletas",
            "descripcion": "Galletas de agua", "categoria": panaderia},
        {"codigo": "013", "nombre": "Chocolate",
            "descripcion": "Chocolate con leche 100g", "categoria": almacen},
        {"codigo": "014", "nombre": "Yogurt",
            "descripcion": "Yogurt natural 1L", "categoria": lacteos},
        {"codigo": "015", "nombre": "Queso",
            "descripcion": "Queso cremoso 200g", "categoria": lacteos},
        {"codigo": "016", "nombre": "Manteca",
            "descripcion": "Manteca sin sal 200g", "categoria": lacteos},
        {"codigo": "017", "nombre": "Jamón",
            "descripcion": "Jamón cocido 500g", "categoria": fiambres},
        {"codigo": "018", "nombre": "Salchichas",
            "descripcion": "Salchichas viena x12", "categoria": fiambres},
        {"codigo": "019", "nombre": "Huevos",
            "descripcion": "Huevos blancos x12", "categoria": lacteos},
        {"codigo": "020", "nombre": "Agua Mineral",
            "descripcion": "Agua mineral 2L", "categoria": bebidas},
    ]

    productos = []
    for data in productos_data:
        producto = Producto.objects.create(**data)
        productos.append(producto)
        print(f"   ✓ {producto.nombre}")

    print(f"✅ {len(productos)} productos creados")
    return productos


def crear_inventarios():
    """Crear inventarios de ejemplo"""
    print("\n📊 Creando inventarios...")

    inventarios_data = [
        {"descripcion": "Inventario Principal - Almacén Central"},
        {"descripcion": "Inventario Secundario - Sucursal Norte"},
    ]

    inventarios = []
    for data in inventarios_data:
        inventario = Inventario.objects.create(**data)
        inventarios.append(inventario)
        print(f"   ✓ {inventario.descripcion}")

    print(f"✅ {len(inventarios)} inventarios creados")
    return inventarios


def crear_operaciones(productos, inventarios):
    """Crear operaciones de entrada y salida"""
    print("\n🔄 Creando operaciones...")

    # Inventario Principal
    inventario_principal = inventarios[0]

    # Entradas iniciales para todos los productos (con cantidades variadas)
    print("   📥 Creando entradas...")
    operaciones = []
    entradas_cantidades = [
        50, 45, 60, 40, 80, 55, 70, 50, 65, 35,  # Productos 1-10
        40, 75, 55, 45, 50, 30, 40, 35, 60, 100  # Productos 11-20
    ]

    for i, producto in enumerate(productos):
        cantidad_entrada = entradas_cantidades[i]
        operacion = DetalleOperaciones.objects.create(
            inventario=inventario_principal,
            producto=producto,
            cantidad=cantidad_entrada,
            tipo_operacion='entrada'
        )
        operaciones.append(operacion)
        print(
            f"      ✓ Entrada: {producto.nombre} - {cantidad_entrada} unidades")

    # Salidas para crear productos MÁS VENDIDOS y con BAJO STOCK
    print("   📤 Creando salidas (ventas)...")

    # Productos más vendidos (muchas salidas)
    salidas_data = [
        # Productos muy vendidos (top ventas)
        (productos[4], 70),   # Pan - stock final: 10 (BAJO STOCK)
        (productos[19], 95),  # Agua - stock final: 5 (BAJO STOCK)
        (productos[3], 35),   # Leche - stock final: 5 (BAJO STOCK)
        (productos[0], 45),   # Manzana - stock final: 5 (BAJO STOCK)
        (productos[11], 70),  # Galletas - stock final: 5 (BAJO STOCK)

        # Productos medianamente vendidos
        (productos[1], 38),   # Banana - stock final: 7 (BAJO STOCK)
        (productos[6], 62),   # Fideos - stock final: 8 (BAJO STOCK)
        (productos[9], 28),   # Café - stock final: 7 (BAJO STOCK)
        (productos[13], 37),  # Yogurt - stock final: 8 (BAJO STOCK)
        (productos[2], 52),   # Naranja - stock final: 8 (BAJO STOCK)

        # Productos poco vendidos
        (productos[5], 30),   # Arroz - stock final: 25
        (productos[7], 25),   # Aceite - stock final: 25
        (productos[8], 35),   # Azúcar - stock final: 30
        (productos[10], 20),  # Té - stock final: 20
        (productos[12], 30),  # Chocolate - stock final: 25
        (productos[14], 25),  # Queso - stock final: 25
        (productos[15], 15),  # Manteca - stock final: 15
        (productos[16], 20),  # Jamón - stock final: 20
        (productos[17], 18),  # Salchichas - stock final: 17
        (productos[18], 40),  # Huevos - stock final: 20
    ]

    for producto, cantidad in salidas_data:
        operacion = DetalleOperaciones.objects.create(
            inventario=inventario_principal,
            producto=producto,
            cantidad=cantidad,
            tipo_operacion='salida'
        )
        operaciones.append(operacion)
        print(f"      ✓ Salida: {producto.nombre} - {cantidad} unidades")

    # Inventario Secundario (opcional)
    if len(inventarios) > 1:
        inventario_secundario = inventarios[1]
        print("   📥 Creando entradas para inventario secundario...")
        for i in range(5):  # Primeros 5 productos
            producto = productos[i]
            cantidad = 20 + (i * 5)
            operacion = DetalleOperaciones.objects.create(
                inventario=inventario_secundario,
                producto=producto,
                cantidad=cantidad,
                tipo_operacion='entrada'
            )
            operaciones.append(operacion)
            print(f"      ✓ Entrada: {producto.nombre} - {cantidad} unidades")

    print(f"✅ {len(operaciones)} operaciones creadas")
    return operaciones


def mostrar_resumen():
    """Mostrar resumen de datos creados"""
    print("\n" + "="*60)
    print("📊 RESUMEN DE DATOS CREADOS")
    print("="*60)

    total_productos = Producto.objects.count()
    total_inventarios = Inventario.objects.count()
    total_operaciones = DetalleOperaciones.objects.count()
    total_entradas = DetalleOperaciones.objects.filter(
        tipo_operacion='entrada').count()
    total_salidas = DetalleOperaciones.objects.filter(
        tipo_operacion='salida').count()

    print(f"\n📦 Productos: {total_productos}")
    print(f"📊 Inventarios: {total_inventarios}")
    print(f"🔄 Operaciones totales: {total_operaciones}")
    print(f"   📥 Entradas: {total_entradas}")
    print(f"   📤 Salidas: {total_salidas}")

    print("\n🔗 Endpoints para probar:")
    print("   • http://127.0.0.1:8000/api/productos/")
    print("   • http://127.0.0.1:8000/api/inventarios/")
    print("   • http://127.0.0.1:8000/api/detalle-operaciones/")
    print("   • http://127.0.0.1:8000/api/inventarios/1/contenido/")
    print("   • http://127.0.0.1:8000/api/detalle-operaciones/estadisticas/")
    print("="*60)


def main():
    """Función principal"""
    print("\n" + "="*60)
    print("🚀 INICIANDO POBLACIÓN DE BASE DE DATOS")
    print("="*60)

    # Limpiar datos existentes
    limpiar_datos()

    # Crear datos
    categorias = crear_categorias()
    productos = crear_productos(categorias)
    inventarios = crear_inventarios()
    operaciones = crear_operaciones(productos, inventarios)

    # Mostrar resumen
    mostrar_resumen()

    print("\n✅ ¡Datos creados exitosamente!\n")


if __name__ == "__main__":
    main()
