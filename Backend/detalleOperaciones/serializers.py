# operaciones/serializers.py
from rest_framework import serializers
from detalleOperaciones.models import DetalleOperaciones
from productos.models import Producto
from inventarios.models import Inventario
from productos.serializers import ProductoSerializer
from inventarios.serializers import InventarioSerializer
from django.db.models import Sum


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
        read_only_fields = ('idOperaciones', 'fecha')

    def validate_cantidad(self, value):
        """
        Validar que la cantidad sea positiva
        """
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a 0")
        return value

    def validate(self, data):
        """
        Validaciones a nivel de objeto
        """
        # Validar que si es una salida, haya suficiente stock
        if data.get('tipo_operacion') == 'salida':
            producto = data.get('producto')
            cantidad = data.get('cantidad')

            # Calcular stock actual del producto
            entradas = DetalleOperaciones.objects.filter(
                producto=producto,
                tipo_operacion='entrada'
            ).aggregate(total=Sum('cantidad'))['total'] or 0

            salidas = DetalleOperaciones.objects.filter(
                producto=producto,
                tipo_operacion='salida'
            ).aggregate(total=Sum('cantidad'))['total'] or 0

            stock_actual = entradas - salidas

            if cantidad > stock_actual:
                raise serializers.ValidationError({
                    'cantidad': f'Stock insuficiente. Stock actual: {stock_actual}, intentando sacar: {cantidad}'
                })

        return data
