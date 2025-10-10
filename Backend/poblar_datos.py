"""
Script para poblar la base de datos con datos de prueba
Ejecutar desde la carpeta Backend con: python poblar_datos.py
"""
from decimal import Decimal
from detalleOperaciones.models import DetalleOperaciones
from inventarios.models import Inventario
from productos.models import Producto
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'InventarioProBack.settings')
django.setup()


def limpiar_datos():
    """Eliminar todos los datos existentes"""
    print("🗑️  Limpiando datos existentes...")
    DetalleOperaciones.objects.all().delete()
    Producto.objects.all().delete()
    Inventario.objects.all().delete()
    print("✅ Datos eliminados")


def crear_productos():
    """Crear productos de ejemplo"""
    print("\n📦 Creando productos...")

    productos_data = [
        {"codigo": "001", "nombre": "Manzana",
            "descripcion": "Manzana roja fresca", "precio": Decimal("2.50")},
        {"codigo": "002", "nombre": "Banana",
            "descripcion": "Banana amarilla madura", "precio": Decimal("1.80")},
        {"codigo": "003", "nombre": "Naranja",
            "descripcion": "Naranja valenciana", "precio": Decimal("3.00")},
        {"codigo": "004", "nombre": "Leche",
            "descripcion": "Leche entera 1L", "precio": Decimal("4.50")},
        {"codigo": "005", "nombre": "Pan",
            "descripcion": "Pan francés", "precio": Decimal("1.20")},
        {"codigo": "006", "nombre": "Arroz",
            "descripcion": "Arroz blanco 1kg", "precio": Decimal("5.00")},
        {"codigo": "007", "nombre": "Fideos",
            "descripcion": "Fideos secos 500g", "precio": Decimal("3.50")},
        {"codigo": "008", "nombre": "Aceite",
            "descripcion": "Aceite de girasol 1L", "precio": Decimal("6.00")},
        {"codigo": "009", "nombre": "Azúcar",
            "descripcion": "Azúcar blanca 1kg", "precio": Decimal("2.80")},
        {"codigo": "010", "nombre": "Café",
            "descripcion": "Café molido 250g", "precio": Decimal("8.00")},
        {"codigo": "011", "nombre": "Té",
            "descripcion": "Té negro en saquitos", "precio": Decimal("3.20")},
        {"codigo": "012", "nombre": "Galletas",
            "descripcion": "Galletas de agua", "precio": Decimal("2.00")},
        {"codigo": "013", "nombre": "Chocolate",
            "descripcion": "Chocolate con leche 100g", "precio": Decimal("4.00")},
        {"codigo": "014", "nombre": "Yogurt",
            "descripcion": "Yogurt natural 1L", "precio": Decimal("3.80")},
        {"codigo": "015", "nombre": "Queso",
            "descripcion": "Queso cremoso 200g", "precio": Decimal("5.50")},
    ]

    productos = []
    for data in productos_data:
        producto = Producto.objects.create(**data)
        productos.append(producto)
        print(f"   ✓ {producto.nombre} - ${producto.precio}")

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

    # Entradas iniciales para todos los productos
    print("   📥 Creando entradas...")
    operaciones = []
    for i, producto in enumerate(productos):
        cantidad_entrada = 50 + (i * 10)  # Cantidades variadas
        operacion = DetalleOperaciones.objects.create(
            inventario=inventario_principal,
            producto=producto,
            cantidad=cantidad_entrada,
            tipo_operacion='entrada'
        )
        operaciones.append(operacion)
        print(
            f"      ✓ Entrada: {producto.nombre} - {cantidad_entrada} unidades")

    # Salidas para algunos productos
    print("   📤 Creando salidas...")
    salidas_data = [
        (productos[0], 20),  # Manzana
        (productos[1], 15),  # Banana
        (productos[3], 10),  # Leche
        (productos[4], 30),  # Pan
        (productos[6], 8),   # Fideos
        (productos[9], 5),   # Café
        (productos[11], 12),  # Galletas
        (productos[13], 7),  # Yogurt
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

    # Inventario Secundario
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
    productos = crear_productos()
    inventarios = crear_inventarios()
    operaciones = crear_operaciones(productos, inventarios)

    # Mostrar resumen
    mostrar_resumen()

    print("\n✅ ¡Datos creados exitosamente!\n")


if __name__ == "__main__":
    main()
