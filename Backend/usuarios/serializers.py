from rest_framework import serializers
from usuarios.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        extra_kwargs = {
            'contrasena': {'write_only': True}  
        }

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    contrasena = serializers.CharField(max_length=20)

class LoginResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField()
    token = serializers.CharField(required=False)
    usuario = UsuarioSerializer(required=False)

class RegistroSerializer(serializers.ModelSerializer):
    confirmar_contrasena = serializers.CharField(write_only=True)
    
    class Meta:
        model = Usuario
        fields = ['dni', 'idInventario', 'nombre', 'apellido', 'email', 
                 'telefono', 'contrasena', 'confirmar_contrasena', 'referido']
        extra_kwargs = {
            'contrasena': {'write_only': True},
            'confirmar_contrasena': {'write_only': True},
            'idInventario': {'required': False},  # Hacer opcional el inventario
            'referido': {'required': False}       # Hacer opcional el referido
        }
    
    def validate(self, data):
        """Validar que las contraseñas coincidan"""
        if data['contrasena'] != data['confirmar_contrasena']:
            raise serializers.ValidationError("Las contraseñas no coinciden")
        return data
    
    def validate_contrasena(self, value):
        """Validar fuerza de contraseña"""
        if len(value) < 6:
            raise serializers.ValidationError("La contraseña debe tener al menos 6 caracteres")
        return value
    
    def create(self, validated_data):
        """Crear usuario eliminando confirmar_contrasena"""
        validated_data.pop('confirmar_contrasena')
        return Usuario.objects.create(**validated_data)