from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Sum, Q, Count
from detalleOperaciones.models import DetalleOperaciones
from detalleOperaciones.serializers import DetalleOperacionesSerializer


class DetalleOperacionesViewSet(viewsets.ModelViewSet):
    queryset = DetalleOperaciones.objects.all()
    serializer_class = DetalleOperacionesSerializer

    def get_queryset(self):
        """
        Filtros personalizados por query params
        """
        queryset = DetalleOperaciones.objects.all().select_related('producto', 'inventario')

        # Filtrar por tipo de operación
        tipo = self.request.query_params.get('tipo_operacion', None)
        if tipo:
            queryset = queryset.filter(tipo_operacion=tipo)

        # Filtrar por producto
        producto_id = self.request.query_params.get('producto_id', None)
        if producto_id:
            queryset = queryset.filter(producto_id=producto_id)

        # Filtrar por inventario
        inventario_id = self.request.query_params.get('inventario_id', None)
        if inventario_id:
            queryset = queryset.filter(inventario_id=inventario_id)

        return queryset.order_by('-fecha')  # Más recientes primero


    @action(detail=False, methods=['get'])
    def historial_producto(self, request):
        """
        Obtener historial de operaciones de un producto específico
        GET /api/detalle-operaciones/historial_producto/?producto_id=1
        """
        producto_id = request.query_params.get('producto_id')
        if not producto_id:
            return Response(
                {"error": "Se requiere producto_id"},
                status=status.HTTP_400_BAD_REQUEST
            )

        operaciones = DetalleOperaciones.objects.filter(
            producto_id=producto_id
        ).order_by('-fecha')

        serializer = self.get_serializer(operaciones, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def estadisticas(self, request):
        """
        Obtener estadísticas generales de operaciones
        GET /api/detalle-operaciones/estadisticas/
        """
        # Total de entradas
        total_entradas = DetalleOperaciones.objects.filter(
            tipo_operacion='entrada'
        ).aggregate(total=Sum('cantidad'))['total'] or 0

        # Total de salidas
        total_salidas = DetalleOperaciones.objects.filter(
            tipo_operacion='salida'
        ).aggregate(total=Sum('cantidad'))['total'] or 0

        # Últimas 10 operaciones
        ultimas_operaciones = DetalleOperaciones.objects.all().order_by(
            '-fecha')[:10]

        return Response({
            'total_entradas': total_entradas,
            'total_salidas': total_salidas,
            'stock_general': total_entradas - total_salidas,
            'total_operaciones': DetalleOperaciones.objects.count(),
            'ultimas_operaciones': self.get_serializer(ultimas_operaciones, many=True).data
        })

    @action(detail=False, methods=['get'])
    def por_tipo(self, request):
        """
        Filtrar operaciones por tipo (entrada/salida)
        GET /api/detalle-operaciones/por_tipo/?tipo=entrada
        """
        tipo = request.query_params.get('tipo')
        if tipo not in ['entrada', 'salida']:
            return Response(
                {"error": "Tipo debe ser 'entrada' o 'salida'"},
                status=status.HTTP_400_BAD_REQUEST
            )

        operaciones = DetalleOperaciones.objects.filter(
            tipo_operacion=tipo
        ).order_by('-fecha')

        serializer = self.get_serializer(operaciones, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def productos_mas_salida(self, request):
        top = int(request.query_params.get('top', 10))
        productos = (
            DetalleOperaciones.objects
            .filter(tipo_operacion='salida')
            .values('producto_id', 'producto__nombre')
            .annotate(total_salidas=Sum('cantidad'))
            .order_by('-total_salidas')[:top]
        )
        return Response(list(productos))
    
    @action(detail=False, methods=['get'])
    def productos_bajo_stock(self, request):
        umbral = int(request.query_params.get('umbral', 5))
        productos = (
            DetalleOperaciones.objects
            .values('producto_id', 'producto__nombre')
            .annotate(
                entradas=Sum('cantidad', filter=Q(tipo_operacion='entrada')),
                salidas=Sum('cantidad', filter=Q(tipo_operacion='salida')),
                stock=Sum('cantidad', filter=Q(tipo_operacion='entrada')) - Sum('cantidad', filter=Q(tipo_operacion='salida'))
            )
            .filter(stock__lte=umbral)
            .order_by('stock')
        )
        return Response(list(productos))
    
    @action(detail=False, methods=['get'])
    def frecuencia_pedido(self, request):
        top = int(request.query_params.get('top', 10))
        productos = (
            DetalleOperaciones.objects
            .filter(tipo_operacion='entrada')
            .values('producto_id', 'producto__nombre')
            .annotate(frecuencia=Count('idOperaciones'))
            .order_by('-frecuencia')[:top]
        )
        return Response(list(productos))
    
    
