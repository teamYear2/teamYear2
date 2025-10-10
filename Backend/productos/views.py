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

    def create(self, request, *args, **kwargs):
        """
        Crear un nuevo producto
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def update(self, request, *args, **kwargs):
        """
        Actualizar un producto existente (PUT)
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        """
        Eliminar un producto
        """
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"message": "Producto eliminado exitosamente"},
            status=status.HTTP_204_NO_CONTENT
        )

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
