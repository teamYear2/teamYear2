from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from productos.models import Producto
from productos.serializers import ProductoSerializer
# from rest_framework.filters import SearchFilter
# from django_filters.rest_framework import DjangoFilterBackend


class ProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para el modelo Producto
    Proporciona operaciones CRUD completas:
    - todos los productos: GET /api/productos/
    - crear producto: POST /api/productos/
    - producto por id: GET /api/productos/{id}/
    - actualizar producto por id: PUT /api/productos/{id}/
    - eliminar producto por id: DELETE /api/productos/{id}/
    """
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    # filter_backends = [DjangoFilterBackend, SearchFilter]
    # filterset_fields = ['categoria']
    # search_fields = ['codigo', 'nombre', 'descripcion']

    def get_queryset(self):
        """
        Opcionalmente filtra el queryset por parámetros de búsqueda
        """
        queryset = Producto.objects.all()

        # Filtrar por código si se proporciona
        codigo = self.request.query_params.get('codigo', None)
        if codigo is not None:
            queryset = queryset.filter(codigo__icontains=codigo)

        # Filtrar por nombre si se proporciona
        nombre = self.request.query_params.get('nombre', None)
        if nombre is not None:
            queryset = queryset.filter(nombre__icontains=nombre)

        return queryset.order_by('nombre')
    

    @action(detail=False, methods=['get'])
    def buscar(self, request):
        """
        Endpoint personalizado para búsqueda
        GET /api/productos/buscar/?q=termino
        """
        query = request.query_params.get('q', '')
        if query:
            productos = Producto.objects.filter(
                nombre__icontains=query
            ) | Producto.objects.filter(
                codigo__icontains=query
            ) | Producto.objects.filter(
                descripcion__icontains=query
            )
        else:
            productos = Producto.objects.all()

        serializer = self.get_serializer(productos, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def por_codigo(self, request, pk=None):
        """
        Obtener producto por código
        GET /api/productos/{codigo}/por_codigo/
        """
        try:
            producto = Producto.objects.get(codigo=pk)
            serializer = self.get_serializer(producto)
            return Response(serializer.data)
        except Producto.DoesNotExist:
            return Response(
                {"error": "Producto no encontrado"},
                status=status.HTTP_404_NOT_FOUND
            )
