from django.db import models

# Create your models here.
class Inventario(models.Model):
    idInventario = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inventario {self.idInventario}"