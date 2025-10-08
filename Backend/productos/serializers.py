from rest_framework import serializers
from productos.models import Producto
# from categorias.models import Categoria
# from categorias.serializers import CategoriaSerializer


class ProductoSerializer(serializers.ModelSerializer):
    """
    Serializer para el modelo Producto
    Maneja la serialización y deserialización de productos
    """
    # categoria = CategoriaSerializer(read_only=True)
    # categoria_id = serializers.PrimaryKeyRelatedField(
    #    queryset=Categoria.objects.all(), source='categoria', write_only=True
    # )

    class Meta:
        model = Producto
        fields = '__all__'
        read_only_fields = ('idProducto',)

    def validate_codigo(self, value):
        """
        Validar que el código sea único y no esté vacío
        """
        if not value or value.strip() == '':
            raise serializers.ValidationError("El código no puede estar vacío")

        # Validar unicidad en creación
        if self.instance is None:  # Creación
            if Producto.objects.filter(codigo=value).exists():
                raise serializers.ValidationError(
                    "Ya existe un producto con este código")
        else:  # Actualización
            if Producto.objects.filter(codigo=value).exclude(idProducto=self.instance.idProducto).exists():
                raise serializers.ValidationError(
                    "Ya existe un producto con este código")

        return value.strip()

    def validate_nombre(self, value):
        """
        Validar que el nombre no esté vacío
        """
        if not value or value.strip() == '':
            raise serializers.ValidationError("El nombre no puede estar vacío")
        return value.strip()

    def validate(self, data):
        """
        Validaciones adicionales a nivel de objeto
        """
        return data
