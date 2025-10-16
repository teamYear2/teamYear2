from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Sum, Case, When, IntegerField, F
from inventarios.models import Inventario
from inventarios.serializers import InventarioSerializer
from detalleOperaciones.models import DetalleOperaciones


class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer


    @action(detail=True, methods=['get'])
    def productos_bajo_stock(self, request, pk=None):
        """
        Obtener productos con stock bajo (menor a 10 unidades)
        GET /api/inventarios/{id}/productos_bajo_stock/
        """
        inventario = self.get_object()
        limite = int(request.query_params.get('limite', 10))

        operaciones = DetalleOperaciones.objects.filter(inventario=inventario)

        resumen = operaciones.values(
            'producto__idProducto',
            'producto__nombre',
            'producto__codigo'
        ).annotate(
            stock=Sum(
                Case(
                    When(tipo_operacion='entrada', then=F('cantidad')),
                    When(tipo_operacion='salida', then=-1 * F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            )
        ).filter(stock__lt=limite).order_by('stock')

        return Response(list(resumen))


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
