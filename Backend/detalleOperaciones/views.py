from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from detalleOperaciones.models import DetalleOperaciones
from detalleOperaciones.serializers import DetalleOperacionesSerializer

class DetalleOperacionesViewSet(viewsets.ModelViewSet):
    queryset = DetalleOperaciones.objects.all()
    serializer_class = DetalleOperacionesSerializer