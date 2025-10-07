# inventarios/serializers.py
from rest_framework import serializers
from inventarios.models import Inventario

class InventarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventario
        fields = '__all__'