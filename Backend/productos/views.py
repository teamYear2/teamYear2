from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from productos.models import Producto
from productos.serializers import ProductoSerializer
#from rest_framework.filters import SearchFilter
#from django_filters.rest_framework import DjangoFilterBackend

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    #filter_backends = [DjangoFilterBackend, SearchFilter]
    #filterset_fields = ['categoria']  # permite filtrar por ID de categoría