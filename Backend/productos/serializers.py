from rest_framework import serializers
from productos.models import Producto
from categorias.models import Categoria
from categorias.serializers import CategoriaSerializer

class ProductoSerializer(serializers.ModelSerializer):
    categoria = CategoriaSerializer(read_only=True)
    categoria_id = serializers.PrimaryKeyRelatedField(
        queryset=Categoria.objects.all(), source='categoria', write_only=True
    )

    class Meta:
        model = Producto
        fields = ['idProducto', 'codigo', 'nombre', 'descripcion', 'categoria', 'categoria_id']