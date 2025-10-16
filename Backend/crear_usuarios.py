"""
Script para crear usuarios de prueba
Ejecutar desde la carpeta Backend con: python crear_usuarios.py
"""
from usuarios.models import Usuario
from inventarios.models import Inventario
import os
import django

# Configurar Django PRIMERO
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'InventarioProBack.settings')
django.setup()

# LUEGO importar los modelos


def crear_usuarios_prueba():
    """Crear usuarios de prueba con sus inventarios"""
    print("\n" + "="*60)
    print("🔐 CREANDO USUARIOS DE PRUEBA")
    print("="*60)

    # Verificar si ya existen usuarios
    if Usuario.objects.exists():
        print("\n⚠️  Ya existen usuarios en la base de datos.")
        respuesta = input(
            "¿Desea eliminar todos los usuarios existentes? (s/n): ")
        if respuesta.lower() == 's':
            Usuario.objects.all().delete()
            print("✅ Usuarios eliminados")
        else:
            print("❌ Operación cancelada")
            return

    # Verificar si hay inventarios
    if not Inventario.objects.exists():
        print("\n⚠️  No hay inventarios en la base de datos.")
        print("Por favor, ejecute primero: python poblar_datos.py")
        return

    # Obtener el primer inventario
    inventario_principal = Inventario.objects.first()

    usuarios_data = [
        {
            "dni": 12345678,
            "nombre": "Admin",
            "apellido": "Sistema",
            "email": "admin@inventario.com",
            "telefono": 1234567890,
            "contrasena": "admin123",
            "referido": "",
            "idInventario": inventario_principal
        },
        {
            "dni": 23456789,
            "nombre": "Usuario",
            "apellido": "Prueba",
            "email": "usuario@inventario.com",
            "telefono": 1122334455,
            "contrasena": "user123",
            "referido": "",
            "idInventario": inventario_principal
        },
        {
            "dni": 34567890,
            "nombre": "Juan",
            "apellido": "Pérez",
            "email": "juan@inventario.com",
            "telefono": 1155667788,
            "contrasena": "juan123",
            "referido": "",
            "idInventario": inventario_principal
        },
        {
            "dni": 45678901,
            "nombre": "María",
            "apellido": "González",
            "email": "maria@inventario.com",
            "telefono": 1166778899,
            "contrasena": "maria123",
            "referido": "",
            "idInventario": inventario_principal
        },
        {
            "dni": 56789012,
            "nombre": "Carlos",
            "apellido": "López",
            "email": "carlos@inventario.com",
            "telefono": 1177889900,
            "contrasena": "carlos123",
            "referido": "",
            "idInventario": inventario_principal
        }
    ]

    print(
        f"\n📝 Creando usuarios en el inventario: {inventario_principal.descripcion}")
    print()

    for data in usuarios_data:
        usuario = Usuario.objects.create(**data)
        print(f"✅ Usuario creado:")
        print(f"   👤 Nombre: {usuario.nombre} {usuario.apellido}")
        print(f"   📧 Email: {usuario.email}")
        print(f"   🔑 Contraseña: {data['contrasena']}")
        print(f"   🆔 DNI: {usuario.dni}")
        print()

    print("="*60)
    print("📊 RESUMEN")
    print("="*60)
    print(f"\n✅ {len(usuarios_data)} usuarios creados exitosamente")
    print("\n🔐 CREDENCIALES PARA LOGIN:")
    print("-" * 60)
    for data in usuarios_data:
        print(
            f"📧 Email: {data['email']:30} | 🔑 Password: {data['contrasena']}")
    print("-" * 60)
    print("\n💡 Usa estas credenciales para iniciar sesión en:")
    print("   http://localhost:4200/login")
    print("\n" + "="*60)


if __name__ == "__main__":
    crear_usuarios_prueba()
