from django.contrib import admin
from .models import Producto


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    """
    Configuración del panel de administración para Producto
    """
    list_display = ('idProducto', 'codigo', 'nombre', 'descripcion', 'precio')
    search_fields = ('codigo', 'nombre', 'descripcion')
    list_filter = ('codigo',)
    ordering = ('nombre',)

    # Campos de solo lectura
    readonly_fields = ('idProducto',)

    # Configuración del formulario
    fieldsets = (
        ('Información Básica', {
            'fields': ('idProducto', 'codigo', 'nombre')
        }),
        ('Detalles', {
            'fields': ('descripcion', 'precio')
        }),
        # ('Categoría', {
        #     'fields': ('categoria',)
        # }),
    )

    def has_delete_permission(self, request, obj=None):
        """Permite eliminar productos"""
        return True
