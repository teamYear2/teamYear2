from django.contrib import admin
from .models import Inventario


@admin.register(Inventario)
class InventarioAdmin(admin.ModelAdmin):
    """
    Configuración del panel de administración para Inventario
    """
    list_display = ('idInventario', 'descripcion', 'fecha_creacion')
    search_fields = ('descripcion', 'idInventario')
    ordering = ('-fecha_creacion',)

    # Campos de solo lectura
    readonly_fields = ('idInventario', 'fecha_creacion')

    # Configuración del formulario
    fieldsets = (
        ('Información del Inventario', {
            'fields': ('idInventario', 'descripcion', 'fecha_creacion')
        }),
    )

    def has_delete_permission(self, request, obj=None):
        """Permite eliminar inventarios"""
        return True
