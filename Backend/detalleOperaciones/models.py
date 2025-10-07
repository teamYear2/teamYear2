from django.db import models
from inventarios.models import Inventario
from productos.models import Producto

class DetalleOperaciones(models.Model):
    idOperaciones = models.AutoField(primary_key=True)
    inventario = models.ForeignKey(Inventario, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    
    TIPO_OPERACION = (
        ('entrada', 'Entrada'),
        ('salida', 'Salida'),
    )
    tipo_operacion = models.CharField(max_length=10, choices=TIPO_OPERACION)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.tipo_operacion} - {self.producto.nombre} ({self.cantidad})"