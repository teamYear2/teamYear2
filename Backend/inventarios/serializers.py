# inventarios/serializers.py
from rest_framework import serializers
from inventarios.models import Inventario
from django.db.models import Sum, Case, When, IntegerField, F


class InventarioSerializer(serializers.ModelSerializer):
    stock_total = serializers.SerializerMethodField()

    class Meta:
        model = Inventario
        fields = ['idInventario', 'descripcion',
                  'fecha_creacion', 'stock_total']
        read_only_fields = ('idInventario', 'fecha_creacion', 'stock_total')

    def get_stock_total(self, obj):
        """
        Calcula el stock total del inventario sumando todas las operaciones
        """
        from detalleOperaciones.models import DetalleOperaciones

        stock = DetalleOperaciones.objects.filter(
            inventario=obj
        ).aggregate(
            total=Sum(
                Case(
                    When(tipo_operacion='entrada', then=F('cantidad')),
                    When(tipo_operacion='salida', then=-1 * F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            )
        )['total'] or 0

        return stock

    def validate_descripcion(self, value):
        """
        Validar que la descripción no esté vacía
        """
        if not value or value.strip() == '':
            raise serializers.ValidationError(
                "La descripción no puede estar vacía")
        return value.strip()
