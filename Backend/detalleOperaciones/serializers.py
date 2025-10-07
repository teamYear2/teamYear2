# operaciones/serializers.py
from rest_framework import serializers
from detalleOperaciones.models import DetalleOperaciones
from productos.models import Producto
from inventarios.models import Inventario
from productos.serializers import ProductoSerializer
from inventarios.serializers import InventarioSerializer

class DetalleOperacionesSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer(read_only=True)
    producto_id = serializers.PrimaryKeyRelatedField(
        queryset=Producto.objects.all(), source='producto', write_only=True
    )

    inventario = InventarioSerializer(read_only=True)
    inventario_id = serializers.PrimaryKeyRelatedField(
        queryset=Inventario.objects.all(), source='inventario', write_only=True
    )

    class Meta:
        model = DetalleOperaciones
        fields = [
            'idOperaciones',
            'producto',
            'producto_id',
            'inventario',
            'inventario_id',
            'cantidad',
            'tipo_operacion',
            'fecha'
        ]