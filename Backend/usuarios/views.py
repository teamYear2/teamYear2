from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from usuarios.models import Usuario
from inventarios.models import Inventario
from usuarios.serializers import UsuarioSerializer, LoginSerializer, LoginResponseSerializer, RegistroSerializer
import base64
import json
import time

def generate_token(usuario):
    """
    Función auxiliar para generar tokens JWT simulados
    Unifica la lógica de generación de tokens para login y registro
    """
    header = base64.b64encode(json.dumps({'alg': 'HS256', 'typ': 'JWT'}).encode()).decode()
    payload = base64.b64encode(json.dumps({
        'dni': usuario.dni,
        'email': usuario.email,
        'exp': int(time.time()) + (24 * 60 * 60)  # 24 horas
    }).encode()).decode()
    signature = base64.b64encode('fake-signature'.encode()).decode()
    
    return f"{header}.{payload}.{signature}"

def create_success_response(usuario, message, status_code=status.HTTP_200_OK):
    """
    Función auxiliar para crear respuestas exitosas unificadas
    """
    token = generate_token(usuario)
    return Response({
        'success': True,
        'usuario': UsuarioSerializer(usuario).data,
        'token': token,
        'message': message
    }, status=status_code)

def create_error_response(message, status_code=status.HTTP_400_BAD_REQUEST, errors=None):
    """
    Función auxiliar para crear respuestas de error unificadas
    """
    response_data = {
        'success': False,
        'message': message
    }
    if errors:
        response_data['errors'] = errors
    
    return Response(response_data, status=status_code)

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

@api_view(['POST'])
def login_view(request):
    """
    Vista para manejar el login de usuarios
    """
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        contrasena = serializer.validated_data['contrasena']
        
        try:
            usuario = Usuario.objects.get(email=email, contrasena=contrasena)
            return create_success_response(usuario, 'Inicio de sesión exitoso')
            
        except Usuario.DoesNotExist:
            return create_error_response('Credenciales incorrectas', status.HTTP_401_UNAUTHORIZED)
    
    return create_error_response('Datos inválidos')

@api_view(['POST'])
def registro_view(request):
    """
    Vista para manejar el registro de nuevos usuarios
    """
    serializer = RegistroSerializer(data=request.data)
    if serializer.is_valid():
        try:
            # Verificar si el DNI ya existe
            if Usuario.objects.filter(dni=serializer.validated_data['dni']).exists():
                return create_error_response('El DNI ya está registrado')
            
            # Verificar si el email ya existe
            if Usuario.objects.filter(email=serializer.validated_data['email']).exists():
                return create_error_response('El email ya está registrado')
            
            # Verificar lógica de inventario según referido
            referido = serializer.validated_data.get('referido', '')
            
            if not referido:  # Usuario nuevo SIN referido
                # Crear inventario automáticamente
                nuevo_inventario = Inventario.objects.create(
                    descripcion=f"Inventario de {serializer.validated_data['nombre']} {serializer.validated_data['apellido']}"
                )
                
                # Crear el usuario manualmente con el inventario asignado
                usuario = Usuario(
                    dni=serializer.validated_data['dni'],
                    nombre=serializer.validated_data['nombre'],
                    apellido=serializer.validated_data['apellido'],
                    email=serializer.validated_data['email'],
                    telefono=serializer.validated_data['telefono'],
                    contrasena=serializer.validated_data['contrasena'],
                    referido='',
                    idInventario=nuevo_inventario
                )
                usuario.save()
                
                return create_success_response(usuario, f'Usuario registrado exitosamente con inventario #{nuevo_inventario.idInventario}', status.HTTP_201_CREATED)
            
            else:  # Usuario CON referido
                # Buscar el usuario referido por email o DNI
                try:
                    # Intentar buscar por email primero
                    usuario_referido = None
                    if '@' in referido:  # Es un email
                        usuario_referido = Usuario.objects.get(email=referido)
                    else:  # Asumir que es DNI
                        try:
                            dni_referido = int(referido)
                            usuario_referido = Usuario.objects.get(dni=dni_referido)
                        except ValueError:
                            return create_error_response('El referido debe ser un email válido o un DNI numérico')
                    
                    # Asignar el mismo inventario del referido
                    inventario_referido = usuario_referido.idInventario
                    
                    # Crear el usuario con el inventario del referido
                    usuario = Usuario(
                        dni=serializer.validated_data['dni'],
                        nombre=serializer.validated_data['nombre'],
                        apellido=serializer.validated_data['apellido'],
                        email=serializer.validated_data['email'],
                        telefono=serializer.validated_data['telefono'],
                        contrasena=serializer.validated_data['contrasena'],
                        referido=referido,
                        idInventario=inventario_referido
                    )
                    usuario.save()
                    
                    return create_success_response(usuario, f'Usuario registrado exitosamente con inventario #{inventario_referido.idInventario} (referido por {usuario_referido.nombre})', status.HTTP_201_CREATED)
                
                except Usuario.DoesNotExist:
                    return create_error_response('El usuario referido no existe en el sistema')
            
        except Exception as e:
            return create_error_response(f'Error al crear usuario: {str(e)}', status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    return create_error_response('Datos inválidos', errors=serializer.errors)
