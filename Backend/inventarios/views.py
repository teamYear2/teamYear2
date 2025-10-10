from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.db.models import Sum, Case, When, IntegerField, F
from inventarios.models import Inventario
from inventarios.serializers import InventarioSerializer
from detalleOperaciones.models import DetalleOperaciones


class InventarioViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el modelo Inventario
    Gestiona los inventarios y sus operaciones
    """
    queryset = Inventario.objects.all()
    serializer_class = InventarioSerializer

    def get_queryset(self):
        """
        Ordenar por fecha de creación
        """
        return Inventario.objects.all().order_by('-fecha_creacion')

    @action(detail=True, methods=['get'])
    def contenido(self, request, pk=None):
        """
        Obtener el contenido detallado de un inventario
        GET /api/inventarios/{id}/contenido/
        """
        try:
            inventario = self.get_object()
            operaciones = DetalleOperaciones.objects.filter(
                inventario=inventario)

            resumen = operaciones.values(
                'producto__idProducto',
                'producto__nombre',
                'producto__codigo',
                'producto__descripcion',
                'producto__precio'
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
            return Response(
                {'error': 'Inventario no encontrado'},
                status=status.HTTP_404_NOT_FOUND
            )

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

    @action(detail=False, methods=['get'])
    def estadisticas_generales(self, request):
        """
        Obtener estadísticas generales de todos los inventarios
        GET /api/inventarios/estadisticas_generales/
        """
        total_inventarios = Inventario.objects.count()

        # Stock total de todos los inventarios
        stock_global = DetalleOperaciones.objects.aggregate(
            total=Sum(
                Case(
                    When(tipo_operacion='entrada', then=F('cantidad')),
                    When(tipo_operacion='salida', then=-1 * F('cantidad')),
                    default=0,
                    output_field=IntegerField()
                )
            )
        )['total'] or 0

        return Response({
            'total_inventarios': total_inventarios,
            'stock_global': stock_global
        })


@api_view(['GET'])
def contenido_inventario(request, idInventario):
    """
    DEPRECATED: Usar /api/inventarios/{id}/contenido/ en su lugar
    Obtener el contenido de un inventario específico
    """
    try:
        inventario = Inventario.objects.get(idInventario=idInventario)
        operaciones = DetalleOperaciones.objects.filter(inventario=inventario)

        resumen = operaciones.values(
            'producto__idProducto',
            'producto__nombre',
            'producto__codigo',
            'producto__descripcion',
            'producto__precio'
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
