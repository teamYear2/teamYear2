from django.db import models
from inventarios.models import Inventario

class Usuario(models.Model):
    dni = models.IntegerField(primary_key=True)
    idInventario = models.ForeignKey(Inventario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    telefono = models.IntegerField(null=True, blank=True)
    contrasena = models.CharField(max_length=20)
    referido = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return f"{self.nombre} {self.apellido} ({self.email})"

