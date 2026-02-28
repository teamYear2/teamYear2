from django.db import models
from categorias.models import Categoria


class Producto(models.Model):
    idProducto = models.AutoField(primary_key=True)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=100, unique=True)
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.nombre} ({self.codigo})"
