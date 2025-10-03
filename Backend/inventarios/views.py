from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from inventarios.models import Inventario
from inventarios.serializers import InventarioSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from detalleOperaciones.models import DetalleOperaciones
from inventarios.models import Inventario
from django.db.models import Sum, Case, When, IntegerField, F

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer
    

@api_view(['GET'])
def contenido_inventario(request, idInventario):
    try:
        inventario = Inventario.objects.get(idInventario=idInventario)

        operaciones = DetalleOperaciones.objects.filter(inventario=inventario)

        resumen = operaciones.values(
            'producto__idProducto',
            'producto__nombre',
            'producto__codigo',
            'producto__descripcion',
            'producto__categoria__idCategoria',
            'producto__categoria__nombre'
        ).annotate(
            entradas=Sum(
                Case(
                    When(tipo_operacion='entrada', then=F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
            salidas=Sum(
                Case(
                    When(tipo_operacion='salida', then=F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            ),
            stock=Sum(
                Case(
                    When(tipo_operacion='entrada', then=F('cantidad')),
                    When(tipo_operacion='salida', then=-1 * F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            )
        )

        return Response(list(resumen), status=status.HTTP_200_OK)

    except Inventario.DoesNotExist:
        return Response({'error': 'Inventario no encontrado'}, status=status.HTTP_404_NOT_FOUND)